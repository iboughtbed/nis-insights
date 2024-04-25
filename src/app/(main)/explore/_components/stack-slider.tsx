import { buttonVariants } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { StackItem } from "./shared";

export function StackSlider() {
  return (
    <div className="flex flex-col gap-8 xl:hidden">
      <div className="flex-1">
        <div>
          <h5 className="mb-4 text-sm font-semibold tracking-tighter text-[#a594fd]">
            INSIGHTS
          </h5>
          <div>
            <h3 className="mb-4 text-5xl font-semibold xl:text-7xl">
              Discover at <br /> the speed <br /> of thought.
            </h3>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div>
          <Carousel className="flex flex-col gap-8">
            <CarouselContent>
              <CarouselItem>
                <StackItem
                  title="Read articles from our authors"
                  description="Find every category, community, guides, insights and much more"
                  link={{
                    href: "/articles",
                    title: "Read Articles",
                  }}
                />
              </CarouselItem>
              <CarouselItem>
                <StackItem
                  title="See what you're missing"
                  description="Latest and fresh news about recent events in our school"
                  link={{
                    href: "/releases",
                    title: "Read Releases",
                  }}
                />
              </CarouselItem>
              <CarouselItem>
                <StackItem
                  title="Read our blog and watch us grow"
                  description="We will be sharing our progress and impact on school community"
                  link={{
                    href: "/blog",
                    title: "Read Blog",
                  }}
                />
              </CarouselItem>
            </CarouselContent>
            <div className="relative flex items-center gap-2">
              <CarouselPrevious
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "flex-1 rounded-3xl text-black hover:bg-primary hover:text-primary-foreground disabled:bg-[#101010] disabled:text-white",
                )}
              />
              <CarouselNext
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "flex-1 rounded-3xl text-black hover:bg-primary hover:text-primary-foreground disabled:bg-[#101010] disabled:text-white",
                )}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
