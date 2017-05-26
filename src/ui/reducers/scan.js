import { handleActions, createAction } from 'redux-actions';
import { ipcRenderer } from 'electron';
import ipcEvents from '../../common/ipcEvents';

const INITIAL_STATE = {
    current: null,
    deviceStatus: null,
    loading: false,
};

export const scanCompleted = createAction('kenid/SCAN_COMPLETED');
export const listenToScans = () => (dispatch) => {
    ipcRenderer.send(ipcEvents.addScannerListener);
    ipcRenderer.on(ipcEvents.scan, (sender, data) => {
        dispatch(scanCompleted(data));
    });
};

export const silenceScans = () => (dispatch) => {
    ipcRenderer.removeAllListeners(ipcEvents.scan);
    ipcRenderer.send(ipcEvents.removeScannerListener);
};

export const statusFetching = createAction('kenid/SCANNER/STATUS_FETCHING');
export const statusFetched = createAction('kenid/SCANNER/STATUS_FETCHED');
export const fetchScannerStatus = () => (dispatch) => {
    ipcRenderer.once(ipcEvents.getDeviceStatusDone, (sender, response) => {
        dispatch(statusFetched(response));
    });

    dispatch(statusFetching());
    ipcRenderer.send(ipcEvents.getDeviceStatus);
};

export const deviceReloading = createAction('kenid/SCANNER/DEVICE_RELOADING');
export const deviceReloaded = createAction('kenid/SCANNER/DEVICE_RELOADED');
export const reloadDevice = () => (dispatch) => {
    ipcRenderer.once(ipcEvents.reloadDeviceDone, (sender, response) => {
        dispatch(deviceReloaded(response));
    });

    dispatch(deviceReloading);
    ipcRenderer.send(ipcEvents.reloadDevice);
};

export const simulateScan = (type) => () => {
    ipcRenderer.send(ipcEvents.simulateScan, type);
};

export const reset = createAction('kenid/SCANNER/RESET');
export const mailingListAdding = createAction('kenid/MAILING_LIST_ADDING');
export const mailingListAdded = createAction('kenid/MAILING_LIST_ADDED');
export const addToMailingList = (person) => (dispatch) => {
    ipcRenderer.once(ipcEvents.addCustomerDone, (sender, response) => {
        dispatch(mailingListAdded(response));
    });

    dispatch(mailingListAdding(person));
    ipcRenderer.send(ipcEvents.addCustomer, person);
};

export default handleActions({
    [scanCompleted]: (state, { payload }) => ({
        ...state,
        current: payload,
    }),
    [statusFetched]: (state, { payload }) => ({
        ...state,
        deviceStatus: payload,
    }),
    [reset]: state => ({
        ...state,
        current: null,
    }),
    [mailingListAdded]: state => ({
        ...state,
        current: null,
    }),
}, INITIAL_STATE);
