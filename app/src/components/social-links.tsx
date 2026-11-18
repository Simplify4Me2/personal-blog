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


export function SocialLinks({ boxed = false }: { boxed?: boolean }) {
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
            <img src={`${import.meta.env.BASE_URL}assets/images/${social.icon}`} alt="" />
          </a>
        </li>
      ))}
    </ul>
  )
}