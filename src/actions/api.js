import axios from "axios";

const baseUrl = "https://localhost:5001/";

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem("user")) {
            const { token } = JSON.parse(localStorage.getItem("user"));
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    
    auth(url = baseUrl + 'auth/') {
        axios.defaults.withCredentials = true;
        return {
            signin: data => axios.post(url + "signin", data)
        }
    },
    
    product(url = baseUrl + 'products/') {
        return {
            fetchAll: () => axios.get(url),
            fetchGroupedAll: () => axios.get(url + "groups"),
            fetchById: (id) => axios.get(url + id),
            create: data => axios.post(url, data),
            update: (id, data) => axios.put(url + id, data),
            delete: (id) => axios.delete(url + id)
        }
    },

    repair(url = baseUrl + 'repairs/') {
        return {
            fetchAll: () => axios.get(url),
            fetchCompleteRepairs: () => axios.get(url + "complete"),
            markAsComplete: (id) => axios.put(url + "mark-complete/" + id),
            fetchById: (id) => axios.get(url + id),
            create: data => axios.post(url, data),
            update: (id, data) => axios.put(url + id, data),
            delete: (id) => axios.delete(url + id)
        }
    },

    client(url = baseUrl + 'clients/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: (id) => axios.get(url + id),
            create: data => axios.post(url, data),
            update: (id, data) => axios.put(url + id, data),
            delete: (id) => axios.delete(url + id)
        }
    }
}