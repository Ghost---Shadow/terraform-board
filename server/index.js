const hcl = require('gopher-hcl');
const fs = require('fs');

const source = fs.readFileSync('./server/test.hcl');
const result = hcl.parse(source);

console.log(result);

console.log(result.data.aws_security_group.default);
