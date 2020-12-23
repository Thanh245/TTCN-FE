import React, { Component } from 'react';
import "./form.css";

class FormOrder extends Component {
    render() {
        return (
        <div className="formOrder">
                <h5>Tổng giá trị đơn hàng</h5>
                <p className="howpay">Cửa hàng nhận thanh toán COD</p>
                <div>
                    <div>
                        <div className="tdLeft" >Phí Sản Phẩm</div>
                        <div className="tdRight" >{this.props.price} VND</div> 
                    </div>
                    <div>
                        <div className="tdLeft" >Phí ship</div>
                        <div className="tdRight" >{this.props.shipping} VND</div> 
                    </div>
                </div> 
                <div className="totalline">
                <hr/>
                </div>
                <div>
                    <div>
                        <div className="tdLeft" >Total:</div>
                        <div className="tdRight" >{this.props.total} VND</div>
                    </div>
                </div> 
            
                <div className="pay">
                    {/* <input type = "button" className="pay" value="ORDER"/> */}
                    <a  href={"/order"}  className="btn btn-primary"> Order </a>
                </div>
            </div>
        );
    }
}
export default FormOrder;