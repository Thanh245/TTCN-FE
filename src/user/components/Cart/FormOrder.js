import React, { Component } from 'react';
import "./FormOrder.css";
class FormOrder extends Component {
    render() {
        return (
        <div className="FormOrder">
            <h5>Tổng giá trị đơn hàng</h5>
            <p className="howpay">Cửa hàng nhận thanh toán COD</p>
            <div className="tdLeft" >Phí sản phẩm</div>
            <div className="tdRight" >{this.props.price} VND</div> 
            <div className="tdLeft" >Phí ship</div>
            <div className="tdRight" >{this.props.shipping} VND</div> 
            <hr className="totalLine"/>
            <div className="tdLeft" style={{fontWeight:"bold"}}>Tổng:</div>
            <div className="tdRight" >{this.props.total} VND</div>
            <button className="pay" >Đặt hàng</button>
        </div>
        );
    }
}
export default FormOrder;