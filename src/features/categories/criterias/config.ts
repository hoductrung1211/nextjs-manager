import ICriteria from "@/models/Criteria";

export interface ICriteriaData {
    criteriaId: number; 
    criteriaName: string; 
    isDeleted: string; // Why this is string??? => Because idk :)
}

export interface HeadCell {
    id: keyof ICriteria | "function";
    label: string;
    numeric: boolean;
    disablePadding: boolean;
    width?: string;
}

export const headCells: HeadCell[] = [ 
    {
        id: "criteriaId",
        numeric: false,
        disablePadding: true,
        label: "Mã tiêu chí đánh giá",
        width: "15%",
    },
    {
        id: "criteriaName",
        numeric: false,
        disablePadding: false,
        label: "Tên tiêu chí đánh giá",
        width: "50%",
    },
    {
        id: "isDeleted",
        numeric: false,
        disablePadding: false,
        label: "Trạng thái",
        width: "20%",
    },
    {
        id: "function",
        numeric: true,
        disablePadding: false,
        label: "Chức năng",
        width: "15%",
    },
];
