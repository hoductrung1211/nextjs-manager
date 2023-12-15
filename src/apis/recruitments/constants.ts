export interface ICreateRecruitmentRequest {
    recruitmentTitle: string,
    departmentId: number,
    numberOfPosition: number,
    startDate: Date,
    jobJustificationId: number,
    jobDescription: {
        qualificationId: number,
        contractTypeId: number,
        employeeRoleTypeId: number,
        experienceId: number,
        workSiteId: number,
        minSalary: number,
        maxSalary: number,
        skillIds: number[]
    }
}

export interface IReviewRecruitmentRequest {
    isApproved: boolean;
    description?: string;
}
