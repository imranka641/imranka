import { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Crafting responsive, high-performance, accessible, and visually compelling user interfaces with modern frameworks and libraries.',
    skills: [
      { name: 'React.js', category: 'frontend', highlight: true },
      { name: 'JavaScript (ES6+)', category: 'frontend', highlight: true },
      { name: 'Tailwind CSS', category: 'frontend', highlight: true },
      { name: 'TypeScript', category: 'frontend', highlight: true },
      { name: 'Vite', category: 'frontend' },
      { name: 'HTML5 & Semantic Web', category: 'frontend' },
      { name: 'CSS3 & Modern Layouts', category: 'frontend' },
      { name: 'Framer Motion', category: 'frontend', highlight: true },
      { name: 'React Router', category: 'frontend' },
      { name: 'Responsive Web Design', category: 'frontend' },
      { name: 'Bootstrap', category: 'frontend' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Building robust, scalable server architectures, secure APIs, session management, and microservices.',
    skills: [
      { name: 'Node.js', category: 'backend', highlight: true },
      { name: 'Express.js', category: 'backend', highlight: true },
      { name: 'PHP', category: 'backend', highlight: true },
      { name: 'REST APIs', category: 'backend', highlight: true },
      { name: 'Authentication & Security', category: 'backend' },
      { name: 'JWT (JSON Web Tokens)', category: 'backend' },
      { name: 'Role-Based Access Control (RBAC)', category: 'backend' },
      { name: 'API Integration & Middleware', category: 'backend' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    description: 'Designing structured relational schemas, indexing, query optimization, and data modeling for reliable storage.',
    skills: [
      { name: 'MySQL', category: 'databases', highlight: true },
      { name: 'PostgreSQL', category: 'databases', highlight: true },
      { name: 'Prisma ORM', category: 'databases' },
      { name: 'Database Schema Design', category: 'databases', highlight: true },
      { name: 'phpMyAdmin', category: 'databases' },
      { name: 'Relational Data Modeling', category: 'databases' }
    ]
  },
  {
    id: 'tools',
    title: 'Development Tools & Workflow',
    description: 'Version control, development environments, automated workflows, and API testing suites.',
    skills: [
      { name: 'Git', category: 'tools', highlight: true },
      { name: 'GitHub', category: 'tools', highlight: true },
      { name: 'Visual Studio Code', category: 'tools' },
      { name: 'Postman', category: 'tools', highlight: true },
      { name: 'npm / Yarn', category: 'tools' },
      { name: 'XAMPP Stack', category: 'tools' }
    ]
  },
  {
    id: 'additional',
    title: 'Additional Technologies & Mobile',
    description: 'Multi-paradigm programming, mobile application tooling, and content management systems.',
    skills: [
      { name: 'Python', category: 'additional', highlight: true },
      { name: 'Java', category: 'additional' },
      { name: 'Kotlin', category: 'additional' },
      { name: 'Android Studio', category: 'additional' },
      { name: 'WordPress', category: 'additional' }
    ]
  }
];

export const TECHNICAL_HIGHLIGHTS = [
  { label: 'Featured Projects', value: '9+', description: 'Live web apps & digital platforms' },
  { label: 'Core Focus', value: 'Full-Stack', description: 'End-to-end architecture & UI' },
  { label: 'Industries Served', value: '8+', description: 'Healthcare, Hospitality, Legal & Edu' },
  { label: 'Code Craftsmanship', value: 'Clean & Scalable', description: 'Modern, typed & modular code' }
];
