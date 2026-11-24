import { useEffect } from 'react'
import './App.css'
import { Outlet, useLocation } from 'react-router'
import { Footer, Header } from './components'

import type { Article } from './models/article.model'
import articlesData from './data/articles.json'

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

function App() {
  const location = useLocation();
  const route = routeFromPath(location.pathname);

  const pageTitle =
    route.page === 'article'
      ? route.article?.title ?? 'Article not found'
      : route.page === 'not-found'
        ? 'Page not found'
        : `Frontend Mentor | Personal blog${route.page === 'home' ? '' : ` - ${route.page === 'about' ? 'About me' : route.page.charAt(0).toUpperCase() + route.page.slice(1)}`}`
  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  return (
    <div className="site-shell">
      {/* <Header page={route.page === 'article' ? 'blog' : route.page} /> */}
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
