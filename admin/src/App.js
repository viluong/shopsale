
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import Products from './containers/Products/Products';
import theme from './configs/theme';
import CreateProduct from './containers/CreareProduct/CreateProduct';
import DetailProduct from './containers/DetailProduct/DetailProduct';
import Dashboard from './containers/Dashboard/Dashboard';
import Orders from './containers/Orders/Orders';
import Categories from './containers/Categories/Categories';
import DetailCategory from './containers/DetailCategory/DetailCategory';
import CreateCategory from './containers/CreateCategory/CreateCategory';
import DetailOrder from './containers/DetailOrder/DetailOrder';
import CreateOrder from './containers/CreateOrder/CreateOrder';
import Layout from './hocs/Layout/Layout';
import history from './configs/history';

import NotFound from './components/UI/NotFound/NotFound';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
          <Layout>
            <Router history={history}>
              <Switch>
                <Route path='/' exact>
                  <Redirect to='/dashboard' />
                </Route>
                <Route path='/dashboard' exact>
                  <Dashboard/>
                </Route>
                <Route path='/orders' exact>
                  <Orders/>
                </Route>
                <Route path='/categories' exact>
                  <Categories/>
                </Route>
                <Route path='/category/:id' exact>
                  <DetailCategory/>
                </Route>
                <Route path='/categories/create' exact>
                  <CreateCategory />
                </Route>
                <Route path='/orders/create' exact>
                  <CreateOrder />
                </Route>
                <Route path='/order/:id' exact>
                  <DetailOrder />
                </Route>
                <Route path='/products/create' exact>
                  <CreateProduct/>
                </Route>
                <Route path='/product/:id' exact>
                  <DetailProduct />
                </Route>
                <Route path='/products' exact>
                  <Products/>
                </Route>
                <Route>
                  <NotFound/>
                </Route>
              </Switch>
            </Router>
          </Layout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
