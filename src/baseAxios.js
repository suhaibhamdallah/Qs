import axios from "axios";

export const authInstance = axios.create({
    baseURL: 'https://tdiffapp-fvh3h5awbnhvbtar.eastus2-01.azurewebsites.net/api/auth'
})
export const extensions = axios.create({
    baseURL: 'http://172.28.14.12/pbx_bakend/public/extension',
})
export const dids = axios.create({
    baseURL: 'http://172.28.14.12/pbx_bakend/public/did'
});

export const users = axios.create({
    baseURL: 'http://172.28.14.12/pbx_bakend/public/auth'
});

export const roles = axios.create({
    baseURL: 'http://172.28.14.12/pbx_bakend/public/role'

});
export const groups = axios.create({
    baseURL: 'http://172.28.14.12/pbx_bakend/public/group',
});
export const cdrs = axios.create({
    baseURL: 'http://172.28.14.12/pbx_bakend/public/cdr'
});
export const statistics = axios.create({
    baseURL: 'http://172.28.14.12/pbx_bakend/public/statistics'
});

