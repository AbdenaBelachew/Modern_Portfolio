// Projects as listed on the live site (abdena-belachew.vercel.app), plus Odaa ERP and Yeroon Travel.
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
  // Longer intro for the case-study page.
  overview?: string;
  problem?: string;
  solution?: string;
  // Why the system is shaped the way it is.
  rationale?: string;
  result: string;
  // Short "at a glance" facts from the original write-up.
  facts?: { label: string; value: string }[];
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
    facts: [
      { label: 'Delivery', value: 'CI/CD' },
      { label: 'Runtime', value: 'Kubernetes' },
      { label: 'Environments', value: 'QA + Production' },
    ],
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
    overview:
      'Part of a large-scale SAP ERP transformation: implementation support, enterprise system integration, workflow optimization, and alignment of technical solutions with business processes across domains.',
    problem:
      'Legacy processes and siloed systems made enterprise operations harder to standardize, integrate, and scale.',
    solution:
      'Supported SAP implementation activities, system integration, workflow optimization, and cross-functional delivery so technical solutions matched operational needs.',
    rationale:
      'ERP transformation succeeds when implementation, integration, and delivery stay aligned with how the business actually works.',
    result: 'Stronger alignment between enterprise platforms, business workflows, and day-to-day operations.',
    facts: [
      { label: 'Scope', value: 'Enterprise' },
      { label: 'Platform', value: 'SAP ERP' },
      { label: 'Focus', value: 'Integration' },
    ],
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
    overview:
      'Developed and deployed a secure platform for shareholder data, subscriptions, dividend distribution, attendance tracking, and voting workflows.',
    problem:
      'Shareholder records, dividends, attendance, and voting were fragmented and difficult to run securely at meeting scale.',
    solution:
      'A secure ASP.NET platform with SQL Server and LDAP/AD covering the shareholder register, subscriptions, dividends, attendance, and voting.',
    rationale:
      'Shareholder operations and AGM voting need identity-backed access, accurate registers, and auditable meeting workflows.',
    result: 'A deployed, identity-integrated system for governance meetings and shareholder operations.',
    facts: [
      { label: 'Access', value: 'LDAP/AD' },
      { label: 'Voting', value: 'Live' },
      { label: 'Status', value: 'Deployed' },
    ],
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
    overview:
      'Designed, developed, and deployed a platform supporting regulatory compliance, risk assessment, internal controls, governance reporting, and follow-up actions.',
    problem: 'Regulatory follow-up, risk assessment, and governance reporting were slow to track and hard to evidence.',
    solution:
      'An ASP.NET platform with LDAP/AD and SQL Server for compliance, risk assessment, internal controls, reporting, and action tracking.',
    rationale:
      'Risk and compliance work needs a single register, clear ownership, and follow-up that does not live in spreadsheets.',
    result: 'Deployed governance workflows with clearer accountability and follow-up.',
    facts: [
      { label: 'Controls', value: 'Tracked' },
      { label: 'Reporting', value: 'Governance' },
      { label: 'Status', value: 'Deployed' },
    ],
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
    overview:
      'Developed and prepared for deployment a secure digital document archiving platform supporting mass upload, retrieval, compliance controls, and periodic reporting across branches.',
    problem: 'Physical and scattered records made retrieval slow and compliance reporting painful.',
    solution: 'A secure archive with mass upload, retrieval, access control, and reporting across branches.',
    rationale: 'Retrievability and access control matter more than a generic file dump when records span many branches.',
    result: 'Faster retrieval and a cleaner compliance trail for archived records.',
    facts: [
      { label: 'Access', value: 'Controlled' },
      { label: 'Upload', value: 'Bulk' },
      { label: 'Reports', value: 'Periodic' },
    ],
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
    overview:
      'Built and deployed a workforce and vendor management platform covering outsourced employees, attendance, incidents, materials, audits, invoices, and SLA-oriented tracking.',
    problem: 'Outsourced staff, incidents, materials, invoices, and SLA performance were managed across disconnected tools.',
    solution:
      'A React and Node.js platform with Material UI, LDAP/AD, and SQL Server covering the full outsourced workforce and vendor lifecycle.',
    rationale:
      'Outsourced operations need one place for people, attendance, incidents, and vendor SLAs instead of disconnected trackers.',
    result: 'A single operational workspace for workforce, vendor, and SLA tracking.',
    facts: [
      { label: 'Workforce', value: 'Outsourced' },
      { label: 'SLA', value: 'Tracked' },
      { label: 'Status', value: 'Deployed' },
    ],
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
    overview:
      'Furtuu Gym brings member profiles, membership plans, check-in, renewals, and collections into one workspace so reception teams and owners are not chasing notebooks or chat messages.',
    problem:
      'Gyms tracked memberships, check-ins, and payments in notebooks and chats, so renewals slipped and the front desk got overwhelmed.',
    solution:
      'A single system for members, plans, attendance, expiry alerts, and payment recording with Telebirr, CBE Birr, Chapa, and cash so membership status stays in sync with collections.',
    rationale:
      'Built as a focused SaaS product for Ethiopian gyms: fast member lookup at the desk, local payment recording, and a clear picture of active vs expired memberships.',
    result: 'Owners get a trustworthy daily view of members, cashflow, and renewals without spreadsheet chaos.',
    facts: [
      { label: 'Payments', value: 'Local' },
      { label: 'Check-in', value: 'Live' },
      { label: 'Plans', value: 'Synced' },
    ],
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Telebirr', 'Chapa'],
    image: '/projects/gym.webp',
    live: 'https://furtuusystems.com/',
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
    overview:
      'Dawaa is a pharmacy ERP workspace covering medicine catalog with batch and expiry awareness, sales and dispensing, purchase orders, supplier management, and daily reporting.',
    problem:
      'As product lines grew, near-expiry items got buried, popular medicines ran out, and month-end reconciliation took too long.',
    solution:
      'One system for catalog, sales, purchasing, low-stock and near-expiry alerts, and owner-ready sales/inventory reports.',
    rationale: 'Pharmacies need structured stock movements and expiry control more than a generic inventory template.',
    result: 'Clearer accountability on stock and a calmer daily dispensing workflow.',
    facts: [
      { label: 'Stock', value: 'Batch-aware' },
      { label: 'Expiry', value: 'Alerts' },
      { label: 'POS', value: 'Daily' },
    ],
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
    overview:
      'A mobile-first storefront for Womove Activewear with product presentation, brand identity, and a practical shopping flow for an Ethiopian product brand.',
    problem: 'The brand lacked a digital storefront that matched its identity and worked well on phones.',
    solution: 'A brand-led, mobile-first e-commerce experience with product highlights and a clear shopping path.',
    rationale:
      'The brand needed a conversion-focused site that looks like a fashion house and still supports real order and inventory workflows.',
    result: 'A professional online presence that turns product interest into inquiries and orders.',
    facts: [
      { label: 'UX', value: 'Mobile-first' },
      { label: 'Brand', value: 'Custom' },
      { label: 'Store', value: 'Live' },
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
    image: '/projects/womove.webp',
    live: 'https://womoveactivewear.com/',
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
    overview:
      'A patient-facing site covering services, credentials, and an appointment inquiry flow designed for trust and conversion.',
    problem: 'Patients in Adama had no clear digital path to understand services or request an appointment.',
    solution: 'A professional profile site with services, credentials, and a simple appointment inquiry flow.',
    rationale: 'Healthcare sites succeed when they feel calm, credible, and easy to contact — not like a generic template.',
    result: 'A clearer first impression and a lower-friction path from visit to inquiry.',
    facts: [
      { label: 'Focus', value: 'Patients' },
      { label: 'City', value: 'Adama' },
      { label: 'Flow', value: 'Appointments' },
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
    image: '/projects/drmoti.webp',
    live: 'https://drmotimulatuortho.com/',
    repo: null,
  },
  {
    // Description from the live site's own meta description; stack verified from its build.
    slug: 'yeroon-travel',
    name: 'Yeroon Travel',
    category: 'Travel agency website',
    labels: ['Website'],
    year: '[PLACEHOLDER: year]',
    status: 'Live',
    description:
      'Website for a travel agency in Piassa, Addis Ababa: flights on six airlines, Dubai packages, hotels, UAE visas, and travel insurance.',
    overview:
      'Yeroon Travel is based in Piassa, Addis Ababa. The site lets customers book Ethiopian Airlines, Emirates, Qatar Airways, EgyptAir, flydubai, and Turkish Airlines, and presents Dubai packages, hotels, UAE visas, and travel insurance.',
    result: "A live site that puts the agency's airlines, Dubai packages, visas, and insurance in one place.",
    facts: [
      { label: 'Location', value: 'Piassa' },
      { label: 'Airlines', value: '6' },
      { label: 'Status', value: 'Live' },
    ],
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/projects/yeroon.webp',
    live: 'https://yeroontravelagency.com/',
    repo: null,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

// Neighbors in list order, wrapping around, for "next project" navigation.
export function getNeighbors(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}

// Groups a project's tech by the layer of the system it belongs to.
const layerOf: Record<string, string> = {
  React: 'Interface',
  'Next.js': 'Interface',
  JavaScript: 'Interface',
  Bootstrap: 'Interface',
  DataTables: 'Interface',
  'Material UI': 'Interface',
  'Tailwind CSS': 'Interface',
  Vite: 'Interface',
  'ASP.NET': 'Application',
  'ASP.NET MVC': 'Application',
  'C#': 'Application',
  '.NET Core': 'Application',
  'Node.js': 'Application',
  Express: 'Application',
  EPPlus: 'Application',
  'SQL Server': 'Data',
  PostgreSQL: 'Data',
  'LDAP/AD': 'Identity & integration',
  'LDAP / Active Directory': 'Identity & integration',
  'Enterprise Integration': 'Identity & integration',
  Telebirr: 'Identity & integration',
  Chapa: 'Identity & integration',
  'SAP ERP': 'ERP platform',
  'SAP ABAP': 'ERP platform',
  'SAP Basis': 'ERP platform',
  'SAP Fiori': 'ERP platform',
  Docker: 'Delivery',
  Kubernetes: 'Delivery',
  Harbor: 'Delivery',
  'GitHub Actions': 'Delivery',
};

const layerOrder = ['Interface', 'Application', 'ERP platform', 'Identity & integration', 'Data', 'Delivery', 'Other'];

export function techByLayer(tech: string[]) {
  const groups = new Map<string, string[]>();
  for (const t of tech) {
    const layer = layerOf[t] ?? 'Other';
    groups.set(layer, [...(groups.get(layer) ?? []), t]);
  }
  return layerOrder.filter((l) => groups.has(l)).map((layer) => ({ layer, items: groups.get(layer)! }));
}
