import configuredAxios from "./axios.config";

const axios = configuredAxios.create();

const baseURL = "authentication";

interface IRegisterRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const register = (registerRequest : IRegisterRequest) => {
    return axios.post(`${baseURL}/register`, registerRequest);
}

interface ILoginRequest {
    username: string,
    password: string,
}
interface ILoginResponse {
    accessToken: string,
    refreshToken: string,
    fullName: string,
}

export const login = (loginRequest: ILoginRequest) => {
    return axios.post<ILoginResponse>(`${baseURL}/login/insight`, loginRequest);
}