import { useState, useRef, type FormEvent } from "react"
import { PageHeading } from "../components"

export function NewsletterPage() {
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