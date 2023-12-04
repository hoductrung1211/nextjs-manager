import { INavProps } from "@/layouts/NavGroup";

export const enum Navigation {
    Recruitments,
    JobPostings,
    Candidates,
    Interviews,
    UserProfile,
    Settings,
    Logout
}

export const constructionNavList : INavProps[] = [
    {
        id: Navigation.Recruitments,
        icon: "handshake-simple",
        text: "Đợt tuyển dụng",
        href: "/recruitments"
    },
    {
        id: Navigation.JobPostings,
        icon: "newspaper",
        text: "Bài đăng tuyển dụng",
        href: "/job-postings"
    },
    {
        id: Navigation.Candidates,
        icon: "user-tie",
        text: "Ứng viên",
        href: "/candidates"
    },
    {
        id: Navigation.Interviews,
        icon: "comments",
        text: "Buổi phỏng vấn",
        href: "/interviews"
    },
];

export const userNavList: INavProps[] = [
    {
        id: Navigation.UserProfile,
        icon: "user",
        text: "Hồ sơ cá nhân",
        href: "/profile"
    },
    {
        id: Navigation.Settings,
        icon: "gear",
        text: "Cài đặt",
        href: "/settings"
    },
    {
        id: Navigation.Logout,
        icon: "right-from-bracket",
        text: "Đăng xuất",
        href: "/"
    },
]