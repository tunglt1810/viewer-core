import { retrieveAnnotations } from "./retrieveAnnotations";
import { storeAnnotations} from "./storeAnnotations";
import { isToolSupported } from "./supportedTools";

const AnnotationService = {
    isToolSupported,
    retrieveAnnotations,
    storeAnnotations
};

export default AnnotationService;

/**
 *
 * @typedef ServerType
 * @property {string} type - type of the server
 * @property {string} wadoRoot - server wado root url
 * @property {string} annotationEndpoint - endpoint url for annotation service
 *
 */
