export default function ArticleCard({ article }) {
  const author =
    typeof article.author === "string"
      ? article.author
      : article.author.username;
  const excerpt = article.excerpt?.trim()
    ? article.excerpt
    : "Sin resumen disponible.";

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{article.title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-700">{excerpt}</p>
      <p className="mt-4 text-sm text-gray-500">
        Autor: <span className="font-medium">{author}</span>
      </p>
    </article>
  );
}
