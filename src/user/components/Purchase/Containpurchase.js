import Header from "../../../user/components/Header/Header"
import React, { Component } from 'react'
import Purchase from "./Purchase"
import {fetchUserOrder} from "../../../user/services/UserService"
import "./Containpurchase.css"
export default class Containpurchase extends Component {
    constructor(props){
        super(props);
        this.state=({
            purchase:{}
        })
    }
componentDidMount(){
    fetchUserOrder().then((res) => {
        this.setState({
            ...this.state,
            purchase:res.data})
      }).catch((err)=> {
        console.log(err)
        // alert("tai that bai")
    })
    }
    render() {
    const {purchase} = this.state;
    if(purchase===null) return (<div><h4>Bạn chưa mua đơn hàng nào cả</h4></div>)
        return (
            <div className="ajhfkasfklasf">
                <div className="Tong-don">Đơn hàng của bạn</div>
                <div className ="contain_donHang">
                {purchase===null?"":
                <Purchase className ="contain_donHang"
                purchase={this.state.purchase}
                />  
            }  
        </div>
        </div>
        )
    }
}
