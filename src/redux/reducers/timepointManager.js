const defaultState = {
    timepoints: [],
    measurements: []
};

const timepointManager = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TIMEPOINTS':
            return { ...state, timepoints: action.state };
        case 'SET_MEASUREMENTS':
            return { ...state, measurements: action.state };
        default:
            return state;
    }
};

export default timepointManager;
