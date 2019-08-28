import React from 'react';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import _ from 'lodash';

import {
  NoElements,
  Loading,
} from './NoElements';

cytoscape.use(dagre);

const colorLookup = {
  provider: '#f9ab00',
  resource: '#66921b',
  module: '#e2683c',
  data: '#f9df7b',
  fname: '#2B65EC',
};

class RenderWindow extends React.Component {
  componentDidUpdate() {
    this.renderCytoscapeElement();
  }

  renderCytoscapeElement = () => {
    const { elements } = this.props;
    if (!elements.length) return;
    const coloredElements = elements.map(element => _.merge(element,
      { data: { color: colorLookup[element.data.type] || '#eee' } }));
    const container = document.getElementById('cy');
    this.cy = cytoscape(
      {
        container,
        boxSelectionEnabled: false,
        autounselectify: true,
        style: cytoscape.stylesheet()
          .selector('node')
          .css({
            content: 'data(label)',
            shape: 'rectangle',
            'background-color': 'data(color)',
          })
          .selector('parent')
          .css({
            'background-opacity': 0.333,
            'border-color': '#2B65EC',
          })
          .selector('edge')
          .css({
            // 'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            opacity: 'data(opacity)',
          }),
        elements: coloredElements,
        layout: {
          name: 'dagre',
          nodeDimensionsIncludeLabels: true,
        },
      },
    );
  }

  render() {
    const {
      elements, width, height, loading,
    } = this.props;
    if (loading) return <Loading />;
    if (!elements.length) return <NoElements />;
    const cyStyle = { height, width };
    return (
      <div>
        <div style={cyStyle} id="cy" />
      </div>
    );
  }
}

RenderWindow.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      data: PropTypes.any,
      label: PropTypes.string,
    }),
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.bool,
};

RenderWindow.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  loading: false,
};

export default RenderWindow;
