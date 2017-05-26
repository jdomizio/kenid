const appConfig = require('../config');

if ('db' in appConfig && appConfig.db === 'mock') {
    module.exports = './db.mock';
} else {
    module.exports = require('./db');
}
