import axios from "axios";
import config from "../config/config"
async function fetchItem(id) {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang/${id}`
    })
}

async function fetchItemsList() {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang`
    })
}

async function fetchItemsListByType(id) {
    config()
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang/loai-mat-hang/${id}`
    })
}

async function fetchItemsListFilter(filter) {
    return await axios({
      headers: { "Access-Control-Allow-Origin": "*" },
      method: "GET",
      url: `/mat-hang-management/mat-hang?${filter}`
    })
}

export {fetchItem, fetchItemsList, fetchItemsListByType,fetchItemsListFilter};