import React, { Component } from "react";
import Item from "./Item";
import "./Purchase.css";
import {fetchListStatusOrder} from "../../../user/services/UserService"
import {chechURLService} from "../../../user/services/CheckURLService"
const id = 5;
export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      purchase:this.props.purchase,
      trangThai:null
    });
  }
  componentDidMount(){
  fetchListStatusOrder().then((res) => {
        this.setState({
            ...this.state,
            trangThai:res.data})
      }).catch((err)=> {
        console.log(err)
    alert("tai that bai")})
 }
  render() {
    // if(this.state.cart.length === 0) return (<div><h1>Giỏ hàng trống</h1></div>)
    
    // const {Purchase,trangThai} = this.state;
    // // console.log(this.state.trangThai);
    // if(Purchase===null) return (<div><h1>Bạn chưa mua đơn hàng nào cả</h1></div>)
    const {trangThai} = this.state;
    const purchase = this.props.purchase;
    //console.log(purchase.data)
    //console.log(trangThai)
    const danhSachDonHang =  purchase.data===undefined?null:purchase.data;
    // const danhSachDonHang = purchase.data;
    //  console.log(danhSachDonHang)
    return (
        <div className="purchase container">
            <div className="contain-donhang container">
             {
             danhSachDonHang===null?"":
             danhSachDonHang.map((donHang,index)=>(
                    <Item 
                    key={index}
                    maDonHang={donHang.maDonHang}
                    trangThai={trangThai}
                    maTrangThai={donHang.maTrangThaiDonHang}
                 /> ))
             }
            </div>
        </div>
    );
  }
}
