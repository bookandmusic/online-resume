"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Handlebars from "handlebars";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useTemplateHtml } from "@/hooks/useTemplates";
import { defaultResumeData } from "@/lib/default-resume-data";

export type ResumeData = {
  name: string;
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

const resumeSchema = z.object({
  name: z.string().min(1, "请输入姓名"),
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

export function ResumeForm({
  data,
  form: externalForm,
}: {
  data: ResumeData;
  form?: ReturnType<typeof useForm<z.infer<typeof resumeSchema>>>;
}) {
  const internalForm = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: data,
  });

  const form = externalForm || internalForm;
  const educationArray = useFieldArray({
    control: form.control,
    name: "education",
  });
  const expArray = useFieldArray({
    control: form.control,
    name: "experiences",
  });
  const projArray = useFieldArray({ control: form.control, name: "projects" });

  return (
    <Form {...form}>
      <form className="space-y-6">
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="text-red-500 text-sm">请检查表单中的错误</div>
        )}

        {(
          [
            "name",
            "email",
            "phone",
            "location",
            "website",
            "summary",
            "job",
            "money",
          ] as const
        ).map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldName === "summary"
                    ? "简介"
                    : fieldName === "name"
                      ? "姓名"
                      : fieldName === "email"
                        ? "邮箱"
                        : fieldName === "location"
                          ? "地址"
                          : fieldName === "website"
                            ? "网站"
                            : fieldName === "job"
                              ? "求职意向"
                              : fieldName === "money"
                                ? "期望薪资"
                                : "电话"}
                </FormLabel>
                <FormControl>
                  {fieldName === "summary" ? (
                    <Textarea {...field} />
                  ) : (
                    <Input {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* 教育经历 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">教育经历</h2>
          {educationArray.fields.map((item, index) => (
            <div key={item.id} className="space-y-2 border p-2 rounded">
              {(["degree", "school", "duration"] as const).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={
                    `education.${index}.${field}` as `education.${number}.${
                      | "degree"
                      | "school"
                      | "duration"}`
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.includes("degree")
                          ? "学位"
                          : field.name.includes("school")
                            ? "学校"
                            : "时间"}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex justify-center gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-24 py-2"
                  onClick={() => educationArray.remove(index)}
                  disabled={educationArray.fields.length === 1}
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-24 py-2"
                  onClick={() =>
                    educationArray.append({
                      degree: "",
                      school: "",
                      duration: "",
                    })
                  }
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 工作经历 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">工作经历</h2>
          {expArray.fields.map((exp, i) => (
            <div key={exp.id} className="space-y-2 border p-2 rounded">
              {(["position", "company", "duration"] as const).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={`experiences.${i}.${field}` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.includes("position")
                          ? "职位"
                          : field.name.includes("company")
                            ? "公司"
                            : "时间"}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {form.watch(`experiences.${i}.responsibilities`).map((_, j) => {
                const resps = form.getValues(
                  `experiences.${i}.responsibilities`,
                );
                return (
                  <div key={j} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={
                        `experiences.${i}.responsibilities.${j}.value` as const
                      }
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>职责 {j + 1}</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Textarea {...field} className="flex-1" />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  const updated = [...resps];
                                  updated.splice(j, 1);
                                  form.setValue(
                                    `experiences.${i}.responsibilities`,
                                    updated,
                                  );
                                }}
                                disabled={resps.length === 1}
                              >
                                <Minus className="h-5 w-5" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  form.setValue(
                                    `experiences.${i}.responsibilities`,
                                    [
                                      ...form.getValues(
                                        `experiences.${i}.responsibilities`,
                                      ),
                                      { value: "" },
                                    ],
                                  )
                                }
                              >
                                <Plus className="h-5 w-5" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
              <div className="flex justify-center gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-24 py-2"
                  onClick={() => expArray.remove(i)}
                  disabled={expArray.fields.length === 1}
                >
                  <Minus className="h-6 w-6" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-24 py-2"
                  size="icon"
                  onClick={() =>
                    expArray.append({
                      position: "",
                      company: "",
                      duration: "",
                      responsibilities: [{ value: "" }],
                    })
                  }
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 项目经历 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">项目经历</h2>
          {projArray.fields.map((proj, i) => (
            <div key={proj.id} className="space-y-2 border p-2 rounded">
              {(["title", "duration"] as const).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={
                    `projects.${i}.${field}` as
                      | `projects.${number}.title`
                      | `projects.${number}.duration`
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.includes("title") ? "标题" : "时间"}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name={`projects.${i}.description` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>描述</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch(`projects.${i}.highlights`).map((_, j) => {
                const items = form.getValues(`projects.${i}.highlights`);
                return (
                  <div key={j} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`projects.${i}.highlights.${j}.value` as const}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>亮点 {j + 1}</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Textarea {...field} className="flex-1" />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  const updated = [...items];
                                  updated.splice(j, 1);
                                  form.setValue(
                                    `projects.${i}.highlights`,
                                    updated,
                                  );
                                }}
                                disabled={items.length === 1}
                              >
                                <Minus className="h-6 w-6" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  form.setValue(`projects.${i}.highlights`, [
                                    ...form.getValues(
                                      `projects.${i}.highlights`,
                                    ),
                                    { value: "" },
                                  ])
                                }
                              >
                                <Plus className="h-6 w-6" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
              <div className="flex justify-center gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-24 py-2"
                  onClick={() => projArray.remove(i)}
                  disabled={projArray.fields.length === 1}
                >
                  <Minus className="h-6 w-6" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-24 py-2"
                  onClick={() =>
                    projArray.append({
                      title: "",
                      duration: "",
                      description: "",
                      highlights: [{ value: "" }],
                    })
                  }
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
}

export default function TemplateDetail({
  templateName,
}: {
  templateName: string;
}) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const form = useForm<ResumeData>({
    // 使用 useForm 创建 form 实例
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeData,
  });

  const [renderedHtml, setRenderedHtml] = useState<string>("");
  const { templateHtml } = useTemplateHtml(templateName);
  const template = Handlebars.compile(templateHtml);
  const rendered = template(resumeData);

  useEffect(() => {
    setRenderedHtml(rendered);
  }, [rendered]);

  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && renderedHtml) {
      const doc = iframeRef.current.contentDocument;
      if (!doc) return;

      // 清空内容
      doc.open();
      doc.close();

      // 构建 <html>
      const htmlEl = doc.documentElement;
      htmlEl.innerHTML = renderedHtml;
    }
  }, [renderedHtml]);

  const handlePreview = () => {
    form.handleSubmit((data) => {
      setResumeData(data);
      sheetCloseRef.current?.click();
    })();
  };

  const handleDownloadPdf = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.print();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full p-5">
      <div className="flex flex-col w-full max-w-[800px] flex-1">
        <div className="flex-1 rounded-lg shadow-lg overflow-y-auto border scroll-smooth">
          <iframe
            id="resumeIframe"
            ref={iframeRef}
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex justify-end gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button>更新用户信息</Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-[800px]">
                <SheetHeader>
                  <SheetTitle>个人信息</SheetTitle>
                  <SheetDescription>
                    编辑个人的信息，以生成简历
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 p-4 overflow-y-auto">
                  <ResumeForm data={resumeData} form={form} />
                </div>
                <SheetFooter>
                  <SheetClose ref={sheetCloseRef} className="hidden" />
                  <Button
                    type="button"
                    variant="default"
                    onClick={handlePreview}
                  >
                    预览
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Button onClick={handleDownloadPdf} variant="default">
              下载 PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
