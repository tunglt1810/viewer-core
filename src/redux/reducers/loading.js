import { cloneDeep } from 'lodash';

const defaultState = {
    progress: {},
    lastUpdated: null
};

const loading = (state = defaultState, action) => {
    let progress;
    let lastUpdated;
    switch (action.type) {
        case 'SET_STUDY_LOADING_PROGRESS':
            progress = cloneDeep(state).progress;
            progress[action.progressId] = action.progressData;

            // This is a workaround so we can easily identify changes
            // to the progress object without doing deep comparison.
            lastUpdated = new Date().getTime();

            return {...state, progress, lastUpdated};
        case 'CLEAR_STUDY_LOADING_PROGRESS':
            progress = cloneDeep(state).progress;
            delete progress[action.progressId];

            lastUpdated = new Date().getTime();

            return {...state, progress, lastUpdated};
        default:
            return state;
    }
};

export default loading;
