import { getServerSession } from "next-auth";

import { InnerLayout } from "@/components/layout";
import TemplateDetail from "@/components/resume";
import { authOptions } from "@/lib/auth/next-auth.config";

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const session = await getServerSession(authOptions);

  return (
    <InnerLayout session={session}>
      <TemplateDetail templateName={name} />
    </InnerLayout>
  );
}
