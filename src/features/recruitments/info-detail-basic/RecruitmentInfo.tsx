import FieldValue from "@/components/FieldValue";
import Icon from "@/components/Icon";
import { Typography } from "@mui/material";

interface RecruitmentInfoProps {

}

export default function RecruitmentInfo({

}: RecruitmentInfoProps) {
    return (
        <section className="w-2/5 h-fit flex flex-col border shadow-sm rounded-md ">
            <Typography
                className="px-5 py-3 flex items-center gap-3"
                variant="h6">
                <Icon name="circle-info" /> Recruitment Information
            </Typography>
            <main className="flex-shrink-0 py-4 px-6 flex flex-col gap-5 bg-white border-b">
                <FieldValue direction="row" title="Recruitment ID" value="1" />
                <FieldValue direction="row"  title="State" value="Interviewing" />
                <FieldValue direction="row"  title="Number of Candidate" value="20" />
            </main>
            <section className="h-fit p-4 flex flex-col gap-4 overflow-auto">
                <span className="flex gap-2 font-semibold"><Icon name="clock-rotate-left"/>History</span>
                <div className=" w-full px-4 py-2 flex flex-col gap-2 bg-white border rounded-md">
                    <FieldValue title="Action" value="Create Recruitment" />
                    <FieldValue title="Actor" value="Ho Duc Trung" />
                    <FieldValue title="Time" value="Nov 12 2023 1:30 PM" />
                </div> 
                <div className=" w-full px-4 py-2 flex flex-col gap-2 bg-white border rounded-md">
                    <FieldValue title="Action" value="Create Recruitment" />
                    <FieldValue title="Actor" value="Ho Duc Trung" />
                    <FieldValue title="Time" value="Nov 12 2023 1:30 PM" />
                </div> 
            </section>
        </section>
    )
}