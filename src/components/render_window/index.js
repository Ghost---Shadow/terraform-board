import React from 'react';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
// import cose from 'cytoscape-cose-bilkent';
import CytoscapeComponent from 'react-cytoscapejs';

cytoscape.use(fcose);
// cytoscape.use(cose);

const stylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': ele => ele.data('bg') || '#2B65EC',
      label: ele => ele.data('id'),
      // shape: 'rectangle'
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
      'line-color': '#333',
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
    return (
      <CytoscapeComponent
        elements={elements}
        layout={{ name: 'cose' }}
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
  width: 600,
  height: 600,
};

export default RendererWindow;
