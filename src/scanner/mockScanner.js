const logger = require('../logging');

const GOOD_TEST_DATA = {
    "header": {
        "dataElementSeperator": "\n",
        "fileType": "ANSI ",
        "issuer": "Florida",
        "issuerId": "636010",
        "numberOfEntries": "02",
        "recordSeperator": "\u001e",
        "segmentTerminator": "\r",
        "subFile": {
            "length": "0177",
            "offset": "0039",
            "type": "DL"
        },
        "version": "01"
    },
    "subFile": {
        "birthDate":
            "1981-09-03T04:00:00.000Z",
        "city": "SAINT JOHNS",
        "endorsements": "NONE",
        "expirationDate": "2021-09-03T04:00:00.000Z",
        "fullName": {
            "_raw":"DOMINGO,JACKSON, L",
            "firstName": "JACKSON",
            "lastName": "DOMINGO",
            "mi": "L"
        },
        "gender": "Male",
        "height": {
            "feet": 6,
            "inches": 1
        },
        "issueDate": "2013-08-30T04:00:00.000Z",
        "licenseClass": "E",
        "licenseNumber": "D502682306350",
        "licenseRestrictions": "A",
        "state": "FL",
        "streetAddress": "1234 BEARTREE CT",
        "zipcode": "32259-1929"
    }
};

const BAD_TEST_DATA = {
    "header": {
        "dataElementSeperator": "\n",
        "fileType": "ANSI ",
        "issuer": "Florida",
        "issuerId": "636010",
        "numberOfEntries": "02",
        "recordSeperator": "\u001e",
        "segmentTerminator": "\r",
        "subFile": {
            "length": "0177",
            "offset": "0039",
            "type": "DL"
        },
        "version": "01"
    },
    "subFile": {
        "birthDate":
            "1999-09-03T04:00:00.000Z",
        "city": "YOUR FACE",
        "endorsements": "NONE",
        "expirationDate": "2021-09-03T04:00:00.000Z",
        "fullName": {
            "_raw":"EDISON, ANNIE",
            "firstName": "ANNIE",
            "lastName": "EDISON",
            "mi": ""
        },
        "gender": "Female",
        "height": {
            "feet": 5,
            "inches": 9
        },
        "issueDate": "2013-08-30T04:00:00.000Z",
        "licenseClass": "E",
        "licenseNumber": "D584393575930",
        "licenseRestrictions": "A",
        "state": "FL",
        "streetAddress": "1234 DAFFODIL LN",
        "zipcode": "32259-1929"
    }
};


class MockScanner {
    constructor(config = {
        scannerPort: 'COM3'
    }) {
        logger.debug('MockScanner.constructor', config);
    }

    addEventListener(listener) {
        logger.debug('MockScanner.addEventListener()...');
    }

    removeEventListener(listener) {
        logger.debug('MockScanner.removeEventListener()...');
    }

    test() {
        logger.debug('MockScanner.test()...');

        return Promise.resolve(true);
    }

    reload(newConfig) {
        logger.debug('MockScanner.reload(): ', newConfig);
    }

    simulateScan(type, cb) {
        logger.debug(`MockScanner.simulateScan(${type})`);

        cb(type === 'good' ? GOOD_TEST_DATA : BAD_TEST_DATA);
    }
}

module.exports = MockScanner;
