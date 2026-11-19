import { useEffect, useRef, useState, type FormEvent } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ArticleList, Footer, Header, SocialLinks, PageHeading } from './components' 

import type { Article } from './models/article.model'
import articlesData from './data.json'

const articles: Article[] = articlesData

function routeFromPath(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return { page: 'home', article: undefined }
  if (path === '/blog') return { page: 'blog', article: undefined }
  if (path === '/about') return { page: 'about', article: undefined }
  if (path === '/newsletter') return { page: 'newsletter', article: undefined }

  const articleMatch = path.match(/^\/article\/([^/]+)$/)
  if (articleMatch) {
    return {
      page: 'article',
      article: articles.find((item) => item.slug === articleMatch[1]),
    }
  }

  return { page: 'not-found', article: undefined }
}

function HomePage() {
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

function BlogPage() {
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

function AboutPage() {
  return (
    <article className="content-section about-page">
      <PageHeading>About Me</PageHeading>
      <p>
        Hi, I&apos;m Paulina! Ever since I can remember, I&apos;ve had a passion for creativity
        and problem-solving. That&apos;s what led me to the world of front-end web
        development. There&apos;s something magical about seeing an idea come to life in
        the browser—whether it&apos;s a simple layout experiment or a complex interface for
        a bigger project.
      </p>
      <p>
        When I&apos;m not coding, I love getting lost in a good book. My taste is pretty
        eclectic: I&apos;ll happily read everything from fantasy novels to biographies of
        tech pioneers. Reading helps me unwind and often sparks new ideas for my coding
        projects.
      </p>
      <p>
        Another big passion of mine is the great outdoors. Hiking allows me to
        disconnect from the digital world and reconnect with nature. I love challenging
        hikes with rewarding views at the top. And if I&apos;m not on the trails, you might
        catch me rock climbing. The combination of mental focus and physical endurance
        is a perfect parallel to tackling tough coding challenges!
      </p>
      <h2>Some of my favorite books</h2>
      <ul className="book-list">
        <li><em>The Pragmatic Programmer</em> by Andrew Hunt and David Thomas (for helpful insights into software development)</li>
        <li><em>Ready Player One</em> by Ernest Cline (for some futuristic escapism)</li>
        <li><em>The Hobbit</em> by J.R.R. Tolkien (for a bit of fantasy fun)</li>
        <li><em>Educated</em> by Tara Westover (for incredible inspiration)</li>
      </ul>
      <p>
        I absolutely love my workspace as a place that inspires me to do my best work,
        so I thought I&apos;d share it with you:
      </p>
      <figure className="workspace-figure">
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet={`${import.meta.env.BASE_URL}assets/images/image-workspace-small.jpg`}
          />
          <img
            src={`${import.meta.env.BASE_URL}assets/images/image-workspace-large.jpg`}
            alt="Paulina's bright home office with plants, bookshelves, and a computer desk"
            width="1200"
            height="750"
          />
        </picture>
      </figure>
      <p>
        I hope this blog not only documents my growth but also helps others see that
        coding can be for everyone. Thanks for joining me on this journey!
      </p>
      <section className="follow-section" aria-labelledby="follow-heading">
        <h2 id="follow-heading">Follow me</h2>
        <SocialLinks boxed />
      </section>
    </article>
  )
}

function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState<'error' | 'success' | null>(null)
  const emailInput = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!emailInput.current?.validity.valid) {
      setFeedback('error')
      return
    }

    setFeedback('success')
  }

  return (
    <section className="content-section newsletter-page">
      <PageHeading>Newsletter</PageHeading>
      <p>
        Want to stay updated on my latest articles, coding tutorials, and personal
        adventures? Sign up for my newsletter! It&apos;s a simple way to keep track of
        new posts and occasional coding tips I discover. Just drop your email in the
        sign-up box, and I&apos;ll send you updates whenever there&apos;s something new to
        share.
      </p>
      <p className="newsletter-emphasis">
        I&apos;d love to have you along for the ride and also hear about your own journey!
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email">Email Address</label>
        <input
          ref={emailInput}
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="email@example.com"
          autoComplete="email"
          required
          value={email}
          aria-invalid={feedback === 'error' ? true : feedback === 'success' ? false : undefined}
          aria-describedby={feedback ? 'newsletter-feedback' : undefined}
          onChange={(event) => {
            setEmail(event.target.value)
            setFeedback(null)
          }}
        />
        {feedback && (
          <p
            className={`form-feedback form-feedback--${feedback}`}
            id="newsletter-feedback"
            role={feedback === 'error' ? 'alert' : 'status'}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/icon-${feedback === 'error' ? 'error' : 'success'}.svg`}
              alt=""
            />
            {feedback === 'error'
              ? 'Please enter a valid email address.'
              : "You're subscribed! Check your inbox for updates."}
          </p>
        )}
        <button type="submit">Stay updated</button>
      </form>
      <p className="unsubscribe-note">Unsubscribe anytime. No spam, I promise <span aria-hidden="true">🙂</span></p>
    </section>
  )
}

// function NotFoundPage() {
//   return (
//     <section className="content-section">
//       <PageHeading>Page not found</PageHeading>
//       <p>Sorry, we couldn&apos;t find that page.</p>
//       <a className="text-link" href="/">Return home <span aria-hidden="true">→</span></a>
//     </section>
//   )
// }

let router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    Component: HomePage
  },
  {
    path: `${import.meta.env.BASE_URL}/blog`,
    Component: BlogPage
  },
  {
    path: `${import.meta.env.BASE_URL}/about`,
    Component: AboutPage
  },
  {
    path: `${import.meta.env.BASE_URL}/newsletter`,
    Component: NewsletterPage
  }
])

function App() {
  const route = routeFromPath(window.location.pathname);

  console.log("route", route);

  const pageTitle =
    route.page === 'article'
      ? route.article?.title ?? 'Article not found'
      : route.page === 'not-found'
        ? 'Page not found'
        : `Frontend Mentor | Personal blog${route.page === 'home' ? '' : ` - ${route.page === 'about' ? 'About me' : route.page.charAt(0).toUpperCase() + route.page.slice(1)}`}`
  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  // let page: ReactNode
  // if (route.page === 'home') page = <HomePage />
  // else if (route.page === 'blog') page = <BlogPage />
  // else if (route.page === 'about') page = <AboutPage />
  // else if (route.page === 'newsletter') page = <NewsletterPage />
  // else if (route.page === 'article' && route.article) page = <ArticlePage article={route.article} />
  // else page = <NotFoundPage />

  return (
    <div className="site-shell">
      <Header page={route.page === 'article' ? 'blog' : route.page} />
      {/* <main id="main-content">{page}</main> */}
      <main id="main-content">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  )
}

export default App
