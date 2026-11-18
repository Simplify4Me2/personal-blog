import { SocialLinks } from "../components";
import { PageHeading } from "../components";
import { ArticleList } from "../components";
import type { Article } from "../models/article.model";
import articlesData from "../data.json";

const articles: Article[] = articlesData;

export function HomePage() {
  return (
    <>
      <section className="home-intro">
        <PageHeading>Hi, I&apos;m Paulina <span aria-hidden="true">👋</span></PageHeading>
        <p>
          I&apos;m on a journey to become a front-end web developer. I love building little
          projects, trying out new coding techniques, and sharing what I learn along
          the way. When I&apos;m not at my desk, you&apos;ll find me reading, hiking through
          the mountains, or challenging myself on rock-climbing walls.
        </p>
        <p>
          I started this blog to document my progress, keep myself accountable, and
          hopefully inspire anyone else who&apos;s learning to code. Welcome to my corner
          of the internet, and thanks for stopping by!
        </p>
        <SocialLinks boxed />
      </section>
      <section className="content-section latest-section">
        <PageHeading level={2}>Latest Articles</PageHeading>
        <ArticleList items={articles.slice(0, 5)} />
        <a className="text-link" href="/blog">View all articles <span aria-hidden="true">→</span></a>
      </section>
    </>
  )
}