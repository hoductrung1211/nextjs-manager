"use client";
import { getRecruitmentById } from "@/apis/recruitments/recruitments";
import Icon from "@/components/Icon";
import IconFieldInfo from "@/components/IconFieldInfo";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import { RecruitmentProvider } from "@/hooks/useRecruitment";
import { IRecruitment } from "@/models/Recruitment";
import { getVNLocaleDateString } from "@/utils/functions/dateTimeHelper";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";

export default function RecruitmentInfo({
    recruitmentId,
}: {
    recruitmentId: number;
}) {
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();
    const [recruitment, setRecruitment] = useState<IRecruitment>();

    useEffect(() => {
        fetchRecruitment();
    }, []);

    async function fetchRecruitment() {
        setLoading(true);
        try {
            const { data } = await getRecruitmentById(recruitmentId);
            setRecruitment(data);
        } catch (ex) {
            setAlert({
                message: "Lấy thông tin Đợt tuyển dụng thất bại!",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="p-8 grid grid-cols-3 items-start gap-5 bg-content">
            <div className="col-span-2 p-5 pb-10 flex flex-col gap-8 border rounded-lg bg-white shadow-sm">
                <section className="flex flex-col gap-8 pb-8 border-b">
                    <h1 className="text-2xl font-semibold">
                        {recruitment?.recruitmentTitle}
                    </h1>
                    <IconFieldInfo title="Phòng ban" iconName="building">
                        {recruitment?.department?.departmentName}
                    </IconFieldInfo>
                    <IconFieldInfo
                        title="Số lượng cho vị trí tuyển dụng"
                        iconName="user-plus"
                    >
                        {recruitment?.numberOfPosition}
                    </IconFieldInfo>
                    <IconFieldInfo title="Dự kiến ngày Onboard" iconName="building">
                        {recruitment?.startDate && getVNLocaleDateString(recruitment?.startDate)}
                    </IconFieldInfo>
                    <IconFieldInfo title="Lý do tuyển dụng" iconName="recycle">
                        {recruitment?.jobJustification.jobJustificationName}
                    </IconFieldInfo>
                </section>
                <section className="flex flex-col gap-8">
                    <h2 className="text-lg">Mô tả công việc</h2>
                    <IconFieldInfo
                        title="Vai trò"
                        iconName="user-tie"
                    >
                        {recruitment?.jobDescription.employeeRoleType.employeeRoleTypeName}
                    </IconFieldInfo>
                    <IconFieldInfo title="Loại hợp đồng" iconName="briefcase">
                        {recruitment?.jobDescription.contractType.contractTypeName}
                    </IconFieldInfo>
                    <IconFieldInfo title="Nơi làm việc" iconName="building-user">
                        {recruitment?.jobDescription.workSite.workSiteName}
                    </IconFieldInfo>
                    <IconFieldInfo title="Khung lương" iconName="money-bill">
                        <Chip label={recruitment?.jobDescription.minSalary.toLocaleString() + " VND"} /> - <Chip label={recruitment?.jobDescription.maxSalary.toLocaleString() + " VND"} />
                    </IconFieldInfo>
                    <IconFieldInfo title="Yêu cầu kinh nghiệm" iconName="chart-simple">
                        {recruitment?.jobDescription.experience.experienceName}
                    </IconFieldInfo>
                    <IconFieldInfo title="Yêu cầu bằng cấp" iconName="user-graduate">
                        {recruitment?.jobDescription.qualification.qualificationName}
                    </IconFieldInfo>
                    <IconFieldInfo title="Yêu cầu kỹ năng" iconName="award">
                        <div className="flex flex-wrap gap-4">
                            {recruitment?.jobDescription.skills.map(skill => (
                                <Chip key={skill.skillId} label={skill.skillName} />
                            ))}
                        </div>
                    </IconFieldInfo>
                </section>
            </div>

            <section className="col-span-1 p-5 flex flex-col gap-8 border rounded-lg  bg-white shadow-sm">
                <IconFieldInfo title="Người tạo" iconName="user" direction="row">
                    {recruitment?.creatorName}
                </IconFieldInfo>
                <IconFieldInfo title="Ngày tạo" iconName="clock" direction="row">
                    {recruitment?.createdDateTime && getVNLocaleDateString(recruitment.createdDateTime)}
                </IconFieldInfo>
                <IconFieldInfo
                    title="Người duyệt"
                    iconName="user-check"
                    direction="row"
                >
                    {recruitment?.approverName}
                </IconFieldInfo>
                <IconFieldInfo
                    title="Chú thích"
                    iconName="note-sticky"
                    direction="row"
                >
                    {recruitment?.description}
                </IconFieldInfo>
                <IconFieldInfo
                    title="Trạng thái"
                    iconName="circle-nodes"
                    direction="row"
                >
                    <Chip label={recruitment?.recruitmentState.recruitmentStateName} />
                </IconFieldInfo>
            </section>
        </main>
    );
}

