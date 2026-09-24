// Identity and page-level copy. Components only handle layout, so edit text here.
// Anything shown as "[PLACEHOLDER]" is unknown and should be replaced with a verified fact.

export const site = {
  name: 'Abdena Belachew',
  title: 'Enterprise Software Engineer & Full-Stack Developer',
  stack: ['.NET', 'React', 'SAP ABAP/Fiori', 'ERP', 'SaaS', 'DevOps'],
  url: 'https://abdena-belachew.vercel.app',
  location: 'Based in Ethiopia',
  availability: 'Available for selected projects',
  currentlyBuilding: 'Enterprise applications & SaaS platforms',
  seoTitle: 'Abdena Belachew — Enterprise Software Engineer & Full-Stack Developer',
  seoDescription:
    'Abdena Belachew is an enterprise software engineer specializing in .NET, React, SAP, ERP systems, SaaS applications, and DevOps.',
  // Set to null to show the editorial placeholder frame instead.
  photo: '/profile.jpg' as string | null,
  resume: '/resume.pdf',
};

export const hero = {
  eyebrow: 'Engineering enterprise software',
  lead: 'I build reliable enterprise applications, ERP systems, and digital platforms that turn complex business processes into maintainable software.',
  techLine: ['.NET', 'React', 'SAP', 'ERP', 'DevOps'],
};

export const about = {
  heading: 'Building software around real business problems.',
  paragraphs: [
    "I'm a software engineer focused on building enterprise applications and business systems that people actually rely on every day. My work sits at the intersection of software engineering, ERP, and business operations — from designing APIs and database-driven applications to integrating enterprise platforms and improving deployment workflows.",
    "I've worked across full-stack development, SAP ERP implementation, internal business applications, reporting systems, document management, compliance workflows, and DevOps automation.",
  ],
  focus: ['Enterprise applications', 'ERP modernization', 'SaaS architecture', 'Cloud & DevOps', 'Developer experience'],
  // The path my work has followed; the last step is where it's heading.
  path: [
    'Software development',
    'Enterprise applications',
    'ERP / SAP',
    'Full-stack engineering',
    'DevOps & infrastructure',
    'Enterprise architecture',
  ],
};

export type ImpactItem = {
  title: string;
  text: string;
  icon: 'building' | 'blocks' | 'repeat' | 'container';
  // Optional verified metric. Leave null until you can back it with a real number,
  // e.g. '[PLACEHOLDER] monthly reports automated'.
  metric: string | null;
};

export const impact: ImpactItem[] = [
  {
    title: 'Enterprise systems',
    text: 'Built and supported applications used for day-to-day operational business workflows.',
    icon: 'building',
    metric: null,
  },
  {
    title: 'ERP',
    text: 'Hands-on experience across SAP ERP implementation, user and role support, and enterprise systems.',
    icon: 'blocks',
    metric: null,
  },
  {
    title: 'Automation',
    text: 'Reduced repetitive manual reporting by moving it into application-based workflows.',
    icon: 'repeat',
    metric: null,
  },
  {
    title: 'DevOps',
    text: 'Containerized applications and automated deployment workflows with CI/CD pipelines.',
    icon: 'container',
    metric: null,
  },
];

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;
