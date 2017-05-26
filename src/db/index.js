const appConfig = require('../application.config.json');

if ('db' in appConfig && appConfig.db === 'mock') {
    module.exports = './db.mock';
} else {
    module.exports = require('./db');
}
