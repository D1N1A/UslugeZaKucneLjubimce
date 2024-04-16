import axios from "axios";

export const httpService = axios.create ({
    baseURL: 'https://plecas-001-site1.itempurl.com/api/v1',
    // baseURL: 'https://localhost:7121/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }
});