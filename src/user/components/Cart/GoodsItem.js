import React, { Component } from "react";
import "./GoodItem.css";
import {fetchItemsList} from "../../services/ItemService"

class Item extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }
    render() {
        return (
            <div>
            </div>
        )
    };
}

export default class GoodsItem extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  }

  render() {
    const list = []
    const itemsList = []
    for (const i of this.state.list) 
        itemsList.push(
            <div>
                <Item data={i}></Item>Anh
                <hr></hr>
            </div>
        )
    return (
      <div className="goodsItem">
        {itemsList}
      </div>
    );
  }
}
