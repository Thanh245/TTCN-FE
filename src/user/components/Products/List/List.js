import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./List.css";
import { Row, Col, Button } from "reactstrap";
import {Link } from "react-router-dom";

export default class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // products: [],
        cart: [],
        search: "",
        // to: 0,
        // from: 0,
        // loaiMatHangList: [],
      };
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
                <br></br>
                <div>
                  <div className="row">
                    {this.props.list.map((product) => {return this.renderProduct(product);})}                  
                  </div>
                </div>
                
            </div>
      </>
    );
  }
}
