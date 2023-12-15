export const enum EnumJobPostingStatus {
    Draft = 1,
    Active = 2,
    Archived = 3,
}

export interface ICreateJobPostingRequest {
    recruitmentId: number,
    jobPostingTitle: string,
    responsibilities: string,
    deadline: Date,
    jobPostingStatusId: EnumJobPostingStatus,
}
