const _ = require('lodash');

const twoLevelTransformer = (obj, type) => (
  Object.keys(obj).map(label => (
    { data: { label, type } }
  ))
);

const threeLevelTransformer = (obj, type) => (
  Object.keys(obj)
    .map(key1 => Object.keys(obj[key1])
      .map(key2 => (
        { data: { label: `${key1}/${key2}`, type } }
      )))
    .reduce((acc, next) => (
      acc.concat(next)
    ), [])
);

const providerTransformer = obj => twoLevelTransformer(obj, 'provider');
const moduleTransformer = obj => twoLevelTransformer(obj, 'module');
const dataTransformer = obj => threeLevelTransformer(obj, 'data');
const localsTransformer = () => []; // TODO

const transformer = (obj) => {
  const level1 = Object.keys(obj);

  const typeLookupFun = (type, subObj) => {
    const typeLookup = {
      provider: providerTransformer,
      module: moduleTransformer,
      data: dataTransformer,
      locals: localsTransformer,
    };
    const fun = typeLookup[type];
    if (!fun) { throw new Error(`Unknown type ${type}`); }

    return fun(subObj);
  };

  return level1
    .map(type => typeLookupFun(type, obj[type]))
    .reduce((acc, next) => acc.concat(next), [])
    .map((element, i) => _.merge(element, { data: { id: `n${i + 1}` } }));
};

module.exports = {
  providerTransformer,
  dataTransformer,
  moduleTransformer,
  transformer,
};
