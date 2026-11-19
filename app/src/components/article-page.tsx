import type { Article } from '../models/article.model';
import { PageHeading } from './page-heading';
import { MarkdownContent } from '../markdown';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function ArticlePage({ article }: { article: Article }) {
  return (
    <article className="content-section article-page">
      <a className="back-link" href="/blog">← Back to Articles</a>
      <PageHeading>{article.title}</PageHeading>
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      <p className="article-lead">{article.description}</p>
      {article.content !== article.description && (
        <MarkdownContent content={article.content} />
      )}
    </article>
  )
}