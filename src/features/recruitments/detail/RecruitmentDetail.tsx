'use client';
import { CustomTabPanel } from "@/components/mui/Tab";
import { Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

export default function RecruitmentDetail() {
    const [tabValue, setTabValue] = useState<0 | 1>(0);
    
    function handleChangeTab(event: React.SyntheticEvent, newValue:0 | 1) {
        setTabValue(newValue);
    }

    return (
        <main className="h-full flex flex-col gap-4 p-4 bg-slate-50 overflow-auto">
            <header className="flex-shrink-0 h-14 flex items-center gap-4 border-b ">
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                >
                    <Tab label="Basic Information" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="Job Posting" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    <Tab label="Interviews" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                    <Tab label="Candidates" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
                </Tabs>
            </header>
            <main className="h-full drop-shadow-sm bg-default overflow-auto">
                <CustomTabPanel className="p-3 flex items-start gap-3 bg-white rounded-lg" value={tabValue} index={0}>
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
                    2
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    3
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    4
                </CustomTabPanel>
            </main>
        </main>
    )
}