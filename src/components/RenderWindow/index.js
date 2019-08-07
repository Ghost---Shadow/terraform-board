import React from 'react';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

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
      'curve-style': 'straight',
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
        layout={{ name: 'dagre', nodeDimensionsIncludeLabels: true }}
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
