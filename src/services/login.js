import axios from "axios";

const baseUrl = "https://pfvideojuegos-back-production.up.railway.app/user/login"

const login = async credentials =>{
    const {data} = await axios.post(baseUrl,credentials)
    return data
}





export default { login }