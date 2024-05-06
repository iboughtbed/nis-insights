import type { Metadata } from "next";

import { Stack } from "./_components/stack";
import { StackSlider } from "./_components/stack-slider";

export const metadata: Metadata = {
  title: "Explore",
  description: "Explore our latest releases, articles and blogs",
};

export default function ExplorePage() {
  return (
    <div className="container">
      <div className="flex flex-col">
        <div className="relative pb-10 max-xl:pt-10">
          <Stack />
          <StackSlider />
        </div>
      </div>
    </div>
  );
}
