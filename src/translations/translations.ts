export type Language = 'en' | 'am' | 'ar';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    services: string;
    process: string;
    cv: string;
    contact: string;
    contactMe: string;
    viewCv: string;
    switchLang: string;
  };
  hero: {
    badgeStatus: string;
    badgeLocation: string;
    greeting: string;
    name: string;
    titles: string[];
    description: string;
    ctaProjects: string;
    ctaContact: string;
    ctaCv: string;
    metricProjects: string;
    metricProjectsLabel: string;
    metricDeploy: string;
    metricDeployLabel: string;
    metricPayments: string;
    metricPaymentsLabel: string;
    metricLocation: string;
    metricLocationLabel: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    coreValuesTitle: string;
    coreValues: Array<{
      title: string;
      desc: string;
    }>;
    quickFactsTitle: string;
    factLocation: string;
    factLocationVal: string;
    factEducation: string;
    factEducationVal: string;
    factCertifications: string;
    factCertificationsVal: string;
    factLanguages: string;
    factLanguagesVal: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    viewLive: string;
    viewSource: string;
    viewDetails: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    discussCta: string;
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
  };
  cvSection: {
    badge: string;
    title: string;
    subtitle: string;
    openHub: string;
    downloadPdf: string;
    generatingPdf: string;
    print: string;
    downloadTxt: string;
    eduTitle: string;
    eduSchool: string;
    certTitle: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    fastResponse: string;
    fastResponseSub: string;
    chooseOption: string;
    telegram: string;
    whatsapp: string;
    email: string;
    provideDetails: string;
    fullName: string;
    namePlaceholder: string;
    emailOrPhone: string;
    emailOrPhonePlaceholder: string;
    projectSubject: string;
    subjectPlaceholder: string;
    projectCategory: string;
    message: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendMessage: string;
    formName: string;
    formContact: string;
    formType: string;
    formSubject: string;
    formBudget: string;
    formTimeline: string;
    formNotes: string;
    formSubmit: string;
  };
  footer: {
    tagline: string;
    rights: string;
    locationNote: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      services: 'Services',
      process: 'Process',
      cv: 'CV / Resume',
      contact: 'Contact',
      contactMe: 'Contact Me',
      viewCv: 'Resume / CV',
      switchLang: 'Language',
    },
    hero: {
      badgeStatus: 'Available for projects',
      badgeLocation: 'Addis Ababa, Ethiopia',
      greeting: "Hi, I'm",
      name: 'Imran Kedir',
      titles: [
        'Full-Stack Developer',
        'Building Modern Digital Experiences',
        'Turning Ideas Into Scalable Web Applications'
      ],
      description: 'Full-stack software developer with a proven track record delivering 13+ high-performance web systems across healthcare, hospitality, e-commerce with Ethiopian payments (Telebirr & CBE), developer tools, and legal tech. Crafting fast, accessible, and scalable digital solutions.',
      ctaProjects: 'View Verified Work',
      ctaContact: "Let's Build Together",
      ctaCv: 'Interactive CV / PDF',
      metricProjects: '13+',
      metricProjectsLabel: 'Live Production Deliveries',
      metricDeploy: '100%',
      metricDeployLabel: 'Responsive & Fast UI',
      metricPayments: 'Telebirr & CBE',
      metricPaymentsLabel: 'Integrated Gateways',
      metricLocation: 'Addis Ababa',
      metricLocationLabel: 'Available for Local & Remote',
    },
    about: {
      badge: 'About Imran',
      title: 'Passionate Full-Stack Developer & Problem Solver',
      subtitle: 'Based in Addis Ababa, Ethiopia — delivering robust software architectures with modern user experiences.',
      bioParagraph1: "I'm a Full-Stack Web Developer graduated with a Bachelor of Science in Information Science from Jimma University (Institute of Technology). I specialize in translating complex business logic into clean, responsive, high-performing web applications.",
      bioParagraph2: "My production experience spans full-lifecycle engineering: from designing normalized MySQL schemas and building secure Node.js/PHP REST APIs, to crafting dynamic React & TypeScript interfaces with seamless local payment integrations like Telebirr and CBE Birr.",
      bioParagraph3: "Whether engineering clinical booking platforms, hospitality systems, or specialized productivity calculators, I focus on clean code, speed, security, and measurable client results.",
      coreValuesTitle: 'Engineering Philosophy',
      coreValues: [
        {
          title: 'Clean, Scalable Architecture',
          desc: 'Modular code with strict TypeScript type safety, normalized databases, and clean RESTful API standards.'
        },
        {
          title: 'Real-World Business Impact',
          desc: 'Engineered specifically to convert visitors, automate daily workflows, and streamline customer checkouts.'
        },
        {
          title: 'Full Lifecycle Ownership',
          desc: 'From discovery and UI prototyping to database indexing, payment testing, and zero-downtime deployment.'
        },
        {
          title: 'Speed & Accessibility',
          desc: 'High Lighthouse performance scores, instant page transitions, and mobile-first responsiveness across devices.'
        }
      ],
      quickFactsTitle: 'Quick Profile Facts',
      factLocation: 'Location',
      factLocationVal: 'Addis Ababa, Ethiopia',
      factEducation: 'Education',
      factEducationVal: 'B.Sc. Information Science — Jimma University (2026)',
      factCertifications: 'Certifications',
      factCertificationsVal: 'Udacity (Android & Programming Fundamentals)',
      factLanguages: 'Languages',
      factLanguagesVal: 'English, Amharic, Arabic (Foundational)',
    },
    skills: {
      badge: 'Technical Capabilities',
      title: 'Full-Stack Engineering Stack',
      subtitle: 'A versatile toolkit honed across 13+ production systems, focused on stability, performance, and maintainability.',
    },
    projects: {
      badge: 'Verified Portfolio',
      title: 'Featured Production Work',
      subtitle: 'Explore 13 deployed web systems engineered with modern architectures, custom databases, and real user workflows.',
      filterAll: 'All Systems',
      viewLive: 'Live Demo',
      viewSource: 'GitHub Code',
      viewDetails: 'View System Details',
    },
    services: {
      badge: 'What I Build',
      title: 'Tailored Web & Software Services',
      subtitle: 'From enterprise web applications to payment-integrated commerce and specialized clinical platforms.',
      discussCta: 'Discuss Your Project',
    },
    process: {
      badge: 'How We Work',
      title: 'Structured 4-Stage Development Process',
      subtitle: 'Transparent, milestone-driven execution ensuring your project launches on time, on budget, and bug-free.',
    },
    cvSection: {
      badge: 'Curriculum Vitae',
      title: 'Verified Technical Credentials & Experience',
      subtitle: 'Inspect verified academic qualifications, production track record, and technical capabilities in multiple formats.',
      openHub: 'Open CV Hub',
      downloadPdf: 'Download 1-Page PDF',
      generatingPdf: 'Generating PDF...',
      print: 'Print',
      downloadTxt: '.TXT',
      eduTitle: 'B.Sc. in Information Science',
      eduSchool: 'Jimma University — Institute of Technology (2026)',
      certTitle: 'Udacity Certified (Android & Programming Fundamentals)',
    },
    contact: {
      badge: "Let's Connect",
      title: 'Start Your Project or Inquire',
      subtitle: 'Select your preferred direct messaging channel below (Telegram, WhatsApp, or Email) for an instant formatted inquiry.',
      fastResponse: 'Fastest response via Telegram (@imranka641) & WhatsApp (+251 913 841 757)',
      fastResponseSub: 'Direct developer contact — typical response within 2–4 hours',
      chooseOption: 'Choose Preferred Contact Channel',
      telegram: 'Telegram (Instant Response)',
      whatsapp: 'WhatsApp (Direct Chat)',
      email: 'Email (Formal Inquiry)',
      provideDetails: 'Project Details & Specifications',
      fullName: 'Your Full Name / Organization',
      namePlaceholder: 'e.g. Abebe Bekele / Tech Solutions PLC',
      emailOrPhone: 'Your Email, Phone, or Telegram',
      emailOrPhonePlaceholder: 'e.g. imranka641@gmail.com or @username',
      projectSubject: 'Project Subject / Title',
      subjectPlaceholder: 'e.g. Addis Restaurant Ordering Web App with Telebirr',
      projectCategory: 'Project / Service Domain',
      message: 'Project Requirements & Specifications',
      messagePlaceholder: 'Describe your core goals, target users, desired features (e.g. Telebirr payments, admin panel), and timeline expectations...',
      sendBtn: 'Dispatch Formatted Inquiry',
      sendMessage: 'Send Message via Selected Channel',
      formName: 'Your Full Name',
      formContact: 'Your Email or Phone / Telegram',
      formType: 'Project / Service Category',
      formSubject: 'Project Subject / Title',
      formBudget: 'Estimated Budget / Scope',
      formTimeline: 'Target Timeline',
      formNotes: 'Project Details & Requirements',
      formSubmit: 'Generate Formatted Message',
    },
    footer: {
      tagline: 'Full-Stack Developer crafting high-performance, responsive web systems and digital experiences.',
      rights: 'All rights reserved.',
      locationNote: 'Crafted with precision in Addis Ababa, Ethiopia',
    }
  },

  am: {
    nav: {
      home: 'መነሻ',
      about: 'ስለ እኔ',
      skills: 'ክህሎቶች',
      projects: 'ፕሮጀክቶች',
      services: 'አገልግሎቶች',
      process: 'የስራ ሂደት',
      cv: 'ሲቪ (CV)',
      contact: 'አግኙኝ',
      contactMe: 'አግኙኝ',
      viewCv: 'የስራ ልምድ / ሲቪ',
      switchLang: 'ቋንቋ',
    },
    hero: {
      badgeStatus: 'ለአዲስ ፕሮጀክቶች ዝግጁ',
      badgeLocation: 'አዲስ አበባ፣ ኢትዮጵያ',
      greeting: 'ሰላም፣ እኔ',
      name: 'ኢምራን ከድር',
      titles: [
        'የሙሉ-ስታክ ሶፍትዌር አበልጻጊ',
        'ዘመናዊ ዲጂታል ቴክኖሎጂዎችን መገንባት',
        'ሀሳቦችን ወደ አስተማማኝ የድር ሲስተም መቀየር'
      ],
      description: 'በጤና ጥበቃ፣ ሆስፒታሊቲ፣ የቴሌብር እና ሲቢኢ ብር የክፍያ ውህደት ባላቸው የኢ-ኮሜርስ መድረኮች እና ልዩ ልዩ የቢዝነስ ሶፍትዌሮች ላይ ከ13 በላይ የተረጋገጡ የድር ሲስተሞችን የገነባ የሙሉ-ስታክ ሶፍትዌር አበልጻጊ።',
      ctaProjects: 'የተሰሩ ፕሮጀክቶችን ይመልከቱ',
      ctaContact: 'አብረን እንስራ',
      ctaCv: 'ሲቪ / PDF አውርድ',
      metricProjects: '13+',
      metricProjectsLabel: 'የተጠናቀቁ የቀጥታ ሲስተሞች',
      metricDeploy: '100%',
      metricDeployLabel: 'ፈጣን እና ምቹ ዲዛይን',
      metricPayments: 'ቴሌብር እና ሲቢኢ',
      metricPaymentsLabel: 'የክፍያ ሲስተም ውህደት',
      metricLocation: 'አዲስ አበባ',
      metricLocationLabel: 'በአካል እና በኦንላይን ለመስራት ዝግጁ',
    },
    about: {
      badge: 'ስለ ኢምራን',
      title: 'ለጥራት እና ለውጤት የሚተጋ የሙሉ-ስታክ ሶፍትዌር አበልጻጊ',
      subtitle: 'በአዲስ አበባ፣ ኢትዮጵያ የሚገኝ — ዘመናዊ እና ፈጣን የድር መተግበሪያዎችን በጥራት የሚያቀርብ።',
      bioParagraph1: 'ከጅማ ዩኒቨርሲቲ ቴክኖሎጂ ኢንስቲትዩት በኢንፎርሜሽን ሳይንስ የባችለር ዲግሪ የተመረቅኩ የሙሉ-ስታክ የድር ሶፍትዌር አበልጻጊ ነኝ። ውስብስብ የቢዝነስ ፍላጎቶችን ወደ ቀላል እና አስተማማኝ የዲጂታል ሲስተሞች እቀይራለሁ።',
      bioParagraph2: 'የስራ ልምዴ የዳታቤዝ አወቃቀርን (MySQL/PostgreSQL)፣ ደህንነታቸው የተጠበቁ የNode.js እና PHP ኤፒአይዎችን (APIs)፣ እንዲሁም በReact እና TypeScript የተሰሩ ማራኪ የፊት ለፊት ገጾችን ከቴሌብር እና ከኢትዮጵያ ንግድ ባንክ (CBE) ክፍያዎች ጋር ማስተሳሰርን ያካትታል።',
      bioParagraph3: 'የክሊኒክ ቀጠሮ ሲስተሞችን፣ የሆቴል እና ምግብ ቤት መድረኮችን ወይም ልዩ የስራ ማስያዣ መሳሪያዎችን ስሰራ ዋና ትኩረቴ በኮድ ጥራት፣ በፍጥነት፣ በደህንነት እና በደንበኞች እርካታ ላይ ነው።',
      coreValuesTitle: 'የሙያ መርሆዎቼ',
      coreValues: [
        {
          title: 'ንፁህ እና ደረጃውን የጠበቀ አሰራር',
          desc: 'በTypeScript ጥብቅ ቁጥጥር፣ የተደራጀ ዳታቤዝ እና ደረጃቸውን የጠበቁ REST ኤፒአይዎች የተገነባ ኮድ።'
        },
        {
          title: 'ቀጥተኛ የንግድ ጥቅም ማስገኘት',
          desc: 'ጎብኝዎችን ወደ ደንበኝነት የሚቀይሩ፣ የዕለት ተዕለት ስራን የሚያቀሉ እና ሽያጭን የሚያሳድጉ ሲስተሞች።'
        },
        {
          title: 'የሙሉ ዑደት ኃላፊነት',
          desc: 'ከመጀመሪያ ዕቅድ እና ዲዛይን እስከ ዳታቤዝ ግንባታ፣ የክፍያ ሙከራ እና ቀጥታ ስርጭት ድረስ ሙሉ ቁጥጥር።'
        },
        {
          title: 'ፍጥነት እና በሞባይል ምቹነት',
          desc: 'በከፍተኛ ፍጥነት የሚሰሩ ገጾች እና በማንኛውም ስልክ ወይም ኮምፒውተር ላይ እንከን-አልባ እይታ።'
        }
      ],
      quickFactsTitle: 'አጭር መረጃ',
      factLocation: 'አድራሻ',
      factLocationVal: 'አዲስ አበባ፣ ኢትዮጵያ',
      factEducation: 'ትምህርት',
      factEducationVal: 'ቢ.ኤስ.ሲ በኢንፎርሜሽን ሳይንስ — ጅማ ዩኒቨርሲቲ (2026)',
      factCertifications: 'የሙያ ማረጋገጫዎች',
      factCertificationsVal: 'ዩዳሲቲ (የአንድሮይድ እና የፕሮግራሚንግ መሰረታዊያን)',
      factLanguages: 'ቋንቋዎች',
      factLanguagesVal: 'እንግሊዝኛ፣ አማርኛ፣ አረብኛ (መሰረታዊ)',
    },
    skills: {
      badge: 'የቴክኒክ ክህሎቶች',
      title: 'የቴክኖሎጂ እና የሶፍትዌር መሳሪያዎች',
      subtitle: 'ከ13+ በላይ የቀጥታ ሲስተሞች ግንባታ የተፈተኑ እና ለዘላቂነት የተመረጡ ቴክኖሎጂዎች።',
    },
    projects: {
      badge: 'የተሰሩ ስራዎች',
      title: 'የተመረጡ የቀጥታ ፕሮጀክቶች',
      subtitle: 'በዘመናዊ አሰራር እና በእውነተኛ ዳታቤዝ የተገነቡ 13 የቀጥታ የድር ሲስተሞችን ያስሱ።',
      filterAll: 'ሁሉም ሲስተሞች',
      viewLive: 'ቀጥታ ይመልከቱ',
      viewSource: 'የኮድ ምንጭ',
      viewDetails: 'ዝርዝር መረጃ',
    },
    services: {
      badge: 'የምሰጣቸው አገልግሎቶች',
      title: 'ብጁ የድር እና የሶፍትዌር አገልግሎቶች',
      subtitle: 'ከድርጅት ድረ-ገጾች እስከ የክፍያ ውህደት ያላቸው የኢ-ኮሜርስ እና የክሊኒክ አስተዳደር ሲስተሞች።',
      discussCta: 'ስለ ፕሮጀክትዎ ይወያዩ',
    },
    process: {
      badge: 'የስራ አካሄድ',
      title: 'በ 4 ደረጃዎች የተዋቀረ የስራ ሂደት',
      subtitle: 'ግልጽ፣ በጊዜ የሚጠናቀቅ እና ያለምንም ስህተት ወደ ስራ የሚገባ ጥራት ያለው የስራ ሂደት።',
    },
    cvSection: {
      badge: 'የስራ ልምድ ማጠቃለያ',
      title: 'የተረጋገጠ የትምህርት እና የስራ ልምድ',
      subtitle: 'የአካዳሚክ ማረጋገጫዎችን፣ የተሰሩ ፕሮጀክቶችን እና የቴክኒክ ክህሎቶችን በተለያዩ ቅርጸቶች ይመልከቱ።',
      openHub: 'ሙሉ ሲቪውን ይመልከቱ',
      downloadPdf: 'ባለ 1-ገጽ PDF አውርድ',
      generatingPdf: 'PDF በመዘጋጀት ላይ...',
      print: 'አትም (Print)',
      downloadTxt: '.TXT',
      eduTitle: 'ቢ.ኤስ.ሲ በኢንፎርሜሽን ሳይንስ',
      eduSchool: 'ጅማ ዩኒቨርሲቲ — የቴክኖሎጂ ኢንስቲትዩት (2026)',
      certTitle: 'የዩዳሲቲ የሙያ ማረጋገጫዎች (አንድሮይድ እና ፕሮግራሚንግ)',
    },
    contact: {
      badge: 'ያግኙኝ',
      title: 'ፕሮጀክትዎን አሁኑኑ ያስጀምሩ',
      subtitle: 'ፈጣን መልስ ለማግኘት ከስር ካሉት አማራጮች (ቴሌግራም፣ ዋትስአፕ ወይም ኢሜይል) ይምረጡ።',
      fastResponse: 'ፈጣን ምላሽ በቴሌግራም (@imranka641) እና ዋትስአፕ (+251 913 841 757)',
      fastResponseSub: 'ቀጥተኛ የገንቢ ግንኙነት — በ2–4 ሰዓት ውስጥ ምላሽ',
      chooseOption: 'የመገናኛ መንገድ ይምረጡ',
      telegram: 'ቴሌግራም (ፈጣን)',
      whatsapp: 'ዋትስአፕ',
      email: 'ኢሜይል',
      provideDetails: 'የፕሮጀክት መረጃና ፍላጎቶች',
      fullName: 'ሙሉ ስምዎ ወይም ድርጅትዎ',
      namePlaceholder: 'ምሳሌ፦ አበበ በቀለ / ቴክ ሶሉሽንስ',
      emailOrPhone: 'ኢሜይል፣ ስልክ ወይም ቴሌግራም',
      emailOrPhonePlaceholder: 'ምሳሌ፦ email@domain.com ወይም @username',
      projectSubject: 'የመልእክቱ ርዕስ',
      subjectPlaceholder: 'ምሳሌ፦ የቴሌብር ክፍያ ያለበት የሬስቶራንት ድረ-ገጽ',
      projectCategory: 'የፕሮጀክቱ ዘርፍ',
      message: 'የፕሮጀክቱ ዝርዝር ፍላጎቶች',
      messagePlaceholder: 'የሚፈልጉትን ሲስተም፣ ቁልፍ ገፅታዎች እና የሚፈለግበትን ጊዜ ይግለጹ...',
      sendBtn: 'መልእክቱን አዘጋጅና ላክ',
      sendMessage: 'በተመረጠው መንገድ መልእክት ላክ',
      formName: 'ሙሉ ስምዎ',
      formContact: 'ኢሜይል ወይም ስልክ ቁጥር / ቴሌግራም',
      formType: 'የፕሮጀክት / የአገልግሎት አይነት',
      formSubject: 'የመልእክቱ ርዕስ',
      formBudget: 'የተገመተ በጀት',
      formTimeline: 'የሚፈለግበት ጊዜ',
      formNotes: 'የፕሮጀክቱ ዝርዝር ፍላጎቶች',
      formSubmit: 'የተዘጋጀውን መልእክት ላክ',
    },
    footer: {
      tagline: 'ፈጣን፣ አስተማማኝ እና ዘመናዊ የድር ሲስተሞችን የሚያበለጽግ የሙሉ-ስታክ ሶፍትዌር ባለሙያ።',
      rights: 'መብቱ በህግ የተጠበቀ ነው።',
      locationNote: 'በጥንቃቄ የተሰራ በአዲስ አበባ፣ ኢትዮጵያ',
    }
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      skills: 'المهارات',
      projects: 'المشاريع',
      services: 'الخدمات',
      process: 'خطوات العمل',
      cv: 'السيرة الذاتية',
      contact: 'تواصل معي',
      contactMe: 'تواصل معي',
      viewCv: 'السيرة الذاتية',
      switchLang: 'اللغة',
    },
    hero: {
      badgeStatus: 'متاح للمشاريع الجديدة',
      badgeLocation: 'أديس أبابا، إثيوبيا',
      greeting: 'مرحباً، أنا',
      name: 'عمران خضر',
      titles: [
        'مطور برمجيات متكامل (Full-Stack)',
        'بناء تجارب وتطبيقات رقمية حديثة',
        'تحويل الأفكار إلى منصات ويب قابلة للتوسع'
      ],
      description: 'مطور برمجيات ويب متكامل ذو خبرة مثبتة في إطلاق أكثر من 11 نظام حي تشمل منصات الرعاية الصحية، الضيافة، التجارة الإلكترونية مع بوابات الدفع الإثيوبية (Telebirr و CBE)، والحلول البرمجية المتخصصة.',
      ctaProjects: 'استعراض المشاريع المنجزة',
      ctaContact: 'لنعمل معاً',
      ctaCv: 'السيرة الذاتية / PDF',
      metricProjects: '+13',
      metricProjectsLabel: 'أنظمة حية مكتملة',
      metricDeploy: '100%',
      metricDeployLabel: 'تصميم سريع ومتجاوب',
      metricPayments: 'Telebirr & CBE',
      metricPaymentsLabel: 'بوابات دفع مدمجة',
      metricLocation: 'أديس أبابا',
      metricLocationLabel: 'متاح للعمل المحلي وعن بُعد',
    },
    about: {
      badge: 'نبذة عن عمران',
      title: 'مطور برمجيات متكامل شغوف بالحلول الهندسية المتقنة',
      subtitle: 'مقيم في أديس أبابا، إثيوبيا — أقدم حلول ويب متطورة تجمع بين الأداء العالي وتجربة المستخدم السلسة.',
      bioParagraph1: 'أنا مطور برمجيات ويب متكامل خريج بكالوريوس في علوم المعلومات من معهد التكنولوجيا بجامعة جيما. متخصص في تحويل متطلبات الأعمال المعقدة إلى تطبيقات ويب نظيفة وعالية الكفاءة.',
      bioParagraph2: 'تمتد خبرتي عبر دورة التطوير الكاملة: من تصميم قواعد بيانات MySQL وتطوير واجهات برمجة آمنة (Node.js/PHP REST APIs)، إلى بناء واجهات تفاعلية متقدمة باستخدام React و TypeScript وربطها ببوابات الدفع الإلكتروني.',
      bioParagraph3: 'سواء كنت أبني منصات حجز العيادات الطبية، أو أنظمة المطاعم والضيافة، أو الأدوات الحسابية المتخصصة، ينصب تركيزي على جودة الكود، والسرعة، والأمان، وتحقيق نتائج ملموسة للعملاء.',
      coreValuesTitle: 'فلسفتي الهندسية',
      coreValues: [
        {
          title: 'بنية برمجية نظيفة وقابلة للتوسع',
          desc: 'كود معياري مع أمان TypeScript العالي، وقواعد بيانات محكمة، وواجهات برمجية قياسية.'
        },
        {
          title: 'قيمة تجارية مباشرة',
          desc: 'أنظمة مصممة لزيادة التحويلات، وأتمتة المهام اليومية، وتسهيل تجربة الدفع للعملاء.'
        },
        {
          title: 'مسؤولية كاملة عن المشروع',
          desc: 'من التخطيط والتصميم الأولي حتى فهرسة قواعد البيانات، واختبار الدفع، والإطلاق السلس.'
        },
        {
          title: 'السرعة والتوافق مع الهواتف',
          desc: 'معدلات أداء عالية في Google Lighthouse، وتوافق تام مع مختلف الشاشات والأجهزة.'
        }
      ],
      quickFactsTitle: 'معلومات سريعة',
      factLocation: 'الموقع',
      factLocationVal: 'أديس أبابا، إثيوبيا',
      factEducation: 'التعليم',
      factEducationVal: 'بكالوريوس علوم المعلومات — جامعة جيما (2026)',
      factCertifications: 'الشهادات المهنية',
      factCertificationsVal: 'يوداسيتي (أساسيات الأندرويد والبرمجة)',
      factLanguages: 'اللغات',
      factLanguagesVal: 'الإنجليزية، الأمهرية، العربية (أساسي)',
    },
    skills: {
      badge: 'المهارات التقنية',
      title: 'حزمة التقنيات والبرمجيات',
      subtitle: 'مجموعة أدوات شاملة مجربة في أكثر من 13 نظام إنتاجي، تركز على الاستقرار والسرعة.',
    },
    projects: {
      badge: 'معرض الأعمال',
      title: 'المشاريع المنفذة على أرض الواقع',
      subtitle: 'استكشف 13 نظام ويب حي تم بناؤه ببنى معمارية حديثة وقواعد بيانات متكاملة.',
      filterAll: 'جميع الأنظمة',
      viewLive: 'معاينة حية',
      viewSource: 'الكود المصدري',
      viewDetails: 'تفاصيل النظام',
    },
    services: {
      badge: 'خدماتي البرمجية',
      title: 'خدمات تطوير برمجيات الويب المخصصة',
      subtitle: 'من مواقع الشركات إلى منصات التجارة الإلكترونية وأنظمة إدارة العيادات المتخصصة.',
      discussCta: 'ناقش مشروعك معي',
    },
    process: {
      badge: 'منهجية العمل',
      title: 'عملية تطوير منظمة من 4 مراحل',
      subtitle: 'تنفيذ شفاف قائم على مراحل محددة يضمن تسليم مشروعك في الوقت المحدد وبأعلى جودة.',
    },
    cvSection: {
      badge: 'السيرة الذاتية',
      title: 'المؤهلات التقنية والخبرات العملية',
      subtitle: 'استعرض المؤهلات الأكاديمية وسجل المشاريع والمهارات التقنية بعدة صيغ قابلة للتحميل.',
      openHub: 'فتح مركز السيرة الذاتية',
      downloadPdf: 'تحميل PDF صفحة واحدة',
      generatingPdf: 'جاري إنشاء ملف PDF...',
      print: 'طباعة (Print)',
      downloadTxt: 'ملف .TXT',
      eduTitle: 'بكالوريوس في علوم المعلومات',
      eduSchool: 'جامعة جيما — معهد التكنولوجيا (2026)',
      certTitle: 'شهادات يوداسيتي المهنية (أندرويد والبرمجة)',
    },
    contact: {
      badge: 'تواصل معي',
      title: 'ابدأ مشروعك أو استفسر الآن',
      subtitle: 'اختر قناتك المفضلة للمراسلة المباشرة (تيليجرام، واتساب، أو البريد الإلكتروني) لتجهيز رسالتك فوراً.',
      fastResponse: 'أسرع رد عبر تيليجرام (@imranka641) وواتساب (+251 913 841 757)',
      fastResponseSub: 'تواصل مباشر مع المطور — الرد عادة خلال ساعتين إلى 4 ساعات',
      chooseOption: 'اختر وسيلة التواصل المفضلة',
      telegram: 'تيليجرام (رد فوري)',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      provideDetails: 'تفاصيل ومواصفات المشروع',
      fullName: 'الاسم الكامل أو المؤسسة',
      namePlaceholder: 'مثال: أحمد محمد / مؤسسة التقنية',
      emailOrPhone: 'البريد الإلكتروني أو الهاتف أو تيليجرام',
      emailOrPhonePlaceholder: 'مثال: email@domain.com أو @username',
      projectSubject: 'عنوان المشروع',
      subjectPlaceholder: 'مثال: نظام طلبات مطاعم مع ربط بوابات الدفع الإلكتروني',
      projectCategory: 'مجال المشروع',
      message: 'تفاصيل ومتطلبات المشروع',
      messagePlaceholder: 'اشرح أهدافك الرئيسية، الميزات المطلوبة، والجدول الزمني المستهدف...',
      sendBtn: 'تجهيز الرسالة وإرسالها',
      sendMessage: 'إرسال الرسالة عبر القناة المختارة',
      formName: 'الاسم الكامل',
      formContact: 'البريد الإلكتروني أو رقم الهاتف / تيليجرام',
      formType: 'نوع المشروع / الخدمة',
      formSubject: 'عنوان المشروع',
      formBudget: 'الميزانية التقريبية',
      formTimeline: 'الجدول الزمني المستهدف',
      formNotes: 'تفاصيل ومتطلبات المشروع',
      formSubmit: 'تجهيز الرسالة وإرسالها',
    },
    footer: {
      tagline: 'مطور برمجيات ويب متكامل يبتكر حلولاً رقمية سريعة وموثوقة وعالية الكفاءة.',
      rights: 'جميع الحقوق محفوظة.',
      locationNote: 'صُنع بدقة في أديس أبابا، إثيوبيا',
    }
  }
};
