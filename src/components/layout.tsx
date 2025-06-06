import { Session } from "next-auth";

import Header from "./header";

export function InnerLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <Header session={session} />

      {/* 中间内容 */}
      <main className="flex-1 flex">{children}</main>

      {/* 底部页脚 */}
      <footer className="text-center py-4 border-t border-gray-300 dark:border-gray-700">
        © 2025 | 精品简历模板 | 版权所有
      </footer>
    </div>
  );
}
