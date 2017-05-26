const PouchDB = require('pouchdb-node');
const logger = require('../logging');

const generateUid = (uid) => `user-${uid}`;

const DEFAULT_CONFIG = {
    _id: 'system-config',
    scannerPort: 'COM1',
};

module.exports = class Db {
    constructor(dbName = './default-db') {
        logger.info(`Db.constructor() instantiating new PouchDB: ${dbName}`);
        this.db = new PouchDB(dbName);
    }

    getConfiguration() {
        logger.debug('Db.getConfiguration()');
        return this.db.get('system-config').then(
            cfg => cfg,
            () => {
                this.db.put(DEFAULT_CONFIG);
                return DEFAULT_CONFIG;
            }
        );
    }

    setConfiguration(config) {
        logger.debug('Db.setConfiguration()');
        return this.getConfiguration().then(cfg => {
            const mergedCfg = Object.assign(cfg, config);
            return this.db.put(mergedCfg);
        });
    }

    getUser(uid) {
        logger.debug('Db.getUser:', uid);

        return this.db.get(generateUid(uid)).then(
            user => user
        );
    }

    generateRecord(user) {
        const {
            _id = generateUid(user.uid),
            birthDate,
            city,
            fullName,
            state,
            streetAddress,
            zipcode
        } = user.scanData.subFile;

        return {
            _id,
            birthDate,
            city,
            fullName,
            state,
            streetAddress,
            zipcode
        };
    }

    addUser(user) {
        logger.debug('Db.addUser: ', JSON.stringify(user));

        try {
            const record = this.generateRecord(user);
            logger.debug('Db.adduser - adding record: ', record);

            return this.db.put(record);
        } catch (e) {
            logger.error('There was an error adding a user to the database.', e);
            return Promise.reject(e);
        }
    }

    getUsers(filter) {
        return this.db.allDocs({
            include_docs: true,
            startkey: 'user-',
            endkey: 'user-\uffff'
        });
    }

    exportUsers() {
        logger.info('db.exportUsers()');
        return this.getUsers();
    }

    getStatus() {
        logger.debug('db.getStatus()');
        return new Promise((resolve, reject) => {
            this.db.info().then(info => {
                resolve(Object.assign({
                    status: JSON.stringify(info, null, 2),
                    count: info.doc_count,
                }, info));
            }).catch(err => {
                logger.error('db.getStatus failed: ', err);
                reject(err);
            });
        });
    }
};
