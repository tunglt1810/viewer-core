
/** Process series metadata and split if necessary
* @param {Object} series original series
* @author Triet
*/

const getManufacturer = (instance) => {
    const { metadata } = instance;
    return metadata.Manufacturer || metadata['00080070'];
};

const getSplitRules = (manufacturer) => {
    /** Define rules for each modality types and madufacturer
     * if the value of the defined Tag is different accross the instances, the instances will be split
     * into each Tag
    */
    if (manufacturer === 'SIEMENS') {
        return {
            MR: [
                'SequenceName',
                'DiffusionBValue',
                'EchoTime',
                'RepetitionTime'
            ]
        };
    }
    else if (manufacturer === 'Philips' || manufacturer === 'Philips Medical Systems') {
        return {
            MR: [
                '20011020', // pulse sequence name
                '20011003', // b-value
                'EchoTime',
                'RepetitionTime'
            ]
        };
    }
    else if (manufacturer === 'TOSHIBA') {
        return {};
    }
    
    // default case
    return {
    };
};

const seriesDescriptionSuffix = ' - Subseries ';

export default (series) => {
    // console.log('splitSeries', series);
    let result;
    const { instances, Modality } = series;
    if (instances && instances.length) {
        switch (Modality) {
            case 'MR':
                // console.log('splitSeries MR ne'); 
                result = processMRSeries(series);
                return result;
            default:
                return [series];
        }
    } else return [series];
};

const processMRSeries = (series) => {
    const subSeriesInstances = splitInstances(series.instances, getSplitRules(getManufacturer(series.instances[0])).MR);
    delete series.instance;
    let count = 0;
    let isSubSeries = false;
    let descriptionSuffix;
    // let SubSeriesIndex;
    if (subSeriesInstances.length > 1) {
        isSubSeries = true;
        descriptionSuffix = seriesDescriptionSuffix;
    }
    const subSeriesList = subSeriesInstances.map((subInstances) => {
        count++;
        return {
            ...series,
            SeriesDescription: isSubSeries ? series.SeriesDescription + descriptionSuffix + count : series.SeriesDescription,
            // SeriesInstanceUID: series.SeriesInstanceUID + '.' + count,
            SubSeriesIndex: isSubSeries ? '_' + count : '',
            isSubSeries: isSubSeries,
            instances: subInstances
        };
    });
    // console.log('processMRSeries', subSeriesList);
    return subSeriesList;
};

const splitInstances = (instances, ruleSet) => {
    // console.log('instances', instances);
    // console.log('manufacturer', getManufacturer(instances[0]));
    let instancesList = [];
    const rulesLength = ruleSet.length;
    const uniqueValues = new Array(rulesLength).fill(new Set());
    const indexes = new Set();
    instances.forEach((instance) => {
        let index = '';
        for (let i = 0; i < rulesLength; i++) {
            const val = getMetadataValueFromRule(instance.metadata, ruleSet[i]);
            uniqueValues[i].add(val);
            index += [...uniqueValues[i]].indexOf(val);
        }
        indexes.add(index);
        const subSeriesIndex = [...indexes].indexOf(index);
        if (!instancesList[subSeriesIndex]) instancesList[subSeriesIndex] = [instance];
        else instancesList[subSeriesIndex].push(instance);
    });
    // console.log('processMRSeries uniqueValues', uniqueValues);
    // if (instancesList.length > 1) console.log(instancesList);
    console.log('processMRSeries subSeries', instancesList);
    return instancesList;
};

const getMetadataValueFromRule = (metadata, rule) => {
    const objectKeys = rule.split('.');
    // console.log('getMetadataValue objectKeys', objectKeys);
    let value = metadata[objectKeys[0]];
    for (let i = 1; i < objectKeys.length; i++) {
        value = value[objectKeys[i]];
    }
    return value;
};