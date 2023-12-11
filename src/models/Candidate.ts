import IExperience from "./Experience";
import IQualification from "./Qualification";
import ISkill from "./Skill";
import IUser from "./User";

export default interface ICandidate {
    candidateId: number;
    user: IUser;
    bio?: string;
    qualification: IQualification;
    experience: IExperience;
    school?: string;
    skills: ISkill[];
    avatarURL?: string;
    CVLink?: string;
}