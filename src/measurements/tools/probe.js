const displayFunction = (data) => `Probe ${parseInt(data.handles.end.x)}, ${parseInt(data.handles.end.y)}`;

export const probe = {
    id: 'Probe',
    name: 'Probe',
    toolGroup: 'allTools',
    cornerstoneToolType: 'Probe',
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
