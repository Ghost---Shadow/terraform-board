const {
  extractEdge,
  generateEdges,
} = require('./edge-mapper');

const sample = require('./scenarios/02_vault/json/vault-cluster/main.json');
const expected = require('./scenarios/02_vault/json/vault-cluster/edges.json');

/* eslint-disable no-template-curly-in-string */
describe('edge-mapper', () => {
  describe('extractEdge', () => {
    it('should return truthy for references', () => {
      const value = '${aws_launch_configuration.launch_configuration.name}';
      expect(extractEdge(value)).toBe('aws_launch_configuration.launch_configuration.name');
    });
    it('should not return truthy for other strings', () => {
      const value1 = '0.0.0.0';
      expect(extractEdge(value1)).toBeFalsy();

      const value2 = 'postgres';
      expect(extractEdge(value2)).toBeFalsy();
    });
  });
  describe('generateEdges', () => {
    it('should generate edges correctly', () => {
      expect(generateEdges(sample, 'basename')).toEqual(expected);
    });
  });
});
/* eslint-enable no-template-curly-in-string */
