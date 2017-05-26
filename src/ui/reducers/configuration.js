import { handleActions, createAction } from 'redux-actions';
import { ipcRenderer } from 'electron';
import ipcEvents from '../../common/ipcEvents';

const INITIAL_STATE = {
    value: null,
    loading: false,
};

export const configurationFetching = createAction('kenid/CONFIGURATION_FETCHING');
export const configurationFetched = createAction('kenid/CONFIGURATION_FETCHED');
export const fetchConfiguration = () => (dispatch) => {
    ipcRenderer.once(ipcEvents.getConfigurationDone, (sender, response) => {
        dispatch(configurationFetched(response));
    });

    dispatch(configurationFetching());
    ipcRenderer.send(ipcEvents.getConfiguration);
};

export const configurationUpdating = createAction('kenid/CONFIGURATION_UPDATING');
export const configurationUpdated = createAction('kenid/CONFIGURATION_UPDATED');
export const updateConfiguration = (config) => (dispatch) => {
    return new Promise((resolve) => {
        ipcRenderer.once(ipcEvents.updateConfigurationDone, (sender, response) => {
            dispatch(configurationUpdated(response));
            resolve(response);
        });

        dispatch(configurationUpdating());
        ipcRenderer.send(ipcEvents.updateConfiguration, config);
    });
};

export default handleActions({
    [configurationFetching]: (state) => ({
        ...state,
        loading: true,
    }),

    [configurationFetched]: (state, { payload }) => ({
        ...state,
        value: payload,
        loading: false,
    }),

    [configurationUpdated]: (state, { payload }) => ({
        ...state,
        value: payload,
        loading: false,
    }),
}, INITIAL_STATE);
