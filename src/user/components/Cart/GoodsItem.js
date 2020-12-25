import React, { Component } from "react";
import "./GoodItem.css";
export default class GoodsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      alt: "123",
      title: "",
      descriptionItem: "",
      quantityvalid: 1,
      quantity: 1,
      unitprice: 1
    };
  }
  componentWillMount() {
    this.setState({
      src: this.props.item.src,
      alt: this.props.item.alt,
      title: this.props.item.title,
      descriptionItem: this.props.item.descriptionItem,
      quantityvalid: this.props.item.quantityvalid,
      quantity: this.props.item.quantity,
      unitprice: this.props.item.unitprice
    });
  }
  render() {
    const price = this.props.item.quantity * this.state.unitprice;
    return (
      <div className="goodsItem">
        <img
          //src={process.env.PUBLIC_URL + this.state.src}
          src={this.state.src}
          alt={this.state.alt}
          className="imageItem"
        />
        <div className="content">
          <div className="title">{this.state.title}</div>
          <div className="description">{this.state.descriptionItem}</div>
          <button onClick={this.props.deleteItem} className="removeitem">
            Xóa
          </button>
        </div>
        <div className="calculation">
          <input
            type="number"
            min="1"
            max={this.state.quantityvalid}
            className="quantity"
            defaultValue={this.state.quantity}
            onChange={this.props.changeQuantity}
          ></input>
          <div idName="price">
            <h2 className="mulprice">{price} VND</h2>
            <p className="unitprice">({this.state.unitprice} VND each)</p>
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }
}