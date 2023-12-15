"use client";

import { CustomTabPanel } from "@/components/mui/Tab";
import OverviewReport from "@/features/reports/OverviewReport";
import MainContentContainer from "@/layouts/MainContentContainer";
import PageContainer from "@/layouts/PageContainer";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function Page() {
	const [tabValue, setTabValue] = useState<0 | 1>(0);

	function handleChangeTab(event: React.SyntheticEvent, newValue: 0 | 1) {
        setTabValue(newValue);
    }

    return (
        <PageContainer breadcrumbs={[
			{
				text: "Trang chủ",
				href: ""
			},
			{
				text: "Báo cáo"
			}
        ]} >
			<MainContentContainer>
                <OverviewReport />
			</MainContentContainer>
        </PageContainer>
    )
}