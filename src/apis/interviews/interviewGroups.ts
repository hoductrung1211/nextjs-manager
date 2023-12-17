import IInterviewGroup, { IInterviewGroupOverview } from "@/models/InterviewGroup";
import configuredAxios from "../axios.config";
import { ICreateInterviewGroup, IUpdateInterviewGroup } from "./constants";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "interviewGroups/",
});

export const createInterviewGroup = (interviewGroup: ICreateInterviewGroup) =>
    axios.post("", interviewGroup);

export const getInterviewGroupsByRecruitmentId = (recruitmentId: number) =>
    axios.get<IInterviewGroupOverview[]>("", {
        params: {
            recruitmentId
        }
    });

export const getInterviewGroupById = (id: number) =>
    axios.get<IInterviewGroup>(`${id}`);

export const updateInterviewGroup = (groupId: number, formBody: IUpdateInterviewGroup) =>
    axios.patch(`/${groupId}`, formBody);

export const deleteInterviewGroup = (groupId: number) =>
    axios.delete(`${groupId}`);