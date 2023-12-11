import ICandidate from "./Candidate";

export default interface IApplicationSubmission {
    applicationSubmissionId: number;
    candidate: ICandidate;
    recruitmentId: number;
    applicationStatus: IApplicationStatus;
}

export interface IApplicationStatus {
    applicationStatusId: number;
    applicationStatusName: string;
}

export const applicationStatuses = [
    {
        applicationStatusId: 1,
        applicationStatusName: "Chờ xét duyệt"
    },
    {
        applicationStatusId: 2,
        applicationStatusName: "Chờ phỏng vấn"
    },
    {
        applicationStatusId: 3,
        applicationStatusName: "Đã phỏng vấn"
    },
    {
        applicationStatusId: 4,
        applicationStatusName: "Vắng trong buổi phỏng vấn"
    },
    {
        applicationStatusId: 5,
        applicationStatusName: "Được tuyển"
    },
    {
        applicationStatusId: 6,
        applicationStatusName: "Chưa đạt"
    },
]