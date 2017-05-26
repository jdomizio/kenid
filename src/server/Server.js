const { app, BrowserWindow, ipcMain } = require('electron');
const Scanner = require('../scanner');
const debugMenu = require('../util/debugMenu');
const logger = require('../logging');
const ipc = require('./ipc');
const ipcEvents = require('../common/ipcEvents');
const licenseReport = require('./licenseReport');
require('electron-debug')({ showDevTools: process.env.NODE_ENV !== 'production' });

const DEFAULT_BROWSER_WINDOW_CONFIG = {
    width: 800,
    height: 480
};
const ELECTRON_WEB_VIEW_LOCATION = `file://${__dirname}/index.html#/scan`;

module.exports = class Server {
    constructor(dependencies) {
        this.db = dependencies.db;
        this.win = null;
        this.scanner = null;
        this.NODE_ENV = dependencies.NODE_ENV;

        this.onScan = this.onScan.bind(this);
    }

    init() {
        logger.debug('Server.init()...');
        return new Promise((resolve, reject) => {
            this.configureApp()
                .then(() => this.configureIpc())
                .then(() => this.configureScanner())
                .then(() => resolve())
                .catch((...args) => {
                    logger.error('Encountered error in Server.init()...', args);
                    reject(...args)
                });
        });
    }

    /**
     * Configures the electron app
     */
    configureApp() {
        logger.debug('Server.configureApp()');

        app.on('ready', this.createWindow.bind(this));

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            if (this.win === null) {
                this.createWindow();
            }
        });

        return Promise.resolve();
    }

    /** Configures electron ipc */
    configureIpc() {
        logger.debug('Server.configureIpc()');

        Object.keys(ipc).forEach(h => {
            logger.debug(`\t- Configuring ipc action for ${h}`);
            ipcMain.on(h, ipc[h](this));
        });

        return Promise.resolve();
    }

    configureScanner() {
        logger.debug('Server.configureScanner();  getting app configuration...');
        return this.db.getConfiguration().then((config) => {
            logger.debug('Initializing Scanner.', config);
            this.scanner = new Scanner(config);
        });
    }

    createWindow() {
        logger.debug('Creating BrowserWindow.', DEFAULT_BROWSER_WINDOW_CONFIG)
        this.win = new BrowserWindow(DEFAULT_BROWSER_WINDOW_CONFIG);

        logger.debug('loading URL', ELECTRON_WEB_VIEW_LOCATION);
        this.win.loadURL(ELECTRON_WEB_VIEW_LOCATION);

        this.win.on('closed', () => {
            logger.debug('Window closed.');
            this.win = null;
        });

        logger.debug('Removing electron menu...');
        this.win.setMenu(null);

        logger.debug('Maximizing window...');
        this.win.maximize();
    }

    onScan(data) {
        logger.debug('onScan(...) ', Object.keys(data));
        if (!this.win) {
            logger.warn('onScan() - no window!');
            return;
        }

        const report = licenseReport(data);

        this.win.webContents.send(ipcEvents.scan, report);
    }
};
