import { useEffect, useRef, useState, type FormEvent, type JSX, type ReactNode } from 'react'
import articlesData from './data.json'
import './App.css'

type Article = {
  title: string
  slug: string
  publishedAt: string
  description: string
  content: string
}

const articles: Article[] = articlesData

const navigation = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'Blog', href: '/blog', page: 'blog' },
  { label: 'About', href: '/about', page: 'about' },
  { label: 'Newsletter', href: '/newsletter', page: 'newsletter' },
]

const socials = [
  { label: 'X', href: 'https://x.com/', icon: 'logo-x.svg' },
  { label: 'GitHub', href: 'https://github.com/', icon: 'logo-github.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'logo-linkedin.svg' },
  {
    label: 'Frontend Mentor',
    href: 'https://www.frontendmentor.io/',
    icon: 'logo-frontend-mentor.svg',
  },
]

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

function SocialLinks({ boxed = false }: { boxed?: boolean }) {
  return (
    <ul className={`social-links${boxed ? ' social-links--boxed' : ''}`}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
          >
            <img src={`/assets/images/${social.icon}`} alt="" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function Header({ page }: { page: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    localStorage.getItem('blog-theme') === 'dark' ? 'dark' : 'light',
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('blog-theme', theme)
  }, [theme])

  return (
    <header className="site-header">
      <a className="avatar-link" href="/" aria-label="Paulina's blog home">
        <img
          className="avatar"
          src="/assets/images/image-avatar.jpg"
          alt="Paulina"
          width="48"
          height="48"
        />
      </a>
      <nav
        id="main-navigation"
        className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <a
            className={page === item.page ? 'is-active' : undefined}
            href={item.href}
            aria-current={page === item.page ? 'page' : undefined}
            key={item.page}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <img
            src={`/assets/images/icon-${theme === 'light' ? 'moon' : 'sun'}.svg`}
            alt=""
          />
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src={`/assets/images/icon-menu${menuOpen ? '-close' : ''}.svg`}
            alt=""
          />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>Made with <span aria-label="love">♥</span> and <span aria-label="coffee">☕</span></p>
      <SocialLinks />
    </footer>
  )
}

function PageHeading({ children, level = 1 }: { children: ReactNode; level?: 1 | 2 }) {
  const HeadingTag = level === 1 ? 'h1' : 'h2'
  return <HeadingTag className="page-heading">{children}</HeadingTag>
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function ArticleList({
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
            srcSet="/assets/images/image-workspace-small.jpg"
          />
          <img
            src="/assets/images/image-workspace-large.jpg"
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
              src={`/assets/images/icon-${feedback === 'error' ? 'error' : 'success'}.svg`}
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

function InlineMarkdown({ text }: { text: string }) {
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[[^\]]+\]\([^)]+\))/g)

  return (
    <>
      {tokens.map((token, index) => {
        if (token.startsWith('**') && token.endsWith('**')) {
          return <strong key={index}>{token.slice(2, -2)}</strong>
        }
        if (token.startsWith('*') && token.endsWith('*')) {
          return <em key={index}>{token.slice(1, -1)}</em>
        }
        if (token.startsWith('`') && token.endsWith('`')) {
          return <code key={index}>{token.slice(1, -1)}</code>
        }
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkMatch) {
          return <a href={linkMatch[2]} key={index}>{linkMatch[1]}</a>
        }
        return token
      })}
    </>
  )
}

function isBlockStart(line: string) {
  return /^(#{1,6}\s|---\s*$|```|>\s?|[-*]\s+|\d+\.\s+|\|)/.test(line)
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const blocks: ReactNode[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }
      index += 1
      blocks.push(<pre key={blocks.length}><code>{codeLines.join('\n')}</code></pre>)
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      const HeadingTag = `h${heading[1].length}` as keyof JSX.IntrinsicElements
      blocks.push(
        <HeadingTag key={blocks.length}>
          <InlineMarkdown text={heading[2]} />
        </HeadingTag>,
      )
      index += 1
      continue
    }

    if (/^---\s*$/.test(line)) {
      blocks.push(<hr key={blocks.length} />)
      index += 1
      continue
    }

    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, '').trim())
        index += 1
      }
      const callout = quoteLines[0]?.match(/^\*\*(Warning|Tip|Information):\s*(.*?)\*\*$/)
      if (callout) {
        const iconName = callout[1] === 'Warning' ? 'warning' : callout[1] === 'Tip' ? 'tip' : 'info'
        blocks.push(
          <aside className={`callout callout--${callout[1].toLowerCase()}`} key={blocks.length}>
            <div className="callout-heading">
              <img src={`/assets/images/icon-${iconName}.svg`} alt="" />
              <h3>{callout[1]}: {callout[2]}</h3>
            </div>
            {quoteLines.slice(1).join(' ').trim() && (
              <p><InlineMarkdown text={quoteLines.slice(1).join(' ')} /></p>
            )}
          </aside>,
        )
      } else {
        blocks.push(
          <blockquote key={blocks.length}>
            {quoteLines.map((quote, quoteIndex) => (
              <p key={quoteIndex}><InlineMarkdown text={quote} /></p>
            ))}
          </blockquote>,
        )
      }
      continue
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line)
      const ListTag = ordered ? 'ol' : 'ul'
      const listItems: string[] = []
      const pattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/
      while (index < lines.length && pattern.test(lines[index].trim())) {
        listItems.push(lines[index].trim().replace(pattern, ''))
        index += 1
      }
      blocks.push(
        <ListTag key={blocks.length}>
          {listItems.map((item, itemIndex) => (
            <li key={itemIndex}><InlineMarkdown text={item} /></li>
          ))}
        </ListTag>,
      )
      continue
    }

    if (line.startsWith('|')) {
      const tableRows: string[][] = []
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        const cells = lines[index].trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim())
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) tableRows.push(cells)
        index += 1
      }
      const [header, ...rows] = tableRows
      blocks.push(
        <div className="table-scroll" key={blocks.length}>
          <table>
            <thead><tr>{header?.map((cell, cellIndex) => <th key={cellIndex}><InlineMarkdown text={cell} /></th>)}</tr></thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => <td key={cellIndex}><InlineMarkdown text={cell} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    const paragraph = [line]
    index += 1
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    blocks.push(
      <p key={blocks.length}>
        <InlineMarkdown text={paragraph.join(' ')} />
      </p>,
    )
  }

  return <div className="article-content">{blocks}</div>
}

function ArticlePage({ article }: { article: Article }) {
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

function NotFoundPage() {
  return (
    <section className="content-section">
      <PageHeading>Page not found</PageHeading>
      <p>Sorry, we couldn&apos;t find that page.</p>
      <a className="text-link" href="/">Return home <span aria-hidden="true">→</span></a>
    </section>
  )
}

function App() {
  const route = routeFromPath(window.location.pathname)
  const pageTitle =
    route.page === 'article'
      ? route.article?.title ?? 'Article not found'
      : route.page === 'not-found'
        ? 'Page not found'
        : `Frontend Mentor | Personal blog${route.page === 'home' ? '' : ` - ${route.page === 'about' ? 'About me' : route.page[0].toUpperCase() + route.page.slice(1)}`}`
  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  let page: ReactNode
  if (route.page === 'home') page = <HomePage />
  else if (route.page === 'blog') page = <BlogPage />
  else if (route.page === 'about') page = <AboutPage />
  else if (route.page === 'newsletter') page = <NewsletterPage />
  else if (route.page === 'article' && route.article) page = <ArticlePage article={route.article} />
  else page = <NotFoundPage />

  return (
    <div className="site-shell">
      <Header page={route.page === 'article' ? 'blog' : route.page} />
      <main id="main-content">{page}</main>
      <Footer />
    </div>
  )
}

export default App
