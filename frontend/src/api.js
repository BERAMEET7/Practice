import axios from "axios";

const API_URL = import.meta.env.BACKEND_URL || "http://localhost:3000";

export const loginUser = async(userData)=>{
    const response = await axios.post(`${API_URL}/user/login` , userData);
    return response.data;
}

export const signupUser = async(userData)=>{
    const response = await axios.post(`${API_URL}/user/signup` , userData);
    return response.data;
}

