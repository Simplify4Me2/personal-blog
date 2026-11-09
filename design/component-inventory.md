---

title: Design Component Inventory
lastmod: 2024-06-05

---

# Design inventory

## Shared component inventory

| Component | Observed variants and evidence |
|---|---|
| Page shell and content column | Repeated on all page frames. Centered narrow content column within a wide page; decorative geometric background shapes appear outside it. |
| Header / avatar | Repeated top navigation bar with a square profile image at the left. |
| Primary navigation link | Four destinations: Home, Blog, About, Newsletter. Current page is indicated by a blue underline in the Home, Blog, About, and Newsletter designs. The Article frame has no separate Article destination; verify whether Blog should be current there. |
| Theme toggle | Sun/moon icon button at the right of the header; light and dark presentations exist. |
| Mobile menu button and menu | Closed/open compositions exist in both themes. Open state shows a close control and a vertical list of the four navigation links. |
| Social icon link/button | X, GitHub, LinkedIn, and Frontend Mentor icons. In-page social links use bordered square buttons; footer links are smaller, unboxed icons. About includes a "Follow me" social group. |
| Page / section heading | Page titles and section titles; blue underline accent appears on selected headings (for example Home greeting, Latest Articles, About Me). Article Formatting Guide supplies heading levels H1-H6. Do not assume every heading has the accent. |
| Article list item | Home variant shows title and date only. Blog variant adds a description and separates entries with a horizontal rule. |
| Text link | Article titles, "View all articles", and inline hyperlinks are represented. Underlining is visible in sampled links. |
| Newsletter email field | Label, email input, placeholder, and full-width input treatment. |
| Newsletter submit button | "Stay updated" button; visible hover and focus appearances are included in newsletter state frames. |
| Form feedback | Error variant uses red input outline, alert icon, and "Please enter a valid email address." Success variant uses green outline/check icon and "You're subscribed! Check your inbox for updates." |
| Article body blocks | Formatting Guide shows paragraphs, H1-H6, unordered and ordered lists, bold/italic emphasis, inline code, syntax-styled code block, quote, image with caption, and a table. |
| Callout | Three variants are explicitly demonstrated: Tip (green), Warning (yellow/orange), and Information (blue), each with an icon, title, and explanatory text. |
| Section divider | Thin horizontal rules separate article-list entries and article body sections. |
| Footer | Repeated bottom rule, "Made with [heart] and [coffee]" sign-off, and the four social links. |

## Per-page inventory

| Page | Visible structure / page-specific components |
|---|---|
| Home | Greeting heading with accent, two intro paragraphs, four social buttons, divider, "Latest Articles" heading with accent, five title/date entries, "View all articles" link, footer. |
| Blog | "My Articles" heading with accent, intro paragraph, nine title/date/description entries separated by rules, footer. |
| Article | `Single Blog` shows article title, published date, intro, section headings, paragraphs, quote, numbered and bulleted lists, and footer. `Blog Formatting Guide` is a second article-body specimen covering headings, code, callouts, links, an image/caption, and a table. |
| About | "About Me" heading with accent, bio paragraphs, favorite-books list, workspace image, closing paragraph, "Follow me" social links, footer. |
| Newsletter | Intro and emphasized paragraph, email label/input, submit button, unsubscribe note, footer; form default, hover, focus, error, and success compositions. |
