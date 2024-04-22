import { Separator } from "~/components/ui/separator";
import { Stack } from "./_components/stack";
import { StackSlider } from "./_components/stack-slider";

export default function ExplorePage() {
  return (
    <div className="container">
      <div className="flex flex-col">
        <div className="relative overflow-hidden pb-10 pt-8">
          <div className="flex flex-col items-center">
            <h1 className="relative mt-6 text-center text-4xl font-bold leading-[3rem] tracking-tight max-md:text-balance sm:max-w-4xl sm:text-5xl sm:leading-[4rem] md:text-6xl md:leading-[4.5rem] lg:text-8xl">
              A new, easy <br />
              way to discover
            </h1>
          </div>
        </div>

        <Separator className="mt-8" />

        <div className="relative pb-10">
          <Stack />
          <StackSlider />
        </div>
      </div>
    </div>
  );
}
