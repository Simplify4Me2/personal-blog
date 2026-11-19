import type { Article } from '../models/article.model'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function ArticleList({
  items,
  descriptions = false,
}: {
  items: Article[]
  descriptions?: boolean
}) {
  return (
    <ul className={`article-list${descriptions ? ' article-list--descriptions' : ''}`}>
      {items.map((article) => (
        <li key={article.slug}>
          <article>
            <h3>
              <a href={`/article/${article.slug}`}>{article.title}</a>
            </h3>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {descriptions && <p>{article.description}</p>}
          </article>
        </li>
      ))}
    </ul>
  )
}