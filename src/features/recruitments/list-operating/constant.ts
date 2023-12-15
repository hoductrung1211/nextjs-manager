
export interface IRecruitmentData {
    recruitmentId: number;
    departmentId: string;
    recruitmentStateId: number;
    
    recruitmentTitle: string;
    departmentName: string;
    jobJustificationName: string;
    numberOfApplicant: number;
    recruitmentStateName: string;
    createdTime: string;
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
        width: "22%"
    },
    {
        id: "departmentName",
        numeric: false,
        disablePadding: false,
        label: "Phòng ban",
        width: "13%"
    },
    {
        id: "jobJustificationName",
        numeric: false,
        disablePadding: false,
        label: "Lý do",
        width: "17%"
    },
    {
        id: "numberOfApplicant",
        numeric: true,
        disablePadding: false,
        label: "Số lượng ứng viên",
        width: "15%"
    },
    {
        id: "createdTime",
        numeric: true,
        disablePadding: false,
        label: "Thời gian tạo",
        width: "20%"
    },
    {
        id: "recruitmentStateName",
        numeric: false,
        disablePadding: false,
        label: "Trạng thái",
        width: "15%"
    },
];
