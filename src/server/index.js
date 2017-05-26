const Server = require('./Server');
const UserDB = require('../db');
const logger = require('../logging');

const NODE_ENV = process.env.NODE_ENV || 'dev';
logger.info(`NODE_ENV: ${NODE_ENV}`);

console.info('Creating Server...');
const server = new Server({
    NODE_ENV: NODE_ENV,
    db: new UserDB()
});

console.info('Initializing Server...');
server.init().then(() => {
    console.info('Server Initialized.');
}).catch(err => {
    console.error('Encountered error while trying to initialize server: ', err);
});
