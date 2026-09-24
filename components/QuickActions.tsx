'use client';

import { Copy, Share2, UserPlus } from 'lucide-react';
import { site } from '@/data/site';
import { email } from '@/data/social';
import { copyText, haptic } from '@/lib/feedback';

async function share() {
  haptic();
  const data = { title: site.seoTitle, text: site.title, url: site.url };
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch {
      // Dismissed share sheet; nothing to do.
    }
    return;
  }
  copyText(site.url, 'Link copied');
}

const btn =
  'flex flex-1 flex-col items-center justify-center gap-1.5 rounded-md border border-line bg-bg px-2 py-3 text-xs font-medium transition-[transform,border-color,color] duration-200 hover:border-line-strong active:scale-[0.97] active:border-accent active:text-accent';

// Share / save contact / copy email — the things people do with a portfolio on a phone.
export default function QuickActions({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button type="button" onClick={share} className={btn}>
        <Share2 size={17} aria-hidden className="text-accent" />
        Share
      </button>
      <a href="/contact.vcf" download="abdena-belachew.vcf" onClick={() => haptic()} className={btn}>
        <UserPlus size={17} aria-hidden className="text-accent" />
        Save contact
      </a>
      <button type="button" onClick={() => copyText(email, 'Email copied')} className={btn}>
        <Copy size={17} aria-hidden className="text-accent" />
        Copy email
      </button>
    </div>
  );
}
