"use client";
import IconButton from "@/components/IconButton";
import { Button, FormControl, TextField } from "@mui/material";
import { use, useState } from "react";

interface IEditInterviewGroupProps {
	group: number;
	handleCancel: () => void;
    handleSave: () => void;
}

export default function EditInterviewGroup({
	group,
	handleCancel,
	handleSave,
}: IEditInterviewGroupProps) {
    const [groupName, setGroupName] = useState("Nhóm phỏng vấn buổi sáng");

	const [employees, setEmployees] = useState([
		1, 2, 3, 4
	]);

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
					/>
				</section>

				<section className="leading-14 flex flex-col ">
					<div className="grid grid-cols-11  px-2 gap-2  font-semibold">
						<p className="col-span-1">STT</p>
						<p className="col-span-3">Họ và tên</p>
						<p className="col-span-3">Phòng ban</p>
						<p className="col-span-3">Chức vụ</p>
						<p className="col-span-1">Chức năng</p>
					</div>
					{
						employees.map(ee => (
							<div key={ee} className="grid grid-cols-11  px-2 gap-2 even:bg-white">
								<p className="col-span-1">STT</p>
								<p className="col-span-3">Họ và tên {ee}</p>
								<p className="col-span-3">Phòng ban</p>
								<p className="col-span-3">Chức vụ</p>
								<div className="col-span-1 flex items-center justify-center">
									<IconButton
										name="xmark"
										tooltip="Xóa"
										onClick={e => setEmployees(employees.filter(emp => emp != ee))}
									/>
								</div>
							</div>
						))
					}
				</section>
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