import axios from 'axios';
import { ENV } from "../constants/environment";
const apiUrl = `${ENV.development.apiUrl}/reservations`;

const ReservationService = {

    create: (formData) => {
        return axios.post(apiUrl, formData);
    },
    fetchAll: () => {
        return axios.get(apiUrl);
    },
    fetchByTable: (filters) => {
        return axios.get(`${apiUrl}/by-table`, { params: filters });
    },
    delete: (id) => {
        return axios.delete(`${apiUrl}/${id}`);
    },
    update: (id, formData) => {
        return axios.put(`${apiUrl}/${id}`, formData);
    },
    fetchAllByRestaurant: () => {
        return axios.get(`${apiUrl}/by-restaurant`);
    }


}

export default ReservationService;