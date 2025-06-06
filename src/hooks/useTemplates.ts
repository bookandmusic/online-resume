"use client";

import { useEffect, useState } from "react";

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
      .then((res) => res.json())
      .then(setTemplates);
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

export function useTemplateHtml(templateName: string) {
  const [templateHtml, setTemplateHtml] = useState<string>("");

  useEffect(() => {
    fetch(`/api/templates/${templateName}`)
      .then((res) => res.json())
      .then((data) => {
        setTemplateHtml(data.html);
      });
  }, [templateName]);

  return {
    templateHtml,
  };
}
