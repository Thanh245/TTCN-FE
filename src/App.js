import React from 'react';
import Header from './user/components/Header/Header'
import Products from './user/components/Products/Products'
import {BrowserRouter, Route} from 'react-router-dom'
import {DataProvider} from './user/components/Products/DataProvider'
import Details from './user/components/Products/Details'
import Cart from './user/components/Cart/Cart'
import Footer from './user/components/Footer/Footer'
import SignUp from './user/components/SignUp/SignUp'
import Order from './user/components/Order/Order'
import Home from './user/components/HomePage/HomePage'
import Profile from './user/components/Profile/Profile'

function App() {
  return (
    <DataProvider>
      <div className="App">
      <BrowserRouter>
          <Header />
              <Route path="/home" component={Home} />
              <Route path="/products" component={Products} />
              <Route path="/product/:id" component={Details} />
              <Route path="/signup" component={ SignUp } />
              <Route path="/cart" component={ Cart } />
              <Route path="/order" component={ Order } />
              <Route path="/profile" component={ Profile  } />
      
          <Footer />
          </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;
