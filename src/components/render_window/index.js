import React from 'react';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
// import fcose from 'cytoscape-fcose';
// import cose from 'cytoscape-cose-bilkent';
// import cise from 'cytoscape-cise';
import dagre from 'cytoscape-dagre';
// const klay = require('cytoscape-klay');

// cytoscape.use(fcose);
// cytoscape.use(cose);
// cytoscape.use(cise);
cytoscape.use(dagre);
// cytoscape.use(klay);

const nodeColorLookup = {
  provider: '#f9ab00',
  resource: '#66921b',
  module: '#e2683c',
  data: '#f9df7b',
};

const stylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': ele => nodeColorLookup[ele.data('type')] || '#2B65EC',
      label: ele => ele.data('label'),
      shape: 'rectangle',
    },
  },
  {
    selector: ':parent',
    style: {
      'background-opacity': 0.333,
      'border-color': '#2B65EC',
    },
  },
  {
    selector: 'edge',
    style: {
      'line-color': '#999',
      // label: ele => ele.data('id'),
    },
  },
];

class RendererWindow extends React.Component {
  constructor(props) {
    super(props);

    this.cy = null;
  }

  componentDidMount() {
    if (this.cy) {
      this.cy.nodes().on('click', (e) => {
        const node = e.target;
        console.log(node.data('id'));
      });
    }
  }

  render() {
    const { elements, width, height } = this.props;
    if (!elements.length) return <div />;
    return (
      <CytoscapeComponent
        elements={elements}
        // layout={{ name: 'grid' }}
        // layout={{ name: 'cose', numIter: 9999999999999999 }}
        // layout={{ name: 'fcose', numIter: 9999999999999999 }}
        // layout={{ name: 'breadthfirst', nodeDimensionsIncludeLabels: true, maximal: true }}
        // layout={{ name: 'cise' }}
        layout={{ name: 'dagre', nodeDimensionsIncludeLabels: true }}
        // layout={{ name: 'klay' }}
        style={{ width, height }}
        stylesheet={stylesheet}
        cy={(cy) => { this.cy = cy; }}
      />
    );
  }
}

RendererWindow.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      data: PropTypes.any,
      label: PropTypes.string,
    }),
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

RendererWindow.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default RendererWindow;
