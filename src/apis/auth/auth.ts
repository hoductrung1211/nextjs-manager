import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL:  configuredAxios.defaults.baseURL + "authentication/"
});

interface IRegisterRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const register = (registerRequest : IRegisterRequest) => {
    return axios.post(`register`, registerRequest);
}

interface ILoginRequest {
    username: string,
    password: string,
}
interface ILoginResponse {
    accessToken: string,
    refreshToken: string,
    fullName: string,
    role: string,
}

export const login = (loginRequest: ILoginRequest) => {
    return axios.post<ILoginResponse>(`login/insight`, loginRequest);
}