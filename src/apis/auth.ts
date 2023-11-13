import axios from "./axios.config";

axios.defaults.baseURL = "https://localhost:44349/api/authentication/";

interface IRegisterRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const register = (registerRequest : IRegisterRequest) => {
    return axios.post("register", registerRequest);
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
    return axios.post<ILoginResponse>("login", loginRequest);
}