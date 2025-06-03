import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import LoginForm from "@/components/login-form";
import { authOptions } from "@/lib/auth/next-auth.config";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin");
  }
  return (
    <LoginForm />
  );
}
