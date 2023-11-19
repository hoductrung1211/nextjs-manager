'use client';
import { Typography } from "@mui/material";
import RecruitmentContainer from "../RecruitmentContainer";

export default function RecruitmentBasicInfo() {

    return (
        <RecruitmentContainer>
            <div className="h-[600px] overflow-auto">
                <div className="w-1/3 overflow-auto p-3 border rounded-md">
                    <Typography variant="h6">Basic Info</Typography>
                    <div>HR Name: Ho Duc Trung</div>
                    <div>HR ID: 227377</div>
                    <div>Created Time: 23/07/2023</div>
                    <div>Manager Name: Bui Thi Ly</div>
                    <div className="h-96">Manager ID: 230701</div>
                </div>
                <div className="w-2/3 h-full overflow-auto flex flex-col gap-3">
                    <div className="flex-shrink-0 p-3  border rounded-md ">
                        <div>Title</div>
                        <div>Department</div>
                        <div>Number of position</div> 
                        <div>Start Date</div>
                        <div>End Date</div>
                        <div>Reason</div>
                    </div>
                    <div className="flex-shrink-0 h-96  p-3  border rounded-md">
                        1
                    </div>
                </div>
            </div>
        </RecruitmentContainer>
    )
}