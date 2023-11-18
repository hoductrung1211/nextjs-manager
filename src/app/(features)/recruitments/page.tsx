'use client';
import { CustomTabPanel } from "@/components/mui/Tab";
import FinishedRecruitmentTable from "@/features/recruitments/list-finished/FinishedRecruitmentTable";
import OperatingRecruitmentTable from "@/features/recruitments/list-operating/OperatingRecruitmentTable";
import WaitingRecruitmentTable from "@/features/recruitments/list-waiting-for-review/WaitingRecruitmentTable";
import { Breadcrumbs, Link, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

export default function Page() {
    const [tabValue, setTabValue] = useState<number>(0);
    
    function handleChangeTab(event: React.SyntheticEvent, newValue:number) {
        setTabValue(newValue);
    }

    return (
        <div className="h-screen w-full pl-3 bg-white">
            <div className="w-full h-full flex flex-col overflow-hidden">
                <header className="flex-shrink-0 flex flex-col border-b ">
                    <section className="h-16 px-5 pb-4 flex items-end gap-10 bg-gray-50">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link> 
                            <Typography color="text.primary">Recruitments</Typography>
                        </Breadcrumbs>
                    </section>
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Operating" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                        <Tab label="Waiting to review" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                        <Tab label="Finished" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                        <Tab label="Others" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
                    </Tabs>
                </header>
                <main className="h-full flex flex-col drop-shadow-sm ">
                    <CustomTabPanel value={tabValue} index={0}>
                        <OperatingRecruitmentTable />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <WaitingRecruitmentTable />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={2}>
                        <FinishedRecruitmentTable />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={3}>
                        4
                    </CustomTabPanel>
                </main>
            </div>
        </div>
    )
}
