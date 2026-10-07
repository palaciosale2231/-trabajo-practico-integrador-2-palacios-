import ArticleCard from "../components/ArticleCard.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import useFetch from "../hooks/useFetch.js";

function isArticle(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.title === "string" &&
    typeof value.excerpt === "string" &&
    typeof value.author === "string"
  );
}

function readArticles(payload) {
  const articles = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        Array.isArray(payload.articles)
      ? payload.articles
      : null;

  if (articles && articles.every(isArticle)) {
    return articles;
  }

  return null;
}

export default function HomePage() {
  const { data, isLoading, error } = useFetch("/articles");
  const articles = readArticles(data);

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienes patrimoniales
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Artículos disponibles en el sistema.
        </p>
      </div>

      {isLoading && <StatusMessage message="Cargando artículos…" />}
      {error && <StatusMessage message={error} type="error" />}
      {!isLoading && !error && articles === null && (
        <StatusMessage
          message="El servidor devolvió una lista de artículos con un formato inválido."
          type="error"
        />
      )}
      {!isLoading && !error && articles?.length === 0 && (
        <StatusMessage message="Todavía no hay artículos para mostrar." />
      )}
      {!isLoading && !error && articles && articles.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {articles.map((article, index) => (
            <li key={article.id ?? article._id ?? `${article.title}-${index}`}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
