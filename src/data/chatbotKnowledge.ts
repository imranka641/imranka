import { PROJECTS } from './projects';
import { CV_DATA } from './cvData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; link?: string }[];
}

export const SUGGESTED_QUESTIONS = [
  "What is Imran's overall experience?",
  "Tell me about TypeMaster & MakeCV",
  "What is his full tech stack?",
  "How does he handle Telebirr & CBE payments?",
  "What are his education and background?",
  "Can I hire Imran? What are his rates & contact?"
];

export const SYSTEM_PROMPT = `
You are the official Portfolio AI Assistant for Imran Kedir, a Full-Stack Software Developer based in Addis Ababa, Ethiopia.

### CORE OPERATING RULES:
1. STRICT PORTFOLIO FOCUS:
   - Your SOLE objective is to represent Imran Kedir and answer questions about his career, experience, technical skills, 13+ production web systems, education, and hiring availability.
   - NEVER answer unrelated queries (e.g., general trivia, homework, recipes, politics, weather, or generic coding tutorials). If the user asks something off-topic, politely decline in a single sentence and invite them to ask about Imran's engineering projects, skills, or availability.

2. CONCISE & PROFESSIONAL EXECUTION:
   - Keep all responses concise, scannable, and high-signal (maximum 2 to 3 compact paragraphs or bullet points).
   - Never use wordy greetings or conversational filler ("Certainly! I would love to help you with that!"). Answer the question directly.
   - Highlight key technologies and include direct markdown links to relevant live projects [Project Name](https://...).

3. VERIFIED CAREER FACTS ABOUT IMRAN KEDIR:
   - Role: Full-Stack Web Developer (Addis Ababa, Ethiopia; available for on-site & remote international roles).
   - Experience: 13+ production-grade web systems delivered across healthcare, e-commerce, developer tools, hospitality, and legal tech.
   - Education: B.Sc. in Information Science from Jimma University Institute of Technology (JiT), graduating 2026.
   - Certifications: Udacity (Android Fundamentals and Core Programming Concepts).
   - Frontend Stack: React (18/19), TypeScript, JavaScript (ES6+), Tailwind CSS, Motion / Framer Motion, Vite, HTML5, CSS3, Responsive Design, RTL layout support (Amharic & Arabic).
   - Backend Stack: Node.js, Express.js, PHP (OOP & Procedural), RESTful APIs, JWT Authentication, Role-Based Access Control (RBAC).
   - Databases & Storage: MySQL (normalized schemas, relational indexing), PostgreSQL, IndexedDB (offline client storage), LocalStorage.
   - Ethiopian Payment Gateways: Production integration of Telebirr and Commercial Bank of Ethiopia (CBE Birr).
   - Languages: English (Professional Working), Amharic (Native), Arabic (Foundational).
   - Contact Channels:
     * Email: imranka641@gmail.com
     * Phone / WhatsApp: +251 913 841 757
     * Telegram: @imranka641
     * GitHub: https://github.com/imranka641

4. KEY PRODUCTION PROJECTS:
   - TypeMaster (https://typemaster-jade.vercel.app/): Privacy-first offline touch-typing trainer with adaptive drills, keyboard error heatmaps, home-row finger guides (ASDF/JKL;), WPM/accuracy curves, and IndexedDB storage.
   - MakeCV (https://makecv-plum.vercel.app/): Privacy-first client-side CV builder with 6 ATS-friendly templates, real-time A4 rendering, multi-page PDF generation, and full RTL internationalization (English, Arabic, Amharic).
   - Food Ordering System (https://imran13.infinityfreeapp.com/): Full restaurant ordering platform with Telebirr & CBE Birr checkout, order tracking pipeline, and admin management.
   - Dr. Addis Dental Clinic (https://imran11.infinityfreeapp.com/): Clinical management portal with 24/7 appointment bookings and doctor rosters.
   - StayAwake (https://stay-awake-two.vercel.app/): Developer interval timer with custom work sessions.
   - Jungle Restaurant (https://jungle-restaurant.vercel.app/) & Jungle House (https://jungle-house.vercel.app/): Hospitality & eco-resort booking platforms.
   - Itkan Academy (https://itkan-academy.vercel.app/): Islamic sciences educational portal.
   - Islamic Inheritance Calculator (https://islamic-inheritance.vercel.app/): Sharia-compliant legal estate distribution engine.
   - Additional Live Projects: Yellow Flower Cafe (https://yellow-flower.vercel.app/), Kosy Kawa Coffee (https://kosy-kawa.vercel.app/), El Pacho (https://el-pacho.vercel.app/), Al White Garden (https://alwhite-garden.vercel.app/).

5. MULTILINGUAL RESPONSES:
   - When addressed in Amharic (አማርኛ), provide a concise, polite response in Amharic.
   - When addressed in Arabic (العربية), provide a concise, polite response in Arabic.
   - Otherwise, default to professional English.
`;

/**
 * Client-side fallback knowledge matcher to guarantee 100% instant,
 * concise, and portfolio-focused responses.
 */
export function getLocalKnowledgeResponse(query: string): { text: string; actions?: { label: string; action: string; link?: string }[] } {
  const q = query.toLowerCase().trim();

  // Check for clearly off-topic queries
  const offTopicKeywords = ['weather', 'recipe', 'poem', 'joke', 'movie', 'song', 'president', 'capital of', 'crypto trade', 'bitcoin price', 'sports score'];
  if (offTopicKeywords.some(kw => q.includes(kw))) {
    return {
      text: `I am specifically designed to answer questions regarding **Imran Kedir's full-stack software development career**, technical stack, 13+ production web projects, and work availability. 

Feel free to ask about his experience with React, Node.js, PHP, Ethiopian payment integrations (Telebirr/CBE), or his featured projects like TypeMaster and MakeCV!`,
      actions: [
        { label: "Imran's Experience", action: 'ask_experience' },
        { label: 'TypeMaster & MakeCV', action: 'ask_typemaster' },
        { label: 'Contact Imran', action: 'contact' }
      ]
    };
  }

  // Experience / Background / Overview
  if (q.includes('experience') || q.includes('background') || q.includes('who is') || q.includes('about imran') || q.includes('overall') || q.includes('summary') || q.includes('career')) {
    return {
      text: `**Imran Kedir** is a Full-Stack Software Developer based in Addis Ababa, Ethiopia, with a proven track record of shipping **13+ production-grade web systems**.

- **Full-Stack Competency**: Architects responsive frontend interfaces (React, TypeScript, Tailwind CSS) backed by secure REST APIs (Node.js, Express, PHP) and normalized databases (MySQL, PostgreSQL).
- **Payment Engineering**: Production experience integrating Ethiopian digital payments (**Telebirr** and **CBE Birr**).
- **Client-Side Innovation**: Created zero-login, privacy-first tools like **TypeMaster** (touch-typing trainer with IndexedDB) and **MakeCV** (A4 resume builder with multi-page PDF generation).
- **Education**: B.Sc. in Information Science from **Jimma University Institute of Technology (JiT)** (2026).`,
      actions: [
        { label: 'View TypeMaster', action: 'link', link: 'https://typemaster-jade.vercel.app/' },
        { label: 'View MakeCV', action: 'link', link: 'https://makecv-plum.vercel.app/' },
        { label: 'Hire Imran', action: 'contact' }
      ]
    };
  }

  // TypeMaster or MakeCV specifically
  if (q.includes('typemaster') || q.includes('typing') || q.includes('makecv') || q.includes('cv builder') || q.includes('resume')) {
    return {
      text: `Imran developed two standout privacy-first productivity applications:

1. **[TypeMaster](https://typemaster-jade.vercel.app/)**:
   - An offline-first touch-typing trainer built with **React, TypeScript, Tailwind CSS, and IndexedDB**.
   - Features real-time finger position guidance (home-row \`ASDF\` / \`JKL;\`), keyboard error heatmaps, adaptive weakness bigram drills, Alt+F focus mode, and WPM/accuracy tracking with zero logins required.

2. **[MakeCV](https://makecv-plum.vercel.app/)**:
   - A client-side resume builder featuring **6 ATS-friendly templates**, live A4 document rendering, and multi-page PDF generation.
   - Built with **React, TypeScript, and full RTL internationalization** supporting English, Arabic, and Amharic Ethiopic scripts with instant JSON backup/restore.`,
      actions: [
        { label: 'Open TypeMaster', action: 'link', link: 'https://typemaster-jade.vercel.app/' },
        { label: 'Open MakeCV', action: 'link', link: 'https://makecv-plum.vercel.app/' }
      ]
    };
  }

  // Tech Stack / Skills
  if (q.includes('stack') || q.includes('technologies') || q.includes('tech') || q.includes('skills') || q.includes('tools') || q.includes('languages') || q.includes('react') || q.includes('node') || q.includes('php')) {
    return {
      text: `Imran's production technology stack includes:

- **Frontend**: React (18/19), TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, Vite, HTML5/CSS3, RTL layout support (Arabic & Amharic).
- **Backend & APIs**: Node.js, Express.js, PHP (OOP & Procedural), RESTful APIs, JWT Authentication, Role-Based Access Control (RBAC).
- **Databases & Storage**: MySQL (normalized schemas, indexing), PostgreSQL, IndexedDB (offline storage), LocalStorage.
- **Integrations & DevOps**: Telebirr & CBE Birr payment APIs, Git/GitHub, Vercel, InfinityFree, Linux.`,
      actions: [
        { label: 'Explore 13+ Projects', action: 'scroll_projects' },
        { label: 'Download Imran CV', action: 'download_cv' }
      ]
    };
  }

  // Payment gateways: Telebirr & CBE
  if (q.includes('payment') || q.includes('telebirr') || q.includes('cbe') || q.includes('birr') || q.includes('ethiopian')) {
    return {
      text: `Imran has direct experience implementing Ethiopian payment gateways:

- **Telebirr Integration**: USSD and web digital wallet checkout flows for e-commerce and dining platforms.
- **CBE Birr (Commercial Bank of Ethiopia)**: Direct account settlement for customer purchases.
- **Verification Pipeline**: Transaction reference validation, order lifecycle management (Received → In Kitchen → Out for Delivery → Paid), and automated digital receipts.

Demonstrated live in Imran's **[Food Ordering System](https://imran13.infinityfreeapp.com/)**.`,
      actions: [
        { label: 'Food Ordering Demo', action: 'link', link: 'https://imran13.infinityfreeapp.com/' }
      ]
    };
  }

  // Projects list
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built')) {
    const list = PROJECTS.slice(0, 7).map((p, i) => `${i + 1}. **[${p.name}](${p.liveUrl})** — ${p.tagline}`).join('\n');
    return {
      text: `Imran has engineered and deployed **13+ live production web applications**. Featured highlights include:

${list}
*(Plus 6 additional deployed systems across dining, legal tech, and hospitality in the portfolio section below).*`,
      actions: [
        { label: 'View TypeMaster', action: 'link', link: 'https://typemaster-jade.vercel.app/' },
        { label: 'View MakeCV', action: 'link', link: 'https://makecv-plum.vercel.app/' },
        { label: 'View Food Ordering', action: 'link', link: 'https://imran13.infinityfreeapp.com/' }
      ]
    };
  }

  // Education / Degree
  if (q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('college') || q.includes('school') || q.includes('jimma')) {
    return {
      text: `**Education & Credentials:**

- **B.Sc. in Information Science** — *Jimma University Institute of Technology (JiT)* (Graduation: 2026).  
  Core areas: Software engineering, relational database design, algorithms, web architectures, and system security.
- **Certifications** — *Udacity*: Android Fundamentals & Core Programming Concepts.`,
      actions: [
        { label: 'View Full CV', action: 'view_cv' },
        { label: 'Contact Imran', action: 'contact' }
      ]
    };
  }

  // Contact / Hire / Rates
  if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('telegram') || q.includes('cost') || q.includes('price') || q.includes('rate') || q.includes('available')) {
    return {
      text: `Imran is **available for freelance projects, contract engagements, and full-time software engineering roles** (on-site in Addis Ababa or remote worldwide).

- **Email**: [imranka641@gmail.com](mailto:imranka641@gmail.com)
- **Phone / WhatsApp**: [+251 913 841 757](tel:+251913841757)
- **Telegram**: [@imranka641](https://t.me/imranka641)
- **GitHub**: [github.com/imranka641](https://github.com/imranka641)

Typical delivery timelines range from 1–3 weeks with end-to-end deployment and testing included.`,
      actions: [
        { label: 'Send an Email', action: 'link', link: 'mailto:imranka641@gmail.com' },
        { label: 'Message on Telegram', action: 'link', link: 'https://t.me/imranka641' }
      ]
    };
  }

  // Amharic greetings & questions
  if (/[\u1200-\u137F]/.test(q)) {
    return {
      text: `ሰላም! እኔ የኢምራን ከድር የፖርትፎሊዮ ረዳት AI ነኝ።

ኢምራን በአዲስ አበባ የሚገኝ **የሙሉ-ስታክ የድር ሶፍትዌር አበልጻጊ** (Full-Stack Developer) ሲሆን፣ **ከ13 በላይ የቀጥታ ሲስተሞችን** (እንደ TypeMaster፣ MakeCV፣ የቴሌብር/ሲቢኢ ምግብ ማዘዣ እና የክሊኒክ ቀጠሮ) ገንብቷል።

- **ስልክ / ቴሌግራም**: +251 913 841 757 | [@imranka641](https://t.me/imranka641)
- **ኢሜይል**: imranka641@gmail.com`,
      actions: [
        { label: 'ፕሮጀክቶችን ይመልከቱ', action: 'scroll_projects' },
        { label: 'ኢምራንን ያግኙ', action: 'contact' }
      ]
    };
  }

  // Arabic greetings & questions
  if (/[\u0600-\u06FF]/.test(q)) {
    return {
      text: `مرحباً بك! أنا المساعد الذكي لمطور الويب عمران خضر.

عمران مطور برمجيات متكامل (Full-Stack Developer) مقيم في أديس أبابا، إثيوبيا، وقد أنجز ونشر **أكثر من 13 نظام ويب حي** (مثل TypeMaster و MakeCV ومنظومة طلب الطعام ببوابات Telebirr و CBE).

- **الهاتف / تيليجرام**: 757 841 913 251+ | [@imranka641](https://t.me/imranka641)
- **البريد الإلكتروني**: imranka641@gmail.com`,
      actions: [
        { label: 'استعراض المشاريع', action: 'scroll_projects' },
        { label: 'تواصل مع عمران', action: 'contact' }
      ]
    };
  }

  // Default concise overview
  return {
    text: `Imran Kedir is a **Full-Stack Software Developer** based in Addis Ababa, Ethiopia, with proven experience across **13+ live production web applications**.

Key areas of expertise:
- **Frontend**: React & TypeScript with Tailwind CSS and full RTL/internationalization.
- **Backend & APIs**: Node.js, Express, and PHP RESTful services.
- **Database & Storage**: Normalized MySQL/PostgreSQL and client-side IndexedDB.
- **Local Payments**: Production integration of **Telebirr** and **CBE Birr**.

What would you like to explore regarding his work or availability?`,
    actions: [
      { label: "TypeMaster & MakeCV", action: "ask_typemaster" },
      { label: "Tech Stack", action: "ask_stack" },
      { label: "Contact & Hire", action: "contact" }
    ]
  };
}
