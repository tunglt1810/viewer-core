import {InstanceMetadata, SeriesMetadata, StudyMetadata} from './metadata';

import CommandsManager from './CommandsManager';
import {DICOMFileLoadingListener, StackLoadingListener, StudyLoadingListener} from './StudyLoadingListener';
import HotkeysManager from './HotkeysManager';
import ImageSet from './ImageSet';
import MetadataProvider from './MetadataProvider';
import OHIFError from './OHIFError';
import {OHIFStudyMetadataSource} from './OHIFStudyMetadataSource';


import {StudyMetadataSource} from './StudyMetadataSource';
import {StudyPrefetcher} from './StudyPrefetcher';
import {TypeSafeCollection} from './TypeSafeCollection';

export {
    OHIFStudyMetadataSource,
    MetadataProvider,
    CommandsManager,
    HotkeysManager,
    ImageSet,
    StudyPrefetcher,
    StudyLoadingListener,
    StackLoadingListener,
    DICOMFileLoadingListener,
    StudyMetadata,
    SeriesMetadata,
    InstanceMetadata,
    TypeSafeCollection,
    OHIFError,
    StudyMetadataSource
};

const classes = {
    OHIFStudyMetadataSource,
    MetadataProvider,
    CommandsManager,
    HotkeysManager,
    ImageSet,
    StudyPrefetcher,
    StudyLoadingListener,
    StackLoadingListener,
    DICOMFileLoadingListener,
    StudyMetadata,
    SeriesMetadata,
    InstanceMetadata,
    TypeSafeCollection,
    OHIFError,
    StudyMetadataSource
};

export default classes;
