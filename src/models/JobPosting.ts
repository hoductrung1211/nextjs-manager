import IJobDescription from "./JobDescription";

export interface IJobPostingStatus {
    jobPostingStatusId: number;
    jobPostingStatusName: string;
}

export default interface IJobPosting {
    jobPostingId: number;
    jobPostingTitle: string;
    responsibilities: string;
    deadline: string;

    publisherName: string;
    createdDateTime: string;
    jobPostingStatus: IJobPostingStatus;
    
    recruitmentId: number;
    jobDescription: IJobDescription;
    publisherId: number;
}