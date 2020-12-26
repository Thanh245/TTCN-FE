import React, { Component } from "react";
import FormOrder from "./FormOrder";
import GoodsItem from "./GoodsItem";
import "./Cart.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      shipping: 10000,
      cart:[]
    });
  }
  price() {
    return this.state.cart.reduce(function (total, item) {
      return total + item.soLuong * item.matHang.gia;
    }, 0);
  }

  total = () => {
    return this.price() + this.state.shipping;
  };

  deleteGoodsItem = (index, e) => {
    const items = Object.assign([], this.state.cart);
    items.splice(index, 1);
    this.setState({
        ...this.state,
      cart: items
    });
  };

  changeQuantity = (index, e) => {
    const item = Object.assign([], this.state.cart);
    item[index].soLuong = e.target.valueAsNumber;
    this.setState({
      cart: item
    });
  };
  componentDidMount(){
    const cart =JSON.parse(sessionStorage.getItem("cart"))
    if(cart!==null)
    console.log(cart)
    this.setState({
        ...this.state,
        cart:cart
    })
  }
  render() {
    if(this.state.cart.length === 0) return (<div><h1>Giỏ hàng trống</h1></div>)
    return (
        <div className="cart">
            <div className="row">
                <div className = "col-8">
                    {this.state.cart.map((item, index) => (
                      <GoodsItem
                        key={index}
                        matHang={item.matHang}
                        soLuong ={item.soLuong}
                        deleteItem={this.deleteGoodsItem.bind(index, this)}
                        //setquantity={item => this.setState(item)}
                        changeQuantity={this.changeQuantity.bind(this, index)}
                        className="GoodItem"
                      />
                    ))}
                </div> 
                <div className="col-4">
                    <FormOrder
                     className="FormOrder"
                     shipping={this.state.shipping}
                     price={this.price()}
                     total={this.total()}
                    />
                </div>
            </div>
        </div>
    );
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
