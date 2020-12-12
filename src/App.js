import React from 'react';
import Header from './user/components/Header/Header'
import Products from './user/components/Products/Products'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {DataProvider} from './user/components/Products/DataProvider'
import Details from './user/components/Products/Details'
import Cart from './user/components/Cart/Cart'
import Footer from './user/components/Footer/Footer'
import SignUp from './user/components/SignUp/SignUp'
import Order from './user/components/Order/Order'
import Home from './user/components/HomePage/HomePage'

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Header />

          <section>
            <Routes>
              <Route path="home" element={ <Home /> } />
              <Route path="products" element={ <Products /> } />
              <Route path="products/:id" element={ <Details /> } />
              <Route path="signup" element={ <SignUp /> } />
              <Route path="cart" element={ <Cart /> } />
              <Route path="order" element={ <Order /> } />
            </Routes>
          </section>
          <Footer />
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
