const twoLevelTransformer = (obj, type, basename, filename) => (
  Object.keys(obj).map(label => (
    {
      data: {
        id: `${basename}/${label}`,
        label,
        type,
        parent: `${basename}/${filename}`,
      },
    }
  ))
);

const threeLevelTransformer = (obj, type, basename, filename) => (
  Object.keys(obj)
    .map((key1) => {
      const group = [{
        data: {
          id: `${basename}/${filename}/${key1}`,
          label: `${key1}`,
          type,
          parent: `${basename}/${filename}`,
        },
      }];
      const actual = Object.keys(obj[key1])
        .map(key2 => (
          {
            data: {
              id: `${basename}/${key1}.${key2}`,
              label: key2,
              type,
              parent: `${basename}/${filename}/${key1}`,
            },
          }
        ));
      return group.concat(actual);
    })
    .reduce((acc, next) => (
      acc.concat(next)
    ), [])
);

const providerTransformer = (obj, basename, filename) => twoLevelTransformer(obj, 'provider', basename, filename);
const moduleTransformer = (obj, basename, filename) => twoLevelTransformer(obj, 'module', basename, filename);
const dataTransformer = (obj, basename, filename) => threeLevelTransformer(obj, 'data', basename, filename);
const resourceTransformer = (obj, basename, filename) => threeLevelTransformer(obj, 'resource', basename, filename);
const localsTransformer = () => []; // TODO
const outputTransformer = () => []; // TODO
const variableTransformer = () => []; // TODO
const terraformTransformer = () => []; // TODO

const transformer = (obj, basename, filename) => {
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

    return fun(subObj, basename, filename);
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
