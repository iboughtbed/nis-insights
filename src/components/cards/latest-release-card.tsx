import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface LatestReleaseCardProps {
  createdAt: Date;
}

export function LatestReleaseCard({} // createdAt
: LatestReleaseCardProps) {
  return (
    <Card className="relative flex flex-col gap-3 p-8">
      <AspectRatio ratio={1 / 1.41}>
        <Image
          alt="Cover image"
          src="/images/cover-image.webp"
          className="absolute inset-0 object-cover"
          fill
        />
      </AspectRatio>
      <CardHeader>
        <CardTitle>NEXT JS SHOWCASE CARD</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
