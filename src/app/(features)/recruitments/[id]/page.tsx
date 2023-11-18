import RecruitmentDetail from "@/features/recruitments/detail/RecruitmentDetail";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen w-full p-5 bg-white">
            <div className="w-full h-full flex flex-col rounded-xl overflow-hidden">
                <header className="flex-shrink-0 h-14 flex items-center gap-4 border-b ">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="./">
                            Recruitments
                        </Link> 
                        <Typography color="text.primary">Detail</Typography>
                    </Breadcrumbs>
                </header>
                <RecruitmentDetail />
            </div>
        </div>
    )
}