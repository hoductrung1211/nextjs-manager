import IContractType from "./ContractType";
import IDepartment from "./Department";
import IEmployeeRoleType from "./EmployeeRoleType";
import IWorkSite from "./WorkSite";

export default interface IEmployee {
    employeeId: number;
    userId: number;
    fullName: string;
    department: IDepartment;
    contractType: IContractType;
    workSite: IWorkSite;
    salary: number;
    hireDate: string;
    employeeRoleType: IEmployeeRoleType;
    employeeStatus: IEmployeeStatus;
}

export interface IEmployeeStatus {
    employeeStatusId: number;
    employeeStatusName: string;
}