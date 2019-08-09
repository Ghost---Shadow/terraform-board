import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './App.css';
import RenderWindow from './components/RenderWindow';
// import SettingsWindow from './components/SettingsWindow';
import PlanAndApply from './components/PlanAndApply';
import TitleBar from './components/TitleBar';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#f3923d', contrastText: '#fff' },
    secondary: { main: '#ffffff' },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
    };
  }

  componentDidMount() {
    const loadGraph = async () => {
      const response = await fetch('/api/graph');
      const elements = await response.json();
      this.setState({ elements });
    };
    loadGraph();
  }

  render() {
    const { elements } = this.state;

    const contents = [
      // { title: 'Settings', component: <SettingsWindow />, route: '/settings' },
      { title: 'Graph', component: <RenderWindow elements={elements} />, route: '/graph' },
      { title: 'Plan and Apply', component: <PlanAndApply />, route: '/apply' },
    ];

    return (
      <ThemeProvider theme={theme}>
        <TitleBar contents={contents} />
      </ThemeProvider>
    );
  }
}

export default App;
