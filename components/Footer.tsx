import { hero, site } from '@/data/site';
import { socials } from '@/data/social';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-display text-2xl font-semibold tracking-tight">{site.name}</p>
          <p className="mt-2 text-muted">{site.title}</p>
          <p className="mt-4 font-mono text-xs text-muted">{hero.techLine.join(' · ')}</p>
        </div>

        <div className="flex flex-col gap-6 md:col-span-5 md:items-end">
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="link-draw transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#main" className="link-draw text-muted transition-colors hover:text-ink">
                Back to top ↑
              </a>
            </li>
          </ul>
          <div className="text-xs text-muted md:text-right">
            <p>© {new Date().getFullYear()} {site.name}</p>
            <p className="mt-1">Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
