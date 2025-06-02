// app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth.config";
import Link from "next/link";
import React from "react";
import Header from "@/components/header";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
   redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <Header session={ session} />

      <div className="flex flex-1">
        {/* 侧边栏 */}
        <aside className="w-64 bg-gray-200 dark:bg-gray-900 p-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/admin" className="hover:underline">仪表盘</Link>
            <Link href="/admin/test" className="hover:underline">测试页</Link>
          </nav>
        </aside>

        {/* 主体内容 */}
        <main className="flex-1 p-6 bg-white dark:bg-gray-950 text-black dark:text-white">
          {children}
        </main>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm text-gray-600 dark:text-gray-300">
        &copy; 2025 在线简历
      </footer>
    </div>
  );
}
