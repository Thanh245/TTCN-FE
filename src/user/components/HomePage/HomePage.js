import React from 'react';
import ProductsList from '../Products/ProductsList'
import Slider from '../Slider/Slider';

function Home() {
  return (
    <>     
      <div className="container">
        <Slider />
        <br></br>
        <ProductsList />
      </div>
    </>
  );
}

export default Home;
