import React, { Component } from "react";
import "./form.css";
import isEmpty from "validator/lib/isEmpty";
import { Redirect } from "react-router-dom";
import config from "./user/config/config";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password: "",
      validationMsg: {}
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
    const msg = {};
    const { mail, password } = this.state;
    if (isEmpty(mail)) {
      msg.mail = "Vui lòng nhập email";
    }
    if (isEmpty(password)) {
      msg.password = "Vui lòng nhập mật khẩu";
    }
    this.setState({
      validationMsg: msg
    });
    if (Object.keys(msg).length > 0) return;
    // config()
    // requestLogin({
        // tenDangNhap: ,
        // matKhau: "Hoangpv6681"
        // }).then((data) => {
        // console.log(data.data)
        // localStorage.setItem("token", data.data.accessToken)
    // }).catch()
    // alert("successfully");
    // localStorage.setItem("role","user")
    // localStorage.setItem("token","successfully")
    // this.setState({
    //   loggedIn: true
    // });
  }

  render() {
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")
    if(role==="admin")
    {
      return <Redirect to= "/admin" />
    }
    if(token&&role==="user")
    return <Redirect to = "/home"/>
    return (
      <React.Fragment>
        <div className="Login">
          <br />
          <form onSubmit={this.submitForm} className="form-group">
            <input
              type="text"
              placeholder="Địa chỉ email"
              name="mail"
              value={this.state.mail}
              onChange={this.onChange}
              autoComplete="false"
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
              type="button"
              className="submit"
              value="Đăng nhập"
              onClick={this.submitForm}
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}
