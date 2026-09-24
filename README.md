# Abdena Belachew — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Editing content

Content is separated from presentation. Edit these files only:

| File | Contains |
| --- | --- |
| `data/site.ts` | Name, title, hero, about, engineering impact, nav, SEO text |
| `data/projects.ts` | Project cards (image, tech, result, links) |
| `data/experience.ts` | Timeline entries |
| `data/skills.ts` | Capability groups |
| `data/social.ts` | GitHub, LinkedIn, email |

Unknown facts are written as `[PLACEHOLDER: …]`. They render with a dashed outline on the
site so they can't be mistaken for real content. Replace them before publishing.

- `site.photo: null` shows an editorial photo placeholder frame; `project.image: null` does the same for screenshots.
- `project.live` / `project.repo`: leave `null` if there's no public URL; the card says "Private codebase · walkthrough on request".
- `impact[].metric`: optional. Only add a number you can verify.

Theme tokens (colors, fonts) are at the top of `app/globals.css`.

## Contact form

By default the form validates input, then opens the visitor's email app with the message
filled in, and says so on the page. To deliver messages directly, create a
[Formspree](https://formspree.io) form and set:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

in `.env.local` and in the Vercel project's environment variables.
