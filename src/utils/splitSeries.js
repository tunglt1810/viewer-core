
/** Process series metadata and split if necessary
* @param {Object} series original series
* @author Triet
*/
const splitRules = {
    /** Define rules for each modality types
     * each Modality has an array of Tags that the series will be split
     * into
    */
    MR: [
        'SequenceName',
        'EchoTime',
        'RepetitionTime'
    ]
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
    const subSeriesInstances = splitInstances(series.instances, splitRules.MR);
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
    let instancesList = [];
    const rulesLength = ruleSet.length;
    const uniqueValues = new Array(rulesLength).fill(new Set());
    const indexes = new Set();
    instances.forEach((instance) => {
        let index = '';
        for (let i = 0; i < rulesLength; i++) {
            const val = instance.metadata[ruleSet[i]];
            uniqueValues[i].add(val);
            index += [...uniqueValues[i]].indexOf(val);
        }
        indexes.add(index);
        const subSeriesIndex = [...indexes].indexOf(index);
        if (!instancesList[subSeriesIndex]) instancesList[subSeriesIndex] = [instance];
        else instancesList[subSeriesIndex].push(instance);
    });
    // console.log('processMRSeries indexes', indexes);
    // console.log('processMRSeries subSeries', instancesList);
    return instancesList;
};
