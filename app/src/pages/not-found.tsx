import { PageHeading } from "../components";

export function NotFoundPage() {
  return (
    <section className="content-section">
      <PageHeading>Page not found</PageHeading>
      <p>Sorry, we couldn&apos;t find that page.</p>
      <a className="text-link" href="/">Return home <span aria-hidden="true">→</span></a>
    </section>
  )
}