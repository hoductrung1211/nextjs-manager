import { createContext, useContext } from "react"

const RecruitmentContext = createContext({
    recruitmentId: 0,
});

export default function useRecruitment() {
    return useContext(RecruitmentContext);
}

export function RecruitmentProvider({
    recruitmentId,
    children
}: {
    recruitmentId: number;
    children?: React.ReactNode 
}) {
    return (
        <RecruitmentContext.Provider value={{
            recruitmentId
        }}>
            {children}
        </RecruitmentContext.Provider>
    )
}