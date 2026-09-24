export type Social = {
  label: 'GitHub' | 'LinkedIn' | 'Email';
  handle: string;
  href: string;
};

export const email = 'abdiolbelachew@gmail.com';

export const socials: Social[] = [
  { label: 'GitHub', handle: 'AbdenaBelachew', href: 'https://github.com/AbdenaBelachew' },
  { label: 'LinkedIn', handle: 'in/abdiol', href: 'https://www.linkedin.com/in/abdiol' },
  { label: 'Email', handle: email, href: `mailto:${email}` },
];
