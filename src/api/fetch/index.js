import axios from "../index.js";

export function fetchLogin(userName, password) {
  axios.post("/adminUser/login", {
      userName: "admin",
      passwordMd5: md5(password)
    })
    .then((res) => {
      console.log(res)
      localSet("token", res)
      // window.location.href = '/'
    })
}
