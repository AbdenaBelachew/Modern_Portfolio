// Projects as listed on the live site (abdena-belachew.vercel.app), plus Odaa ERP.
// Wording comes from the original project write-ups; nothing here is invented.

export type Project = {
  slug: string;
  name: string;
  category: string;
  labels: string[];
  year: string;
  // Only set when the original write-up states it.
  status?: string;
  description: string;
  problem?: string;
  solution?: string;
  result: string;
  tech: string[];
  // Screenshot in /public. null shows the editorial placeholder frame.
  image: string | null;
  // Leave null when there is no public URL; the card then says so honestly.
  live: string | null;
  repo: string | null;
  // Featured projects get a large editorial row; the rest go in the grid.
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'odaa-erp',
    name: 'Odaa ERP',
    category: 'Enterprise ERP Platform',
    labels: ['ERP', 'Full-stack', 'DevOps'],
    year: '[PLACEHOLDER: year]',
    description:
      'An enterprise resource planning platform designed around core business operations, internal workflows, reporting, and modular business services.',
    result: 'Containerized deployments with automated CI/CD and separate QA and production environments.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Kubernetes', 'Harbor', 'GitHub Actions'],
    image: null, // [PLACEHOLDER] add a screenshot, e.g. '/projects/odaa-erp.webp'
    live: null, // [PLACEHOLDER] live demo URL
    repo: null, // [PLACEHOLDER] repository URL
    featured: true,
  },
  {
    slug: 'sap-erp',
    name: 'Enterprise ERP Transformation — SAP Initiative',
    category: 'Enterprise ERP',
    labels: ['ERP', 'Enterprise'],
    year: '2025',
    status: 'Ongoing',
    description:
      'Contributing to a large-scale enterprise ERP transformation: implementation support, enterprise system integration, workflow optimization, and alignment of technical solutions with business processes.',
    problem:
      'Legacy processes and siloed systems made enterprise operations harder to standardize, integrate, and scale.',
    solution:
      'Supported SAP implementation activities, system integration, workflow optimization, and cross-functional delivery so technical solutions matched operational needs.',
    result: 'Stronger alignment between enterprise platforms, business workflows, and day-to-day operations.',
    tech: ['SAP ERP', 'SAP ABAP', 'SAP Basis', 'SAP Fiori', 'Enterprise Integration'],
    image: '/projects/sap-erp.webp',
    live: null,
    repo: null,
    featured: true,
  },
  {
    slug: 'shareholder-gam',
    name: 'Shareholder Management / General Annual Meeting System',
    category: 'Enterprise Solution',
    labels: ['Enterprise', 'Governance'],
    year: '2025',
    status: 'Deployed',
    description:
      'Secure platform for shareholder data, subscriptions, dividend distribution, attendance tracking, and voting workflows.',
    problem:
      'Shareholder records, dividends, attendance, and voting were fragmented and difficult to run securely at meeting scale.',
    solution:
      'A secure ASP.NET platform with SQL Server and LDAP/AD covering the shareholder register, subscriptions, dividends, attendance, and voting.',
    result: 'A deployed, identity-integrated system for governance meetings and shareholder operations.',
    tech: ['ASP.NET MVC', 'C#', 'SQL Server', 'JavaScript', 'Bootstrap', 'DataTables', 'LDAP/AD'],
    image: '/projects/shareholder.webp',
    live: null,
    repo: null,
    featured: true,
  },
  {
    slug: 'risk-compliance',
    name: 'Risk & Compliance Management System',
    category: 'Enterprise Solution',
    labels: ['Enterprise', 'Internal system'],
    year: '2025',
    status: 'Deployed',
    description:
      'Platform supporting regulatory compliance, risk assessment, internal controls, governance reporting, and follow-up actions.',
    problem: 'Regulatory follow-up, risk assessment, and governance reporting were slow to track and hard to evidence.',
    solution:
      'An ASP.NET platform with LDAP/AD and SQL Server for compliance, risk assessment, internal controls, reporting, and action tracking.',
    result: 'Deployed governance workflows with clearer accountability and follow-up.',
    tech: ['ASP.NET', 'C#', 'SQL Server', 'LDAP / Active Directory', 'EPPlus', 'Bootstrap'],
    image: '/projects/risk-compliance.webp',
    live: null,
    repo: null,
    featured: true,
  },
  {
    slug: 'archive-dms',
    name: 'Archive Management System',
    category: 'Document Management',
    labels: ['Internal system'],
    year: '2025',
    status: 'Prepared for deployment',
    description:
      'Secure digital document archiving platform supporting mass upload, retrieval, compliance controls, and periodic reporting across branches.',
    result: 'Faster retrieval and a cleaner compliance trail for archived records.',
    tech: ['.NET Core', 'C#', 'Bootstrap', 'LDAP/AD', 'PostgreSQL'],
    image: '/projects/archive.webp',
    live: null,
    repo: null,
  },
  {
    slug: 'outsourcing-ms',
    name: 'Outsourcing Management System',
    category: 'Workforce Operations',
    labels: ['Internal system'],
    year: '2024',
    status: 'Deployed',
    description:
      'Workforce and vendor management covering outsourced employees, attendance, incidents, materials, audits, invoices, and SLA-oriented tracking.',
    result: 'A single operational workspace for workforce, vendor, and SLA tracking.',
    tech: ['React', 'Node.js', 'Material UI', 'LDAP/AD', 'SQL Server'],
    image: '/projects/outsourcing.webp',
    live: null,
    repo: null,
  },
  {
    slug: 'furtuu-gym',
    name: 'Furtuu Gym',
    category: 'Gym management SaaS',
    labels: ['SaaS'],
    year: '2026',
    description:
      'Members, plans, check-in, renewals and payments for Ethiopian gyms in one system, with Telebirr, CBE Birr, Chapa, and cash support.',
    result: 'Owners get a trustworthy daily view of members, cashflow, and renewals without spreadsheet chaos.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Telebirr', 'Chapa'],
    image: '/projects/gym.webp',
    live: null,
    repo: null,
  },
  {
    slug: 'dawaa',
    name: 'Dawaa',
    category: 'Pharmacy management SaaS',
    labels: ['SaaS'],
    year: '2026',
    description:
      'Medicine catalog with batch and expiry awareness, sales and dispensing, purchase orders, suppliers, and daily reporting for pharmacies.',
    result: 'Clearer accountability on stock and a calmer daily dispensing workflow.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    image: '/projects/dawaa.webp',
    live: null,
    repo: null,
  },
  {
    slug: 'womove',
    name: 'Womove Active',
    category: 'Activewear storefront',
    labels: ['E-commerce'],
    year: '2026',
    status: 'Live',
    description:
      'A mobile-first storefront for an Ethiopian activewear brand: product presentation, brand identity, and a practical shopping flow.',
    result: 'A professional online presence that turns product interest into inquiries and orders.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
    image: '/projects/womove.webp',
    live: null, // [PLACEHOLDER] store URL
    repo: null,
  },
  {
    slug: 'drmoti',
    name: 'Dr. Moti Ortho',
    category: 'Healthcare website',
    labels: ['Website'],
    year: '2026',
    description:
      'Professional site for an orthopedic surgeon in Adama: services, credentials, and a patient-friendly appointment inquiry flow.',
    result: 'A clearer first impression and a lower-friction path from visit to inquiry.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
    image: '/projects/drmoti.webp',
    live: null, // [PLACEHOLDER] site URL
    repo: null,
  },
];
