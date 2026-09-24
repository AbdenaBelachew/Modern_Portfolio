import { site } from '@/data/site';
import { email, socials } from '@/data/social';

export const dynamic = 'force-static';

// Contact card: on phones, opening it offers "Add to Contacts".
export function GET() {
  const [first, ...rest] = site.name.split(' ');
  const last = rest.join(' ');
  const profile = (label: string) => socials.find((s) => s.label === label)?.href;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${last};${first};;;`,
    `FN:${site.name}`,
    `TITLE:${site.title}`,
    `EMAIL;TYPE=INTERNET,PREF:${email}`,
    `URL:${site.url}`,
    `X-SOCIALPROFILE;TYPE=github:${profile('GitHub')}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile('LinkedIn')}`,
    `NOTE:${site.stack.join(' · ')}`,
    'END:VCARD',
  ];

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'inline; filename="abdena-belachew.vcf"',
    },
  });
}
