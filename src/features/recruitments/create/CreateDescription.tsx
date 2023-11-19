'use client';
import { IContractType, IEmployeeRoleType, IQualification, ISkill, IWorkSite, getAllContractTypes, getAllEmployeeRoleTypes, getAllQualifications, getAllSkills, getAllWorkSites } from "@/apis/masterData";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import { useTheme } from "@emotion/react";
import { Box, Chip, FormControl, FormControlLabel, FormLabel,  InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Theme, } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

export interface ICreateDescriptionProps {
  roleId: string;
  onChangeRole: (e: SelectChangeEvent) => void;

  qualificationId: string;
  onChangeQualification: (e: SelectChangeEvent) => void;

  contractTypeId: string;
  onChangeContractType: (e: ChangeEvent<HTMLInputElement>) => void;

  workSiteId: string;
  onChangeWorkSite: (e: SelectChangeEvent) => void;

  skillIds: number[];

  minSalary: string;
  onChangeMinSalary: (e: ChangeEvent<HTMLInputElement>) => void;

  maxSalary: string;
  onChangeMaxSalary: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateDescription({
  roleId,
  onChangeRole,
  qualificationId,
  onChangeQualification,
  contractTypeId,
  onChangeContractType,
  workSiteId,
  onChangeWorkSite,
  skillIds,
  minSalary,
  onChangeMinSalary,
  maxSalary,
  onChangeMaxSalary,
}: ICreateDescriptionProps) {
  const [roles, setRoles] = useState<IEmployeeRoleType[]>([]);
  const [qualifications, setQualifications] = useState<IQualification[]>([]);
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
      
      setRoles(rolesRes);
      setQualifications(qualificationsRes);
      setContractTypes(contractTypesRes);
      setWorkSites(workSitesRes);
      setSkills(skillsRes);

      console.log(skills)
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative max-h-[520px] p-8 pb-20 flex flex-col gap-8 rounded-md shadow-sm border overflow-y-auto overflow-x-hidden bg-white">
      <FormControl fullWidth variant="outlined">
        <InputLabel className="bg-white" id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={roleId}
          onChange={onChangeRole}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {roles.map(r => (
            <MenuItem value={r.id}>{r.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel className="bg-white" id="qualification-label">Qualification</InputLabel>
        <Select
            labelId="qualification-label"
            id="qualification"
            value={qualificationId}
            onChange={onChangeQualification}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {qualifications.map(q => (
            <MenuItem value={q.id}>{q.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel id="contract-type-label">Contract Type</FormLabel>
        <RadioGroup 
          className="pl-5"
          aria-labelledby="contract-type-label"
          name="contract-type-group"
          value={contractTypeId}
          onChange={onChangeContractType}
        >
          {contractTypes.map(c => (
            <FormControlLabel value={c.id} control={<Radio />} label={c.name} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel id="work-site-label">Work Site</FormLabel>
        <RadioGroup 
          className="pl-5"
          row aria-labelledby="work-site-label"
          name="work-site-group"
          value={workSiteId}
          onChange={onChangeWorkSite}
        >
          {workSites.map(w => (
            <FormControlLabel value={w.id} control={<Radio />} label={w.name} />
          ))}
        </RadioGroup>
      </FormControl>

      <MultipleSelectSkillsChip skills={skills} />
    
      <div className="flex gap-5">
        <TextField
          label="Min Salary"
          id="min-salary"
          type="number"
          value={minSalary}
          onChange={onChangeMinSalary}
          InputProps={{
            endAdornment: <InputAdornment position="start">000 VND</InputAdornment>,
          }}
        />
        <TextField
          label="Max Salary"
          id="max-salary"
          type="number"
          value={maxSalary}
          onChange={onChangeMaxSalary}
          InputProps={{
            endAdornment: <InputAdornment position="start">000 VND</InputAdornment>,
          }}
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
      minWidth: 250,
    },
  },
}; 

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectSkillsChip({
  skills
}: {
  skills: ISkill[]
}) {
  const theme = useTheme();
  const [selectedSkills, setSelectedSkills] =  useState<string[]>([]);
  console.log(skills);

  const handleChange = (event: SelectChangeEvent<typeof selectedSkills>) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(
      typeof value === 'string' ? value.split(',') : value,
    );
  }; 

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="skill-label">Skills</InputLabel>
        <Select
          labelId="skill-chip-label"
          id="skill-chip"
          multiple
          value={selectedSkills}
          onChange={handleChange}
          input={<OutlinedInput id="select-skill-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {skills.map((skill) => (
            <MenuItem
              key={skill.skillId}
              value={skill.skillId}
              style={getStyles(skill.skillId + "", selectedSkills, theme)}
            >
              {skill.skillName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}