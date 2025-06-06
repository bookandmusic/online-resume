export const defaultResumeData = {
  name: "张三",
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
      degree: "计算机科学与技术 本科",
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
