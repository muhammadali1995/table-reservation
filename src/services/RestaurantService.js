import axios from 'axios';
import { ENV } from "../constants/environment";
const apiUrl = `${ENV.development.apiUrl}/restaurants`;

const RestaurantService = {
    
    fetchMyRestaurant: () => {
        return axios.get(`${apiUrl}/mine`);
    },

    create: (formData) => {
        return axios.post(apiUrl, formData);
    },

    fetchRestaurntTables: () => {
        return axios.get(`${apiUrl}/tables`)
    }
}

export default RestaurantService;