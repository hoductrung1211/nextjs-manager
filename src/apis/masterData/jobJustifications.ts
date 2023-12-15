import IJobJustification from "@/models/JobJustification";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "jobJustifications/",
});
 
export const getAllRequisitionReasons = () => {
    return axios.get<IJobJustification[]>("");
}
export const getRequisitionReasonById = (id: number) => {
    return axios.get<IJobJustification>(`${id}`);
}
