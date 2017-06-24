'use strict';

const nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: './config/configurations.json' });

module.exports = nconf;