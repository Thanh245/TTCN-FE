import React, { Component } from "react";
import "./Item.css";
export default class Item extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.donHang)
  }
  componentDidMount() {}
  render() {
    //const src=`data:image/*;base64, ${this.props.matHang.danhSachHinhAnh[0] !== undefined ? this.props.matHang.danhSachHinhAnh[0].anh: ""}`
    const danhSachMatHang = this.props.donHang.danhSachMatHang[0]
    // console.log(danhSachMatHang)
    return (
      <div>
        <div className="donHang">
          saf;safj

          {/* <img
          //src={process.env.PUBLIC_URL + this.state.src}
          //src={src}
          alt={this.state.alt}
          className="imageItem"
        /> */}
          {/* <div className="content">
          <div className="title">{this.state.title}</div>
          <div className="description">{this.state.descriptionItem}</div>
          <p className="unitprice">Đơn giá: {this.state.unitprice} VND</p>
          
        </div>
        <div className="calculation">
        <div idName="price"><h2 className="mulprice"> {this.props.soLuong*this.state.unitprice}đ</h2> </div> */}
        </div>
      </div>
    );
  }
}
