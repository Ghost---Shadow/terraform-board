import React from 'react';
import './App.css';
import RenderWindow from './components/RenderWindow';
import SettingsWindow from './components/SettingsWindow';
import PlanAndApply from './components/PlanAndApply';
import TitleBar from './components/TitleBar';

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
      { title: 'Settings', component: <SettingsWindow /> },
      { title: 'Graph', component: <RenderWindow elements={elements} /> },
      { title: 'Plan and Apply', component: <PlanAndApply /> },
    ];

    return (
      <TitleBar contents={contents} />
    );
  }
}

export default App;
