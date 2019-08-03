module.exports = [
  { data: { id: 'n0' } },
  { data: { id: 'n1', parent: 'n0' } },
  { data: { id: 'n2', parent: 'n0' } },
  { data: { id: 'n3' } },
  { data: { id: 'n4' } },

  { data: { id: 'e1', source: 'n3', target: 'n4' } },
  { data: { id: 'e2', source: 'n0', target: 'n1' } },
  { data: { id: 'e3', source: 'n1', target: 'n2' } },
  { data: { id: 'e4', source: 'n1', target: 'n3' } },
  { data: { id: 'e5', source: 'n0', target: 'n4' } },
];
