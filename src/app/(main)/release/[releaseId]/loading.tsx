import { PlaceholderImage } from "~/components/placeholder-image";
import { Shell } from "~/components/shells/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export default function ReleaseLoading() {
  return (
    <Shell className="min-h-screen">
      <div className="flex h-[80vh] w-full items-center justify-center">
        <AspectRatio ratio={1 / 1.41}>
          <PlaceholderImage isSkeleton asChild />
        </AspectRatio>
      </div>
    </Shell>
  );
}
