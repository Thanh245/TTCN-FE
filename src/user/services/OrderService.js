import axios from "axios";
async function requestOrderInfo(orderInfo) {
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
      url: "/authorized/don_hang/create",
      data: body,
    });
}
