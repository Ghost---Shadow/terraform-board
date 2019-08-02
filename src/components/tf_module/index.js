import React from 'react';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

class TfModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
    };
  }

  render() {
    const { extended } = this.state;
    return (
      <Card style={{ minWidth: 250, maxWidth: extended ? 500 : 250 }}>
        <CardContent>
          TfModule
          <Switch
            checked={extended}
            onChange={event => this.setState({ extended: event.target.checked })}
            value="extended"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </CardContent>
        <Collapse in={extended} timeout="auto" unmountOnExit>
          <CardContent>
          asdas
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default TfModule;
