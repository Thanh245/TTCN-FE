import React, { Component } from "react";
import isEmpty from "validator/lib/isEmpty";
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      confirm_email: "",
      fullname: "",
      phonenumber: "",
      address: "",
      note: "",
      validationMsg: {},
      successed: false
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitForm(e) {
    e.preventDefault();
    const { email, confirm_email, fullname, phonenumber, address } = this.state;
    const msg = {};
    if (isEmpty(email)) {
      msg.email = "Vui lòng nhập email";
    }
    if (isEmpty(confirm_email)) {
      msg.confirm_email = "Vui lòng xác nhận email";
    }
    if (email !== confirm_email) {
      msg.confirm_email = "Email không trùng khớp";
    }
    if (isEmpty(fullname)) {
      msg.fullname = "Vui lòng nhập họ tên";
    }
    if (isEmpty(phonenumber)) {
      msg.phonenumber = "Vui lòng nhập số điện thoại";
    }
    if (isEmpty(address)) {
      msg.address = "Vui lòng nhập địa chỉ";
    }
    this.setState({
      validationMsg: msg
    });
    if (Object.keys(msg).length > 0) return;
    alert("successfully");
    this.setState({
      successed: true
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="Order">
          <h1>Đặt hàng</h1>
          <br />
          <form onSubmit={this.submitForm} className="form-group">
            
            <p className="warning">{this.state.validationMsg.confirm_email}</p>
            <br />
            <input
              type="text"
              placeholder="Họ tên"
              name="fullname"
              value={this.state.fullname}
              onChange={this.onChange}
            />
            <p className="warning">{this.state.validationMsg.fullname}</p>
            <br />
            <input
              type="text"
              placeholder="Số điện thoại"
              name="phonenumber"
              value={this.state.phonenumber}
              onChange={this.onChange}
            />
            <p className="warning">{this.state.validationMsg.phonenumber}</p>
            <br />
            <input
              type="text"
              placeholder="Địa chỉ"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
            />
            <p className="warning">{this.state.validationMsg.address}</p>
            <br />
            <textarea
              type="text"
              placeholder="Ghi chú"
              name="note"
              value={this.state.note}
              onChange={this.onChange}
            />
            <br />
            <input
              type="button"
              className="submit"
              value="Đặt hàng"
              onClick={this.submitForm}
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}
