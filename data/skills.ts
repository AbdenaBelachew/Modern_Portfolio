export type SkillGroup = {
  title: string;
  icon: 'code' | 'server' | 'blocks' | 'container';
  summary: string;
  // Two or three headline skills with a line on how they're used.
  featured: { name: string; note: string }[];
  // Everything else in the group, shown as a quiet list.
  also: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: 'code',
    summary: 'Interfaces for people who spend their whole workday inside the application.',
    featured: [
      { name: 'React / Next.js', note: 'Maintainable interfaces for enterprise applications and dashboards.' },
      { name: 'TypeScript', note: 'Typed components and API contracts that survive refactors.' },
    ],
    also: ['JavaScript', 'HTML5', 'CSS', 'Tailwind CSS', 'Bootstrap', 'DataTables', 'Select2'],
  },
  {
    title: 'Backend',
    icon: 'server',
    summary: 'The business rules, data and integrations that sit behind every screen.',
    featured: [
      { name: '.NET / C#', note: 'ASP.NET Core and MVC applications, business logic and integrations.' },
      { name: 'Node.js / Express', note: 'REST APIs and services for modular, database-driven systems.' },
      { name: 'SQL Server / PostgreSQL', note: 'Schemas, queries and reporting for transactional data.' },
    ],
    also: ['ASP.NET MVC', 'REST APIs', 'Entity Framework'],
  },
  {
    title: 'Enterprise / ERP',
    icon: 'blocks',
    summary: 'Where software meets the business process it is meant to run.',
    featured: [
      { name: 'SAP ERP', note: 'Implementation activities, operations support and adoption.' },
      { name: 'SAP ABAP / Fiori', note: 'Technical development, Fiori access, users and roles.' },
    ],
    also: [
      'ERP implementation',
      'Business process automation',
      'Enterprise integrations',
      'Role & authorization management',
      'Reporting systems',
    ],
  },
  {
    title: 'DevOps / Infrastructure',
    icon: 'container',
    summary: 'Getting software to production the same way every time.',
    featured: [
      { name: 'Docker / Kubernetes', note: 'Containerized deployments on Kubernetes and K3s clusters.' },
      { name: 'Jenkins / GitHub Actions', note: 'CI/CD pipelines with separate QA and production environments.' },
    ],
    also: ['K3s', 'Git', 'Harbor', 'Linux', 'Nginx', 'CI/CD'],
  },
];
