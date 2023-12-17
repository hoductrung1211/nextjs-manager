"use client";
import IconButton from "@/components/IconButton";
import IInterviewGroup from "@/models/InterviewGroup";
import { InterviewerSection } from "./InterviewerSection";
import InterviewSection from "./InterviewSection";
import { useEffect, useState } from "react";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useAlert from "@/hooks/useAlert";
import { getInterviewGroupById } from "@/apis/interviews/interviewGroups";

interface IInterviewGroupProps {
	groupId: number;
	onClickEdit: () => void;
	onClickDelete: () => void;
	onClickOff: () => void;
}

export default function InterviewGroup({
	groupId,
	onClickEdit,
	onClickDelete,
	onClickOff,
}: IInterviewGroupProps) {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();

	const [interviewGroup, setInterviewGroup] = useState<IInterviewGroup>();

	const interviewGroupName = interviewGroup ? interviewGroup.interviewGroupName : "";
	const interviewers = interviewGroup ? interviewGroup.interviewers : [];

	useEffect(() => {
		fetchInterviewGroup();
	}, []);

	async function fetchInterviewGroup() {
		setLoading(true);
		try {
			const { data: group } = await getInterviewGroupById(groupId);
			setInterviewGroup(group);
		}
		catch (ex) {
			setAlert({
				message: "Xảy ra lỗi khi load dữ liệu Nhóm phỏng vấn",
				severity: "error"
			})
		}
		finally {
			setLoading(false);
		}
	}

	return (
		<main className="p-4 pt-2 col-span-2 flex flex-col gap-6 rounded-t-lg border overflow-hidden shadow-sm bg-white">
			<header className="h-14 flex items-center justify-between">
				<h1 className="flex gap-4 text-lg">
					<span className=" font-semibold text-primary">
						Nhóm phỏng vấn
					</span>
					{interviewGroupName}
				</h1>
				<section className="flex gap-4 items-center">
					<IconButton
						name="edit"
						onClick={onClickEdit}
						tooltip="Chỉnh sửa"
					/>
					<IconButton
						name="trash"
						onClick={onClickDelete}
						tooltip="Xóa"
					/>
					<IconButton
						name="xmark"
						onClick={onClickOff}
						tooltip="Tắt"
					/>
				</section>
			</header>
			<InterviewerSection
				interviewers={interviewers}
			/>
			<InterviewSection
				key={groupId}
				interviewGroupId={groupId}
			/>
		</main>
	)
}
