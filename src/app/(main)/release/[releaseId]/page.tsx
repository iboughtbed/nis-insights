import { notFound } from "next/navigation";

import { Shell } from "~/components/shells/shell";
import { getReleaseEmbed } from "~/server/queries/release";

export default async function ReleasePage({
  params,
}: {
  params: { releaseId: string };
}) {
  const { data } = await getReleaseEmbed({ id: params.releaseId });

  if (!data?.release) {
    notFound();
  }

  const embedUrl = data.release.embedUrl + "?embed";

  return (
    <Shell className="min-h-screen">
      <div className="h-full w-full">
        <iframe
          src={encodeURI(embedUrl)}
          allowFullScreen
          className="h-[80vh] w-full"
        ></iframe>
      </div>
    </Shell>
  );
}
