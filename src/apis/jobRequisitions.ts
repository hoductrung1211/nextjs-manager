import axios from "./axios.config";

axios.defaults.baseURL = "https://localhost:7163/api/recruitments/";

export interface IJobRequisition {
    id: number;
    recruitmentId: number;
    positionTitle: string;
    departmentId: number;
    numberOfPosition: number;
    startDate: Date;
    requisitionReasonId: number;
    hrId: number;
    hiringManagerId: number | null;
    createdDateTime: Date;
}

export const getAllJobRequisitions = () => {
    return axios.get<IJobRequisition[]>("");
}

export const getJobRequisitionById = (id: number) => {
    return axios.get<IJobRequisition>(`/${id}`);
}

export const deleteJobRequisition = (id: number) => {
    return axios.delete(`/${id}`);
}