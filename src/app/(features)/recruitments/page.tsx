'use client';
import { CustomTabPanel } from "@/components/mui/Tab";
import FinishedRecruitmentTable from "@/features/recruitments/list-finished/FinishedRecruitmentTable";
import OperatingRecruitmentTable from "@/features/recruitments/list-operating/OperatingRecruitmentTable";
import OthersRecruitmentTable from "@/features/recruitments/list-others/OthersRecruitmentTable";
import WaitingRecruitmentTable from "@/features/recruitments/list-waiting-for-review/WaitingRecruitmentTable";
import BreadcrumbHeader from "@/layouts/BreadcrumbHeader";
import MainContentContainer from "@/layouts/MainContentContainer";
import { Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [tabValue, setTabValue] = useState<number>(0);
    
    function handleChangeTab(event: React.SyntheticEvent, newValue:number) {
        setTabValue(newValue);
    }

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden bg-white">
            <BreadcrumbHeader>
                <Link href="/">
                    Home
                </Link> 
                <Typography color="text.primary">Recruitments</Typography>
            </BreadcrumbHeader>
            <MainContentContainer>
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    aria-label="recruitment tabs"
                >
                    <Tab label="Operating" id="recruitment-tab-0" aria-controls="recruitment-tabpanel-0" />
                    <Tab label="Waiting to review" id="recruitment-tab-1" aria-controls="recruitment-tabpanel-1" />
                    <Tab label="Finished" id="recruitment-tab-2" aria-controls="recruitment-tabpanel-2" />
                    <Tab label="Others" id="recruitment-tab-3" aria-controls="recruitment-tabpanel-3" />
                </Tabs>
                
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
                    <OthersRecruitmentTable />
                </CustomTabPanel>
            </MainContentContainer>
        </div>
    )
}
