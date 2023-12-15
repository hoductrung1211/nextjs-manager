"use client";
import { createRecruitment } from "@/apis/recruitments/recruitments";
import { CustomTabPanel } from "@/components/mui/Tab";
import CreateDescription from "@/features/recruitments/create/CreateDescription";
import CreateRequisition from "@/features/recruitments/create/CreateRequisition";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import MainContentContainer from "@/layouts/MainContentContainer";
import ISkill from "@/models/Skill";
import {
  Button,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import PageContainer from "@/layouts/PageContainer";

const steps = ["Đơn tuyển dụng", "Mô tả công việc"];

export default function Page() {
  // Requisition
  const [recruitmentTitle, setRecruitmentTitle] = useState("React.js Developer");
  const [departmentId, setDepartmentId] = useState("6");
  const [numberOfPosition, setNumberOfPosition] = useState("2");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().add(1, 'month'));
  const [jobJustificationId, setJobJustificationId] = useState("1");
  // const [selectedCriterias, setSelectedCriterias] = useState<string[]>([
  //   "1",
  //   "2",
  //   "3",
  // ]);

  // Requisition Error
  const [isTitleError, setIsTitleError] = useState(false);
  const [isDepartmentError, setIsDepartmentError] = useState(false);
  const [isNumberOfPositionError, setIsNumberOfPositionError] = useState(false);
  const [isStartDateError, setIsStartDateError] = useState(false);
  const [isReasonError, setIsReasonError] = useState(false);

  // Description
  const [eeRoleTypeId, setEeRoleTypeId] = useState("3");
  const [qualificationId, setQualificationId] = useState("3");
  const [contractTypeId, setContractTypeId] = useState("1");
  const [experienceId, setExperienceId] = useState("1");
  const [workSiteId, setWorkSiteId] = useState("1");
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);
  const [minSalary, setMinSalary] = useState("7000");
  const [maxSalary, setMaxSalary] = useState("9000");

  // Requisition Error
  const [isRoleError, setIsRoleError] = useState(false);
  const [isQualificationError, setIsQualificationError] = useState(false);
  const [isContractTypeError, setIsContractTypeError] = useState(false);
  const [isExperienceError, setExperienceError] = useState(false);
  const [isWorkSiteError, setIsWorkSiteError] = useState(false);
  const [isSkillsError, setIsSkillsError] = useState(false);
  const [isMinSalaryError, setIsMinSalaryError] = useState(false);
  const [isMaxSalaryError, setIsMaxSalaryError] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const setAlert = useAlert();
  const setLoading = useLoadingAnimation();
  const router = useRouter();

  const handleNext = () => {
    if (activeStep == 0) {
      if (validateRequisition())
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      else {
        setAlert({
          message: "Please fill all text fields!",
          severity: "error",
        });
      }
    }

    if (activeStep == steps.length - 1) {
      if (validateDescription()) {
        handleCreateRecruitment();
      } else {
        setAlert({
          message: "Create Recruitment failed!",
          severity: "error",
        });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateRequisition = (): boolean => {
    const isTitleValid = recruitmentTitle.trim().length > 0;
    const isDepartmentSelected = departmentId != "";
    const isValidNumber = !Number.isNaN(Number.parseInt(numberOfPosition));
    const isValidDate = startDate != null;
    const isReasonSelected = jobJustificationId != "";

    setIsTitleError(!isTitleValid);
    setIsDepartmentError(!isDepartmentSelected);
    setIsNumberOfPositionError(!isValidNumber);
    setIsStartDateError(!isValidDate);
    setIsReasonError(!isReasonSelected);

    return (
      isTitleValid &&
      isDepartmentSelected &&
      isValidNumber &&
      isValidDate &&
      isReasonSelected
    );
  };

  const validateDescription = (): boolean => {
    const isRoleSelected = eeRoleTypeId != "";
    const isQualificationSelected = qualificationId != "";
    const isContractTypeSelected = contractTypeId != "";
    const isExperienceSelected = experienceId != "";
    const isWorkSiteSelected = workSiteId != "";
    const isMinSalaryValid = minSalary.trim() != "";
    const isMaxSalaryValid = maxSalary.trim() != "";

    setIsRoleError(!isRoleSelected);
    setIsQualificationError(!isQualificationSelected);
    setIsContractTypeError(!isContractTypeSelected);
    setExperienceError(!isExperienceSelected);
    setIsWorkSiteError(!isWorkSiteSelected);
    setIsMinSalaryError(!isMinSalaryValid);
    setIsMaxSalaryError(!isMaxSalaryValid);

    return (
      isRoleSelected &&
      isQualificationSelected &&
      isContractTypeSelected &&
      isExperienceSelected &&
      isWorkSiteSelected &&
      isMinSalaryValid &&
      isMaxSalaryValid
    );
  };

  async function handleCreateRecruitment() {
    setLoading(true);
    try {
      await createRecruitment({
        recruitmentTitle,
        departmentId: Number.parseInt(departmentId),
        jobJustificationId: Number.parseInt(jobJustificationId),
        numberOfPosition: Number.parseInt(numberOfPosition),
        startDate: startDate?.toDate() ?? new Date(),
        jobDescription: {
          qualificationId: Number.parseInt(qualificationId),
          contractTypeId: Number.parseInt(contractTypeId),
          employeeRoleTypeId: Number.parseInt(eeRoleTypeId),
          experienceId: Number.parseInt(experienceId),
          workSiteId: Number.parseInt(workSiteId),
          minSalary: Number.parseInt(minSalary) * 1_000,
          maxSalary: Number.parseInt(maxSalary) * 1_000,
          skillIds: [...selectedSkills.map((skill) => skill.skillId)],
        },
      });

      setAlert({
        message: "Tạo Đợt tuyển dụng thành công!",
        severity: "success",
      });
      router.push("./");
    } catch (ex) {
      
      setAlert({
        message: "Tạo Đợt tuyển dụng thất bại!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer
      breadcrumbs={[
        {
          text: "Trang chủ",
          href: "",
        },
        {
          text: "Đợt tuyển dụng",
          href: "/recruitments",
        },
        {
          text: "Tạo mới",
        },
      ]}
    >
      <MainContentContainer>
        <Stepper className="mx-auto h-14 flex gap-8" activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <section className="mt-2 flex justify-between p-8 gap-10 bg-gray-50 rounded-lg">
          <main className="flex-shrink-0 w-1/2">
            <CustomTabPanel index={0} value={activeStep}>
              <CreateRequisition
                title={recruitmentTitle}
                onChangeTitle={(event: ChangeEvent<HTMLInputElement>) =>
                  setRecruitmentTitle(event.target.value)
                }
                isTitleError={isTitleError}
                setIsTitleError={setIsTitleError}
                departmentId={departmentId}
                onChangeDepartment={(e: SelectChangeEvent) =>
                  setDepartmentId(e.target.value)
                }
                isDepartmentError={isDepartmentError}
                setIsDepartmentError={setIsDepartmentError}
                numberOfPosition={numberOfPosition}
                onChangeNumberOfPosition={(
                  event: ChangeEvent<HTMLInputElement>
                ) => {
                  const value = event.target.value;
                  const numberValue = Number.parseInt(value);

                  if ((numberValue > 0 && numberValue <= 50) || value == "")
                    setNumberOfPosition(value);
                }}
                isNumberOfPositionError={isNumberOfPositionError}
                setIsNumberOfPositionError={setIsNumberOfPositionError}
                reasonId={jobJustificationId}
                onChangeReason={(e: SelectChangeEvent) =>
                  setJobJustificationId(e.target.value)
                }
                isStartDateError={isStartDateError}
                setIsStartDateError={setIsStartDateError}
                startDate={startDate}
                onChangeStartDate={(newDate: Dayjs | null) => {
                  setStartDate(newDate);
                }}
                isReasonError={isReasonError}
                setIsReasonError={setIsReasonError}
                // selectedCriterias={selectedCriterias}
                // onChangeSelectedCriterias={(e) => {
                //   if (!e.target.checked) {
                //     if (selectedCriterias.length <= 3) {
                //       setAlert({
                //         message: "There must be at least 3 criterias selected.",
                //         severity: "warning",
                //       });
                //     } else
                //       setSelectedCriterias(
                //         selectedCriterias.filter((c) => c != e.target.name)
                //       );
                //   } else {
                //     setSelectedCriterias([...selectedCriterias, e.target.name]);
                //   }
                // }}
              />
            </CustomTabPanel>
            <CustomTabPanel index={1} value={activeStep}>
              <CreateDescription
                roleId={eeRoleTypeId}
                onChangeRole={(e) => setEeRoleTypeId(e.target.value)}
                isRoleError={isRoleError}
                setIsRoleError={setIsRoleError}
                qualificationId={qualificationId}
                onChangeQualification={(e) =>
                  setQualificationId(e.target.value)
                }
                isQualificationError={isQualificationError}
                setIsQualificationError={setIsQualificationError}
                experienceId={experienceId}
                onChangeExperience={(e) => setExperienceId(e.target.value)}
                isExperienceError={isExperienceError}
                setExperienceError={setExperienceError}
                contractTypeId={contractTypeId}
                onChangeContractType={(e) => setContractTypeId(e.target.value)}
                isContractTypeError={isContractTypeError}
                setIsContractTypeError={setIsContractTypeError}
                workSiteId={workSiteId}
                onChangeWorkSite={(e) => setWorkSiteId(e.target.value)}
                isWorkSiteError={isWorkSiteError}
                setIsWorkSiteError={setIsWorkSiteError}
                selectedSkills={selectedSkills}
                onChangeSelectedSkills={(e) => {
                  const value = e.target.value;
                  if (typeof value != "string") {
                    setSelectedSkills(value);
                  }
                }}
                minSalary={minSalary}
                onChangeMinSalary={(e) => {
                  const value = e.target.value;
                  const numberValue = Number.parseInt(value);

                  if (numberValue < 1) setMinSalary("0");
                  else if (numberValue > 250000) setMinSalary("250000");
                  else setMinSalary(value);
                }}
                isMinSalaryError={isMinSalaryError}
                setIsMinSalaryError={setIsMinSalaryError}
                maxSalary={maxSalary}
                onChangeMaxSalary={(e) => {
                  const value = e.target.value;
                  const numberValue = Number.parseInt(value);

                  if (numberValue < 1) setMaxSalary("0");
                  else if (numberValue > 250000) setMaxSalary("250000");
                  else setMaxSalary(value);
                }}
                isMaxSalaryError={isMaxSalaryError}
                setIsMaxSalaryError={setIsMaxSalaryError}
                isSkillsError={isSkillsError}
                setIsSkillsError={setIsSkillsError}
              />
            </CustomTabPanel>
          </main>

          <aside className="w-2/5 h-[540px] mx-auto flex flex-col justify-between">
            <CustomTabPanel index={0} value={activeStep}>
              <Typography variant="h6">Đơn tuyển dụng</Typography>
              <Typography sx={{ marginTop: "12px" }} variant="body1">
                Yêu cầu tuyển dụng là một yêu cầu hoặc tài liệu chính thức do
                một bộ phận trong tổ chức khởi xướng để lấp đầy một vị trí còn
                trống. Bước quan trọng này trong quá trình tuyển dụng đóng vai
                trò là điểm khởi đầu để thu hút nhân tài mới, phác thảo các chi
                tiết cụ thể về cơ hội việc làm.
              </Typography>
            </CustomTabPanel>
            <CustomTabPanel index={1} value={activeStep}>
              <Typography variant="h6">Mô tả công việc</Typography>
              <Typography sx={{ marginTop: "12px" }} variant="body1">
                Bản mô tả công việc là một tài liệu chính thức bằng văn bản nêu
                rõ các nhiệm vụ, trách nhiệm, trình độ chuyên môn và các chi
                tiết khác liên quan đến một công việc hoặc vị trí cụ thể trong
                một tổ chức. Nó phục vụ như một hướng dẫn toàn diện cho cả người
                tìm việc và nhân viên hiện tại, cung cấp sự hiểu biết rõ ràng về
                những kỳ vọng và yêu cầu liên quan đến vai trò này.
              </Typography>
            </CustomTabPanel>

            <div className="ml-auto flex gap-6">
              <Button
                color="inherit"
                disabled={activeStep == 0}
                onClick={handleBack}
              >
                Trở lại
              </Button>
              <Button onClick={handleNext}>
                {activeStep === 1 ? "Hoàn thành" : "Tiếp tục"}
              </Button>
            </div>
          </aside>
        </section>
      </MainContentContainer>
    </PageContainer>
  );
}
