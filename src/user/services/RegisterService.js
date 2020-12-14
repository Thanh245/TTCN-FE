import axios from "axios";
async function requestRegister(user) {
    const body = {
        tenDangKy: user.tenDangKy,
        matKhau: user.matKhau,
        tenNguoiDung: user.tenNguoiDung
    };
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "POST",
      url: "/register",
      data: body,
    });
}