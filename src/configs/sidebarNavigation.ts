export interface INavigation {
    id?: number,
    text: string,
    icon?: string,
    children?: INavigation[],
    href?: string,
    onClick?: () => void
}

export const managerNavigations: INavigation[] = [
    {
        text: "Recruitment",
        children: [
            {
                id: 1,
                text: "Recruitments",
                icon: "handshake-simple",
                href: "/recruitments"
            },
            {
                id: 2,
                text: "Recruitment Posts",
                icon: "newspaper",
            },
            {
                id: 3,
                text: "Candidates",
                icon: "user-tie",
            },
            {
                id: 4,
                text: "Interviews",
                icon: "comments",
            },
        ]
    }, 
    {
        text: "User",
        children: [
            {
                id: 7,
                text: "Profile",
                icon: "circle-user",
                href: "/profile",
            },
            {
                id: 8,
                text: "Change password",
                icon: "key",
                href: "/change-password",
            },
            {
                id: 9,
                text: "Log out",
                icon: "right-from-bracket",
                href: "/"
            },
        ]
    },
]