import React from "react";
import { getBymaMatHang } from "./api/products";
import DetailsThumb from "./DetailsThumb";

export default class Product extends React.Component {
  state = {
    loading: true,
    product: {},
    index: 0
  };

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

    return (
      <div>
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
      </div>
    );
  }
}
