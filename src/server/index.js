const hcl = require('gopher-hcl');
const fs = require('fs');

const source = fs.readFileSync('./server/scenarios/01_basic/test.hcl');
const result = hcl.parse(source);

fs.writeFileSync('./dump.json', JSON.stringify(result, null, 2));
