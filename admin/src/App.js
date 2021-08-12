
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import Products from './containers/Products/Products';
import theme from './configs/theme';
import CreateProduct from './containers/CreareProduct/CreateProduct';
import DetailProduct from './containers/DetailProduct/DetailProduct';
import Dashboard from './containers/Dashboard/Dashboard';
import Orders from './containers/Orders/Orders';
import Layout from './hocs/Layout/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
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
          <Route path='/products/create' exact>
            <CreateProduct/>
          </Route>
          <Route path='/product/:id' exact>
            <DetailProduct />
          </Route>
          <Route path='/products' exact>
            <Products/>
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
