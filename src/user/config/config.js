import axios from "axios";
import {ApiConstant} from "../constants/ApiConstant";

localStorage.getItem("user", {token: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjA4NjkwMT
E3LCJleHAiOjE2MTA1MDQ1MTd9.QvCAaXPFsLxJ0mfbXxWX9Zh680V0iTiEBbZPMB-_HNqYVV0aL07jp-zH5WVpUhsiWo78lg48Fiu5NL1O5C7V9g`})
export default function config() {
  axios.defaults.baseURL = ApiConstant.BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    axios.defaults.headers.common["Authorization"] = `${user.token}`;
  }
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
}
