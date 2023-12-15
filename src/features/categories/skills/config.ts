import ISkill from "@/models/Skill";

export interface ISkillData {
    skillId: number; 
    skillName: string; 
    isDeleted: string; // Why this is string??? => Because idk :)
}

export interface HeadCell {
    id: keyof ISkill | "function";
    label: string;
    numeric: boolean;
    disablePadding: boolean;
    width?: string;
}

export const headCells: HeadCell[] = [ 
    {
        id: "skillId",
        numeric: false,
        disablePadding: true,
        label: "Mã kỹ năng",
        width: "10%",
    },
    {
        id: "skillName",
        numeric: false,
        disablePadding: false,
        label: "Tên kỹ năng",
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
        width: "20%",
    },
];
