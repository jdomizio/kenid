const winston = require('winston');
const appConfig = require('../application.config.json');
require('winston-daily-rotate-file');

if (process.env.NODE_ENV === 'production') {
    if (!('logging' in appConfig)) {
        throw new Error('FATAL - Could not find production logging configuration.');
    }
    winston.configure({
        level: appConfig.logging.level || 'info',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: './log',
                datePattern: 'yyyy-MM-dd.',
                localTime: true,
                level: appConfig.logging.level || 'info'
            })
        ]
    });
} else {
    winston.level = 'debug';
}

module.exports = {
    debug(msg, meta) {
        return winston.log('debug', `[${(new Date()).toJSON()}] ${msg}`, meta);
    },

    info(msg, meta) {
        return winston.log('info', `[${(new Date()).toJSON()}] ${msg}`, meta);
    },

    warn(msg, meta) {
        return winston.log('warn', `[${(new Date()).toJSON()}] ${msg}`, meta);
    },

    error(msg, meta) {
        return winston.log('error', `[${(new Date()).toJSON()}] ${msg}`, meta);
    },

    log(level, msg, meta) {
        return winsot.log(level, `[${(new Date()).toJSON()}] ${msg}`, meta);
    }
};
