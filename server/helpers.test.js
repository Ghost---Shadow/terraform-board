const {
  providerTransformer,
  dataTransformer,
  moduleTransformer,
  resourceTransformer,
  transformer,
} = require('./helpers');

const sample1 = require('./scenarios/02_vault/json/vault-cluster/main.json');
const expected1 = require('./scenarios/02_vault/json/vault-cluster/nodes.json');

describe('helpers', () => {
  const basename = 'basename';

  describe('providerTransformer', () => {
    it('should transform the sample', () => {
      const input = {
        aws: {},
      };

      const expected = [{
        data: {
          id: `${basename}/aws`,
          label: 'aws',
          type: 'provider',
          parent: basename,
        },
      }];

      expect(providerTransformer(input, basename)).toEqual(expected);
    });
  });
  describe('moduleTransformer', () => {
    it('should transform the sample', () => {
      const input = {
        master: {},
        replica: {},
      };

      const expected = [
        {
          data: {
            id: `${basename}/master`,
            label: 'master',
            type: 'module',
            parent: basename,
          },
        },
        {
          data: {
            id: `${basename}/replica`,
            label: 'replica',
            type: 'module',
            parent: basename,
          },
        },
      ];

      expect(moduleTransformer(input, basename)).toEqual(expected);
    });
  });
  describe('dataTransformer', () => {
    it('should transform the sample', () => {
      const input = {
        aws_vpc: { default: {} },
        aws_subnet_ids: { all: {} },
        aws_security_group: { default: {} },
      };

      const expected = [
        {
          data: {
            id: `${basename}/aws_vpc.default`,
            label: 'aws_vpc.default',
            type: 'data',
            parent: basename,
          },
        },
        {
          data: {
            id: `${basename}/aws_subnet_ids.all`,
            label: 'aws_subnet_ids.all',
            type: 'data',
            parent: basename,
          },
        },
        {
          data: {
            id: `${basename}/aws_security_group.default`,
            label: 'aws_security_group.default',
            type: 'data',
            parent: basename,
          },
        },
      ];

      expect(dataTransformer(input, basename)).toEqual(expected);
    });
  });
  describe('resourceTransformer', () => {
    it('should transform the sample', () => {
      const input = {
        resource1: { name1: {}, name2: {} },
        resource2: { name1: {} },
      };

      const expected = [
        {
          data: {
            id: `${basename}/resource1.name1`,
            label: 'resource1.name1',
            type: 'resource',
            parent: basename,
          },
        },
        {
          data: {
            id: `${basename}/resource1.name2`,
            label: 'resource1.name2',
            type: 'resource',
            parent: basename,
          },
        },
        {
          data: {
            id: `${basename}/resource2.name1`,
            label: 'resource2.name1',
            type: 'resource',
            parent: basename,
          },
        },
      ];

      expect(resourceTransformer(input, basename)).toEqual(expected);
    });
  });
  describe('transformer', () => {
    it('should transform the sample', () => {
      const input = sample1;
      const expected = expected1;

      expect(transformer(input, 'basename')).toEqual(expected);
    });
  });
});
