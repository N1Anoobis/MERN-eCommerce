import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Product } from './components/views/Product/Product';
import { OrderSummary } from './components/views/OrderSummary/OrderSummary';
import { Cart } from './components/views/Cart/Cart';
// import { PostAdd } from './components/views/PostAdd/PostAdd';
// import { NotFound } from './components/views/NotFound/NotFound';
// import { Footer } from './components/views/Footer/Footer';
import { NotFound } from './components/views/NotFound/NotFound';
const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/product/:id' component={Product} />
              <Route exact path='/order' component={OrderSummary} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };
