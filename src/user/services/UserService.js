import axios from "axios";

async function fetchUserProfileData(maNguoiDung) {
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/authorized/nguoiDung/${maNguoiDung}`
    })
}

async function updateUserProfileData(userInfo) {
    const body = {
        hoTen: userInfo.hoTen,
        ngaySinh: userInfo.ngaySinh,
        sdt: userInfo.sdt,
        thanhPho: userInfo.thanhPho,
        maGioiTinh:userInfo.maGioiTinh
    }
    return await axios({
        headers: { "Access-Control-Allow-Origin": "*" },
        method: "GET",
        url: `/authorized/nguoiDung/${maNguoiDung}`,
        data: body,
    })
}

