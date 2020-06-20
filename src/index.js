import './lib';

import {ExtensionManager, MODULE_TYPES} from './extensions';
import {ServicesManager,
    UINotificationService,
    UIModalService,
    UIDialogService,
    MeasurementService
} from './services';
import classes, {CommandsManager, HotkeysManager} from './classes';

import DICOMWeb from './DICOMWeb';
import DICOMSR from './DICOMSR';
import cornerstone from './cornerstone';
import hangingProtocols from './hanging-protocols';
import header from './header';
import log from './log';
import measurements from './measurements';
import metadata from './classes/metadata';
import object from './object';
import redux from './redux';
import string from './string';
import studies from './studies';
import ui from './ui';
import user from './user';
import utils, {hotkeys} from './utils';

const ViewerCore = {
    MODULE_TYPES,
    //
    CommandsManager,
    ExtensionManager,
    HotkeysManager,
    ServicesManager,
    //
    utils,
    hotkeys,
    studies,
    redux,
    classes,
    metadata,
    header,
    cornerstone,
    string,
    ui,
    user,
    object,
    log,
    DICOMWeb,
    DICOMSR,
    viewer: {},
    measurements,
    hangingProtocols,
    //
    UINotificationService,
    UIModalService,
    UIDialogService,
    MeasurementService
};

export {
    MODULE_TYPES,
    //
    CommandsManager,
    ExtensionManager,
    HotkeysManager,
    ServicesManager,
    //
    utils,
    hotkeys,
    studies,
    redux,
    classes,
    metadata,
    header,
    cornerstone,
    string,
    ui,
    user,
    object,
    log,
    DICOMWeb,
    DICOMSR,
    measurements,
    hangingProtocols,
    //
    UINotificationService,
    UIModalService,
    UIDialogService,
    MeasurementService
};

export {ViewerCore};

export default ViewerCore;
