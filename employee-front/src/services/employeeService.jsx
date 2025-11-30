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
    },

    update: async (docNumber, employeeData) => {
        const response = await axios.put(`${API_URL}/${docNumber}`, employeeData);
        return response.data;
    },

    delete: async (docNumber) => {
        const response = await axios.delete(`${API_URL}/${docNumber}`);
        return response.data;
    }
};