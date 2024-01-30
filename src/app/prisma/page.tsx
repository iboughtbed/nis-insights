import { CreatePost } from "~/app/prisma/create-post";
import { Shell } from "~/components/shells/shell";
import { getArticles } from "~/server/queries/article";

export default async function PrismaPage() {
  const articles = await getArticles();

  return (
    <Shell variant="markdown">
      <div>
        <CreatePost />
      </div>
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <div key={article.id}>{article.title}</div>
        ))}
      </div>
    </Shell>
  );
}
