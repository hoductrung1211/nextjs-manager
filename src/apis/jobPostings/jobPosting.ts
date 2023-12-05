import IJobPosting from "@/models/JobPosting";
import configuredAxios from "../axios.config";
const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "jobPostings/",
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export const enum EnumJobPostingStatus {
    Draft = 1,
    Active = 2,
    Archived = 3,
}

export interface ICreateJobPostingRequest {
    recruitmentId: number,
    jobPostingTitle: string,
    responsibilities: string,
    deadline: Date,
    jobPostingStatusId: EnumJobPostingStatus,
}

export const createJobPosting = (request: ICreateJobPostingRequest) =>
    axios.post("", request);

export const getJobPostingByRecruitmentId = (recruitmentId: number) =>
    axios.get<IJobPosting>(`/recruitment/${recruitmentId}`);