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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};
//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(data => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }
            
            originalRequest._retry = true;
            isRefreshing = true;
            originalRequest._retry = true;
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${baseUrl}auth/refresh-token`);
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log("Access token refreshed!");
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
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