import { SeriesMetadata } from './SeriesMetadata';
import { OHIFInstanceMetadata } from './OHIFInstanceMetadata';

export class OHIFSeriesMetadata extends SeriesMetadata {
    /**
     * @param {Object} Series object.
     */
    constructor(data, study, uid) {
        super(data, uid);
        this.init(study);
    }

    init(study) {
        const series = this.getData();
        // console.log('OHIFSeriesMetadata', series);
        // define "_seriesInstanceUID" protected property...
        Object.defineProperty(this, '_seriesInstanceUID', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: series.SeriesInstanceUID
        });

        // populate internal list of instances...
        series.instances.forEach((instance) => {
            this.addInstance(new OHIFInstanceMetadata(instance, series, study));
        });
        this.combinedId = series.isSubSeries ? series.SeriesInstanceUID + '_' + series.SubSeriesIndex : series.SeriesInstanceUID + '_';
    }

    isSubSeries() {
        return this._data.isSubSeries;
    }

    getSeriesDescription() {
        return this._data.SeriesDescription;
    }

    getSeriesNumber() {
        return this._data.SeriesNumber;
    }

    getCustomSeriesInstanceUID() {
        return this.combinedId;
    }
}
