module.exports = [
  // Nodes
  { data: { id: 'n1', label: 'aws', type: 'provider' } },
  {
    data: {
      id: 'n2', label: 'aws_vpc/default', type: 'data',
    },
  },
  {
    data: {
      id: 'n3', label: 'aws_subnet_ids/all', type: 'data',
    },
  },
  {
    data: {
      id: 'n4', label: 'aws_security_group/default', type: 'data',
    },
  },
  {
    data: {
      id: 'n5', label: 'master', type: 'module',
    },
  },
  {
    data: {
      id: 'n6', label: 'replica', type: 'module',
    },
  },

  // Edges
  // { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
];
