import { Role } from "./authorization";

export const enum Navigation {
    Recruitments,
    JobPostings,
    Candidates,
    Interviews,
    Reports,
    Items,

    UserProfile,
    Settings,
    Logout
}

export interface INavigation {
    id: Navigation;
    icon: string;
    text: string;
    href: string;
    role?: Role[];
}

export const constructionNavList : INavigation[] = [
    {
        id: Navigation.Recruitments,
        icon: "handshake-simple",
        text: "Đợt tuyển dụng",
        href: "/recruitments",
        role: [
            Role.HR,
            Role.HiringManager,
        ]
    },
    {
        id: Navigation.Reports,
        icon: "chart-pie",
        text: "Báo cáo",
        href: "/reports",
        role: [
            Role.HR,
            Role.HiringManager,
        ]
    },
    {
        id: Navigation.Items,
        icon: "list-check",
        text: "Quản lý danh mục",
        href: "/categories",
        role: [
            Role.HiringManager,
        ]
    },
    // {
    //     id: Navigation.JobPostings,
    //     icon: "newspaper",
    //     text: "Bài đăng tuyển dụng",
    //     href: "/job-postings"
    // },
    // {
    //     id: Navigation.Candidates,
    //     icon: "user-tie",
    //     text: "Ứng viên",
    //     href: "/candidates"
    // },
    // {
    //     id: Navigation.Interviews,
    //     icon: "comments",
    //     text: "Buổi phỏng vấn",
    //     href: "/interviews"
    // },
];

export const userNavList: INavigation[] = [
    // {
    //     id: Navigation.UserProfile,
    //     icon: "user",
    //     text: "Hồ sơ cá nhân",
    //     href: "/profile"
    // },
    // {
    //     id: Navigation.Settings,
    //     icon: "gear",
    //     text: "Cài đặt",
    //     href: "/settings"
    // },
    {
        id: Navigation.Logout,
        icon: "right-from-bracket",
        text: "Đăng xuất",
        href: "/"
    },
]