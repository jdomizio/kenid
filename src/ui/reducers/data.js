import { handleActions, createAction } from 'redux-actions';
import { ipcRenderer } from 'electron';
import ipcEvents from '../../common/ipcEvents';

const INITIAL_STATE = {
    value: null,
    loading: false,
};

export const databaseStatusFetching = createAction('kenid/DATABASE_STATUS_FETCHING');
export const databaseStatusFetched = createAction('kenid/DATABASE_STATUS_FETCHED');
export const fetchDatabaseStatus = () => (dispatch) => {
    ipcRenderer.once(ipcEvents.getDbStatusDone, (sender, response) => {
        dispatch(databaseStatusFetched(response));
    });

    dispatch(databaseStatusFetching());
    ipcRenderer.send(ipcEvents.getDbStatus);
};

export const databaseExporting = createAction('kenid/DATA/EXPORTING');
export const databaseExported = createAction('kenid/DATA/EXPORTED');
export const exportDatabase = (filename) => (dispatch) => {
    ipcRenderer.once(ipcEvents.exportDatabaseDone, (sender, response) => {
        console.log(response);
        dispatch(databaseExported(response));
    });

    dispatch(databaseExporting(filename));
    ipcRenderer.send(ipcEvents.exportDatabase, filename);
};

export default handleActions({
    [databaseStatusFetching]: (state) => ({
        ...state,
        loading: true,
    }),

    [databaseStatusFetched]: (state, { payload }) => ({
        ...state,
        value: payload,
        loading: false,
    }),

    [databaseExporting]: (state) => ({
        ...state,
        loading: true,
    }),

    [databaseExported]: (state) => ({
        ...state,
        loading: false,
    }),
}, INITIAL_STATE);
