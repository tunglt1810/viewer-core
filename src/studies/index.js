import { QIDO, WADO } from './services';
import {
    deleteStudyMetadataPromise,
    retrieveStudyMetadata
} from './retrieveStudyMetadata';

import getStudyBoxData from './getStudyBoxData';
import retrieveStudiesMetadata from './retrieveStudiesMetadata';
import searchStudies from './searchStudies';
import sortStudy from './sortStudy';

const studies = {
    services: {
        QIDO,
        WADO
    },
    loadingDict: {},
    retrieveStudyMetadata,
    deleteStudyMetadataPromise,
    retrieveStudiesMetadata,
    getStudyBoxData,
    searchStudies,
    sortStudy
};

export default studies;
