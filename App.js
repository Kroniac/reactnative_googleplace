import React, { Component } from 'react';
import Screen1 from './src/container/EnterShipperDetails';
import Screen2 from './src/container/FindShipper';

import { Tabs } from './src/routes';
class App extends Component {
  render() {
    return <Tabs />;
  }
}

export default App;
