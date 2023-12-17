import Icon from "@/components/Icon"
import IEmployee from "@/models/Employee"

export function InterviewerSection({
	interviewers,
}: {
	interviewers: IEmployee[]
}) {
	return (
		<section className="flex flex-col gap-4">
			<h3 className="font-semibold text-lg">Thành viên trong hội đồng</h3>
			<div className="py-6 flex flex-col gap-6 bg-gray-50 rounded-md border">
				{
					interviewers.map(interviewer => (
						<div key={interviewer.employeeId} className="px-6 grid grid-cols-10">
							<Icon className="inline-block w-10 text-center" name="user" />
							<p className="col-span-2 font-semibold">
								{interviewer.fullName}
							</p>
							<p className="col-span-1 text-apple-gray font-semibold">
								#{interviewer.employeeId}
							</p>
							<p className="col-span-3">
								{interviewer.employeeRoleType.employeeRoleTypeName}
							</p>
							<p className="col-span-3">
								Phòng ban: {interviewer.department.departmentName}
							</p>
						</div>
					))
				}
			</div>
		</section>
	)
}