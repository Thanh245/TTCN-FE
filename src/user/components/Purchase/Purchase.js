import React, { Component } from "react";
import Item from "./Item";
import "./Purchase.css";
import {fetchUserOrder} from "../../../user/services/UserService"
const id = 5;
export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      Purchase:null
    });
  }
  componentDidMount(){
 const user = JSON.parse(localStorage.getItem("user"))
  fetchUserOrder(user.id).then((res) => {
    this.setState({Purchase:res.data})
  }).catch((err)=> {
    console.log(err)
    alert("tai that bai")})
  }
  render() {
    // if(this.state.cart.length === 0) return (<div><h1>Giỏ hàng trống</h1></div>)
    const {Purchase} = this.state;
    if(Purchase===null) return (<div><h1>Bạn chưa mua đơn hàng nào cả</h1></div>)
    const danhSachDonHang =  Purchase.data
    return (
        <div className="purchase">
            <div className="Tong-don"><h2>Bạn đã mua tổng cộng {Purchase.totalItems} đơn hàng</h2></div>
             { 
             danhSachDonHang.map((item,index)=>(
                    <Item 
                    key={item.maDonHang}
                    donHang = {item}
                 />
             ))
            }   
                     
                        {/* // key={index}
                        // matHang={item.matHang}
                        // soLuong ={item.soLuong}
                        // deleteItem={this.deleteGoodsItem.bind(this, index)}
                        // //setquantity={item => this.setState(item)}
                        // changeQuantity={this.changeQuantity.bind(this, index)}
                        // className="GoodItem"
                      */}
        </div> 
    );
  }
}
