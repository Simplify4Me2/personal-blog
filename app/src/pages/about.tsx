import { PageHeading, SocialLinks } from "../components";

export function AboutPage() {
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