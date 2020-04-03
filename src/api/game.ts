import axios from "../utils/axios";

export function getGame() {
    return axios.get("api/game")
}

export default {
    getGame
}