import nconf from 'nconf';
import path from 'path';
nconf.env().file(path.resolve(__dirname, '../config.json'));
