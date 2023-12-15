
export interface IRecruitmentData {
    recruitmentId: number;
    departmentId: string;

    recruitmentTitle: string;
    departmentName: string;
    jobJustificationName: string;
    numberOfHiredApplicant: number;
    finishedTime: string;
}

export interface HeadCell {
    id: keyof IRecruitmentData;
    label: string;
    numeric: boolean; 
    disablePadding: boolean;
    width?: string;
}

export const headCells: HeadCell[] = [
    {
        id: "recruitmentTitle",
        numeric: false,
        disablePadding: false,
        label: "Tiêu đề",
        width: "30%"
    },
    {
        id: "departmentName",
        numeric: false,
        disablePadding: false,
        label: "Phòng ban",
        width: "20%"
    },
    {
        id: "jobJustificationName",
        numeric: false,
        disablePadding: false,
        label: "Lý do",
        width: "15%"
    },
    {
        id: "numberOfHiredApplicant",
        numeric: true,
        disablePadding: false,
        label: "Số lượng tuyển",
        width: "20%"
    },
    // {
    //     id: "finishedTime",
    //     numeric: false,
    //     disablePadding: false,
    //     label: "Thời gian hoàn thành",
    //     width: "20%"
    // }, 
]; 
