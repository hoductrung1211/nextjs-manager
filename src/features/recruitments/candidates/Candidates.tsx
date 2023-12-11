"use client";
import PersonalInfoSection from "./PersonalInfoSection";
import ProfileSection from "./ProfileSection";
import ApplicationList from "./ApplicationList";
import { useState } from "react";
import IApplicationSubmission from "@/models/ApplicationSubmission";
import { Button } from "@mui/material";
import useAlert from "@/hooks/useAlert";
import { EnumApplicationStatus, updateApplication } from "@/apis/applicationSubmissions/applicationSubmission";

interface IcandidatesProps {
    recruitmentId: number;
}

export default function Candidates({
    recruitmentId,
}: IcandidatesProps) {
    const setAlert = useAlert();

    const [key, setKey] = useState(0);
    const [selectedCandidate, setSelectedCandidate] = useState<IApplicationSubmission>();

    async function handleUpdate(isApproved: boolean) {
        if (!selectedCandidate)
            return;

        try {
            const status = isApproved ?
                EnumApplicationStatus.InterviewScheduled :
                EnumApplicationStatus.Rejected;

            await updateApplication(selectedCandidate?.applicationSubmissionId, {
                applicationStatusId: status
            });

            setKey(key + 1);

            setAlert({
                message: (isApproved ? "Duyệt" : "Từ chối") + " thành công!",
                severity: "success"
            });

            setSelectedCandidate(undefined);
        }
        catch (ex) {
            setAlert({
                message: "Xảy ra lỗi!",
                severity: "success"
            });
        }
    }

    return (
        <main className="pt-8 p-4 grid grid-cols-3 items-start gap-5 bg-content">
            <ApplicationList
                key={key}
                recruitmentId={recruitmentId}
                onClickApplication={setSelectedCandidate}
            />

            {selectedCandidate ?
                <section className="col-span-2 flex flex-col gap-4 p-4 border rounded-lg bg-content shadow-sm">
                    <PersonalInfoSection
                        key={selectedCandidate?.applicationSubmissionId + "1"}
                        candidate={selectedCandidate?.candidate}
                    />
                    <ProfileSection
                        key={selectedCandidate?.applicationSubmissionId + "2"}
                        candidate={selectedCandidate?.candidate}
                    />

                    {
                        selectedCandidate.applicationStatus.applicationStatusId == 1 &&
                        <footer className="flex justify-end items-center gap-6">
                            <Button
                                className="text-alizarin"
                                color="error"
                                variant="outlined"
                                onClick={() => handleUpdate(false)}
                            >
                                Từ chối
                            </Button>
                            <Button
                                className="min-w-[92px] bg-primary"
                                variant="contained"
                                onClick={() => handleUpdate(true)}
                            >
                                Duyệt
                            </Button>
                        </footer>
                    }
                </section> :
                <section className="col-span-2 h-full grid place-items-center text-apple-gray-2">
                    Chọn 1 ứng viên bất kỳ để hiên thị thông tin chi tiết
                </section>
            }
        </main>
    )
}