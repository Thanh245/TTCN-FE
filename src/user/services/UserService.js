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
    userInfo.anhDaiDien = []
    userInfo.gioiTinh = {maGioiTinh: userInfo.gioiTinh}
    return await axios({
        headers: { "Access-Control-Allow-Origin": "*" },
        method: "PUT",
        url: `nguoi-dung-management/authorized/nguoi-dung/${JSON.parse(localStorage.getItem("user")).id}`,
        data: userInfo,
    })
}

async function updateUserAvatar(data) {
    config()
    const dataForm = new FormData(data)
    return await axios({
        headers: { "Access-Control-Allow-Origin": "*" },
        method: "PUT",
        url: `nguoi-dung-management/authorized/nguoi-dung/avatar/${JSON.parse(localStorage.getItem("user")).id}`,
        data: dataForm,
    })
}
 export {fetchUserProfileData,updateUserProfileData,updateUserAvatar}