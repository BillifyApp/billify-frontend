import axios from "axios/index";
import {url} from "../constants";

export default async function isExisting(username: string) {
    const result = await axios.post(`${url}/users/exists`, {username});

    console.log(result.data)
    return result.data.found;
}