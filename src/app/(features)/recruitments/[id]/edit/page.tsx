'use client';
import { CustomTabPanel } from "@/components/mui/Tab";
import { Breadcrumbs, Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Page({
    id
}: {
    id: string;
}) {
    const [tabValue, setTabValue] = useState<number>(0);

    function handleChangeTab(event: React.SyntheticEvent, newValue:number) {
        setTabValue(newValue);
    }
    
    return (
        <div className="h-screen w-full bg-white">
            <div className="w-full h-full flex flex-col overflow-hidden">
                <header className="flex-shrink-0 flex flex-col border-b ">
                    <section className="h-16 px-5 pb-4 flex items-end gap-10 ">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link href="/">
                                Home
                            </Link>
                            <Link href="/recruitments">
                                Recruitments
                            </Link> 
                            <Typography color="text.primary">{id}</Typography>
                        </Breadcrumbs>
                    </section>
                </header>
                {/* <RecruitmentDetail /> */}
                <main className="h-full flex flex-col px-4 py-2 bg-gray-50">
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        aria-label="recruitment detail tabs"
                    >
                        <Tab label="Basic Information" id="recruitment-tab-0" aria-controls="recruitment-detail-tabpanel-0" />
                        <Tab label="Job Posting" id="recruitment-tab-1" aria-controls="recruitment-detail-tabpanel-1" />
                        <Tab label="Interviews" id="recruitment-tab-2" aria-controls="recruitment-detail-tabpanel-2" />
                        <Tab label="Candidates" id="recruitment-tab-3" aria-controls="recruitment-detail-tabpanel-3" />
                    </Tabs>
                    
                    <section className="h-full drop-shadow-sm bg-gray-200 overflow-auto">
                        <CustomTabPanel  className="p-3 flex items-start gap-3 bg-white rounded-lg"  value={tabValue} index={0}>
                            <div className="w-1/3 p-3 border rounded-md">
                                <Typography variant="h6">Basic Info</Typography>
                                <div>HR Name: Ho Duc Trung</div>
                                <div>HR ID: 227377</div>
                                <div>Created Time: 23/07/2023</div>
                                <div>Manager Name: Bui Thi Ly</div>
                                <div>Manager ID: 230701</div>
                            </div>
                            <div className="w-2/3 flex flex-col gap-3">
                                <div className="flex-shrink-0 h-96 p-3  border rounded-md ">
                                    <div>Title</div>
                                    <div>Department</div>
                                    <div>Number of position</div> 
                                    <div>Start Date</div>
                                    <div>End Date</div>
                                    <div>Reason</div>
                                </div>
                                <div className="flex-shrink-0 h-96 p-3  border rounded-md">
                                    1
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={1}>
                            
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={2}>
                            
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={3}>
                            
                        </CustomTabPanel>
                    </section>
                </main>
            </div>
        </div>
    )
}