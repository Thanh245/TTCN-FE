import axios from "axios";
import config from "../config/config"

async function requestOrderInfo(orderInfo) {
    config()
    const body = {
      tenNguoiNhanHang: orderInfo.fullname,
      SDTGiaoHang:orderInfo.phonenumber,
      diaChiGiaoHang: orderInfo.address,
      ghiChu: orderInfo.note,
      donHang: orderInfo.order
    };
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "POST",
      url: "/don-hang-management/authorized/don-hang",
      data: body,
    });
}

async function getOrderInfoList() {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/don-hang-management/authorized/don-hang/tai-khoan/${localStorage.getItem("maTaiKhoan")}`,
    });
}