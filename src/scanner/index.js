const appConfig = require('../config');

if ('scanner' in appConfig && appConfig.scanner === 'mock') {
    module.exports = require('./mockScanner');
} else {
    module.exports = require('./scanner');
}
