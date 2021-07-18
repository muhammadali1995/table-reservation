import axios from 'axios';
import { ENV } from "../constants/environment";
const apiUrl = `${ENV.development.apiUrl}/tables`;

const TableService = {
    create: (formData) => {
        return axios.post(apiUrl, formData);
    }

}

export default TableService;