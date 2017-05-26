const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const defaultConfig = require('./application.config.json');

const userDataPath = app.getPath('userData');
const filePath = path.join(userDataPath, 'application.config.json');

let configString = null;
if (fs.existsSync(filePath)) {
    console.log('config file exists');
    configString = fs.readFileSync(filePath, {
        encoding: 'utf8',
        flag: 'r',
    });
} else {
    console.log('config file does not exist');
}

let result = defaultConfig;
if (configString === null) {
    fs.writeFileSync(filePath, JSON.stringify(defaultConfig), {
        encoding: 'UTF8',
        flag: 'w',
    });
} else {
    result = JSON.parse(configString);
}

module.exports = result;
