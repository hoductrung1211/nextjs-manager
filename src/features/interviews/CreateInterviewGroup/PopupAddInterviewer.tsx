"use client";
import { getAllDepartments } from "@/apis/masterData/departments";
import { getAllEmployeeRoleTypes } from "@/apis/masterData/employeeRoleTypes";
import { getAllEmployees } from "@/apis/masterData/employees";
import IconButton from "@/components/IconButton";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import IDepartment from "@/models/Department";
import IEmployee from "@/models/Employee";
import IEmployeeRoleType from "@/models/EmployeeRoleType";
import { Autocomplete, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

interface IPopupAddInterviewerProps {
	onCancel: () => void;
	onConfirm: (interviewer: IEmployee) => void;
}

export default function PopupAddInterviewer({
	onCancel,
	onConfirm,
}: IPopupAddInterviewerProps) {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();

	const [departments, setDepartments] = useState<IDepartment[]>([]);
	const [roles, setRoles] = useState<IEmployeeRoleType[]>([]);
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedRole, setSelectedRole] = useState("");
	const [selectedEmployee, setSelectedEmployee] = useState("");

	const [employeeOptions, setEmployeeOptions] = useState<{ label: string }[]>([]);
	const employeeInfo = getEmployeeInfo();


	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		setLoading(true);
		try {
			const { data: departmentRes } = await getAllDepartments();
			setDepartments(departmentRes);

			const { data: EmployeeRoleTypeRes } = await getAllEmployeeRoleTypes();
			setRoles(EmployeeRoleTypeRes);

			const { data: employeeRes } = await getAllEmployees();
			setEmployees(employeeRes);

			const eeOptions = employeeRes.map(ee => ({
				label: ee.employeeId + " - " + ee.fullName
			}));
			setEmployeeOptions(eeOptions);
		}
		catch (ex) {
			setAlert({
				message: "Xảy ra lỗi khi load dữ liệu! Vui lòng thử lại.",
				severity: "error"
			});
		}
		finally {
			setLoading(false);
		}
	}

	function handleDepartmentChange(e: SelectChangeEvent<string>) {
		const departmentId = e.target.value;
		setSelectedDepartment(departmentId);

		handleFilterEmployees(departmentId, selectedRole);
	}

	function handleRoleTypeChange(e: SelectChangeEvent<string>) {
		const roleId = e.target.value;
		setSelectedRole(roleId);

		handleFilterEmployees(selectedDepartment, roleId);
	}

	function handleEmployeeChange(e: SyntheticEvent<Element, Event>, value: { label: string } | null) {
		setSelectedEmployee(value?.label ?? "");
	}

	function handleFilterEmployees(departmentId: string, roleId: string) {
		setEmployeeOptions(employees
			.filter(ee => {
				const isDeparmtentValid = departmentId == "" || ee.department.departmentId + "" == departmentId;
				const isRoleValid = roleId == "" || ee.employeeRoleType.employeeRoleTypeId + "" == roleId;

				return isDeparmtentValid && isRoleValid;
			})
			.map(ee => ({
				label: ee.employeeId + " - " + ee.fullName
			}))
		);
	}

	function getEmployeeInfo() {
		const employee = employees.find(ee => ee.employeeId + "" == selectedEmployee.split(" - ")[0]);

		if (employee)
			return ([
				{
					label: "Mã nhân viên",
					value: employee.employeeId
				},
				{
					label: "Họ tên nhân viên",
					value: employee.fullName
				},
				{
					label: "Phòng ban",
					value: employee.department.departmentName
				},
				{
					label: "Chức vụ",
					value: employee.employeeRoleType.employeeRoleTypeName
				},
				{
					label: "Nơi làm việc",
					value: employee.workSite.workSiteName
				}, 
			])

		return undefined;
	}

	function handleConfirm() {
		const interviewer = employees.find(ee => ee.employeeId + "" == selectedEmployee.split(" - ")[0]);

		if (interviewer) {
			onConfirm(interviewer);
		}
		else {
			setAlert({
				message: "Bạn chưa chọn Người phỏng vấn!",
				severity: "warning"
			});
		}
	}

	return (
		<section className="w-[800px] flex flex-col bg-white rounded-lg">
			<header className="h-14 px-6 flex items-center">
				<h2 className="font-semibold text-lg text-primary">
					Thêm người phỏng vấn
				</h2>
			</header>

			<main className="mx-4 p-4 flex flex-col gap-6 border bg-gray-50">
				<section className="flex gap-4">
					<FormControl size="small" fullWidth>
						<FormLabel>Phòng ban</FormLabel>
						<Select
							className="bg-white"
							value={selectedDepartment}
							onChange={handleDepartmentChange}
						>
							<MenuItem value="">Tất cả</MenuItem>
							{departments.map(department => (
								<MenuItem value={department.departmentId}>{department.departmentName}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl size="small" fullWidth>
						<FormLabel>Chức vụ</FormLabel>
						<Select
							className="bg-white"
							value={selectedRole}
							onChange={handleRoleTypeChange}
						>
							<MenuItem value="">Tất cả</MenuItem>
							{roles.map(role => (
								<MenuItem value={role.employeeRoleTypeId}>{role.employeeRoleTypeName}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth size="small">
						<FormLabel>Nhân viên</FormLabel>
						<Autocomplete
							className="bg-white"
							size="small"
							renderInput={(params) => <TextField {...params} value={selectedEmployee} />}
							options={employeeOptions}
							onChange={handleEmployeeChange}
						/>
					</FormControl>
				</section>
				{employeeInfo && (
					<section className="p-4 border rounded-md bg-white">
						<h2 className="font-semibold">Thông tin nhân viên</h2>
						<div className="mt-2 flex flex-col gap-3">
							{employeeInfo.map(info => (
								<div className="flex ">
									<p className="w-40">
										{info.label}
									</p>
									{info.value}
								</div>
							))}
						</div>
					</section>
				)}
			</main>

			<footer className="h-14 px-6 flex items-center justify-end gap-6">
				<IconButton
					name="xmark"
					tooltip="Hủy"
					onClick={onCancel}
				/>
				<IconButton
					name="check"
					tooltip="Thêm nhân công"
					onClick={handleConfirm}
				/>
			</footer>
		</section>
	)
}