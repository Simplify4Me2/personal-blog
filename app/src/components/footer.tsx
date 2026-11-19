import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>Made with <span aria-label="love">♥</span> and <span aria-label="coffee">☕</span></p>
      <SocialLinks />
    </footer>
  )
}

