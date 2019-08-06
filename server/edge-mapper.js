const _ = require('lodash');
const flat = require('flat');

const depthMap = {
  resource: 3,
  data: 3,
  module: 2,
  var: 1,
};

const extractEdge = value => _.get(`${value}`.match(/^\$\{(.*)\}$/), 1);

const generateEdges = (obj, basename) => {
  const flatObj = flat(obj);
  const validKeys = _.uniq(Object.keys(flatObj).map((key) => {
    const depth = depthMap[key.split('.')[0]];
    if (!depth) return null;
    return key.split('.').slice(1, depth).join('.');
  }).filter(k => k));

  const getValidKey = (k) => {
    if (!k) return null;
    for (let i = 0; i < validKeys.length; i += 1) {
      if (k.indexOf(validKeys[i]) > -1) {
        return validKeys[i];
      }
    }
    return null;
  };

  const edges = Object.keys(flatObj)
    .map((key) => {
      const k = extractEdge(flatObj[key]);
      const validKey = getValidKey(k);
      const validValue = getValidKey(key);
      if (validKey && validValue) {
        return {
          data: {
            id: `${basename}/${validKey}->${basename}/${validValue}`,
            source: `${basename}/${validKey}`,
            target: `${basename}/${validValue}`,
          },
        };
      }
      return null;
    })
    .filter(k => k);

  return edges;
};

module.exports = {
  extractEdge,
  generateEdges,
};
