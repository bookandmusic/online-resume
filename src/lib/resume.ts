import { z } from "zod";

import {
  BaseInfoField,
  EducationField,
  EducationNamePath,
  ExperienceField,
  ExperienceNamePath,
  ProjectField,
  ProjectHighlightPath,
  ProjectNamePath,
  ResponsibilityPath,
} from "@/types/resume";

export const defaultResumeData = {
  avatar: "/avatar.svg",
  name: "张三",
  birth: "1990-01",
  gender: "男",
  marriage: "未婚",
  email: "zhangsan@example.com",
  phone: "123-456-7890",
  location: "北京市",
  website: "https://zhangsan.dev",
  money: "面议",
  job: "前端工程师",
  summary:
    "热爱前端开发，具有良好的工程思维与产品意识，熟悉 React、Vue、TypeScript 等技术栈。",

  skills: ["JavaScript", "TypeScript", "React", "Vue", "HTML/CSS", "Git"],

  experiences: [
    {
      position: "前端工程师",
      company: "字节跳动",
      duration: "2022.06 - 至今",
      responsibilities: [
        { value: "负责主站前端功能开发与维护，优化页面性能，提升用户体验。" },
        { value: "参与设计系统的建设，提高开发效率与组件复用率。" },
        { value: "协同产品与后端团队推进项目迭代。" },
      ],
    },
  ],

  education: [
    {
      degree: "本科",
      major: "计算机科学与技术",
      school: "清华大学",
      duration: "2018.09 - 2022.06",
    },
  ],

  projects: [
    {
      title: "在线简历生成器",
      duration: "2023.08 - 2023.10",
      description:
        "一个基于 React + TailwindCSS + React Hook Form 构建的简历生成平台，支持导出 PDF。",
      highlights: [
        { value: "使用 React Hook Form 管理复杂嵌套表单状态。" },
        { value: "支持多段经历、技能等模块动态增删。" },
        { value: "使用 Vite 进行构建，优化打包体积与启动速度。" },
      ],
    },
  ],
};

export const resumeSchema = z.object({
  name: z.string().min(1, "请输入姓名"),
  avatar: z.string().url("请输入正确的头像链接"),
  birth: z.string().min(1, "请输入出生日期"),
  gender: z.string().min(1, "请输入性别"),
  marriage: z.string().min(1, "请输入婚姻状况"),
  email: z.string().email("请输入正确的邮箱"),
  phone: z.string().min(1, "请输入电话"),
  location: z.string().min(1, "请输入地址"),
  website: z.string().url("请输入正确的网址"),
  money: z.string().min(1, "请输入求职意向"),
  job: z.string().min(1, "请输入期望职位"),
  summary: z.string().min(1, "请输入简介"),
  education: z.array(
    z.object({
      degree: z.string().min(1, "请输入学位"),
      school: z.string().min(1, "请输入学校"),
      duration: z.string().min(1, "请输入时间"),
      major: z.string().min(1, "请输入专业"),
    }),
  ),
  experiences: z.array(
    z.object({
      position: z.string().min(1, "请输入职位"),
      company: z.string().min(1, "请输入公司"),
      duration: z.string().min(1, "请输入时间"),
      responsibilities: z.array(
        z.object({ value: z.string().min(1, "请输入职责") }),
      ),
    }),
  ),
  projects: z.array(
    z.object({
      title: z.string().min(1, "请输入标题"),
      duration: z.string().min(1, "请输入时间"),
      description: z.string().min(1, "请输入描述"),
      highlights: z.array(z.object({ value: z.string().min(1, "请输入亮点") })),
    }),
  ),
});

export const baseInfoFields: BaseInfoField[] = [
  "name",
  "birth",
  "gender",
  "marriage",
  "email",
  "phone",
  "location",
  "website",
  "summary",
  "job",
  "money",
];
export const baseInfoFieldsMap: Record<BaseInfoField, string> = {
  name: "姓名",
  birth: "出生日期",
  gender: "性别",
  marriage: "婚姻状况",
  email: "邮箱",
  phone: "电话",
  location: "地址",
  website: "网站",
  summary: "个人简介",
  job: "职位",
  money: "薪资",
};

// 教育
export const educationFields: EducationField[] = [
  "degree",
  "major",
  "school",
  "duration",
];
export const educationFieldMap: Record<EducationField, string> = {
  degree: "学历",
  major: "专业",
  school: "学校",
  duration: "时间",
};
export function getEducationFieldLabel(field: EducationField): string {
  return educationFieldMap[field];
}
export function getEducationNamePath(
  index: number,
  field: EducationField,
): EducationNamePath {
  return `education.${index}.${field}`;
}

// 工作经历
export const experienceFields: ExperienceField[] = [
  "position",
  "company",
  "duration",
];
export const experienceFieldMap: Record<ExperienceField, string> = {
  position: "职位",
  company: "公司",
  duration: "时间",
};

export function getExperienceFieldLabel(field: ExperienceField): string {
  return experienceFieldMap[field];
}

export function getExperienceName(
  index: number,
  field: ExperienceField,
): ExperienceNamePath {
  return `experiences.${index}.${field}`;
}

export function getResponsibilityNamePath(
  experienceIndex: number,
  responsibilityIndex: number,
): ResponsibilityPath {
  return `experiences.${experienceIndex}.responsibilities.${responsibilityIndex}.value`;
}

// 项目
export const projectField: ProjectField[] = [
  "title",
  "duration",
  "description",
];

export const projectFieldMap: Record<ProjectField, string> = {
  title: "标题",
  duration: "时间",
  description: "描述",
};

export function getProjectFieldLabel(field: ProjectField): string {
  return projectFieldMap[field];
}
export function getProjectFieldNamePath(
  projectIndex: number,
  field: ProjectField,
): ProjectNamePath {
  return `projects.${projectIndex}.${field}`;
}

export function getProjectHighlightPath(
  projectIndex: number,
  highlightIndex: number,
): ProjectHighlightPath {
  return `projects.${projectIndex}.highlights.${highlightIndex}.value`;
}

export const textareas: (
  | EducationField
  | ExperienceField
  | BaseInfoField
  | ProjectField
)[] = ["summary", "description"];
