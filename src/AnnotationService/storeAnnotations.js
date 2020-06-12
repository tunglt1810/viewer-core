import DICOMWeb from '../DICOMWeb';
import measurements from '../measurements';
import log from '../log';
import { uniqBy } from 'lodash';

const MeasurementApiInstance = measurements.MeasurementApi.getInstance();

// serialize measurement data
const _convertAnnotationToStore = ({id, userId, PatientID, StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, frameIndex, imageId, measurementNumber, timepointId, lesionNamingNumber, toolType, _measurementServiceId, _id, updated, ...measurementData}) => ({
    id,
    userId,
    PatientID,
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    frameIndex,
    timepointId,
    toolType,
    measurementData
});

const _sendRequest = async (url, headers, method, annotation) => {
    const response = await fetch(url, {
        method,
        mode: 'cors',
        headers,
        body: annotation && JSON.stringify(annotation)
    });
    const {body} = await response.json();
    return body;
};

/**
 * Function to be registered into MeasurementAPI to store measurements into MongoDB
 *
 * @param {Object} measurementData - OHIF measurementData object
 * @param {Object} filter
 * @param {Object} server
 * @returns {Array} Array of measurements stored success
 */
const storeAnnotations = async (measurementData, filter, server) => {
    if (!server.annotationEndpoint) {
        log.error('[AnnotationService] Server does not support persist annotation!');
        return Promise.reject({message: 'Server does not support persist annotation!'});
    }

    log.info('store annotations', measurementData, filter, server);

    const serverUrl = server.annotationEndpoint;
    const headers = DICOMWeb.getAuthorizationHeader(server);
    headers['Content-Type'] = 'application/json';

    const {allTools} = measurementData;
    const {PatientID, timepointIds} = filter;

    for (const StudyInstanceUID of Object.keys(MeasurementApiInstance.temporaryDeletedMeasurement)) {
        const temp = MeasurementApiInstance.getTemporaryDeletedMeasurements(StudyInstanceUID);
        // log.info('measurement need to be deleted', temp);
        for (const annotation of temp) {
            log.info('send request to delete', annotation);
            await _sendRequest(`${serverUrl}/${annotation.id}`, headers, 'PUT', null);
        }
        MeasurementApiInstance.clearTemporaryDeletedMeasurement(StudyInstanceUID);
    }

    if (allTools && allTools.length > 0) {
        const annotationsOfCurrentPatient = allTools.filter((tool) => tool.PatientID === PatientID && timepointIds.indexOf(tool.timepointId) > -1);
        const annotationsNeedToUpdate = [];
        const annotationsNeedToStore = [];
        annotationsOfCurrentPatient.forEach((annotation) => {
            // log.info('check persistent state', annotation.id);
            if (!annotation.id) annotationsNeedToStore.push(annotation);
            else if (annotation.updated) annotationsNeedToUpdate.push(annotation);
        });
        log.info(`Measurements store summary: new-${annotationsNeedToStore.length}, edit-${annotationsNeedToUpdate.length}`);
        const annotationsStored = [];
        for (const annotation of annotationsNeedToStore) {
            const annotationStored = _convertAnnotationToStore(annotation);
            // log.info('annotation need to be saved', JSON.parse(JSON.stringify(annotation)));
            const responseData = await _sendRequest(`${serverUrl}/`, headers, 'POST', annotationStored);
            // hack to sync format
            const savedAnnotation = {
                ...annotation,
                id: responseData.id
            };
            // log.info('saved annotation', JSON.parse(JSON.stringify(savedAnnotation)));
            annotationsStored.push(savedAnnotation);
        }

        for (const annotation of annotationsNeedToUpdate) {
            // log.info('annotation need to be saved', JSON.parse(JSON.stringify(annotation)));
            const annotationStored = _convertAnnotationToStore(annotation);
            const responseData = await _sendRequest(`${serverUrl}/`, headers, 'PUT', annotationStored);
            // log.info('updated annotation', responseData);
            // deserialize measurement data
            delete annotation.updated;
            annotationsStored.push(annotation);
        }

        const toolTypes = uniqBy(annotationsStored, 'toolType').map((annotation) => annotation.toolType);
        const mapToolTypeWithAnnotations = {};
        toolTypes.forEach((toolType) => {
            mapToolTypeWithAnnotations[toolType] = annotationsStored.filter((annotation) => annotation.toolType === toolType);
        });

        return mapToolTypeWithAnnotations;
    }

    return [];
};

export {storeAnnotations};
