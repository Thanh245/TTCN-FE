import axios from "axios";
import config from "../config/config"

async function requestLogin(user) {
    config()
    const body = {
      tenDangNhap: user.tenDangNhap,
      matKhau: user.matKhau,
    };
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "POST",
      url: "/login",
      data: body,
    });
}
export default requestLogin;