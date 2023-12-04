import IContractType from "@/models/ContractType";
import configuredAxios from "../axios.config";

const axios = configuredAxios.create({
    baseURL: configuredAxios.defaults.baseURL + "contractTypes/",
});
 
export const getAllContractTypes = () => {
    return axios.get<IContractType[]>("");
}
export const getContractTypeById = (id: number) => {
    return axios.get<IContractType>(`${id}`);
}