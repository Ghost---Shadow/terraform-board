import React from 'react';
import './App.css';
import RendererWindow from './components/render_window';

const sample = require('./components/render_window/samples/grouping');

const App = () => (
  <RendererWindow elements={sample} />
);
export default App;
