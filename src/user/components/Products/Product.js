import React from "react";
//import { getBymaMatHang } from "./api/products";
// import DetailsThumb from "./DetailsThumb";
import "./Product.css"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RatingStar from "./RatingStar";
import { fetchItem } from "../../services/ItemService";

export default class Product extends React.Component {
 constructor(props)
 { super( props)
     this.state = {
    loading: true,
    product: {},
    index: 0,
  };console.log()
 }
  getItem = async() => {
    const params = this.props.match.params
    const res = await fetchItem(params.id);
    console.log(this.props.match.params)
    if (res.status === 200) {
        this.setState({
          ...this.state,
          product: res.data,
          loading: false
        })
    }
}

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  componentDidMount() {
    this.getItem()
  }

//   myRef = React.createRef();

//   handleTab = (index) => {
    // this.setState({ index: index });
    // const images = this.myRef.current.children;
    // for (let i = 0; i < images.length; i++) {
    //   images[i].className = images[i].className.replace("active", "");
    // }
    // images[index].className = "active";
//   };

  render() {
    if (this.state.loading) return "Loading ..";
    const product = this.state.product;
    const index = this.state.index;

    return (
        <>
            <Header />
            <div className="container">
                <div className={"row"}>
                    <div className="col-2"></div>
                    <div className="col-4">
                        {/* <img src={product.URL[index]} width={"50%"} alt="" /> */}
                    </div>
                    <div className="col-3 box-details ">
                        <h1>{product.tenMatHang}</h1>
                        <p>Price: {product.gia}$</p>
                        <p>{product.moTa}</p>
                        {/* {/* <DetailsThumb  */}
                        {/* //   images={product.URL} */}
                        {/* //   tab={this.handleTab} */}
                        {/* //   myRef={this.myRef}  */}
                        {/* // /> */}
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>  
                <h2> Đánh giá của bạn</h2>
                <div>
                    <textarea className="comment" type="text" placeholder="Đánh giá của bạn" />
                </div>
                <div>
                    <RatingStar />
                </div>
                <div>      
                    <h2> Đánh giá của khách hàng</h2>
                      <p> -{product.danhGia} </p>
                      {/* {product.map(product => <p key={product.maMatHang} name={product.danhGia} />)} */}
                 </div>

            </div>
            <Footer />
      </>
    );
  }
}


