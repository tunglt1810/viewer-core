// DICOMWeb instance, study, and metadata retrieval
import Instances from './qido/instances';
import Studies from './qido/studies';
import RetrieveMetadata from './wado/retrieveMetadata';

const WADO = {
    RetrieveMetadata
};

const QIDO = {
    Studies,
    Instances
};

export { QIDO, WADO };
