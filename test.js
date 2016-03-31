const Fs = require('fs');
const CSParseBinary = require('./CSParseBinary');

var json = CSParseBinary.parse(Fs.readFileSync('./test.csb'));

console.log(json);

var buffer = CSParseBinary.compile(json);
Fs.writeFileSync('./test.csb', buffer);