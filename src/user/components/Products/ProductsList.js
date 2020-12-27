import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactPaginate from "react-paginate";
import "./Product.css";
import {  fetchItemsList, fetchItemsListFilter,fetchItemsTypeList,fetchItemsListByType } from "../../services/ItemService";
import PriceButton from "./PriceButton";
import history from "../../../history";
import { Row, Col, Button } from "reactstrap";

import {Link } from "react-router-dom";

export default class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [],
        cart: [],
        search: "",
        to: 0,
        from: 0,
        loaiMatHangList: [],
      };
  }

  getList = async() => {
      const res = await fetchItemsList();
      if (res.status === 200) {
          this.setState({
            ...this.state,
            products: res.data.data
          })
      }
  }

  getFilter = async(from, to) => {
    const path = `/productslist/filter/price/${from}/${to}`
    history.push(path)
    const filter = `?giaBatDau=${from}&giaKetThuc=${to}`
    const res = await fetchItemsListFilter(filter);
    if (res.status === 200) {
        this.setState({
          ...this.state,
          products: res.data.data,
          loading: false
        })
    }
  }
 
  getItemsListFilter = async(filter) =>{
      const res = await fetchItemsListFilter(filter);
      if (res.status === 200) {
        this.setState({
          ...this.state,
          products: res.data.data,
          loading: false
        })
    }
  }

  getItemsTypeList = async() =>{
      const res = await fetchItemsTypeList();
      if (res.status === 200) {
        this.setState({
            ...this.state,
          loaiMatHangList: res.data.data,
        })
    }
  }

  getItemsListByType = async() => {
    const selectedIndex = document.getElementById('select').selectedIndex - 1
    const id = this.state.loaiMatHangList[selectedIndex].maLoaiMatHang
    history.push(`/productslist/filter/type/${id}`)
    const res = await fetchItemsListByType(id);
    if (res.status === 200) {
      this.setState({
          ...this.state,
        products: res.data.data
      })
    }
  }

  componentDidMount() {
    const params = this.props.params
    const path = this.props.path
    this.getItemsTypeList()
    if (params !== undefined && path !== undefined && path.includes("filter/price")){
        this.getFilter(params.from, params.to)
    }
    else if (params !== undefined && path !== undefined && path.includes("filter/price")){
        this.getItemsListByType(params.id)
    }
    else {
        this.getList()
        
    }
  }

  addToCart(product) {
    const cartItem = {
      matHang: {},
      soLuong: 1
    };
    let trung = false;
    const cart = JSON.parse(sessionStorage.getItem("cart"))
    if(cart !==null) {
         var newCart = cart
    }
    else { newCart = Object.assign([], this.state.cart);}
    for (let item of newCart) {
      if (product.maMatHang === item.matHang.maMatHang) {
        item.soLuong++;
        trung = true;
        console.log(newCart)
        sessionStorage.removeItem("cart")
        sessionStorage.setItem("cart", JSON.stringify(newCart))
        this.setState({
            ...this.state,
             cart: newCart
        });
      }
    }
    if (trung === false) {
        if(newCart.length===9) {
            alert("Giỏ hàng đã đầy")
            return
    }
      cartItem.matHang = product;
      newCart.push(cartItem);
      sessionStorage.removeItem("cart")
      sessionStorage.setItem("cart", JSON.stringify(newCart))
      this.setState({ ...this.state,
        cart: newCart });
    }
  }
 
  renderProduct = (product) => {
    const src=`data:image/*;base64, ${product.danhSachHinhAnh[0] !== undefined ? product.danhSachHinhAnh[0].anh: ""}`
    return (
        <div className= "col-4">
            <div className="card">
                <img src={src} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.tenMatHang}</h5>
                  <p className="card-text">Price {product.gia}</p>
                  <Row>
                    <Col sm="6" xs="12">
                      <Button onClick={() => this.addToCart(product)}>Add to cart</Button>
                    </Col>
                    <Col sm="4" xs="12">
                        
                      <Link 
                        to={"/productslist/" + product.maMatHang}
                        className="btn btn-primary"
                      >
                        Details
                      </Link>

                    </Col>
                  </Row>
                </div>
            </div>
            <br></br>
        </div>
    );
  };

  render() {
    return (
        <>
            <div className="container">
                <div className = "row">
                    <p className="FilterContent">Chọn mức giá: </p>
                    <div className = "col-6">
                        <PriceButton to={1000000} handleClick = {this.getFilter.bind(this)}/>
                        <PriceButton from={1000000} to={3000000} handleClick = {this.getFilter.bind(this)}/>
                        <PriceButton from={3000000} handleClick = {this.getFilter.bind(this)}/>
                    </div>
                    <div className= "col-2 droplist">
                        <select id="select" onChange={this.getItemsListByType.bind(this)}>
                            <option disabled selected>Loại mặt hàng</option>
                            {this.state.loaiMatHangList.map((item)=>(<option> {item.tenLoaiMatHang} </option>)) }
                        </select>
                    </div>
                </div>
                <br></br>
                <div>
                  <div className="row">
                    {this.state.products.map((product) => {return this.renderProduct(product);})}                  
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
