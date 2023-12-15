import ICandidate from "./Candidate";

export default interface IApplicationSubmission {
    applicationSubmissionId: number;
    candidate: ICandidate;
    recruitmentId: number;
    applicationStatus: IApplicationStatus;
    applyTime: string;
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
        applicationStatusName: "Đạt yêu cầu"
    },
    {
        applicationStatusId: 3,
        applicationStatusName: "Chưa đạt yêu cầu"
    },
    {
        applicationStatusId: 4,
        applicationStatusName: "Đã phỏng vấn"
    },
    {
        applicationStatusId: 5,
        applicationStatusName: "Vắng trong buổi phỏng vấn"
    },
    {
        applicationStatusId: 6,
        applicationStatusName: "Được tuyển"
    },
    {
        applicationStatusId: 7,
        applicationStatusName: "Còn lại"
    },
]