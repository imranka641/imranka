export interface CVExperience {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Full-Stack' | 'Frontend' | 'Backend' | 'Freelance / Contract';
  summary: string;
  bulletPoints: string[];
  technologies: string[];
  liveUrl?: string;
  featured?: boolean;
}

export interface CVEducation {
  degree: string;
  institution: string;
  faculty?: string;
  department?: string;
  location: string;
  period: string;
  focus?: string;
  relevantAreas?: string[];
  highlights: string[];
}

export interface CVCertification {
  name: string;
  issuer: string;
  year: string;
  description?: string;
  topics: string[];
}

export interface CVData {
  personalInfo: {
    fullName: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    telegram: string;
    telegramUrl: string;
    github: string;
    githubUrl: string;
    portfolioUrl: string;
    languages: { language: string; proficiency: string }[];
  };
  executiveSummary: string;
  competencyCategories: {
    title: string;
    skills: string[];
  }[];
  experiences: CVExperience[];
  education: CVEducation[];
  certifications: CVCertification[];
  keyHighlights: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const CV_DATA: CVData = {
  personalInfo: {
    fullName: 'Imran Kedir',
    headline: 'Full-Stack Developer | React • TypeScript • Node.js • PHP • MySQL',
    email: 'imranka641@gmail.com',
    phone: '+251 913 841 757',
    location: 'Addis Ababa, Ethiopia',
    telegram: '@imranka641',
    telegramUrl: 'https://t.me/imranka641',
    github: 'imranka641',
    githubUrl: 'https://github.com/imranka641',
    portfolioUrl: 'https://ais-dev-jutcjaumzo2rh7povu3jhq-580649611556.europe-west1.run.app',
    languages: [
      { language: 'English', proficiency: 'Professional Working Proficiency' },
      { language: 'Amharic', proficiency: 'Native / Bilingual' }
    ]
  },
  executiveSummary:
    'Dedicated and results-oriented Full-Stack Web Developer based in Addis Ababa, Ethiopia, specializing in the end-to-end development of modern, responsive, and robust digital solutions. Experienced across the full software engineering lifecycle—from interactive user interface design using React, TypeScript, and modern Tailwind CSS to secure backend architecture using Node.js, Express, and PHP. Proven track record in designing normalized relational databases (MySQL, PostgreSQL), integrating Ethiopian digital payment gateways (Telebirr & CBE Birr), implementing secure authentication (JWT, RBAC), and shipping 9+ production-grade web applications across healthcare, e-commerce, hospitality, and legal technology.',
  
  keyHighlights: [
    { label: 'Production Apps', value: '9+', detail: 'Built & deployed across 8 diverse industries' },
    { label: 'Tech Stack Breadth', value: '15+', detail: 'React, Node, PHP, TS, MySQL, Tailwind' },
    { label: 'Payment Integrations', value: 'Telebirr & CBE', detail: 'Local Ethiopian digital finance gateways' },
    { label: 'Architecture', value: 'Full Lifecycle', detail: 'UI/UX to Database, Security & Cloud Deploy' }
  ],

  competencyCategories: [
    {
      title: 'Frontend Engineering',
      skills: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'Vite', 'HTML5 / Semantic Web', 'CSS3 / Grid & Flexbox', 'Responsive Design', 'Bootstrap']
    },
    {
      title: 'Backend & APIs',
      skills: ['Node.js', 'Express.js', 'PHP', 'RESTful API Architecture', 'JWT Authentication', 'Role-Based Access Control (RBAC)', 'Session Management', 'Middleware Development']
    },
    {
      title: 'Databases & Storage',
      skills: ['MySQL', 'PostgreSQL', 'Prisma ORM', 'Relational Schema Design', 'Query Optimization & Indexing', 'Database Normalization', 'phpMyAdmin']
    },
    {
      title: 'DevOps & Tooling',
      skills: ['Git & GitHub', 'Postman API Testing', 'VS Code', 'npm / Yarn', 'XAMPP Stack', 'Vercel / Cloud Deployment', 'InfinityFree Web Hosting']
    },
    {
      title: 'Domain & Industry Solutions',
      skills: ['E-Commerce & Digital Payments', 'Clinical Healthcare Portals', 'Hospitality & Dining Systems', 'Legal-Tech & Calculators', 'Productivity & Screen APIs', 'Education Platforms']
    }
  ],

  experiences: [
    {
      role: 'Lead Full-Stack Developer',
      organization: 'Food Ordering System & Digital Commerce Platform',
      location: 'Addis Ababa, Ethiopia',
      period: '2024 - Present',
      type: 'Full-Stack',
      summary: 'Architected and built a complete food ordering and restaurant management platform with integrated Ethiopian digital payment processing and real-time order tracking.',
      bulletPoints: [
        'Designed and developed a responsive client-facing food explorer with dynamic category filtering, cart calculation, and instant price tallying.',
        'Integrated local Ethiopian mobile payment gateways (Telebirr and CBE Birr) for automated and manual transaction confirmations.',
        'Built a comprehensive restaurant back-office dashboard enabling owners to manage menus, add/edit items, toggle dish availability, and monitor live orders.',
        'Implemented a normalized MySQL database schema modeling users, categories, products, orders, order items, and payment transaction logs.',
        'Engineered a live multi-stage order tracking workflow (Received → Preparing → Out for Delivery → Completed).'
      ],
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Telebirr', 'CBE Birr', 'REST APIs'],
      liveUrl: 'https://imran13.infinityfreeapp.com/',
      featured: true
    },
    {
      role: 'Frontend & UI Engineer',
      organization: 'Dr. Addis Speciality Dental Care Center',
      location: 'Addis Ababa, Ethiopia',
      period: '2024',
      type: 'Frontend',
      summary: 'Developed an interactive clinical healthcare platform streamlining dental patient bookings, credential transparency, and procedure breakdowns.',
      bulletPoints: [
        'Created a high-converting, accessible UI in React and Tailwind CSS featuring medical appointment scheduling and slot selection.',
        'Built transparent treatment cost and procedure guides for Dental Implants, Orthodontics, Smile Makeovers, and Pediatric Dentistry.',
        'Optimized client performance achieving near-perfect Lighthouse scores across accessibility, responsiveness, and load speed.',
        'Integrated clinic location mapping, doctor credential validation, and emergency patient triage guidelines.'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Vercel'],
      liveUrl: 'https://dr-addis-speciality-dental-care-cen.vercel.app/',
      featured: true
    },
    {
      role: 'Full-Stack Web Developer (Freelance)',
      organization: 'Hospitality & Commercial Client Portfolio',
      location: 'Addis Ababa, Ethiopia',
      period: '2023 - Present',
      type: 'Freelance / Contract',
      summary: 'Engineered specialized commercial web applications for high-profile hospitality, cafe, and educational brands across Addis Ababa.',
      bulletPoints: [
        'Jungle House: Built a luxury resort & events platform with interactive accommodation showcases and event booking inquiry forms.',
        'El Pacho Restaurant: Developed a vibrant Latin-fusion culinary platform featuring dynamic menu showcases and table reservation logic.',
        'Yellow Flower Cafe & Resto: Engineered an urban cafe experience with artisanal coffee brew notes and digital menu displays.',
        'Kosy Kawa Speciality Coffee: Created an Ethiopian origin coffee showcase detailing single-origin roasts, bean tasting notes, and export inquiries.',
        'Itkan Academy: Developed a structured Islamic education and Tajweed academy portal with course schedules and student intake modules.'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PHP', 'MySQL', 'Tailwind CSS'],
      liveUrl: 'https://jungle-house.vercel.app/',
      featured: true
    },
    {
      role: 'Software Developer & Algorithm Designer',
      organization: 'Specialized Web Utilities & Mathematical Calculators',
      location: 'Addis Ababa, Ethiopia',
      period: '2023 - 2024',
      type: 'Full-Stack',
      summary: 'Engineered mathematical rule engines and browser API productivity utilities for legal, religious, and workplace domains.',
      bulletPoints: [
        'Islamic Inheritance Calculator: Designed an algorithm translating Islamic jurisprudence inheritance distribution (Faraid) into an interactive real-time share calculator.',
        'StayAwake Utility: Engineered a zero-installation productivity tool leveraging the Screen Wake Lock API and 20-20-20 eye strain wellness timers.'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Screen Wake Lock API', 'Mathematical Algorithms'],
      liveUrl: 'https://stay-awake-two.vercel.app/'
    }
  ],

  education: [
    {
      degree: 'Bachelor of Science in Information Science',
      institution: 'Jimma University — Institute of Technology',
      faculty: 'Faculty of Computing and Informatics',
      department: 'Information Science Department',
      location: 'Ethiopia',
      period: 'Graduated: 2026',
      focus: 'Focused on software development, information systems, database management, web technologies, programming, data mining, information retrieval, and system analysis and design.',
      relevantAreas: [
        'Software Engineering',
        'Programming & Algorithms',
        'Web Application Development',
        'Database Management & SQL',
        'Information Systems',
        'Data Mining',
        'Information Retrieval',
        'Computer Networks',
        'System Analysis & Design',
        'Mobile Application Development'
      ],
      highlights: [
        'Rigorous coursework across software engineering, algorithms, modern web development, and relational database systems.',
        'Applied research & practice in information systems, data mining, information retrieval, and full-lifecycle system analysis and design.'
      ]
    }
  ],

  certifications: [
    {
      name: 'Android Fundamentals',
      issuer: 'Udacity',
      year: '2024',
      description: 'Completed training focused on the fundamentals of Android application development, including Android development concepts, application structure, user interfaces, and mobile development practices.',
      topics: ['Android Architecture', 'UI/UX Layouts', 'Application Lifecycle', 'Mobile Development Practices']
    },
    {
      name: 'Programming Fundamentals',
      issuer: 'Udacity',
      year: '2024',
      description: 'Completed foundational programming training covering core programming concepts, problem-solving, logic, algorithms, programming principles, and computational thinking.',
      topics: ['Core Programming Concepts', 'Algorithms & Logic', 'Problem-Solving', 'Computational Thinking']
    }
  ]
};

/**
 * Formats the entire CV as clean Markdown text suitable for copy-pasting or saving as .md/.txt
 */
export function generateMarkdownCV(cv: CVData = CV_DATA): string {
  const { personalInfo, executiveSummary, competencyCategories, experiences, education, certifications } = cv;

  return `# ${personalInfo.fullName}
**${personalInfo.headline}**

- **Email:** ${personalInfo.email}
- **Phone:** ${personalInfo.phone}
- **Location:** ${personalInfo.location}
- **Telegram:** ${personalInfo.telegram} (${personalInfo.telegramUrl})
- **GitHub:** ${personalInfo.githubUrl}
- **Portfolio:** ${personalInfo.portfolioUrl}
- **Languages:** ${personalInfo.languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}

---

## EXECUTIVE SUMMARY
${executiveSummary}

---

## TECHNICAL CORE COMPETENCIES

${competencyCategories.map(cat => `### ${cat.title}\n${cat.skills.join(' • ')}`).join('\n\n')}

---

## PROFESSIONAL EXPERIENCE & FEATURED PRODUCTION SYSTEMS

${experiences.map(exp => `### ${exp.role} | ${exp.organization}
*${exp.period} • ${exp.location} • [${exp.type}]*
${exp.liveUrl ? `Live URL: ${exp.liveUrl}\n` : ''}
${exp.summary}

**Key Responsibilities & Deliverables:**
${exp.bulletPoints.map(bp => `- ${bp}`).join('\n')}

**Technologies Used:** ${exp.technologies.join(', ')}
`).join('\n---\n\n')}

---

## EDUCATION

${education.map(edu => `### ${edu.degree}
**${edu.institution}**
*${edu.faculty ? `${edu.faculty}, ` : ''}${edu.department || ''}*
*${edu.period} | ${edu.location}*

${edu.focus || ''}

**Relevant Academic Areas:**
${(edu.relevantAreas || []).map(area => `* ${area}`).join('\n')}
`).join('\n')}

---

## PROFESSIONAL CERTIFICATIONS

${certifications.map(cert => `### ${cert.name}
**${cert.issuer}**
**Certified: ${cert.year}**

${cert.description || ''}
*Topics: ${cert.topics.join(' • ')}*
`).join('\n')}

---

## EDUCATION & CERTIFICATION SUMMARY
- **B.Sc. Information Science** — Jimma University, 2026
- **Android Fundamentals Certificate** — Udacity, 2024
- **Programming Fundamentals Certificate** — Udacity, 2024
`;
}
