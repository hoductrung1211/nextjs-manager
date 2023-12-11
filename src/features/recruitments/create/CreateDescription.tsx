'use client';
import { getAllContractTypes } from "@/apis/masterDatas/contractTypes";
import { getAllEmployeeRoleTypes } from "@/apis/masterDatas/employeeRoleTypes";
import { getAllExperiences } from "@/apis/masterDatas/experiences";
import { getAllQualifications } from "@/apis/masterDatas/qualifications";
import { getAllSkills } from "@/apis/masterDatas/skills";
import { getAllWorkSites } from "@/apis/masterDatas/workSite";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import IContractType from "@/models/ContractType";
import IEmployeeRoleType from "@/models/EmployeeRoleType";
import IExperience from "@/models/Experience";
import IQualification from "@/models/Qualification";
import ISkill from "@/models/Skill";
import IWorkSite from "@/models/WorkSite";
import { Box, Chip, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Theme, } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

export interface ICreateDescriptionProps {
  roleId: string;
  onChangeRole: (e: SelectChangeEvent) => void;
  isRoleError: boolean;
  setIsRoleError: (newValue: boolean) => void;

  qualificationId: string;
  onChangeQualification: (e: SelectChangeEvent) => void;
  isQualificationError: boolean;
  setIsQualificationError: (newValue: boolean) => void;

  contractTypeId: string;
  onChangeContractType: (e: ChangeEvent<HTMLInputElement>) => void;
  isContractTypeError: boolean;
  setIsContractTypeError: (newValue: boolean) => void;

  experienceId: string;
  onChangeExperience: (e: ChangeEvent<HTMLInputElement>) => void;
  isExperienceError: boolean;
  setExperienceError: (newValue: boolean) => void;

  workSiteId: string;
  onChangeWorkSite: (e: SelectChangeEvent) => void;
  isWorkSiteError: boolean;
  setIsWorkSiteError: (newValue: boolean) => void;

  selectedSkills: ISkill[];
  onChangeSelectedSkills: (e: SelectChangeEvent<ISkill[]>) => void;
  isSkillsError: boolean;
  setIsSkillsError: (newValue: boolean) => void;

  minSalary: string;
  onChangeMinSalary: (e: ChangeEvent<HTMLInputElement>) => void;
  isMinSalaryError: boolean;
  setIsMinSalaryError: (newValue: boolean) => void;

  maxSalary: string;
  onChangeMaxSalary: (e: ChangeEvent<HTMLInputElement>) => void;
  isMaxSalaryError: boolean;
  setIsMaxSalaryError: (newValue: boolean) => void;
}

export default function CreateDescription({
  roleId,
  onChangeRole,
  isRoleError,
  setIsRoleError,

  qualificationId,
  onChangeQualification,
  isQualificationError,
  setIsQualificationError,

  contractTypeId,
  onChangeContractType,
  isContractTypeError,
  setIsContractTypeError,

  experienceId,
  onChangeExperience,
  isExperienceError,
  setExperienceError,

  workSiteId,
  onChangeWorkSite,
  isWorkSiteError,
  setIsWorkSiteError,

  selectedSkills,
  onChangeSelectedSkills,
  isSkillsError,
  setIsSkillsError,

  minSalary,
  onChangeMinSalary,
  isMinSalaryError,
  setIsMinSalaryError,

  maxSalary,
  onChangeMaxSalary,
  isMaxSalaryError,
  setIsMaxSalaryError,
}: ICreateDescriptionProps) {
  const [roles, setRoles] = useState<IEmployeeRoleType[]>([]);
  const [qualifications, setQualifications] = useState<IQualification[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [contractTypes, setContractTypes] = useState<IContractType[]>([]);
  const [workSites, setWorkSites] = useState<IWorkSite[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);

  const setLoading = useLoadingAnimation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: rolesRes } = await getAllEmployeeRoleTypes();
      const { data: qualificationsRes } = await getAllQualifications();
      const { data: contractTypesRes } = await getAllContractTypes();
      const { data: workSitesRes } = await getAllWorkSites();
      const { data: skillsRes } = await getAllSkills();
      const { data: experiencesRes } = await getAllExperiences();

      setRoles(rolesRes);
      setQualifications(qualificationsRes);
      setContractTypes(contractTypesRes);
      setWorkSites(workSitesRes);
      setSkills(skillsRes);
      setExperiences(experiencesRes);
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setLoading(false);
    }
  }

  const handleBlurRole = () => {
    if (roleId == "")
      setIsRoleError(true);
    else setIsRoleError(false);
  }

  const handleBlurQualification = () => {
    if (qualificationId == "")
      setIsQualificationError(true);
    else setIsQualificationError(false);
  }

  const handleBlurExperience = () => {
    if (experienceId == "")
      setExperienceError(true);
    else setExperienceError(false);
  }

  const handleBlurContractType = () => {
    if (contractTypeId == "")
      setIsContractTypeError(true);
    else setIsContractTypeError(false);
  }

  const handleBlurWorkSite = () => {
    if (workSiteId == "")
      setIsWorkSiteError(true);
    else setIsWorkSiteError(false);
  }

  const handleBlurMinSalary = () => {
    if (minSalary.trim() == "")
      setIsMinSalaryError(true);
    else setIsMinSalaryError(false);
  }

  const handleBlurMaxSalary = () => {
    if (maxSalary.trim() == "")
      setIsMaxSalaryError(true);
    else setIsMaxSalaryError(false);
  }

  return (
    <div className="relative max-h-[520px] p-8 pb-20 flex flex-col gap-8 rounded-md shadow-sm border overflow-y-auto overflow-x-hidden bg-white">
      <FormControl fullWidth variant="outlined" error={isRoleError}>
        <InputLabel className="bg-white" id="role-label">Vai trò</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={roleId}
          onChange={onChangeRole}
          onBlur={handleBlurRole}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {roles.map(r => (
            <MenuItem value={r.employeeRoleTypeId}>{r.employeeRoleTypeName}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" error={isQualificationError}>
        <InputLabel className="bg-white" id="qualification-label">Yêu cầu bằng cấp</InputLabel>
        <Select
          labelId="qualification-label"
          id="qualification"
          value={qualificationId}
          onChange={onChangeQualification}
          onBlur={handleBlurQualification}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {qualifications.map(q => (
            <MenuItem value={q.qualificationId}>{q.qualificationName}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth error={isExperienceError}>
        <FormLabel id="contract-label">Kinh nghiệm</FormLabel>
        <RadioGroup
          className="pl-5"
          aria-labelledby="experience-label"
          name="experience-group"
          value={experienceId}
          onChange={onChangeExperience}
          onBlur={handleBlurExperience}
        >
          {experiences.map(e => (
            <FormControlLabel value={e.experienceId} control={<Radio />} label={e.experienceName} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth error={isContractTypeError}>
        <FormLabel id="contract-type-label">Loại hợp đồng</FormLabel>
        <RadioGroup
          className="pl-5"
          aria-labelledby="contract-type-label"
          name="contract-type-group"
          value={contractTypeId}
          onChange={onChangeContractType}
          onBlur={handleBlurContractType}
        >
          {contractTypes.map(c => (
            <FormControlLabel value={c.contractTypeId} control={<Radio />} label={c.contractTypeName} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth error={isWorkSiteError}>
        <FormLabel id="work-site-label">Nơi làm việc</FormLabel>
        <RadioGroup
          className="pl-5"
          row aria-labelledby="work-site-label"
          name="work-site-group"
          value={workSiteId}
          onChange={onChangeWorkSite}
          onBlur={handleBlurWorkSite}
        >
          {workSites.map(w => (
            <FormControlLabel value={w.workSiteId} control={<Radio />} label={w.workSiteName} />
          ))}
        </RadioGroup>
      </FormControl>

      <MultipleSelectSkillsChip
        skills={skills}
        selectedSkills={selectedSkills}
        onChangeSelectedSkills={onChangeSelectedSkills}
      />

      <div className="flex gap-5">
        <TextField
          className="text-align-last-right"
          label="Khung lương tối thiểu"
          id="min-salary"
          type="number"
          value={minSalary}
          onChange={onChangeMinSalary}
          InputProps={{
            endAdornment: <InputAdornment position="start">000 VND</InputAdornment>,
          }}
          error={isMinSalaryError}
          onBlur={handleBlurMinSalary}
        />
        <TextField
          className="text-align-last-right"
          label="Khung lương tối đa"
          id="max-salary"
          type="number"
          value={maxSalary}
          onChange={onChangeMaxSalary}
          InputProps={{
            endAdornment: <InputAdornment position="start">000 VND</InputAdornment>,
          }}
          error={isMaxSalaryError}
          onBlur={handleBlurMaxSalary}
        />
      </div>
    </div>
  )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function MultipleSelectSkillsChip({
  skills,
  selectedSkills,
  onChangeSelectedSkills
}: {
  skills: ISkill[],
  selectedSkills: ISkill[],
  onChangeSelectedSkills: (event: SelectChangeEvent<ISkill[]>) => void;
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="skill-label">Kỹ năng</InputLabel>
      <Select
        labelId="skill-chip-label"
        id="skill-chip"
        multiple
        value={selectedSkills}
        onChange={onChangeSelectedSkills}
        input={<OutlinedInput id="select-skill-chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((skill) => (
              <Chip key={skill.skillId} label={skill.skillName} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {skills.map((skill) => (
          <MenuItem // TODO: Change this from ISkill type into string (skill ID)
            key={skill.skillId}
            value={skill}
          >
            {skill.skillName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}