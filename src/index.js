import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'mobx-react'
import stores from 'stores';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider {...stores}>
      <App />
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root')
);