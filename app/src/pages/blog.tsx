import { ArticleList, PageHeading } from "../components";
import articlesData from '../data.json'
import type { Article } from "../models";

const articles: Article[] = articlesData;

export function BlogPage() {
  return (
    <section className="content-section">
      <PageHeading>My Articles</PageHeading>
      <p className="page-lead">
        Below are all my recent blog posts. Click on any title to read the full article.
      </p>
      <ArticleList items={articles} descriptions />
    </section>
  )
}