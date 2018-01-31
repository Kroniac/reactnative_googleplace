import React, { Component } from 'react';
import Screen1 from './src/container/EnterData';
import Screen2 from './src/container/FetchData';

import { Tabs } from './src/routes';
class App extends Component {
  render() {
    return <Tabs />;
  }
}

export default App;
