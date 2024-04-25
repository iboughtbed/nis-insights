import { CreateArticleForm } from "../_components/create-article-form";

export default function NewArticlePage() {
  return (
    <div className="container relative flex flex-col">
      <div className="flex flex-col items-center pb-10 pt-8">
        <h1 className="text-center text-4xl font-bold tracking-tight">
          Create a new article
        </h1>
        <p className="mt-2 text-balance text-center">Markdown is used</p>
      </div>

      <div className="pb-10 pt-8">
        <CreateArticleForm />
      </div>
    </div>
  );
}
