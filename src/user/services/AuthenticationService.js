import axios from "axios";
async function requestLogin(user) {
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