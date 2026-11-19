import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

const navigation = [
  { label: "Home", href: "/", page: "home" },
  { label: "Blog", href: "/blog", page: "blog" },
  { label: "About", href: "/about", page: "about" },
  { label: "Newsletter", href: "/newsletter", page: "newsletter" },
];

export function Header({ page }: { page: string }) {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("blog-theme") === "dark" ? "dark" : "light",
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("blog-theme", theme);
  }, [theme]);

  return (
    <header className="site-header">
      <a className="avatar-link" href="/" aria-label="Paulina's blog home">
        <img
          className="avatar"
          src={`${import.meta.env.BASE_URL}assets/images/image-avatar.jpg`}
          alt="Paulina"
          width="48"
          height="48"
        />
      </a>
      <nav
        id="main-navigation"
        className={`site-nav${menuOpen ? " site-nav--open" : ""}`}
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <Link key={item.page} to={item.href}>{item.label}</Link>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/icon-${theme === "light" ? "moon" : "sun"}.svg`}
            alt=""
          />
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/icon-menu${menuOpen ? "-close" : ""}.svg`}
            alt=""
          />
        </button>
      </div>
    </header>
  );
}
