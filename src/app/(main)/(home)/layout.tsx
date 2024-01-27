import { PreloadResources } from "./preload-resources";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <PreloadResources />
      {children}
    </>
  );
}
