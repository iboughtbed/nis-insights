import { SiteFooter } from "~/components/layouts/site-footer";
import { SiteHeader } from "~/components/layouts/site-header";
import { getServerAuthSession } from "~/lib/auth";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerAuthSession();

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={session?.user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
