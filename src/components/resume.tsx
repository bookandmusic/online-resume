"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  baseInfoFields,
  baseInfoFieldsMap,
  defaultResumeData,
  educationFields,
  experienceFields,
  getEducationFieldLabel,
  getEducationNamePath,
  getExperienceFieldLabel,
  getExperienceName,
  getProjectFieldLabel,
  getProjectFieldNamePath,
  getProjectHighlightPath,
  getResponsibilityNamePath,
  projectField,
  resumeSchema,
  textareas,
} from "@/lib/resume";
import {
  BaseInfoField,
  EducationField,
  ExperienceField,
  ProjectField,
  ResumeData,
} from "@/types/resume";

function AutoInput({
  keyName,
  field,
}: {
  keyName: EducationField | ExperienceField | BaseInfoField | ProjectField;
  field: React.ComponentProps<"input"> | React.ComponentProps<"textarea">;
}) {
  if (textareas.includes(keyName)) {
    return <Textarea {...(field as React.ComponentProps<"textarea">)} />;
  } else {
    return <Input {...(field as React.ComponentProps<"input">)} />;
  }
}

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
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>头像</FormLabel>
              <FormControl>
                <div className="flex flex-col items-start gap-2">
                  {field.value && (
                    <Image
                      src={field.value}
                      alt="头像预览"
                      width={96} // 24*4
                      height={96}
                      className="rounded-full object-cover border"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        form.setValue("avatar", url);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {baseInfoFields.map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{baseInfoFieldsMap[fieldName]}</FormLabel>
                <FormControl>
                  <AutoInput keyName={fieldName} field={field}></AutoInput>
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
              {educationFields.map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={getEducationNamePath(index, key)}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getEducationFieldLabel(key)}</FormLabel>
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
                      major: "",
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
              {experienceFields.map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={getExperienceName(i, key)}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getExperienceFieldLabel(key)}</FormLabel>
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
                      name={getResponsibilityNamePath(i, j)}
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
              {projectField.map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={getProjectFieldNamePath(i, key)}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getProjectFieldLabel(key)}</FormLabel>
                      <FormControl>
                        <AutoInput keyName={key} field={field}></AutoInput>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {form.watch(`projects.${i}.highlights`).map((_, j) => {
                const items = form.getValues(`projects.${i}.highlights`);
                return (
                  <div key={j} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={getProjectHighlightPath(i, j)}
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
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeData,
  });

  const { renderedHtml } = useTemplateHtml(templateName, resumeData);

  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && renderedHtml) {
      const doc = iframeRef.current.contentDocument;
      if (!doc) return;

      doc.open();
      doc.write(renderedHtml);
      doc.close();
    }
  }, [renderedHtml]);

  const handlePreview = () => {
    form
      .handleSubmit((data) => {
        setResumeData(data);
        sheetCloseRef.current?.click();
      })()
      .catch(() => {
        toast.error("用户信息保存失败，请检查输入");
      });
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
