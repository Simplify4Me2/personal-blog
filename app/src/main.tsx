import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { HomePage, BlogPage, AboutPage, NewsletterPage, NotFoundPage } from './pages'
import App from './App'

let router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: 'blog',
        Component: BlogPage
      },
      {
        path: 'about',
        Component: AboutPage
      },
      {
        path: 'newsletter',
        Component: NewsletterPage
      },
      {
        path: 'article/:slug',
        Component: BlogPage
      },
      {
        path: '*',
        Component: NotFoundPage
      }
    ]
  }
], { basename: import.meta.env.BASE_URL })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
