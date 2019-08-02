import React from 'react';
import PropTypes from 'prop-types';

class TfModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
    };
  }

  render() {
    const {
      x, y, w, h,
      color,
      children,
    } = this.props;
    const { extended } = this.state;
    return (
      <React.Fragment>
        <rect
          onClick={() => this.setState({ extended: !extended })}
          x={x}
          y={y}
          width={extended ? w : '100'}
          height={h}
          rx="15"
          fill="#eee"
          stroke={color}
          strokeWidth="10"
        />
        {extended && children}
      </React.Fragment>
    );
  }
}

TfModule.propTypes = {
  children: PropTypes.element.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  color: PropTypes.string,
};

TfModule.defaultProps = {
  color: '#333',
};

export default TfModule;
