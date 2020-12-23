import React, { Component } from 'react';
import "./form.css";

class FormOrder extends Component {
    render() {
        return (
        <div>
            <table className=".table">
                <caption><h3>Tổng giá trị đơn hàng</h3></caption>
                <tr>
                    <td colSpan="2">Cửa hàng nhận thanh toán COD</td>
                </tr>
                <tr>
                    <td>Phí Sản Phẩm</td>
                    <td>{this.props.price} VND</td> 
                </tr>
                <tr>
                    <td >Phí ship</td>
                    <td>{this.props.shipping} VND</td> 
                </tr>
                <tr>
                    {/* <td colSpan="2"><hr></hr></td> */}
                </tr>
                <tr>
                    <td>Total:</td>
                    <td>100 VND</td>
                </tr>
            </table>
            <div>
                <a  href={"/order"}  className="btn btn-primary"> Order </a>
            </div>
        </div>
    );
    }
}
export default FormOrder;