// app/api/templates/route.ts
import fs from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  const templatesDir = path.join(process.cwd(), 'public/templates')

  let entries: string[]
  try {
    entries = await fs.readdir(templatesDir)
  } catch {
    return NextResponse.json({ error: 'Failed to read templates directory' }, { status: 500 })
  }

  const templates = []

  for (const entry of entries) {
    const templatePath = path.join(templatesDir, entry)
    const stat = await fs.stat(templatePath)
    if (!stat.isDirectory()) continue

    const indexPath = path.join(templatePath, 'index.html')
    try {
      await fs.access(indexPath)
    } catch {
      continue // skip if index.html not found
    }

    // 查找封面图
    const coverCandidates = ['cover.png', 'cover.jpg', 'cover.jpeg', 'cover.webp']
    let cover = ''
    for (const name of coverCandidates) {
      const filePath = path.join(templatePath, name)
      try {
        await fs.access(filePath)
        cover = `/templates/${entry}/${name}`
        break
      } catch {}
    }

    templates.push({
      id: entry,
      name: entry, // 目前用文件夹名作为名称
      previewUrl: `/templates/${entry}`, // 页面地址
      coverUrl: cover || '/default-cover.png', // 封面图路径
    })
  }

  return NextResponse.json(templates)
}
