
export interface IRecruitmentData {
    recruitmentId: number;
    departmentId: string;
    recruitmentStateId: number;
    
    recruitmentTitle: string;
    departmentName: string;
    jobJustificationName: string;
    description: string;
    createdDateTime: string;
    recruitmentStateName: string;
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
        width: "25%"
    },
    {
        id: "departmentName",
        numeric: false,
        disablePadding: false,
        label: "Phòng ban",
        width: "15%"
    },
    {
        id: "jobJustificationName",
        numeric: false,
        disablePadding: false,
        label: "Lý do",
        width: "10%"
    },
    {
        id: "description",
        numeric: false,
        disablePadding: false,
        label: "Chú thích",
        width: "35%"
    }, 
    {
        id: "recruitmentStateName",
        numeric: false,
        disablePadding: false,
        label: "Trạng thái",
        width: "20%"
    },
];
 