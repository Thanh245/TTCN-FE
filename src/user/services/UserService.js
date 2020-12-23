import axios from "axios";
import config from "../config/config"

async function fetchUserProfileData(maNguoiDung) {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/nguoi-dung-management/authorized/nguoi-dung/${maNguoiDung}`
    })
}

async function updateUserProfileData(userInfo) {
    config()
    const body = {
        hoTen: userInfo.hoTen,
        ngaySinh: userInfo.ngaySinh,
        sdt: userInfo.sdt,
        thanhPho: userInfo.thanhPho,
        maGioiTinh:userInfo.maGioiTinh
    }
    return await axios({
        headers: { "Access-Control-Allow-Origin": "*" },
        method: "PUT",
        url: `nguoi-dung-management/authorized/nguoi-dung/${maNguoiDung}`,
        data: body,
    })
}
