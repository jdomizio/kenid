const csv = require('csv');
const fs = require('fs');
const logger = require('../logging');

module.exports = function(filename = 'export.csv', userData) {
    logger.debug(`exporter('${filename}', ...)`);

    return new Promise((resolve, reject) => {
        fs.open(filename, 'w+', (err, fileDescriptor) => {
            if (err) {
                logger.error(`Error while trying to open the file ${filename} for writing:`, err);
                reject(err);
                return;
            }

            const headerRow = [
                'id',
                'fullName',
                'firstName',
                'lastName',
                'middleInitial',
                'streetAddress',
                'city',
                'state',
                'zipCode'
            ];

            const bodyRows = userData.rows.map(r => {
                const intermediate = [
                    r.id,
                    r.doc.fullName._raw,
                    r.doc.fullName.firstName,
                    r.doc.fullName.lastName,
                    r.doc.fullName.mi,
                    r.doc.streetAddress,
                    r.doc.city,
                    r.doc.state,
                    r.doc.zipcode
                ];

                logger.debug(JSON.stringify(intermediate));
                return intermediate;
            });

            const csvRows = [headerRow, ...bodyRows];

            csv.stringify(csvRows, (err, output) => {
                if (err) {
                    logger.error('Error while generating the csv output: ', err);
                    reject(err);
                    return;
                }
                fs.write(fileDescriptor, output, (err) => {
                    if (err) {
                        logger.error('Error while trying to write the export: ', err);
                        reject(err);
                        return;
                    }

                    logger.debug('Export complete');
                    resolve(csvRows);
                });
            });
        });
    });
};
