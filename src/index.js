import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from "./user/config/config"
import requestLogin from "./user/services/AuthenticationService";

config()
requestLogin({
    tenDangNhap: "Hoangpv6681",
    matKhau: "Hoangpv6681"
}).then((data) => {
    console.log(data.data)
    localStorage.setItem("username", data.data.tenDangNhap)
    localStorage.setItem("token", data.data.accessToken)
    localStorage.setItem("role", data.data.role)
}).catch()
//const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);