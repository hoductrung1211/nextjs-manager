"use client";
import { getInterviewGroupById } from "@/apis/interviews/interviewGroups";
import IconButton from "@/components/IconButton";
import useAlert from "@/hooks/useAlert";
import useConfirm from "@/hooks/useConfirm";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useModal from "@/hooks/useModal";
import IEmployee from "@/models/Employee";
import { Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PopupAddInterviewer from "../CreateInterviewGroup/PopupAddInterviewer";

interface IEditInterviewGroupProps {
	groupId: number;
	onCancel: () => void;
	onSave: (groupName: string, interviewers: IEmployee[]) => void;
}

export default function EditInterviewGroup({
	groupId,
	onCancel,
	onSave,
}: IEditInterviewGroupProps) {
	const {
		setIsOpenModal,
		setModal,
	} = useModal();
	const setConfirm = useConfirm();
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();

	const [groupName, setGroupName] = useState("");
	const [interviewers, setInterviewers] = useState<IEmployee[]>([]);

	useEffect(() => {
		fetchInterviewGroup();
	}, []);

	function handleCancel() {
		setConfirm("Bạn đang chỉnh sửa, nếu trở lại thì nhóm phỏng vấn mới sẽ không được lưu", () => {
			onCancel();
		});
	}

	function handleSave() {
		setConfirm("Lưu vào hệ thống sự thay đổi của nhóm phỏng vấn?", () => {
			onSave(groupName, interviewers);
		});
	}

	function handleAddInterviewer(newInterviewer: IEmployee) {
		const isExisted = interviewers.findIndex(interviewer => interviewer.employeeId == newInterviewer.employeeId) >= 0;

		if (isExisted) {
			setAlert({
				message: "Nhân viên này đã nằm trong hội đồng phỏng vấn! Vui lòng chọn nhân viên khác",
				severity: "warning"
			});
			return;
		}

		setIsOpenModal(false);
		setInterviewers([
			...interviewers,
			newInterviewer
		]);
	}

	function handleRemoveInterviewer(interviewerId: number) {
		setInterviewers(interviewers.filter(interviewer => interviewer.employeeId != interviewerId));
	}

	async function fetchInterviewGroup() {
		setLoading(true);
		try {
			const { data: group } = await getInterviewGroupById(groupId);

			setGroupName(group.interviewGroupName);
			setInterviewers(group.interviewers);
		}
		catch (ex) {

		}
		finally {
			setLoading(false);
		}
	}

	return (
		<main className="col-span-2 p-4 flex flex-col gap-4 border rounded-md bg-white">
			<h1 className="text-lg text-primary font-semibold">Chỉnh sửa nhóm phỏng vấn</h1>
			<div className="min-h-[240px] p-4 flex flex-col gap-4 bg-gray-50 border">
				<FormControl>
					<TextField
						required
						className="bg-white"
						label="Tên nhóm phỏng vấn"
						value={groupName}
						onChange={e => setGroupName(e.target.value)}
					/>
				</FormControl>

				<section className="flex justify-between items-center font-semibold">
					<h2>Thành viên trong hội đồng phỏng vấn</h2>
					<IconButton
						name="plus"
						tooltip="Thêm người phỏng vấn"
						onClick={() => {
							setModal({
								children:
									<PopupAddInterviewer
										onCancel={() => setIsOpenModal(false)}
										onConfirm={handleAddInterviewer}
									/>
							});
							setIsOpenModal(true);
						}}
					/>
				</section>

				{interviewers.length ? (
					<section className="leading-14 flex flex-col ">
						<div className="grid grid-cols-11  px-2 gap-2  font-semibold">
							<p className="col-span-1">STT</p>
							<p className="col-span-3">Họ và tên</p>
							<p className="col-span-3">Phòng ban</p>
							<p className="col-span-3">Chức vụ</p>
							<p className="col-span-1">Chức năng</p>
						</div>
						{interviewers.map((interviewer, idx) => (
							<div
								key={interviewer.employeeId}
								className="grid grid-cols-11  px-2 gap-2 even:bg-white"
							>
								<p className="col-span-1">{idx + 1}</p>
								<p className="col-span-3">{interviewer.fullName}</p>
								<p className="col-span-3">{interviewer.department.departmentName}</p>
								<p className="col-span-3">{interviewer.employeeRoleType.employeeRoleTypeName}</p>
								<div className="col-span-1 flex items-center justify-center">
									<IconButton
										name="xmark"
										tooltip="Xóa"
										onClick={() => handleRemoveInterviewer(interviewer.employeeId)}
									/>
								</div>
							</div>
						))}
					</section>
				) : (
					<div className="h-20 grid place-items-center">
						<p className="text-apple-gray-2">Chưa có người phỏng vấn</p>
					</div>
				)}
			</div>
			<section className="flex justify-end gap-4">
				<Button
					className="text-dark"
					onClick={handleCancel}
				>
					Trở lại
				</Button>
				<Button
					onClick={handleSave}
				>
					Lưu
				</Button>
			</section>
		</main>
	)
}