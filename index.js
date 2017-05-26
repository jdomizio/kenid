const NODE_ENV = process.env.NODE_ENV || 'dev';

if (NODE_ENV === 'production') {
    module.exports = require('./src/server');
} else {
    module.exports = require('./src/server');
}
