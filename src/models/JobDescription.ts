import IContractType from "./ContractType";
import IEmployeeRoleType from "./EmployeeRoleType";
import IExperience from "./Experience";
import IQualification from "./Qualification";
import ISkill from "./Skill";
import IWorkSite from "./WorkSite";

export default interface IJobDescription {
    jobDescriptionId: number;
    recruitmentId: string;
    qualification: IQualification;
    contractType: IContractType;
    employeeRoleType: IEmployeeRoleType;
    experience: IExperience;
    workSite: IWorkSite;
    minSalary: number;
    maxSalary: number;
    skills: ISkill[];
}