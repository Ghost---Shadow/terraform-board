const path = require('path');
const { toMatchFile } = require('jest-file-snapshot');

expect.extend({ toMatchFile });

const {
  providerTransformer,
  dataTransformer,
  moduleTransformer,
  resourceTransformer,
  transformer,
} = require('./node-mapper');

const sample1 = require('../../scenarios/02_vault/json/vault-cluster/main.json');

describe('node-mapper', () => {
  const basename = 'basename';
  const filename = 'filename';

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
          parent: `${basename}/${filename}`,
        },
      }];

      expect(providerTransformer(input, basename, filename)).toEqual(expected);
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
            parent: `${basename}/${filename}`,
          },
        },
        {
          data: {
            id: `${basename}/replica`,
            label: 'replica',
            type: 'module',
            parent: `${basename}/${filename}`,
          },
        },
      ];

      expect(moduleTransformer(input, basename, filename)).toEqual(expected);
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
            id: 'basename/filename/aws_vpc',
            label: 'aws_vpc',
            parent: 'basename/filename',
            type: 'data',
          },
        },
        {
          data: {
            id: 'basename/aws_vpc.default',
            label: 'default',
            parent: 'basename/filename/aws_vpc',
            type: 'data',
          },
        },
        {
          data: {
            id: 'basename/filename/aws_subnet_ids',
            label: 'aws_subnet_ids',
            parent: 'basename/filename',
            type: 'data',
          },
        },
        {
          data: {
            id: 'basename/aws_subnet_ids.all',
            label: 'all',
            parent: 'basename/filename/aws_subnet_ids',
            type: 'data',
          },
        },
        {
          data: {
            id: 'basename/filename/aws_security_group',
            label: 'aws_security_group',
            parent: 'basename/filename',
            type: 'data',
          },
        },
        {
          data: {
            id: 'basename/aws_security_group.default',
            label: 'default',
            parent: 'basename/filename/aws_security_group',
            type: 'data',
          },
        },
      ];

      expect(dataTransformer(input, basename, filename)).toEqual(expected);
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
          data:
          {
            id: 'basename/filename/resource1',
            label: 'resource1',
            parent: 'basename/filename',
            type: 'resource',
          },
        },
        {
          data: {
            id: `${basename}/resource1.name1`,
            label: 'name1',
            type: 'resource',
            parent: `${basename}/${filename}/resource1`,
          },
        },
        {
          data: {
            id: `${basename}/resource1.name2`,
            label: 'name2',
            type: 'resource',
            parent: `${basename}/${filename}/resource1`,
          },
        },
        {
          data:
          {
            id: 'basename/filename/resource2',
            label: 'resource2',
            parent: 'basename/filename',
            type: 'resource',
          },
        },
        {
          data: {
            id: `${basename}/resource2.name1`,
            label: 'name1',
            type: 'resource',
            parent: `${basename}/${filename}/resource2`,
          },
        },
      ];

      expect(resourceTransformer(input, basename, filename)).toEqual(expected);
    });
  });
  describe('transformer', () => {
    it('should transform the sample', () => {
      const input = sample1;
      const received = JSON.stringify(transformer(input, basename, filename), null, 2);
      expect(received).toMatchFile(path.join(__dirname, '../../scenarios/02_vault/json/vault-cluster/nodes.json'));
    });
  });
});
