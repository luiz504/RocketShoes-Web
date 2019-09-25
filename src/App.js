import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}
/**
 * Use the <BrowserRouter/> here to the <Header /> be able to access the routes
 * <Header/> will be clicabel doing some functions and interaction with all app
 */