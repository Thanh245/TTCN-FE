import React, { Component } from "react";
import "./form.css";
import isEmpty from "validator/lib/isEmpty";
import { Redirect } from "react-router-dom";
import config from "../../../user/config/config";
import requestLogin from "../../services/AuthenticationService"
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password: "",
      validationMsg: {},
      user:{}
    };
    console.log("constructor login");
    if(JSON.parse(localStorage.getItem("user")===null))
    {
        const user = {
            token:"",
            id:0,
            tenDangNhap:"",
            role: "ROLE_GUEST",
            tokenType:""
        }
        localStorage.setItem("user",JSON.stringify(user))
    }
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
      msg.mail = "Vui lòng nhập tên đăng nhập";
    }
    if (isEmpty(password)) {
      msg.password = "Vui lòng nhập mật khẩu";
    }
    this.setState({
      validationMsg: msg
    });
    if (Object.keys(msg).length > 0) return;
    const user = {
        tenDangNhap: this.state.mail,
        matKhau: this.state.password,
    }
    config()
    requestLogin(user).then((res) => {
        console.log(res.data)
        const userInfor = {
            token: res.data.accessToken,
            id: res.data.id,
            tenDangNhap: res.data.tenDangNhap,
            role: res.data.role,
            tokenType: res.data.tokenType
        }
        localStorage.removeItem("user");
        localStorage.setItem('user', JSON.stringify(userInfor));
        this.setState({user:userInfor})
    }).catch( ()=> {alert("Đăng nhập thất bại")})
}
  render() {
    const userInfor = JSON.parse(localStorage.getItem('user'));
    const role = userInfor.role
    if(role==="ROLE_ADMIN")
    {
      return <Redirect to= "/admin" />
    }
    if(role==="ROLE_USER")
    return <Redirect to = "/"/>
    return (
      <React.Fragment>
        <div className="Login">
          <br />
          <div className="form-group">
            <input
              type="text"
              placeholder="Tên đăng nhập"
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}
