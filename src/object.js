// Transforms a shallow object with keys separated by "." into a nested object
function getNestedObject(shallowObject) {
    const nestedObject = {};
    for (const key in shallowObject) {
        if (!Object.prototype.hasOwnProperty.call(shallowObject, key)) continue;
        const value = shallowObject[key];
        const propertyArray = key.split('.');
        let currentObject = nestedObject;
        while (propertyArray.length) {
            const currentProperty = propertyArray.shift();
            if (!propertyArray.length) {
                currentObject[currentProperty] = value;
            } else {
                if (!currentObject[currentProperty]) {
                    currentObject[currentProperty] = {};
                }

                currentObject = currentObject[currentProperty];
            }
        }
    }

    return nestedObject;
}

// Transforms a nested object into a shallowObject merging its keys with "." character
function getShallowObject(nestedObject) {
    const shallowObject = {};
    const putValues = (baseKey, nestedObject, resultObject) => {
        for (const key in nestedObject) {
            if (!Object.prototype.hasOwnProperty.call(nestedObject, key)) continue;
            let currentKey = baseKey ? `${baseKey}.${key}` : key;
            const currentValue = nestedObject[key];
            if (typeof currentValue === 'object') {
                if (currentValue instanceof Array) {
                    currentKey += '[]';
                }

                putValues(currentKey, currentValue, resultObject);
            } else {
                resultObject[currentKey] = currentValue;
            }
        }
    };

    putValues('', nestedObject, shallowObject);
    return shallowObject;
}

const object = {
    getNestedObject,
    getShallowObject
};

export default object;
