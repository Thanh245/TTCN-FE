import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
//import {userLocation, useParams} from "react-router-dom";
//import ProductItem from "./ProductItem";
//import ProductsApi from "./api/products";
import ReactPaginate from "react-paginate";
import "./Product.css";
import { fetchItemsList, fetchItemsListFilter } from "../../services/ItemService";
import Filter from "./Filter";
import PriceButton from "./PriceButton";
import DropList from "./DropList";


import {
    Row,
    Col,
    Button
  } from "reactstrap";
import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router";

export default function ProductsList () {
//   constructor(props) {
    // super(props);
    // this.state = {
        // products: [],
        // cart: [],
        // search: "",
        // to: 0,
        // from: 0
    //   };
    //   console.log(this.props.match)
      
    // this.handleChange = this.handleChange.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  handleClick = (from, to) =>{
    // alert(from + to)
    const history = this.props.history
    const path = `/productslist/filter/price/${from}/${to}`
    alert(path)
    history.push(path)
      this.setState({
        ...this.state,
        to: to,
        from: from
      })
  }

  getList = async() => {
      const res = await fetchItemsList();
      if (res.status === 201) {
          this.setState({
            // ...this.state,
            products: res.data.data

          })
      }
  }

  getFilter = async(filter) => {
    //   console.log(filter)
      const res = await fetchItemsListFilter(filter);
    //   console.log(res)
      if (res.status === 201) {
        this.setState({
          // ...this.state,
          products: res.data.data,
          loading: false
        })
    }
  }

//   componentDidMount() {
    // const params = this.props.params
    // const path = this.props.path
    // ProductsApi.getAll().then((data) => {
    //   this.setState({
        // products: data
    //   });
   // });
    // 
    // 
    // if (params !== undefined && path !== undefined && path.includes("filter/price")){
        // const filter = `?giaBatDau=${params.from}&giaKetThuc=${params.to}`
        // this.getFilter(filter)
    // }
    // else this.getList()
//    
//   }

//   handleSubmit(event) {
    // this.setState({})
//   }

//   handleChange = event => {
    // this.setState({ value: event.target.value });
//   };


onchange = (e) => {
    this.setState({ search: e.target.value });
  };
  
//   addToCart(product) {
    // const cartItem = {
    //   matHang: {},
    //   soLuong: 1
    // };
    // let trung = false;
    // const newCart = Object.assign([], this.state.cart);
    // for (let item of newCart) {
    //   if (product.maMatHang === item.matHang.maMatHang) {
       // console.log(item.matHang.maMatHang);
        // item.soLuong++;
        // trung = true;
        // this.setState({ cart: newCart });
    //   }
    // }
    // if (trung === false) {
    //   cartItem.matHang = product;
    //   newCart.push(cartItem);
    //   this.setState({ cart: newCart });
    // }
//   }

  
  renderProduct = (product) => {
    //const { search } = this.state;

    return (
        <div className= "col-4">
            <div className="card">
                {/* <img src={product.URL[0]} className="card-img-top" alt="..." /> */}
                <div className="card-body">
                  <h5 className="card-title">{product.tenMatHang}</h5>
                  <p className="card-text">Price {product.gia}</p>
                  <Row>
                    <Col sm="5" xs="12">
                      <Button onClick={() => this.addToCart(product)}>Add to cart</Button>
                    </Col>
                    <Col sm="4" xs="12">
                      <a
                        href={"/productslist/" + product.maMatHang}
                        className="btn btn-primary"
                      >
                        Details
                      </a>
                    </Col>
                  </Row>
                </div>
            </div>
        </div>
    );
  };

    // console.log(this.state.cart);
    // const { products } = this.state;
    // console.log(this.state.products.length)
    const { search } = this.state;
    const filteredProduct = this.state.products.filter((product) => {
        return (
            product.tenMatHang.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      });
    return (
        <>
            <div className="container">
                <div className = "row">
                    <div className = "col-6">
                        <input
                            className = "search-item"
                          placeholder = "Tìm kiếm sản phẩm"
                        //   icon="search"
                          onChange={this.onchange}
                        />
                    </div>
                    <div className = "col-6">
                    {/* <div className="col-9"> */}
  <PriceButton to={1000000} handleClick = {this.handleClick}/>
  <PriceButton from={1000000} to={3000000}/>
  <PriceButton from={3000000}/>
{/* /</div> */}
                        {/* <Filter /> */}
                    </div>
                </div>
                <br></br>
                <div>
                  <div className="row">
                    {filteredProduct.map((product) => {
                        return this.renderProduct(product);
                    })}
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
  