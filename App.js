
import React from 'react';
import Navigator from './navigator/Navigator';
import { Provider } from "react-redux";
import configureStore from './src/redux/store';

const App = () => {
  const store = configureStore();

  return (
        <Provider store={store} >
          <Navigator/>
        </Provider>
    );
};

export default App;
