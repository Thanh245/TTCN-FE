import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ProductItem from "./ProductItem";
import ProductsApi from "./api/products";
import ReactPaginate from "react-paginate";
import "./Product.css";

export default class Products extends React.Component {
  state = {
    products: [],
    cart: []
  };

  componentDidMount() {
    ProductsApi.getAll().then((data) => {
      this.setState({
        products: data
      });
    });
  }

  render() {
    console.log(this.state.cart);
    // const { products } = this.state;
    return (
        <>
            <div className="container">
                <div>
                  <div className="row">
                    {this.state.products.map((product) => (
                        <div className={"col-4"} key={product.maMatHang}>
                            <ProductItem product={product} />
                            <br></br>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="page">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            </div>
      </>
    );
  }
}
