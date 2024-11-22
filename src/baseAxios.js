import axios from "axios";

export const authInstance = axios.create({
    baseURL: 'https://tdiffapp-fvh3h5awbnhvbtar.eastus2-01.azurewebsites.net/api/auth'
})
export const users = axios.create({
    baseURL: ''
});

export const roles = axios.create({
    baseURL:''

});
export const groups = axios.create({
    baseURL: '',
});
