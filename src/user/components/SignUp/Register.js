import React, { Component } from "react";
import "./form.css";
import isEmpty from "validator/lib/isEmpty";
import config from "../../config/config";
import requestRegister from "../../../user/services/RegisterService"
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
    if (isEmpty(fullname) || isEmpty(mail) || isEmpty(password) || isEmpty(confirmpassword)) {
        msg.warning = "Vui lòng nhập đủ thông tin đăng ký";
    }
    if (password !== confirmpassword) {
        msg.warning = "Mật khẩu không trùng khớp";
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
    requestRegister(user).then((data) => {
        if(data.status===201) alert("Đăng ký thành công");
    //localStorage.setItem("token", data.data.accessToken)
    }).catch((err) => {
         alert("Đăng ký thất bại")
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
            <input
              type="text"
              placeholder="Tên đăng nhập"
              name="mail"
              value={this.state.mail}
              onChange={this.onChange}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              name="confirmpassword"
              value={this.state.confirmpassword}
              onChange={this.onChange}
            />
            <div className="warningctn">
                <p className="warning">{this.state.validationMsg.warning}</p>
            </div>
            <div className="cont_btnlogin">
            <button
              className="button_login"
              onClick={this.submitForm}
            > Đăng ký
            </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
