import configuredAxios from "./axios.config";

const axios = configuredAxios.create();
const baseURL = "contractTypes";

export interface IContractType {
    id: number;
    name: string;
}
export const getAllContractTypes = () => {
    return axios.get<IContractType[]>(baseURL);
}
export const getContractTypeById = (id: number) => {
    return axios.get<IContractType>(`${baseURL}/${id}`);
}



export interface IDepartment {
    id: number;
    name: string;
    description: string;
}
export const getAllDepartments = () => {
    return axios.get<IDepartment[]>("departments");
}
export const getDepartmentById = (id: number) => {
    return axios.get<IContractType>(`departments/${id}`);
}



export interface IEmployeeRoleType {
    id: number;
    name: string; 
}
export const getAllEmployeeRoleTypes = () => {
    return axios.get<IEmployeeRoleType[]>("employeeRoleTypes");
}
export const getEmployeeRoleTypeById = (id: number) => {
    return axios.get<IEmployeeRoleType>(`employeeRoleTypes/${id}`);
}



export interface IExperience {
    id: number;
    name: string;
    value: number;
}
export const getAllExperiences = () => {
    return axios.get<IExperience[]>("experiences");
}
export const getExperienceById = (id: number) => {
    return axios.get<IExperience>(`experiences/${id}`);
}



export interface IQualification {
    id: number;
    name: string;
    value: number;
}
export const getAllQualifications = () => {
    return axios.get<IQualification[]>("qualifications");
}
export const getQualificationById = (id: number) => {
    return axios.get<IQualification>(`qualifications/${id}`);
}



export interface IRequisitionReason {
    id: number;
    name: string;
}
export const getAllRequisitionReasons = () => {
    return axios.get<IRequisitionReason[]>("requisitionReasons");
}
export const getRequisitionReasonById = (id: number) => {
    return axios.get<IRequisitionReason>(`requisitionReasons/${id}`);
}



export interface ISkillCategory {
    id: number;
    name: string; 
}
export const getAllSkillCategories = () => {
    return axios.get<ISkillCategory[]>("skillCategories");
}
export const getSkillCategoryById = (id: number) => {
    return axios.get<ISkillCategory>(`skillCategories/${id}`);
}



export interface ISkill {
    skillId: number;
    skillName: string;
    skillCategoryId: number;
}
export const getAllSkills = () => {
    return axios.get<ISkill[]>("skills");
}
export const getSkillById = (id: number) => {
    return axios.get<ISkill>(`skills/${id}`);
}



export interface IWorkSite {
    id: number;
    name: string;
}
export const getAllWorkSites = () => {
    return axios.get<IWorkSite[]>("workSites");
}
export const getWorkSiteById = (id: number) => {
    return axios.get<IWorkSite>(`workSites/${id}`);
}



export interface IRecruitmentState {
    id: number;
    name: string;
}
export const getAllRecruitmentStates = () => {
    console.log(axios.defaults.baseURL);
    return axios.get<IRecruitmentState[]>("/RecruitmentStates");
}
export const getRecruitmentStateById = (id: number) => {
    return axios.get<IRecruitmentState>(`/RecruitmentStates/${id}`);
}