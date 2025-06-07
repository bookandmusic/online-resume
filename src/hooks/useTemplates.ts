"use client";

import Handlebars from "handlebars";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ResumeData } from "@/types/resume";

import { usePagination } from "./usePagination";

export interface Template {
  id: string;
  name: string;
  previewUrl: string;
  coverUrl: string;
}

export function useTemplates(pageSize = 6) {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => {
        if (!res.ok) {
          // ❌ 主动抛出错误，终止 .then 链
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setTemplates)
      .catch((error) => {
        toast.error("获取简历模板失败", {
          description: error.message,
        });
      });
  }, []);

  const { page, setPage, totalPages, currentItems } = usePagination(
    templates,
    pageSize,
  );

  return {
    templates,
    currentItems,
    page,
    setPage,
    totalPages,
  };
}

export function useRenderHtml(templateHtml: string, resumeData: ResumeData) {
  return useMemo(() => {
    if (!templateHtml) return "";
    try {
      const template = Handlebars.compile(templateHtml);
      const html = template(resumeData);
      return html;
    } catch {
      return "";
    }
  }, [templateHtml, resumeData]);
}

export function useTemplateHtml(templateName: string, resumeData: ResumeData) {
  const [templateHtml, setTemplateHtml] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/templates/${templateName}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setTemplateHtml(data.html);
      })
      .catch((error) => {
        toast.error("获取简历模板失败", {
          description: error.message,
        });
        if (!cancelled) setTemplateHtml("");
      });

    return () => {
      cancelled = true;
    };
  }, [templateName]);

  const renderedHtml = useRenderHtml(templateHtml, resumeData);

  return {
    renderedHtml,
  };
}
