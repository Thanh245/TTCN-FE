import React from 'react';
import ProductsList from '../Products/ProductsList'
import Slider from '../Slider/Slider';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <>     
      <Header />
      <div className="container">
        <Slider />
        <br></br>
        <ProductsList />
      </div>
      <Footer />
    </>
  );
}

export default Home;
