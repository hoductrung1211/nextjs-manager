import IJobPosting from "@/models/JobPosting";
import configuredAxios from "../axios.config";
import { ICreateJobPostingRequest } from "./constants";
const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "jobPostings/",
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export const createJobPosting = (request: ICreateJobPostingRequest) =>
    axios.post("", request);

export const getJobPostingByRecruitmentId = (recruitmentId: number) =>
    axios.get<IJobPosting>(`/recruitment/${recruitmentId}`);