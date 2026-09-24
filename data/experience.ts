export type ExperienceEntry = {
  // Short label shown on the timeline rail.
  marker: string;
  period: string;
  role: string;
  organization: string;
  focus: string[];
  highlights: string[];
};

// Only verified employers and dates. Unknown details are marked [PLACEHOLDER].
export const experience: ExperienceEntry[] = [
  {
    marker: 'Now',
    period: '[PLACEHOLDER: start year] — Present',
    role: 'Enterprise System Operation & Application Development',
    organization: '[PLACEHOLDER: organization]',
    focus: ['Full-stack', 'ERP', 'DevOps'],
    highlights: [
      'Develop and maintain internal enterprise applications and business systems.',
      'Build full-stack applications using .NET, C#, React, Node.js, and SQL databases.',
      'Work across ERP-related systems, business workflows, reporting, and integrations.',
      'Support deployment automation using Docker, Kubernetes, Jenkins, and GitHub Actions.',
      'Contribute to technical architecture, troubleshooting, system operations, and application lifecycle management.',
    ],
  },
  {
    marker: 'Ongoing',
    period: 'Across roles',
    role: 'Full-Stack & Enterprise Application Development',
    organization: 'Enterprise applications and project work',
    focus: ['APIs', 'Databases', 'Integrations'],
    highlights: [
      'Designed database-driven enterprise applications.',
      'Developed REST APIs and business logic.',
      'Built responsive administrative interfaces.',
      'Automated reports and operational workflows.',
      'Worked with authentication, authorization, directory services, and enterprise integrations.',
    ],
  },
  {
    marker: '2022',
    period: '2022 — 2023',
    role: 'Graduate Trainee — Software & ERP Technology',
    organization: 'Cooperative Bank of Oromia',
    focus: ['SAP ERP', 'Application support'],
    highlights: [
      'Contributed to SAP ERP implementation and technical activities.',
      'Supported SAP users, roles, Fiori access, reporting, and operational activities.',
      'Worked with enterprise application and database-driven business processes.',
      'Investigated technical challenges around ERP implementation and adoption.',
    ],
  },
];
