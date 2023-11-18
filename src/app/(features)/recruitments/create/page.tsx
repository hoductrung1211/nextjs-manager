import CreateRecruitment from "@/features/recruitments/create/CreateRecruitment";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen w-full pl-3 bg-white">
            <div className="w-full h-full flex flex-col rounded-xl overflow-hidden">
                <header className="flex-shrink-0 h-16 flex px-5 pb-4  items-end   bg-gray-50">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="./">
                            Home
                        </Link> 
                        <Link href="./">
                            Recruitments
                        </Link> 
                        <Typography color="text.primary">Create</Typography>
                    </Breadcrumbs>
                </header>
                <CreateRecruitment />
            </div>
        </div>
    )
}