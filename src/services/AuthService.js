import axios from "axios";
import { ENV } from './../constants/environment'
const apiUrl = `${ENV.development.apiUrl}/users`;


const AuthService = {
    login: (formData) => {
        return axios.post(`${apiUrl}/login`, formData);
    },

    register: (formData) => {
        return axios.post(`${apiUrl}`, formData);
    },

    saveUser: ({ token, user }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    },

    logout: () => {
        localStorage.removeItem("user");
    }
}

export default AuthService;

