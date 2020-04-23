const displayFunction = (data) => {
    let text = '';
    if (data.rAngle && !isNaN(data.rAngle)) {
        text = data.rAngle.toFixed(2) + String.fromCharCode(0x00B0);
    }
    return text;
};

export const cobbAngle = {
    id: 'CobbAngle',
    name: 'CobbAngle',
    toolGroup: 'allTools',
    cornerstoneToolType: 'CobbAngle',
    options: {
        measurementTable: {
            displayFunction
        },
        caseProgress: {
            include: true,
            evaluate: true
        }
    }
};
