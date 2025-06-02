// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth.config";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>首页</h1>
      <p>欢迎你：{session?.user?.email}</p>
    </div>
  );
}
