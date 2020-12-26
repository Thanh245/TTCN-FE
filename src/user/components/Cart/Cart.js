import React, { Component } from "react";
import FormOrder from "./FormOrder";
import GoodsItem from "./GoodsItem";
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: 20,
      items: [
        {
          src: "https://appay.vn/wp-content/uploads/2020/01/viec-lam-cho-ba-bau5-min.jpg",
          alt: "123",
          title:"mon1",
          descriptionItem: "day la mon 1",
          quantityvalid: 30,
          quantity: 2,
          unitprice: 3
        },
        {
          src: "https://vietnamleather.com/wp-content/uploads/2020/05/do-handmade-8.jpg",
          alt: "item1",
          title:"mon2",
          descriptionItem: "day la mon 2 ",
          quantityvalid: 30,
          quantity: 3,
          unitprice: 3
        }
      ]
    };
  }
  price() {
    return this.state.items.reduce(function (total, item) {
      return total + item.quantity * item.unitprice;
    }, 0);
  }

  total = () => {
    return this.price() + this.state.shipping;
  };

  deleteGoodsItem = (index, e) => {
    const items = Object.assign([], this.state.items);
    items.splice(index, 1);
    this.setState({
      items: items
    });
  };

  changeQuantity = (index, e) => {
    const item = Object.assign([], this.state.items);
    item[index].quantity = e.target.valueAsNumber;
    this.setState({
      items: item
    });
  };
  shouldComponentUpdate() {
    return true;
  }
  render() {
    return (
        <div className="">
            <div className="row">
                <div className = "col-8">
                    {this.state.items.map((item, index) => (
                      <GoodsItem
                        key={index}
                        item={item}
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
