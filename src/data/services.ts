import { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'custom-websites',
    title: 'Custom Website Development',
    icon: 'Globe',
    tagline: 'Modern, performant, responsive web presence',
    description: 'Tailored, responsive websites designed to reflect your brand, captivate your audience, and convert visitors across desktop, tablet, and mobile devices.',
    deliverables: [
      'Bespoke responsive frontend layout & design',
      'Fluid animations and high-contrast accessibility',
      'SEO-optimized markup, fast loading speeds & meta tags',
      'Cross-browser and multi-device compatibility'
    ],
    projectTypeKey: 'Business Website'
  },
  {
    id: 'fullstack-apps',
    title: 'Full-Stack Web Applications',
    icon: 'Laptop',
    tagline: 'End-to-end digital software products',
    description: 'Architecting complete software solutions spanning user-friendly interfaces, secure server-side business logic, robust APIs, authentication, and databases.',
    deliverables: [
      'Single-page (SPA) or server-rendered architecture',
      'Secure user authentication (JWT / sessions / RBAC)',
      'RESTful API endpoints & background services',
      'Reliable data persistence & transaction handling'
    ],
    projectTypeKey: 'Full-Stack Web Application'
  },
  {
    id: 'booking-systems',
    title: 'Booking & Reservation Systems',
    icon: 'Calendar',
    tagline: 'Streamlined scheduling & slot management',
    description: 'Custom reservation workflows for clinics, restaurants, consulting practices, and hospitality businesses with real-time availability and reminders.',
    deliverables: [
      'Interactive time slot and table/cabana selectors',
      'Automated confirmation flows & intake questionnaires',
      'Capacity limits and blackout date management',
      'Admin dashboard for daily scheduling oversight'
    ],
    projectTypeKey: 'Booking System'
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Portals',
    icon: 'LayoutDashboard',
    tagline: 'Operational visibility & data management',
    description: 'Intuitive back-office management dashboards allowing teams to oversee metrics, manage inventories, view inquiries, and control access permissions.',
    deliverables: [
      'Interactive charts, analytics & KPI summaries',
      'CRUD data tables with search, filter & pagination',
      'Role-based permissions & audit logging',
      'Exportable CSV and PDF summary reports'
    ],
    projectTypeKey: 'Dashboard'
  },
  {
    id: 'educational-platforms',
    title: 'Educational Platforms & LMS',
    icon: 'GraduationCap',
    tagline: 'Structured online learning environments',
    description: 'Comprehensive educational platforms featuring modular course catalogs, syllabi downloads, instructor profiles, and bilingual learning tools.',
    deliverables: [
      'Hierarchical course & curriculum structuring',
      'Multilingual and RTL support (e.g., Arabic/English)',
      'Student registration & cohort management',
      'Interactive quizzes, resource downloads & guides'
    ],
    projectTypeKey: 'Educational Platform'
  },
  {
    id: 'database-design',
    title: 'Database Design & Architecture',
    icon: 'Database',
    tagline: 'Normalized, high-integrity data storage',
    description: 'Designing structured relational database schemas in MySQL and PostgreSQL with optimal indexing, relational integrity, and scalability.',
    deliverables: [
      'Entity-Relationship Diagrams (ERD) & schema modeling',
      'Normalization (3NF) & relational integrity constraints',
      'Efficient index strategies & fast query execution',
      'Data migration planning & ORM integration (Prisma)'
    ],
    projectTypeKey: 'Custom System'
  },
  {
    id: 'api-development',
    title: 'API Development & Integration',
    icon: 'Network',
    tagline: 'Connected services & secure endpoints',
    description: 'Building secure, well-documented REST APIs with Express.js and PHP, and integrating third-party APIs like payment gateways, maps, and messaging.',
    deliverables: [
      'RESTful API architecture with standardized JSON responses',
      'Rate limiting, request validation & error handling',
      'Third-party webhooks & external service integrations',
      'Comprehensive Postman documentation & testing suites'
    ],
    projectTypeKey: 'Full-Stack Web Application'
  },
  {
    id: 'deployment-launch',
    title: 'Deployment & Website Launch',
    icon: 'Rocket',
    tagline: 'Production readiness & cloud hosting',
    description: 'Preparing, optimizing, and deploying web applications on modern cloud infrastructure (Vercel, Cloud Run, hosting providers) with SSL and custom domains.',
    deliverables: [
      'Production build optimization & asset bundling',
      'Environment variable configuration & secrets security',
      'Custom domain linkage & SSL certificate setup',
      'Post-launch smoke testing & performance verification'
    ],
    projectTypeKey: 'Business Website'
  }
];
