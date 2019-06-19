const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);

exports.writeFile = writeFile;