export type ResumeData = {
  name: string;
  avatar: string;
  birth: string;
  gender: string;
  marriage: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  job: string;
  money: string;
  summary: string;
  education: {
    degree: string;
    school: string;
    duration: string;
    major: string;
  }[];
  experiences: {
    position: string;
    company: string;
    duration: string;
    responsibilities: { value: string }[];
  }[];
  projects: {
    title: string;
    duration: string;
    description: string;
    highlights: { value: string }[];
  }[];
};

// 基本信息
export type BaseInfoField =
  | "name"
  | "birth"
  | "gender"
  | "marriage"
  | "email"
  | "phone"
  | "location"
  | "website"
  | "summary"
  | "job"
  | "money";

// 教育
export type EducationField = "degree" | "major" | "school" | "duration";
export type EducationNamePath = `education.${number}.${EducationField}`;

// 经历
export type ExperienceField = "position" | "company" | "duration";
export type ExperienceNamePath = `experiences.${number}.${ExperienceField}`;
// 单条职责字段路径
export type ResponsibilityPath =
  `experiences.${number}.responsibilities.${number}.value`;

// 项目
export type ProjectField = "title" | "duration" | "description";
export type ProjectNamePath = `projects.${number}.${ProjectField}`;
// 单条项目亮点字段路径
export type ProjectHighlightPath =
  `projects.${number}.highlights.${number}.value`;
