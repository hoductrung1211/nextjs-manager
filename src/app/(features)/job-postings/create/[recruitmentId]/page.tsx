"use client";
import { EnumJobPostingStatus, createJobPosting } from "@/apis/jobPostings/jobPosting";
import { getRecruitmentById } from "@/apis/recruitments/recruitments";
import IconFieldInfo from "@/components/IconFieldInfo";
import { Textarea } from "@/components/Textarea";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import MainContentContainer from "@/layouts/MainContentContainer";
import PageContainer from "@/layouts/PageContainer";
import { IRecruitment } from "@/models/Recruitment";
import { Button, Chip, FormControl, FormControlLabel, FormHelperText, Switch, TextField, } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { isAxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({
    params: { recruitmentId },
}: {
    params: {
        recruitmentId: number;
    }
}) {
    const [recruitment, setRecruitment] = useState<IRecruitment>();
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();
    const router = useRouter();

    const [title, setTitle] = useState("Intern Front-end Reactjs"); 
    const [isTitleError, setIsTitleError] = useState(false);
    const [content, setContent] = useState("Nắm chắc kiến thức về HTML, CSS, JavaScript và Reactjs");
    const [isContentError, setIsContentError] = useState(false);
    const [deadline, setDeadline] = useState<Dayjs | null>();
    const [isDeadlineError, setIsDeadlineError] = useState(false);
    const [isPublish, setIsPublish] = useState(true);

    useEffect(() => {
        fetchRecruitment();
    }, []);

    async function fetchRecruitment() {
        setLoading(true);
        try {
            const { data } = await getRecruitmentById(recruitmentId);
            setRecruitment(data);
        }
        catch (error) {
            if (isAxiosError(error))
                setAlert({
                    message: error?.message ?? "",
                    severity: "error"
                })
        }
        finally {
            setLoading(false);
        }
    }

    async function handleCreateJobPosting() {
        if (!validate()) {
            setAlert({
                message: "Vui lòng nhập đầy đủ thông tin",
                severity: "error"
            })
            return;
        }

        setLoading(true);
        try {
            await createJobPosting({
                recruitmentId,
                jobPostingTitle: title,
                responsibilities: content,
                deadline: deadline?.toDate() ?? dayjs().add(1, 'month').toDate(),
                jobPostingStatusId: isPublish ? EnumJobPostingStatus.Active : EnumJobPostingStatus.Draft,
            });

            setAlert({
                message: "Tạo bài đăng tuyển thành công",
                severity: "success"
            });

            router.push(`/recruitments/${recruitmentId}`)
        }
        catch (ex) {
            if (isAxiosError(ex)) {
                setAlert({
                    message: ex.message,
                    severity: "error"
                });
            }
        }
        finally {
            setLoading(false);
        }
    }

    function validate(): boolean {
        let isAllOK = true;

        if (title.trim().length < 3) {
            setIsTitleError(true);
            isAllOK = false;
        }

        if (content.trim().length < 20) {
            setIsContentError(true);
            isAllOK = false;
        }

        if (deadline == null) {
            setIsDeadlineError(true);
            isAllOK = false;
        }

        return isAllOK;
    }

    return (
        <PageContainer breadcrumbs={[
            {
                text: "Trang chủ",
                href: ""
            },
            {
                text: "Bài đăng tuyển",
                href: ""
            },
            {
                text: "Tạo mới"
            }
        ]} >
            <MainContentContainer >
                <div className="h-full pt-3 pb-6 flex flex-col gap-5 ">
                    <h1 className="mx-auto text-xl">Tạo bài đăng tuyển dụng</h1>
                    <div className=" h-full p-8 flex gap-6 bg-content  rounded-lg">
                        <section className="w-2/3 flex flex-col gap-3 ">
                            <h2 className="text-lg">Điền thông tin Bài đăng tuyển dụng</h2>
                            <div className=" p-5 flex flex-col gap-8 border bg-white rounded-md">
                                <FormControl fullWidth>
                                    <TextField
                                        id="job-posting-title-text-field"
                                        required
                                        label="Tiêu đề bài đăng tuyển"
                                        value={title}
                                        onChange={e => {
                                            setTitle(e.target.value);
                                            setIsTitleError(false);
                                        }}
                                        helperText="Ví dụ: Thực tập sinh front-end Reactjs"
                                        error={isTitleError}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <Textarea
                                        minRows={4}
                                        className={isContentError ? "border-alizarin hover:border-alizarin focus:border-alizarin" : "border-[#B0B8C4]"}
                                        placeholder="Nội dung bài đăng tuyển"
                                        value={content}
                                        onChange={e => {
                                            setContent(e.target.value);
                                            setIsContentError(false);
                                        }}
                                    />
                                    <FormHelperText>Ví dụ: Chi tiết công việc, Yêu cầu công việc, Quyền lợi, Thông tin tham khảo, Nơi làm việc, v.v...</FormHelperText>
                                </FormControl>

                                <DatePicker
                                    label="Hạn cuối nộp hồ sơ"
                                    format="DD/MM/YYYY"
                                    minDate={dayjs().add(1, "week")}
                                    value={deadline}
                                    onChange={value => {
                                        setDeadline(value);
                                        setIsDeadlineError(false);
                                    }}
                                    slotProps={{
                                        textField: {
                                            helperText: isDeadlineError ? "Vui lòng chọn ngày hạn cuối nộp hồ sơ" : "",
                                        },
                                      }}
                                /> 
                            </div>
                            <div className="mt-10 flex gap-5 justify-end items-center">
                                <FormControl>
                                    <FormControlLabel control={<Switch checked={isPublish} onChange={e => setIsPublish(e.target.checked)} />} label="Công khai" />
                                </FormControl>

                                <Button
                                    variant="outlined"
                                    onClick={handleCreateJobPosting}
                                >
                                    Tạo
                                </Button>
                            </div>
                        </section>

                        <section className="w-1/3 flex flex-col gap-3 ">
                            <h2 className="text-lg">Thông tin Mô tả công việc</h2>
                            <div className=" p-5 flex flex-col gap-8 border bg-white rounded-md">
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
                            </div>
                        </section>
                    </div>
                </div>
            </MainContentContainer>
        </PageContainer>
    )
}