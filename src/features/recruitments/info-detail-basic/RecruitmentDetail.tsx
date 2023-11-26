'use client';
import { Button, TextField, Typography } from "@mui/material";
import RecruitmentContainer from "../RecruitmentContainer";
import Icon from "@/components/Icon";

export default function RecruitmentBasicInfo() {

    return (
        <RecruitmentContainer>
            <div className="h-full p-4 flex gap-4 overflow-auto">
                <section className="w-full h-screen flex flex-col gap-4 rounded-md">
                    <div className="pt-4 pl-8 pr-2 pb-10 flex flex-col gap-4 rounded-md bg-white shadow-sm group transition-all">
                        <section className="flex justify-between items-center">
                            <Typography variant="h6">Job Requisition</Typography>
                            <Button className="text-dark group-hover:opacity-100 opacity-0 "><Icon name="pen-to-square text-dark" size="lg" /></Button>
                        </section>
                        <section className="grid grid-cols-4 gap-6">
                            <p className="font-semibold col-span-1 text-end">Position Title</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Department</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Number Of Position</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Start Date</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Job Justification</p>
                            <p className="col-span-3">1</p>
                             
                        </section>
                    </div>
                    <div className="pt-4 pl-8 pr-2 pb-10 flex flex-col gap-4 rounded-md bg-white shadow-sm group">
                        <section className="flex justify-between items-center">
                            <Typography variant="h6">Job Requisition</Typography>
                            <Button className="text-dark group-hover:opacity-100 opacity-0"><Icon name="pen-to-square text-dark" size="lg" /></Button>
                        </section>
                        <section className="grid grid-cols-4 gap-6">
                            <p className="font-semibold col-span-1 text-end">Qualification</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Contract Type</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Employee Role</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Experience</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Work Site</p>
                            <p className="col-span-3">1</p>

                            <p className="font-semibold col-span-1 text-end">Salary</p>
                            <p className="col-span-3">11.000.000 - 12.000.000</p> 
                        </section>
                    </div>
                </section>
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
            </div>
        </RecruitmentContainer>
    )
}

function FieldValue({
    title,
    value,
    direction = "column"
}: {
    direction?: "row" | "column";
    title: string;
    value: string;
}) {
    const className = direction == "column" ? "flex flex-col gap-1" : "flex justify-between";
    return (
        <div className={className}>
            <span className="font-semibold">{title}</span>
            {value}
        </div>
    )
}

{/* <div className="w-1/3 overflow-auto p-3 bg-white border rounded-lg">
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
                </div> */}