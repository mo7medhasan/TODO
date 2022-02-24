import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL:'https://localhost:5000/api'
});

axiosInstance.interceptors.request.use(
    function(config){
        config.headers['Authorization'] = localStorage.getItem('token');
        config.headers['Access-Control-Allow-Origin'] = '*';
        // config.headers["Access-Control-Request-Method"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)

export const APIURL = 'https://localhost:5000/'