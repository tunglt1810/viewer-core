import metadataProvider from './classes/MetadataProvider';
import {
    getBoundingBox,
    pixelToPage,
    repositionTextBox
} from './lib/cornerstone';

const cornerstone = {
    metadataProvider,
    getBoundingBox,
    pixelToPage,
    repositionTextBox
};

export default cornerstone;
