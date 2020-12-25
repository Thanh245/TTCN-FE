import React, { Component } from "react";
import "./form.css";
import isEmpty from "validator/lib/isEmpty";
import config from "../../config/config";
import RequestRegister from "../../../user/services/RegisterService"
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      mail: "",
      password: "",
      confirmpassword: "",
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
    const { fullname, mail, password, confirmpassword } = this.state;
    const msg = {};
    if (isEmpty(fullname)) {
      msg.fullname = "Vui lòng nhập họ tên";
    }
    if (isEmpty(mail)) {
      msg.mail = "Vui lòng nhập tên đăng nhập";
    }
    if (isEmpty(password)) {
      msg.password = "Vui lòng nhập mật khẩu";
    }
    if (isEmpty(confirmpassword)) {
      msg.confirmpassword = "Vui lòng xác nhận mật khẩu";
    }
    if (password !== confirmpassword) {
      msg.confirmpassword = "Mật khẩu không trùng khớp";
    }
    this.setState({
      validationMsg: msg
    });
    if (Object.keys(msg).length > 0) return;
    const user = {
        tenDangKy:this.state.mail,
        matKhau:this.state.password,
        tenNguoiDung:this.state.fullname
    };
    config()
    RequestRegister(user).then((data) => {
        if(data.status===201) alert("Đăng ký thành công");
    //localStorage.setItem("token", data.data.accessToken)
    }).catch((err) => {
         alert("Đăng ký thất bại");
    });
    // alert("successfully");
    // this.setState({
    //   successed: true
    // });
  }
  render() {
    
    return (
      <React.Fragment>
        <div className="Register">
          <br />
          <div className="form-group">
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
              placeholder="Tên đăng nhập"
              name="mail"
              value={this.state.mail}
              onChange={this.onChange}
            />
            <p className="warning">{this.state.validationMsg.mail}</p>
            <br />
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <p className="warning">{this.state.validationMsg.password}</p>
            <br />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              name="confirmpassword"
              value={this.state.confirmpassword}
              onChange={this.onChange}
            />
            <p className="warning">
              {this.state.validationMsg.confirmpassword}
            </p>
            <br />
            <input
              type="button"
              className="submit"
              value="Đăng ký"
              onClick={this.submitForm}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
