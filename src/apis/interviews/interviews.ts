import IInterview from "@/models/Interview";
import configuredAxios from "../axios.config";
import { ICreateInterview, IUpdateInterviewInfo, IUpdateInterviewStatus } from "./constants";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "interviews/",
});

export const createInterview = (interview: ICreateInterview) =>
    axios.post<IInterview>("", interview);

export const getInterviews = (interviewGroupId?: number) =>
    axios.get<IInterview[]>(``, {
        params: {
            interviewGroupId
        }
    });

export const getInterviewById = (id: number) =>
    axios.get<IInterview>(`/${id}`);

export const updateInterviewInfo = (id: number, formBody: IUpdateInterviewInfo) =>
    axios.patch(`${id}`, formBody);

export const updateInterviewStatus = (id: number, formBody: IUpdateInterviewStatus) =>
    axios.patch(`${id}`, formBody);

export const deleteInterview = (id: number) =>
    axios.delete(`${id}`);