import axios from "../utils/axios";

export function getUser() {
    return axios.get("api/user")
}

export default {
    getUser
}