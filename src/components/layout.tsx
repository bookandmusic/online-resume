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
      <main className="flex-grow px-6 py-8">{children}</main>

      {/* 底部页脚 */}
      <footer className="text-center py-4 border-t border-gray-300 dark:border-gray-700">
        © 2025 你的公司名称
      </footer>
    </div>
  );
}
