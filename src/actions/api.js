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
                try {
                    await new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    });
                    return await axios(originalRequest);
                } catch (err) {
                    return await Promise.reject(err);
                }
            }
            
            originalRequest._retry = true;
            isRefreshing = true;
            return new Promise(function (resolve, reject) {
                axios.defaults.withCredentials = true;
                axios.post(`${baseUrl}auth/refresh-token`)
                .then(response => {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log("Access token refreshed!");
                    processQueue(null, response.data.token);
                    resolve(axios(originalRequest));
                })
                .catch((err) => {
                    processQueue(err, null);
                    reject(err);
                })
                .finally(
                    window.location.reload()
                )
            })
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