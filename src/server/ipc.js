const ipcEvents = require('../common/ipcEvents');
const logger = require('../logging');
const exporter = require('./exporter');

module.exports = {
    [ipcEvents.addScannerListener]: (server) => () => {
        server.scanner.addEventListener(server.onScan)
    },

    [ipcEvents.removeScannerListener]: (server) => () => {
        server.scanner.removeEventListener(server.onScan);
    },

    [ipcEvents.getDeviceStatus]: (server) => () => {
        server.scanner.test().then(() => {
            server.win.webContents.send(ipcEvents.getDeviceStatusDone, { status: 'Connected' });
        }).catch(err => {
            logger.error('ipcEvents.getDeviceStatus(): ', err);
            server.win.webContents.send(ipcEvents.getDeviceStatusDone, { status: 'Disconnected', error: true, details: err.message });
        });
    },

    [ipcEvents.reloadDevice]: (server) => () => {
        server.db.getConfiguration().then(config => {
            server.scanner.reload(config).then(() => {
                server.win.webContents.send(ipcEvents.reloadDeviceDone, {});
            }).catch(err => {
                server.win.webContents.send(ipcEvents.reloadDeviceDone, { error: true, details: err });
            });
        }).catch(err => {
            server.win.webContents.send(ipcEvents.reloadDeviceDone, { error: true, details: err });
        });
    },

    [ipcEvents.getDbStatus]: (server) => () => {
        server.db.getStatus().then(result => {
            server.win.webContents.send(ipcEvents.getDbStatusDone, result);
        }).catch(err => {
            server.win.webContents.send(ipcEvents.getDbStatusDone, Object.assign({ error: true }, err));
        });
    },

    [ipcEvents.getConfiguration]: (server) => () => {
        server.db.getConfiguration().then(result => {
            server.win.webContents.send(ipcEvents.getConfigurationDone, result);
        }).catch(err => {
            server.win.webContents.send(ipcEvents.getConfigurationDone, Object.assign({ error: true }, err));
        });
    },

    [ipcEvents.updateConfiguration]: (server) => (sender, config) => {
        server.db.setConfiguration(config).then(result => {
            server.win.webContents.send(ipcEvents.updateConfigurationDone, Object.assign(config, result));
        }).catch(err => {
            server.win.webContents.send(ipcEvents.updateConfigurationDone, Object.assign({ error: true }, err));
        });
    },

    [ipcEvents.exportDatabase]: (server) => (sender, filename) => {
        server.db.exportUsers().then(data => {
            return exporter(filename, data);
        }).then((result) => {
            logger.debug('Sending export Database Done');
            server.win.webContents.send(ipcEvents.exportDatabaseDone, result);
        }).catch(err => {
            logger.error('Error while trying to export users: ', err);
            server.win.webContents.send(ipcEvents.exportDatabaseDone, Object.assign({ error: true }, err ));
        });
    },

    [ipcEvents.addCustomer]: (server) => (sender, customer) => {
        server.db.addUser(customer).then(() => {
            server.win.webContents.send(ipcEvents.addCustomerDone, {});
        }).catch(err => {
            server.win.webContents.send(ipcEvents.addCustomerDone, Object.assign({ error: true }, err));
        })
    },

    [ipcEvents.simulateScan]: (server) => (sender, type) => {
        if (process.env.NODE_ENV === 'production') {
            logger.warn('Attempt to simulate scan in prod app');
            return;
        }

        server.scanner.simulateScan && server.scanner.simulateScan(type, server.onScan);
    }
};
