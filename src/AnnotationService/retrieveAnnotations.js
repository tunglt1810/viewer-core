import { uniqBy } from 'lodash';
import DICOMWeb from '../DICOMWeb';
import utils from '../utils';
import log from '../log';

/**
 * Function to be registered into MeasurementAPI to retrieve measurements from MongoDB
 *
 * @param {ServerType} server
 * @returns {Object} Mapping measurements data, which retrieved from MongoDB, with toolType
 */
const retrieveAnnotations = async (server) => {
    if (!server || server.type !== 'dicomWeb') {
        log.error('[AnnotationService] DicomWeb server is required!');
        return Promise.reject({message: 'DicomWeb server is required!'});
    }

    if (!server.annotationEndpoint) {
        log.error('[AnnotationService] Server does not support persist annotation!');
        return Promise.reject({message: 'Server does not support persist annotation!'});
    }

    const serverUrl = server.annotationEndpoint;
    const headers = DICOMWeb.getAuthorizationHeader(server);

    const studies = utils.studyMetadataManager.all();

    let annotations = [];
    for (const study of studies) {
        const response = await fetch(`${serverUrl}/studies/${study.studyInstanceUID}`, {
            method: 'GET',
            mode: 'cors',
            headers
        });
        if (response.status === 200) {
            const {body} = await response.json();
            if (Array.isArray(body)) annotations.push(...body);
            else if (body && body.id) annotations.push(body);
        } else {
            log.error(response);
        }
    }

    annotations = annotations.map((annotation) => {
        const {StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, frameIndex} = annotation;
        const {measurementData, ...rest} = annotation;
        const imagePath = `${StudyInstanceUID}_${SeriesInstanceUID}_${SOPInstanceUID}_${frameIndex}`;

        return {
            ...rest,
            ...measurementData,
            imagePath
        };
    });

    // log.info('retrieve annotations', annotations);

    const toolTypes = uniqBy(annotations, 'toolType').map((annotation) => annotation.toolType);

    // log.info(toolTypes);

    const mapToolTypeWithAnnotations = {};
    toolTypes.forEach((toolType) => {
        mapToolTypeWithAnnotations[toolType] = annotations.filter((annotation) => annotation.toolType === toolType);
    });

    // log.info('mapToolTypeWithAnnotations', mapToolTypeWithAnnotations);

    return mapToolTypeWithAnnotations;
};

export {retrieveAnnotations};
