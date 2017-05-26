const appConfig = require('../application.config.json');

if ('scanner' in appConfig && appConfig.scanner === 'mock') {
    module.exports = require('./mockScanner');
} else {
    module.exports = require('./scanner');
}
