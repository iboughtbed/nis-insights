import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
// import { getServerAuthSession } from "~/server/auth";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  // const session = null;

  return (
    <div className="relative flex flex-col">
      <SiteHeader />
      <main className="relative flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
