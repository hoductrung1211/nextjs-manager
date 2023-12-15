"use client"; 
import EmptyJobPosting from "./EmptyJobPosting";
import { useEffect, useState } from "react";
import IJobPosting from "@/models/JobPosting";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import { getJobPostingByRecruitmentId } from "@/apis/jobPostings/jobPosting";
import IconFieldInfo from "@/components/IconFieldInfo";
import { Chip } from "@mui/material";
import { getVNLocaleDateString } from "@/utils/functions/getLocaleDateString";

export default function JobPostingInfo({
    recruitmentId,
}: {
    recruitmentId: number;
}) {
    const [jobPosting, setJobPosting] = useState<IJobPosting>();
    const setLoading = useLoadingAnimation();

    useEffect(() => {
        fetchJobPosting();
    }, []);

    async function fetchJobPosting() {
        setLoading(true);
        try {
            const { data } = await getJobPostingByRecruitmentId(recruitmentId);
            setJobPosting(data);
        }
        catch (ex) {

        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            {jobPosting ?
                <main className="p-8 grid grid-cols-3 items-start gap-5  bg-content">
                    <div className="col-span-2 p-5 pb-10 flex flex-col gap-8 border rounded-lg bg-white shadow-sm">
                        <section className="flex flex-col gap-8 pb-8 border-b">
                            <h1 className="text-2xl font-semibold">
                                {jobPosting?.jobPostingTitle}
                            </h1>
                            <p>
                                {jobPosting?.responsibilities.split("\n").map(line => (
                                    <p>
                                        {line}
                                        <br />
                                    </p>
                                ))}

                            </p>
                            <IconFieldInfo title="Hạn cuối nộp hồ sơ" iconName="calendar-check">
                                {jobPosting?.deadline && getVNLocaleDateString(jobPosting?.deadline)}
                            </IconFieldInfo>
                        </section>
                        <section className="flex flex-col gap-8">
                            <h2 className="text-lg">Mô tả công việc</h2>
                            <IconFieldInfo
                                title="Vai trò"
                                iconName="user-tie"
                            >
                                {jobPosting?.jobDescription.employeeRoleType.employeeRoleTypeName}
                            </IconFieldInfo>
                            <IconFieldInfo title="Loại hợp đồng" iconName="briefcase">
                                {jobPosting?.jobDescription.contractType.contractTypeName}
                            </IconFieldInfo>
                            <IconFieldInfo title="Nơi làm việc" iconName="building-user">
                                {jobPosting?.jobDescription.workSite.workSiteName}
                            </IconFieldInfo>
                            <IconFieldInfo title="Khung lương" iconName="money-bill">
                                <Chip label={jobPosting?.jobDescription.minSalary.toLocaleString() + " VND"} /> - <Chip label={jobPosting?.jobDescription.maxSalary.toLocaleString() + " VND"} />
                            </IconFieldInfo>
                            <IconFieldInfo title="Yêu cầu kinh nghiệm" iconName="chart-simple">
                                {jobPosting?.jobDescription.experience.experienceName}
                            </IconFieldInfo>
                            <IconFieldInfo title="Yêu cầu bằng cấp" iconName="user-graduate">
                                {jobPosting?.jobDescription.qualification.qualificationName}
                            </IconFieldInfo>
                            <IconFieldInfo title="Yêu cầu kỹ năng" iconName="award">
                                <div className="flex flex-wrap gap-4">
                                    {jobPosting?.jobDescription.skills.map(skill => (
                                        <Chip key={skill.skillId} label={skill.skillName} />
                                    ))}
                                </div>
                            </IconFieldInfo>
                        </section>
                    </div>
                    <section className="col-span-1 p-5 flex flex-col gap-8 border rounded-lg  bg-white shadow-sm">
                        <IconFieldInfo title="Người tạo" iconName="user" direction="row">
                            {jobPosting?.publisherName}
                        </IconFieldInfo>
                        <IconFieldInfo title="Ngày tạo" iconName="clock" direction="row">
                            {jobPosting?.createdDateTime && getVNLocaleDateString(jobPosting.createdDateTime)}
                        </IconFieldInfo>
                        <IconFieldInfo
                            title="Trạng thái"
                            iconName="circle-nodes"
                            direction="row"
                        >
                            <Chip label={jobPosting?.jobPostingStatus.jobPostingStatusName} />
                        </IconFieldInfo>
                    </section>
                </main> :
                <EmptyJobPosting recruitmentId={recruitmentId} />
            }
        </>
    )
}

