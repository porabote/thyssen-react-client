import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {Auth} from '../auth';
import store from '../../store';
import Layout from '../layout';

const App = () => {

  return (
    <Provider store={store}>
      <Auth>
        <BrowserRouter basename="/porabote" history={history}>
          <Layout/>
        </BrowserRouter>
      </Auth>
    </Provider>
  );
}

export default App;