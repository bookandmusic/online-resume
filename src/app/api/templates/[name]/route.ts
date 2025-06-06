import fs from "fs/promises";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<Record<string, string>> },
) {
  const { name } = await params;
  const indexPath = path.join(
    process.cwd(),
    "public/templates",
    typeof name == "string" ? name : "default",
    "index.html",
  );

  let templateHtml = "";
  try {
    templateHtml = await fs.readFile(indexPath, "utf-8");
  } catch {
    return notFound();
  }

  // 替换资源相对路径（JS、CSS、图片等）
  const baseUrl = `/templates/${name}`;
  const fixedHtml = templateHtml.replace(
    /(href|src)=["'](?!https?:\/\/|\/\/|\/)([^"']+)["']/g,
    (_, attr, relPath) => `${attr}="${baseUrl}/${relPath}"`,
  );
  const detail = {
    name: name,
    html: fixedHtml,
  };
  return NextResponse.json(detail);
}
