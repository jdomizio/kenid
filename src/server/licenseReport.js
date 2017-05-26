const logger = require('../logging');
const moment = require('moment');
const crypto = require('crypto');

function isUnderage(birthDate) {
    return getAge(birthDate) < 21;
}

function getAge(birthDate) {
    return moment().diff(moment(birthDate), 'years');
}

module.exports = function licenseReport(scanData) {
    logger.debug('Generating license report.');

    return {
        age: getAge(scanData.subFile.birthDate),
        underage: isUnderage(scanData.subFile.birthDate),
        name: scanData.subFile.fullName._raw,
        gender: scanData.subFile.gender,
        issuer: scanData.header.issuer,
        uid: crypto.createHash('md5').update(scanData.subFile.licenseNumber).digest('hex'),
        scanData
    };
};
