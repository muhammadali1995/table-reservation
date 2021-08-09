import axios from 'axios';
import { ENV } from "../constants/environment";
const apiUrl = `${ENV.development.apiUrl}/tables`;

const TableService = {

    create: (formData) => {
        return axios.post(apiUrl, formData);
    },

    fetchAll: () => {
        return axios.get(apiUrl);
    },

    fetchById: (id) => {
        return axios.get(`${apiUrl}/${id}`);
    },

    update: (id, formData) => {
        return axios.put(`${apiUrl}/${id}`, formData);
    },
    delete: (id) => {
        return axios.delete(`${apiUrl}/${id}`);
    },
    swap: (data) => {
        return axios.put(`${apiUrl}/swap`, data);
    }
}

export default TableService;