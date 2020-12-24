import React from "react";
import { getBymaMatHang } from "./api/products";
import DetailsThumb from "./DetailsThumb";
//import StarRatingComponent from "react-star-rating-component";
import "./Product.css"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RatingStar from "./RatingStar";

export default class Product extends React.Component {
  state = {
    loading: true,
    product: {},
    index: 0,
    rating: 1
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  componentDidMount() {
    const maMatHang = this.props.match.params.id;

    getBymaMatHang(parseInt(maMatHang)).then((product) => {
      this.setState({
        product,

        loading: false
      });
    });

    //  const { index } = this.state.index;
    //  this.myRef.current.children[index].className = "active";
  }

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  

  render() {
    if (this.state.loading) return "Loading ..";

    const product = this.state.product;
    const index = this.state.index;
    // const { rating } = this.state;

    
    return (
        <>
            <Header />
            <div className="container">
                <div className={"row"}>
                    <div className="col-2"></div>
                    <div className="col-4">
                        <img src={product.URL[index]} width={"50%"} alt="" />
                    </div>
                    <div className="col-3 box-details ">
                        <h1>{product.tenMatHang}</h1>
                        <p>Price: {product.gia}$</p>
                        <p>{product.moTa}</p>
                        <DetailsThumb
                          images={product.URL}
                          tab={this.handleTab}
                          myRef={this.myRef}
                        />
                        {/* <DetailsThumb images={product.URL} index={index} /> */}
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>  
                <h2> Đánh giá của bạn</h2>
                <div className="row">
                    <div className = "col-8">
                        <textarea className="comment" type="text" placeholder="Đánh giá của bạn" />
                    </div>
                    <div className = "col-4">
                        <RatingStar />
                    </div>
                </div>  

                <div>      
                    <h2> Đánh giá của khách hàng</h2>
                      <p> {product.danhGia} </p>
                      {/* {product.map(product => <p key={product.maMatHang} name={product.danhGia} />)} */}
                 </div>

            </div>
            <Footer />
      </>
    );
  }
}


