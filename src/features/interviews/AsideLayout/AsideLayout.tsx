"use client"; 
import IconButton from "@/components/IconButton";
import GroupItem from "./GroupItem";
import { useEffect, useState } from "react";
import IInterviewGroup from "@/models/InterviewGroup";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useAlert from "@/hooks/useAlert";

interface IAsideLayoutProps {
	onClickAdd: () => void;
	onClickDetail: (interviewGroupId: number) => void;
}

export default function AsideLayout({
	onClickAdd,
	onClickDetail,
}: IAsideLayoutProps) {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();
	const [groups, setGroups] = useState<IInterviewGroup[]>([]);

	useEffect(() => {
		fetchGroups();
	}, []);

	async function fetchGroups() {
		setLoading(true);
		try {
			
		}
		catch (ex) {
			setAlert({
				message: "Xảy ra lỗi trong quá trình load danh sách Nhóm phỏng vấn.",
				severity: "error"
			});
		}
		finally {
			setLoading(false);
		}
	}

	return (
		<aside className="sticky top-36 col-span-1 flex flex-col ">
			<header className=" p-4 py-2 flex items-center justify-between border-b  bg-white border rounded-t-md">
				<div>
					<h6 className="text-lg font-semibold">Nhóm phỏng vấn</h6>
					<p className="text-apple-gray">Số lượng: {groups.length}</p>
				</div>
				<IconButton
					name="plus"
					onClick={onClickAdd}
					tooltip="Tạo mới"
				/>
			</header>
			<main className="h-[520px] p-3 flex flex-col gap-4 bg-subdued overflow-auto ">
				{groups.map(group => (
					<GroupItem key={group.interviewGroupId}
						onViewInterviewGroup={() => onClickDetail(group.interviewGroupId)}
					/>
				))}
			</main>
		</aside>
	)
}