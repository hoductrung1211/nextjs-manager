import configuredAxios from "../axios.config";
import IApplicationSubmission from "@/models/ApplicationSubmission";
const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "applicationSubmissions/insight/",
});

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export const enum EnumApplicationStatus {
    Applied = 1,
    InterviewScheduled = 2,
    Interviewed = 3,
    NotPresentInInterview = 4,
    Hired = 5,
    Rejected = 6,
}

export const getApplicationByRecruitmentId = (recruitmentId: number) =>
    axios.get<IApplicationSubmission[]>(`${recruitmentId}`);

interface IUpdateApplicationData {
    applicationStatusId: EnumApplicationStatus
}

export const updateApplication = (applicationId: number, updateData: IUpdateApplicationData) =>
    axios.put(`${applicationId}`, updateData);