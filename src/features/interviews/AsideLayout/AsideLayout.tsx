"use client";
import IconButton from "@/components/IconButton";
import GroupItem from "./GroupItem";
import { useEffect, useState } from "react";
import IInterviewGroup, { IInterviewGroupOverview } from "@/models/InterviewGroup";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useAlert from "@/hooks/useAlert";
import { getInterviewGroupsByRecruitmentId } from "@/apis/interviews/interviewGroups";
import useRecruitment from "@/hooks/useRecruitment";

interface IAsideLayoutProps {
	onClickAdd: () => void;
	onClickDetail: (interviewGroupId: number) => void;
}

export default function AsideLayout({
	onClickAdd,
	onClickDetail,
}: IAsideLayoutProps) {
	const {
		recruitmentId
	} = useRecruitment();
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();
	const [groups, setGroups] = useState<IInterviewGroupOverview[]>([]);

	useEffect(() => {
		fetchGroups();
	}, []);

	async function fetchGroups() {
		setLoading(true);
		try {
			const { data: list } = await getInterviewGroupsByRecruitmentId(recruitmentId);
			setGroups(list);
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
				{groups.length ?
					groups.map(group => (
						<GroupItem key={group.interviewGroupId}
							interviewGroup={group}
							onViewClick={() => onClickDetail(group.interviewGroupId)}
						/>
					)) :
					<div className="h-full grid place-items-center text-apple-gray-2">
						Danh sách trống
					</div>
				}
			</main>
		</aside>
	)
}