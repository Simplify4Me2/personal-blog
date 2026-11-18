import type { ReactNode } from 'react'

export function PageHeading({ children, level = 1 }: { children: ReactNode; level?: 1 | 2 }) {
  const HeadingTag = level === 1 ? 'h1' : 'h2'
  return <HeadingTag className="page-heading">{children}</HeadingTag>
}