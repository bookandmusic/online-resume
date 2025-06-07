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
    // 解释：
    // 1. 捕获 href= 或 src=
    // 2. 使用 ["'] 引号
    // 3. 跳过以 http(s):, //, / 开头的路径
    // 4. 跳过以 {{ 开头的 Handlebars 模板变量
    // 5. 匹配相对路径（支持 ./、../、xxx）
    /(href|src)=["']((?!https?:\/\/|\/\/|\/|\{\{)[^"']+)["']/g,
    (_, attr, relPath) => {
      const normalized = new URL(relPath, `https://dummy.com${baseUrl}/`)
        .pathname;
      return `${attr}="${normalized}"`;
    },
  );
  const detail = {
    name: name,
    html: fixedHtml,
  };
  return NextResponse.json(detail);
}
