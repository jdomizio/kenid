const { LicenseScanner } = require('@jdomizio/license-scanner');
const logger = require('../logging');

class Scanner {
    constructor(config = {
        scannerPort: 'COM3'
    }) {
        logger.debug('Scanner.constructor', config);

        this.listeners = new Map();
        this.scanner = new LicenseScanner(config.scannerPort); // TODO: make this configurable
    }

    addEventListener(listener) {
        logger.debug('Scanner.addEventListener()...');
        // this.listeners.set(listener, listener);
        this.scanner.startListening(listener);

        logger.debug('End Scanner.addEventListener()...');
    }

    removeEventListener(listener) {
        logger.debug('Scanner.removeEventListener()...');
        // this.listeners.delete(listener);
        this.scanner.close();
    }

    test() {
        logger.debug('Scanner.test()...');

        return this.scanner.test();
    }

    reload(newConfig) {
        try {
            logger.debug('Scanner.reload(): ', newConfig);

            this.scanner.close();
            this.scanner = new LicenseScanner(newConfig.scannerPort);
        }
        catch (err) {
            logger.error('Scanner.reload(): ', err);
        }
    }
}

module.exports = Scanner;
