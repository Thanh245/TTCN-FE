import React from 'react';
import Header from './user/components/Header/Header'
import Products from './user/components/Products/Products'
import {BrowserRouter, Route} from 'react-router-dom'
//import {DataProvider} from './user/components/Products/DataProvider'
import Product from './user/components/Products/Product'
import Cart from './user/components/Cart/Cart'
import Footer from './user/components/Footer/Footer'
import SignUp from './user/components/SignUp/SignUp'
import Order from './user/components/Order/Order'
import Home from './user/components/HomePage/HomePage'
import Profile from './user/components/Profile/Profile'

function App() {
  return (
  
      <div className="App">
      <BrowserRouter>
          <Header />
              <Route path="/home" exact  component={Home} />
              <Route path="/products" exact  component={Products} />
              <Route path="/products/:id" component={Product} />
              <Route path="/signup" exact  component={ SignUp } />
              <Route path="/cart" exact  component={ Cart } />
              <Route path="/order" exact component={ Order } />
              <Route path="/profile" exact component={ Profile  } />
      
          <Footer />
          </BrowserRouter>
      </div>

  );
}

export default App;
