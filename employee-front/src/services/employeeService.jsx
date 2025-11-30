import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);
export const employeeService = {

    getAll: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    searchByDepartment: async (department) => {
        const response = await axios.get(`${API_URL}/search/${department}`);
        return response.data;
    },

    create: async (employeeData) => {
        const response = await axios.post(API_URL, employeeData);
        return response.data;
    }
};