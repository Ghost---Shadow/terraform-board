const twoLevelTransformer = (obj, type, basename) => (
  Object.keys(obj).map(label => (
    {
      data: {
        id: `${basename}/${label}`,
        label,
        type,
        parent: basename,
      },
    }
  ))
);

const threeLevelTransformer = (obj, type, basename) => (
  Object.keys(obj)
    .map(key1 => Object.keys(obj[key1])
      .map(key2 => (
        {
          data: {
            id: `${basename}/${key1}.${key2}`,
            label: `${key1}.${key2}`,
            type,
            parent: basename,
          },
        }
      )))
    .reduce((acc, next) => (
      acc.concat(next)
    ), [])
);

const providerTransformer = (obj, basename) => twoLevelTransformer(obj, 'provider', basename);
const moduleTransformer = (obj, basename) => twoLevelTransformer(obj, 'module', basename);
const dataTransformer = (obj, basename) => threeLevelTransformer(obj, 'data', basename);
const resourceTransformer = (obj, basename) => threeLevelTransformer(obj, 'resource', basename);
const localsTransformer = () => []; // TODO
const outputTransformer = () => []; // TODO
const variableTransformer = () => []; // TODO
const terraformTransformer = () => []; // TODO

const transformer = (obj, basename) => {
  const level1 = Object.keys(obj);

  const typeLookupFun = (type, subObj) => {
    const typeLookup = {
      provider: providerTransformer,
      module: moduleTransformer,
      data: dataTransformer,
      locals: localsTransformer,
      resource: resourceTransformer,
      output: outputTransformer,
      variable: variableTransformer,
      terraform: terraformTransformer,
    };
    const fun = typeLookup[type];
    if (!fun) { throw new Error(`Unknown type ${type}`); }

    return fun(subObj, basename);
  };

  return level1
    .map(type => typeLookupFun(type, obj[type]))
    .reduce((acc, next) => acc.concat(next), []);
};

module.exports = {
  providerTransformer,
  dataTransformer,
  moduleTransformer,
  resourceTransformer,
  transformer,
};
