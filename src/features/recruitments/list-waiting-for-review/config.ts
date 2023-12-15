export interface IRecruitmentData {
    recruitmentId: number;
    recruitmentTitle: string;
    departmentName: string;
    jobJustificationName: string;
    numberOfPosition: number;
    creatorName: string;
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
        disablePadding: true,
        label: "Tiêu đề",
        width: "20%"
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
        width: "15%"
    },
    {
        id: "numberOfPosition",
        numeric: true,
        disablePadding: false,
        label: "Số lượng tuyển dụng",
        width: "17%"
    },
    {
        id: "creatorName",
        numeric: false,
        disablePadding: false,
        label: "Người tạo",
        width: "15%"
    }, 
    {
        id: "createdTime",
        numeric: true,
        disablePadding: false,
        label: "Thời gian tạo",
        width: "20%"
    }, 
];