import configuredAxios from "../axios.config";
import { ICreateInterview } from "./constants";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "interviews/",
});

export const createInterview = (interview: ICreateInterview) =>
    axios.post("", interview);