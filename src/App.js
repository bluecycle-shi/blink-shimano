import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Manufacturers from './pages/Manufacturers';
import Product from './pages/Product';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import Highlights from './pages/Highlights';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Invoices from './pages/Invoices';
import InvoiceDetail from './pages/InvoiceDetail';
import Contact from './pages/Contact';
import Search from './pages/Search';
import { getItemSession } from './utils';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/auth/:token" component={Auth} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/unauthorized" component={Unauthorized} />

        {getItemSession('_token') && [
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/fornecedores" component={Manufacturers} />
            <Route exact path="/destaque/:name" component={Highlights} />
            <Route exact path="/produto/:id" component={Product} />
            <Route exact path="/busca/:term?" component={Search} />
            <Route exact path="/carrinho" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/pedidos" component={Invoices} />
            <Route exact path="/pedido/:id" component={InvoiceDetail} />
            <Route exact path="/minha-conta" component={Account} />
            <Route exact path="/fale-conosco" component={Contact} />
            <Route exact path="/logout" component={Logout} />

          </>
        ]}

        <Route path="*">
          <Redirect to="/unauthorized" />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;