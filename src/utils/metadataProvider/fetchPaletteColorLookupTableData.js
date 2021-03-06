import {api} from 'dicomweb-client';
import DICOMWeb from '../../DICOMWeb';
import str2ab from '../str2ab';

export default async function fetchPaletteColorLookupTableData(
    instance,
    server
) {
    const {
        PaletteColorLookupTableUID,
        RedPaletteColorLookupTableDescriptor,
        GreenPaletteColorLookupTableDescriptor,
        BluePaletteColorLookupTableDescriptor,
        RedPaletteColorLookupTableData,
        GreenPaletteColorLookupTableData,
        BluePaletteColorLookupTableData
    } = instance;

    return new Promise((resolve) => {
        let entry;
        if (_paletteColorCache.isValidUID(PaletteColorLookupTableUID)) {
            entry = _paletteColorCache.get(PaletteColorLookupTableUID);

            if (entry) {
                return resolve(entry);
            }
        }

        // no entry in cache... Fetch remote data.
        const promises = [
            _getPaletteColor(
                server,
                RedPaletteColorLookupTableData,
                RedPaletteColorLookupTableDescriptor
            ),
            _getPaletteColor(
                server,
                GreenPaletteColorLookupTableData,
                GreenPaletteColorLookupTableDescriptor
            ),
            _getPaletteColor(
                server,
                BluePaletteColorLookupTableData,
                BluePaletteColorLookupTableDescriptor
            )
        ];

        Promise.all(promises).then(
            ([
                RedPaletteColorLookupTableData,
                GreenPaletteColorLookupTableData,
                BluePaletteColorLookupTableData
            ]) => {
                // when PaletteColorLookupTableUID is present, the entry can be cached...
                _paletteColorCache.add({
                    RedPaletteColorLookupTableData,
                    GreenPaletteColorLookupTableData,
                    BluePaletteColorLookupTableData,
                    PaletteColorLookupTableUID
                });

                instance.RedPaletteColorLookupTableData = RedPaletteColorLookupTableData;
                instance.GreenPaletteColorLookupTableData = GreenPaletteColorLookupTableData;
                instance.BluePaletteColorLookupTableData = BluePaletteColorLookupTableData;

                resolve();
            }
        );
    });
}

/**
 * Simple cache schema for retrieved color palettes.
 */
const _paletteColorCache = {
    count: 0,
    maxAge: 24 * 60 * 60 * 1000, // 24h cache?
    entries: {},
    isValidUID: function(PaletteColorLookupTableUID) {
        return (
            typeof PaletteColorLookupTableUID === 'string' &&
      PaletteColorLookupTableUID.length > 0
        );
    },
    get: function(PaletteColorLookupTableUID) {
        let entry = null;
        if (Object.prototype.hasOwnProperty.call(this.entries, PaletteColorLookupTableUID)) {
            entry = this.entries[PaletteColorLookupTableUID];
            // check how the entry is...
            if (Date.now() - entry.time > this.maxAge) {
                // entry is too old... remove entry.
                delete this.entries[PaletteColorLookupTableUID];
                this.count--;
                entry = null;
            }
        }
        return entry;
    },
    add: function(entry) {
        if (this.isValidUID(entry.uid)) {
            let PaletteColorLookupTableUID = entry.uid;
            if (Object.prototype.hasOwnProperty.call(this.entries, PaletteColorLookupTableUID) !== true) {
                this.count++; // increment cache entry count...
            }
            entry.time = Date.now();
            this.entries[PaletteColorLookupTableUID] = entry;
            // @TODO: Add logic to get rid of old entries and reduce memory usage...
        }
    }
};

function _getPaletteColor(server, paletteColorLookupTableData, lutDescriptor) {
    const numLutEntries = lutDescriptor[0];
    const bits = lutDescriptor[2];

    const readUInt16 = (byteArray, position) => {
        return byteArray[position] + byteArray[position + 1] * 256;
    };

    const arrayBufferToPaletteColorLUT = (arraybuffer) => {
        const byteArray = new Uint8Array(arraybuffer);
        const lut = [];

        if (bits === 16) {
            for (let i = 0; i < numLutEntries; i++) {
                lut[i] = readUInt16(byteArray, i * 2);
            }
        } else {
            for (let i = 0; i < numLutEntries; i++) {
                lut[i] = byteArray[i];
            }
        }

        return lut;
    };

    if (paletteColorLookupTableData.BulkDataURI) {
        let uri = paletteColorLookupTableData.BulkDataURI;

        // TODO: Workaround for dcm4chee behind SSL-terminating proxy returning
        // incorrect bulk data URIs
        if (server.wadoRoot.indexOf('https') === 0 && !uri.includes('https')) {
            uri = uri.replace('http', 'https');
        }

        const config = {
            url: server.wadoRoot, //BulkDataURI is absolute, so this isn't used
            headers: DICOMWeb.getAuthorizationHeader(server)
        };
        const dicomWeb = new api.DICOMwebClient(config);
        const options = {
            BulkDataURI: uri
        };

        return dicomWeb
            .retrieveBulkData(options)
            .then((result) => result[0])
            .then(arrayBufferToPaletteColorLUT);
    } else if (paletteColorLookupTableData.InlineBinary) {
        const inlineBinaryData = atob(paletteColorLookupTableData.InlineBinary);
        const arraybuffer = str2ab(inlineBinaryData);

        return new Promise((resolve) => {
            resolve(arrayBufferToPaletteColorLUT(arraybuffer));
        });
    } 
    return Promise.resolve(arrayBufferToPaletteColorLUT(paletteColorLookupTableData));
  
}
