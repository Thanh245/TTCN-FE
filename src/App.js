import React from 'react';
//import Header from './user/components/Header/Header'
// import Products from './user/components/Products/Products'
import ProductsList from './user/components/Products/ProductsList'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//import {DataProvider} from './user/components/Products/DataProvider'
import Product from './user/components/Products/Product/Product'
import Cart from './user/components/Cart/Cart'
//import Footer from './user/components/Footer/Footer'
import SignUp from './user/components/SignUp/SignUp'
import Order from './user/components/Order/Order'
import Home from './user/components/HomePage/HomePage'
import Profile from './user/components/Profile/Profile'
import Header from "./user/components/Header/Header"
import Footer from "./user/components/Footer/Footer"
import Purchase from "./user/components/Purchase/Purchase"
import history from "./history";

import UserPage from './user/components/UserPage/UserPage';
import {AdminPage} from './admin/AdminPage'
function App() {
  return(    
    <BrowserRouter history={history}>    
        
        {/* <Header/>
        <div className="container">
            <Switch>
            <Route path="/" exact  component={ProductsList} />
            <Route path="/productslist/filter/price/:from/:to"  render={({match})=>(<ProductsList params={match.params} path={match.path}></ProductsList>)} />
            <Route path="/productslist/filter/type/:id"  render={({match})=>(<ProductsList params={match.params} path={match.path}></ProductsList>)} />
            <Route path="/productslist/:id" render={(props)=>(<Product {...props}></Product>)} />
            <Route path="/productslist" exact  component={ProductsList} />
            <Route path="/signup" exact  component={ SignUp } />
            <Route path="/cart" exact  component={ Cart } />
            <Route path="/order" exact component={ Order } />
            <Route path="/profile" exact component={ Profile  } />
            </Switch>
        </div> */}
        
    {/* <div> */}
        <Switch>
            <Route path="/" component={UserPage} />
            <Route path='/admin' component={AdminPage}/>
        </Switch>
        <Footer />
    {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
