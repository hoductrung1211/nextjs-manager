'use client';
import RecruitmentContainer from "../RecruitmentContainer"; 
import RecruitmentInfo from "./RecruitmentInfo";
import JobRequisitionDetail from "./JobRequisitionDetail";
import JobDescriptionDetail from "./JobDescriptionDetail";
import { useEffect, useState } from "react";
import { IDetailRecruitment, getRecruitmentById } from "@/apis/recruitments/recruitments";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";

export default function RecruitmentBasicInfo({
    id
}: {
    id: string
}) {
    const [recruitment, setRecruitment] = useState<IDetailRecruitment>();
    const setLoading = useLoadingAnimation();

    useEffect(() => {
        fetchRecruitment();
    }, []);

    async function fetchRecruitment() {
        setLoading(true);
        try {
            const { data } = await getRecruitmentById(id);
            setRecruitment(data);
            console.log(data);
        }
        catch (ex) {
            
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <RecruitmentContainer>
            <div className="h-full p-4 flex gap-4 overflow-auto">
                <section className="w-full h-screen flex flex-col gap-4 rounded-md">
                    <JobRequisitionDetail />
                    <JobDescriptionDetail />
                </section>
                <RecruitmentInfo />
            </div>
        </RecruitmentContainer>
    )
}

 