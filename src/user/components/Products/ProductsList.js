import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ProductItem from "./ProductItem";
//import ProductsApi from "./api/products";
import ReactPaginate from "react-paginate";
import "./Product.css";
// import "../../services/ItemService";
import { fetchItemsList } from "../../services/ItemService";

export default class Products extends React.Component {
  state = {
    products: [],
    cart: []
  };

  getList = async() => {
      const res = await fetchItemsList();
      if (res.status === 201) {
          this.setState({
            // ...this.state,
            products: res.data.data
          })
      }
  }
     
  componentDidMount() {
    // ProductsApi.getAll().then((data) => {
    //   this.setState({
        // products: data
    //   });
    // });
    this.getList()
   
  }

  render() {
    // console.log(this.state.cart);
    // const { products } = this.state;
    console.log(this.state.products.length)
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
