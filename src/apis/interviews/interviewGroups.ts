import IInterviewGroup from "@/models/InterviewGroup";
import configuredAxios from "../axios.config";
import { ICreateInterviewGroup } from "./constants";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "interviewGroups/",
});

export const createInterviewGroup = (interviewGroup: ICreateInterviewGroup) =>
    axios.post("", interviewGroup);

export const getInterviewGroupsByRecruitmentId = (recruitmentId: number) =>
    axios.get<IInterviewGroup[]>("");