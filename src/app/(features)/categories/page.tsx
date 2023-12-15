"use client";

import { CustomTabPanel } from "@/components/mui/Tab";
import CriteriaTable from "@/features/categories/criterias/CriteriaTable";
import SkillTable from "@/features/categories/skills/SkillTable";
import MainContentContainer from "@/layouts/MainContentContainer";
import PageContainer from "@/layouts/PageContainer";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function Page() {
	const [tabValue, setTabValue] = useState(0);

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
				text: "Quản lý danh mục"
			}
		]} >
			<MainContentContainer fixedHeight>
				<Tabs
					className="sticky top-16 bg-neutral-100 z-10 shadow-sm"
					value={tabValue}
					onChange={handleChangeTab}
					aria-label="recruitment tabs"
				>
					<Tab label="Kỹ năng" id="recruitment-tab-0" aria-controls="recruitment-tabpanel-0" />
					{/* <Tab label="Lý do tuyển dụng" id="recruitment-tab-2" aria-controls="recruitment-tabpanel-2" />
					<Tab label="Kinh nghiệm" id="recruitment-tab-3" aria-controls="recruitment-tabpanel-3" /> */}
					<Tab label="Tiêu chí đánh giá" id="recruitment-tab-3" aria-controls="recruitment-tabpanel-3" />
				</Tabs>

				<CustomTabPanel value={tabValue} index={0}>
					<SkillTable />
				</CustomTabPanel>

				<CustomTabPanel value={tabValue} index={1}>
					<CriteriaTable />
				</CustomTabPanel>
			</MainContentContainer>
		</PageContainer>
	)
}