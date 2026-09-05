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
You are the official AI Portfolio Assistant for Imran Kedir, a dedicated Full-Stack Web Developer based in Addis Ababa, Ethiopia.
Your goal is to answer questions about Imran's overall experience, background, skills, 13+ production projects, and work availability.

### Key Facts About Imran Kedir:
- **Title**: Full-Stack Software Developer
- **Location**: Addis Ababa, Ethiopia (Available for local in-person and international remote work)
- **Education**: Bachelor of Science (B.Sc.) in Information Science from Jimma University Institute of Technology (JiT), graduating 2026.
- **Certifications**: Udacity (Android Fundamentals and Programming Fundamentals).
- **Core Experience**: Over 13+ production-grade web applications engineered across healthcare, e-commerce, developer tools, hospitality, and legal tech.
- **Frontend Stack**: React (18/19), TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion/Motion, Vite, HTML5, CSS3 Grid/Flexbox, Responsive Design, RTL layout support (Arabic/Amharic).
- **Backend Stack**: Node.js, Express.js, PHP (Procedural & OOP), RESTful APIs, JWT Authentication, Role-Based Access Control (RBAC).
- **Databases & Persistence**: MySQL (normalized schemas, indexing, relationships), PostgreSQL, IndexedDB (offline client storage), LocalStorage.
- **Payment Gateway Integrations**: Telebirr and Commercial Bank of Ethiopia (CBE Birr).
- **Languages**: English (Professional Working), Amharic (Native), Arabic (Foundational).
- **Contact Channels**:
  - Email: imranka641@gmail.com
  - Phone: +251 940 318 641
  - Telegram: @Imran_K
  - GitHub: https://github.com/imran-k-prog

### Featured Projects (13+ Web Applications):
1. **TypeMaster**: Modern offline-first touch-typing trainer with adaptive drills, keyboard heatmaps, finger position guide (home-row ASDF/JKL;), WPM/accuracy analytics, Alt+F focus mode. Live: https://typemaster-jade.vercel.app/
2. **MakeCV**: Privacy-first client-side resume builder with 6 ATS-friendly templates, real-time A4 preview, multi-page PDF generation, JSON backup/restore, and Arabic/Amharic RTL support. Live: https://makecv-plum.vercel.app/
3. **Food Ordering System**: Full restaurant ordering platform with cart checkout, Telebirr & CBE Birr payment gateways, live order tracking, and restaurant admin panel. Live: https://imran13.infinityfreeapp.com/
4. **Dr. Addis Dental Clinic**: Clinic management platform with 24/7 online appointment booking, doctor schedules, service catalog, and live opening status. Live: https://imran11.infinityfreeapp.com/
5. **StayAwake**: Developer productivity interval timer with custom work sessions and audio alerts. Live: https://imran-k-prog.github.io/StayAwake/
6. **Jungle Restaurant**: Restaurant dining hub with menu explorer, online table reservation, and catering requests. Live: https://jungle-restaurant.vercel.app/
7. **Jungle House Resort & Lodges**: Eco-resort booking platform for forest lodges, pavilion events, and wellness retreats. Live: https://jungle-house.vercel.app/
8. **Itkan Academy**: Islamic sciences educational platform with curriculum roadmaps and student portal. Live: https://itkan-academy.vercel.app/
9. **El Pacho Restaurant**: Culinary dining showcase with reservations and catering menus. Live: https://el-pacho.vercel.app/
10. **Yellow Flower Cafe**: Specialty cafe & bakery platform with artisan pastry orders. Live: https://yellow-flower.vercel.app/
11. **Kosy Kawa Coffee**: Specialty Ethiopian coffee subscription and e-commerce portal. Live: https://kosy-kawa.vercel.app/
12. **Islamic Inheritance Calculator**: Sharia-compliant legal-tech estate distribution engine with Quranic fractional shares. Live: https://islamic-inheritance.vercel.app/
13. **Al White Garden**: Luxury wedding & event pavilion booking platform. Live: https://alwhite-garden.vercel.app/

### Tone & Style:
Be friendly, professional, confident, concise, and helpful. Use clear bullet points and highlight key technologies and direct links to live projects. When asked in Amharic or Arabic, respond politely in that language.
`;

/**
 * Client-side fallback knowledge matcher to guarantee 100% instant responses
 * even without an external API key or during network downtime.
 */
export function getLocalKnowledgeResponse(query: string): { text: string; actions?: { label: string; action: string; link?: string }[] } {
  const q = query.toLowerCase().trim();

  // Experience / Background / Overview
  if (q.includes('experience') || q.includes('background') || q.includes('who is') || q.includes('about imran') || q.includes('overall') || q.includes('summary')) {
    return {
      text: `**Imran Kedir** is a dedicated **Full-Stack Web Developer** based in Addis Ababa, Ethiopia, with a proven track record of architecting and shipping **13+ production-grade web systems** across healthcare, e-commerce, developer tools, hospitality, and legal technology.

**Key Career Highlights:**
- **Full Lifecycle Mastery**: Proficient across the entire stack—from UI/UX design (React, TypeScript, Tailwind CSS) to robust backend APIs (Node.js, Express, PHP) and normalized databases (MySQL, PostgreSQL).
- **Ethiopian Payment Gateways**: Implemented local digital payment checkouts with **Telebirr** and **CBE Birr** for Ethiopian commerce and dining.
- **Client-Side & Offline Innovations**: Built privacy-first, offline-capable applications like **TypeMaster** (IndexedDB) and **MakeCV** (A4 canvas sandboxing & PDF export).
- **Education**: B.Sc. in Information Science from **Jimma University Institute of Technology (JiT)** (2026).
- **Languages**: English, Amharic, and Arabic.`,
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
      text: `Imran recently built two standout frontend productivity web applications:

1. **TypeMaster** ([Live Demo](https://typemaster-jade.vercel.app/))
   - An offline-first touch-typing trainer built with **React, TypeScript, Tailwind CSS, and IndexedDB**.
   - Features real-time dual-hand finger guidance (home-row anchors: \`ASDF\` / \`JKL;\`), keyboard error heatmaps, adaptive weakness bigram drills, Alt+F fullscreen focus mode, and WPM/accuracy curves. Zero logins required.

2. **MakeCV** ([Live Demo](https://makecv-plum.vercel.app/))
   - A privacy-first client-side CV/resume builder featuring **6 ATS-friendly templates**, live A4 document rendering, and multi-page PDF generation without awkward page splits.
   - Built with **React, TypeScript, Tailwind CSS, and full RTL internationalization** supporting English, Arabic, and Amharic Ethiopic scripts with one-click JSON backup & restore.`,
      actions: [
        { label: 'Open TypeMaster', action: 'link', link: 'https://typemaster-jade.vercel.app/' },
        { label: 'Open MakeCV', action: 'link', link: 'https://makecv-plum.vercel.app/' }
      ]
    };
  }

  // Tech Stack / Skills
  if (q.includes('stack') || q.includes('technologies') || q.includes('tech') || q.includes('skills') || q.includes('tools') || q.includes('languages') || q.includes('react') || q.includes('node') || q.includes('php')) {
    return {
      text: `Imran has hands-on production expertise across **15+ modern software engineering technologies**:

- **Frontend**: React 18/19, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion / Motion, Vite, HTML5 / Semantic Web, CSS3 Flexbox/Grid, Responsive Design, RTL layout support.
- **Backend & APIs**: Node.js, Express.js, PHP (Procedural & OOP), RESTful API Architecture, JWT Authentication, Role-Based Access Control (RBAC).
- **Databases & Storage**: MySQL (Normalized schemas, foreign keys, indexing), PostgreSQL, IndexedDB (Offline storage), LocalStorage.
- **Payments & Integrations**: Telebirr API, Commercial Bank of Ethiopia (CBE Birr), Web APIs, Canvas rendering & PDF generation (jsPDF, html2canvas).
- **DevOps & Tooling**: Git, GitHub, Vite, esbuild, Vercel, InfinityFree, Linux shell environments.`,
      actions: [
        { label: 'Explore 13+ Projects', action: 'scroll_projects' },
        { label: 'Download Imran CV', action: 'download_cv' }
      ]
    };
  }

  // Payment gateways: Telebirr & CBE
  if (q.includes('payment') || q.includes('telebirr') || q.includes('cbe') || q.includes('birr') || q.includes('ethiopian')) {
    return {
      text: `Imran has specialized experience integrating Ethiopian digital payment solutions:

- **Telebirr Integration**: Enables fast USSD and web digital wallet checkout flows directly in e-commerce and restaurant order pipelines.
- **Commercial Bank of Ethiopia (CBE Birr)**: Supports direct account-to-merchant settlements for customers across Ethiopia.
- **Transaction Verification & Security**: Built complete order management panels that confirm reference IDs, generate digital receipts, and track order stages (Received → In Kitchen → Out for Delivery → Paid).

You can test this live in Imran's **Food Ordering System** ([Live Demo](https://imran13.infinityfreeapp.com/)).`,
      actions: [
        { label: 'Food Ordering Demo', action: 'link', link: 'https://imran13.infinityfreeapp.com/' }
      ]
    };
  }

  // Projects list
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built')) {
    const list = PROJECTS.map((p, i) => `${i + 1}. **${p.name}** — ${p.tagline} ([Live Link](${p.liveUrl}))`).join('\n');
    return {
      text: `Imran has engineered and deployed **13+ live production web applications**:

${list}

Every project is fully responsive, deployed live on the web, and features real-world user workflows!`,
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
      text: `**Education & Academic Credentials:**

- **Bachelor of Science (B.Sc.) in Information Science**  
  *Jimma University — Institute of Technology (JiT)* (Graduating 2026)  
  Focus areas: Software engineering principles, relational database design, algorithms, web technologies, and systems security.

- **Professional Certifications:**  
  *Udacity* — Android Fundamentals & Core Programming Concepts.`,
      actions: [
        { label: 'View Full CV', action: 'view_cv' },
        { label: 'Contact Imran', action: 'contact' }
      ]
    };
  }

  // Contact / Hire / Rates
  if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('telegram') || q.includes('cost') || q.includes('price') || q.includes('rate') || q.includes('available')) {
    return {
      text: `Imran is currently **available for freelance projects, contract engagements, and full-time software engineering roles** (both local in Addis Ababa and international remote).

**Contact Channels:**
- **Email**: [imranka641@gmail.com](mailto:imranka641@gmail.com)
- **Phone / WhatsApp**: [+251 940 318 641](tel:+251940318641)
- **Telegram**: [@Imran_K](https://t.me/Imran_K)
- **GitHub**: [github.com/imran-k-prog](https://github.com/imran-k-prog)

**Typical Service Estimates:**
- Business / Corporate Website: From $650 (1-2 weeks)
- Clinic & Booking System: From $850 (2-3 weeks)
- E-Commerce with Telebirr & CBE: From $950 (2-3 weeks)
- Custom Web Platform / SaaS: From $1,200 (2-4 weeks)`,
      actions: [
        { label: 'Send an Email', action: 'link', link: 'mailto:imranka641@gmail.com' },
        { label: 'Message on Telegram', action: 'link', link: 'https://t.me/Imran_K' }
      ]
    };
  }

  // Amharic greetings & questions
  if (/[\u1200-\u137F]/.test(q)) {
    return {
      text: `ሰላም! እኔ የኢምራን ከድር የፖርትፎሊዮ ረዳት AI ነኝ።

ኢምራን በአዲስ አበባ የሚገኝ የሙሉ-ስታክ የድር ሶፍትዌር አበልጻጊ (Full-Stack Developer) ሲሆን፣ **ከ13 በላይ የቀጥታ ሲስተሞችን** (እንደ TypeMaster፣ MakeCV፣ የቴሌብር/ሲቢኢ ምግብ ማዘዣ፣ የክሊኒክ ቀጠሮ እና ሌሎችም) ገንብቷል።

ምን ማወቅ ይፈልጋሉ?
- የኢምራን የስራ ልምድ እና የቴክኖሎጂ ችሎታ
- የተሰሩ የቀጥታ ፕሮጀክቶች
- የቴሌብር እና ሲቢኢ ብር ክፍያ አሰራር
- አብሮ ለመስራት እና የስልክ/ቴሌግራም አድራሻ (+251 940 318 641 / @Imran_K)`,
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

عمران مطور برمجيات متكامل (Full-Stack Developer) مقيم في أديس أبابا، إثيوبيا، وقد قام بتطوير ونشر **أكثر من 13 نظام ويب حي** في مجالات الرعاية الصحية، والتجارة الإلكترونية، وأدوات المطورين (مثل TypeMaster و MakeCV)، وتطبيقات إدارة المواعيد.

يمكنني إجابتك عن:
- خبرات عمران البرمجية (React, TypeScript, Node.js, PHP, MySQL)
- مشاريعه الحية وروابط المعاينة
- تكامل بوابات الدفع الإلكتروني
- قنوات التواصل وطلب المشاريع (+251 940 318 641 / @Imran_K)`,
      actions: [
        { label: 'استعراض المشاريع', action: 'scroll_projects' },
        { label: 'تواصل مع عمران', action: 'contact' }
      ]
    };
  }

  // Default intelligent overview
  return {
    text: `Thanks for asking! Imran Kedir is a **Full-Stack Software Developer** based in Addis Ababa, Ethiopia with extensive experience across **13+ live production web applications**.

He specializes in:
- **Frontend Architecture**: High-speed, responsive React & TypeScript interfaces with Tailwind CSS and full RTL/internationalization.
- **Backend & APIs**: Scalable REST APIs using Node.js/Express and PHP.
- **Database Engineering**: Normalized MySQL & PostgreSQL schemas, plus offline client-side storage with IndexedDB.
- **Local Payments**: End-to-end integration of Ethiopian digital payments (**Telebirr & CBE Birr**).

Would you like to learn more about a specific project (e.g. **TypeMaster**, **MakeCV**, **Food Ordering**), his tech stack, or his contact information for hiring?`,
    actions: [
      { label: "TypeMaster & MakeCV", action: "ask_typemaster" },
      { label: "Tech Stack", action: "ask_stack" },
      { label: "Contact & Hire", action: "contact" }
    ]
  };
}
