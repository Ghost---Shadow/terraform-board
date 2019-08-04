const {
  providerTransformer,
  dataTransformer,
  moduleTransformer,
  transformer,
} = require('./helpers');

const sample1 = require('./scenarios/01_basic/json/entry.json');
const expected1 = require('./scenarios/01_basic/json/transformed');

describe('helpers', () => {
  describe('providerTransformer', () => {
    it('should transform the sample', () => {
      const input = {
        aws: {},
      };

      const expected = [{ data: { label: 'aws', type: 'provider' } }];

      expect(providerTransformer(input)).toEqual(expected);
    });
  });
  describe('moduleTransformer', () => {
    it('should transform the sample', () => {
      const input = {
        master: {},
        replica: {},
      };

      const expected = [
        { data: { label: 'master', type: 'module' } },
        { data: { label: 'replica', type: 'module' } },
      ];

      expect(moduleTransformer(input)).toEqual(expected);
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
        { data: { label: 'aws_vpc/default', type: 'data' } },
        { data: { label: 'aws_subnet_ids/all', type: 'data' } },
        { data: { label: 'aws_security_group/default', type: 'data' } },
      ];

      expect(dataTransformer(input)).toEqual(expected);
    });
  });
  describe('transformer', () => {
    it('should transform the sample', () => {
      const input = sample1;
      const expected = expected1;

      expect(transformer(input)).toEqual(expected);
    });
  });
});
