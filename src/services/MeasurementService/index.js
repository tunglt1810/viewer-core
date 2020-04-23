import MeasurementService from './MeasurementService';

export default {
    name: 'MeasurementService',
    create: ({configuration = {}}) => new MeasurementService()
};
