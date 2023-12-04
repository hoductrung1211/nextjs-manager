"use client";
import { CustomTabPanel } from "@/components/mui/Tab";
import FinishedRecruitmentTable from "@/features/recruitments/list-finished/FinishedRecruitmentTable";
import OperatingRecruitmentTable from "@/features/recruitments/list-operating/OperatingRecruitmentTable";
import OthersRecruitmentTable from "@/features/recruitments/list-others/OthersRecruitmentTable";
import WaitingRecruitmentTable from "@/features/recruitments/list-waiting-for-review/WaitingRecruitmentTable";
import MainContentContainer from "@/layouts/MainContentContainer";
import PageContainer from "@/layouts/PageContainer";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [tabValue, setTabValue] = useState<number>(0);

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setTabValue(newValue);
  }

  return (
    <PageContainer breadcrumbs={[
      {
        text: "Trang chủ",
        href: ""
      },
      {
        text: "Đợt tuyển dụng"
      }
    ]} >
      <MainContentContainer>
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        aria-label="recruitment tabs"
      >
        <Tab
          label="Đang vận hành"
          id="recruitment-tab-0"
          aria-controls="recruitment-tabpanel-0"
        />
        <Tab
          label="Chờ xét duyệt"
          id="recruitment-tab-1"
          aria-controls="recruitment-tabpanel-1"
        />
        <Tab
          label="Hoàn thành"
          id="recruitment-tab-2"
          aria-controls="recruitment-tabpanel-2"
        />
        <Tab
          label="Khác"
          id="recruitment-tab-3"
          aria-controls="recruitment-tabpanel-3"
        />
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
    </PageContainer>
  );
}
