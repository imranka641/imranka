import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'typemaster',
    name: 'TypeMaster',
    category: 'Productivity',
    categoryLabel: 'Frontend / Productivity / Developer Tool',
    tagline: 'Adaptive touch-typing trainer with heatmaps & analytics',
    shortDescription: 'A privacy-first, offline-capable typing trainer with adaptive drills, keyboard heatmaps, finger-position guidance, gamification, and detailed WPM/accuracy analytics.',
    fullDescription: 'TypeMaster is a modern, offline-first touch-typing training web application designed to improve typing speed, accuracy, finger positioning, and keyboard efficiency through adaptive practice and detailed performance analytics.',
    problemSolved: 'Eliminates inefficient typing habits and typing bottlenecks through targeted bigram drills, real-time dual-hand finger guidance, and offline-capable analytics without requiring an account.',
    targetAudience: 'Developers, writers, students, transcriptionists, and professionals seeking to master touch-typing and maximize words-per-minute throughput.',
    features: [
      'Timed typing sprints, word-count challenges, literature quotes & programming exercises',
      'Real-time dual-hand keyboard visualizer with home-row anchors (A S D F / J K L ;)',
      'Distraction-free focus mode with fullscreen typing environment (Alt + F)',
      'Keyboard heatmaps visualizing frequently missed keys and error-pair latency',
      'Adaptive practice generating personalized drills based on missed bigrams',
      'Analytics & gamification tracking WPM progression, accuracy, XP and daily streaks',
      '100% privacy-first offline architecture with IndexedDB and JSON/CSV export'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'Web APIs', 'Data Visualization'],
    liveUrl: 'https://typemaster-jade.vercel.app/',
    featured: true,
    accentColor: 'cyan',
    previewType: 'typemaster',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ergonomic tactile mechanical keyboard optimized for touch-typing and finger position mastery',
        alt: 'TypeMaster mechanical keyboard layout'
      },
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Real-time code typing sprints and adaptive typing drill analytics',
        alt: 'TypeMaster code exercises and analytics'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        caption: 'Keyboard error heatmap, WPM progression curves, and accuracy tracking dashboard',
        alt: 'TypeMaster performance analytics'
      }
    ],
    stats: [
      { label: 'Storage', value: 'IndexedDB (Offline)' },
      { label: 'Analytics', value: 'Live WPM & Heatmap' },
      { label: 'Focus Mode', value: 'Alt + F Fullscreen' }
    ]
  },
  {
    id: 'makecv',
    name: 'MakeCV',
    category: 'Productivity',
    categoryLabel: 'Frontend / Productivity / Resume Builder',
    tagline: 'Privacy-first ATS resume builder with A4 preview & multi-page PDF',
    shortDescription: 'A privacy-first CV builder with ATS-friendly templates, responsive A4 rendering, multi-page PDF generation, JSON backup/restore, and Arabic/Amharic RTL support.',
    fullDescription: 'MakeCV is a privacy-first, client-side resume builder focused on professional CV creation, ATS-friendly templates, responsive A4 document rendering, internationalization, and reliable multi-page PDF generation.',
    problemSolved: 'Solves privacy concerns and awkward PDF formatting issues in traditional resume builders with client-side zero-account generation, true A4 print fidelity, and full Amharic & Arabic RTL support.',
    targetAudience: 'Job seekers, software developers, bilingual candidates, Ethiopian and international professionals needing ATS-compliant resumes with reliable PDF export.',
    features: [
      '6 ATS-friendly resume templates with modern, recruiter-friendly layouts',
      'Real-time A4 live document preview with responsive zoom across desktop & mobile',
      'Print-fidelity architecture preventing awkward section and card page splitting',
      'Reliable multi-page PDF generation via canvas sandboxing and off-screen rendering',
      'One-click JSON backup & restore without requiring accounts or logins',
      'Internationalization with RTL layout support, Arabic, and Amharic Ethiopic scripts',
      '100% client-side privacy-first architecture with zero backend data storage'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PDF Generation', 'Internationalization', 'RTL', 'Responsive Design'],
    liveUrl: 'https://makecv-plum.vercel.app/',
    featured: true,
    accentColor: 'emerald',
    previewType: 'makecv',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
        caption: 'ATS-optimized professional resume layout with modern typography and clean sections',
        alt: 'MakeCV A4 resume preview'
      },
      {
        url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Multi-page document structuring with print fidelity and zero awkward page splits',
        alt: 'MakeCV multi-page layout'
      },
      {
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bilingual and RTL resume authoring supporting English, Amharic, and Arabic',
        alt: 'MakeCV internationalization support'
      }
    ],
    stats: [
      { label: 'Templates', value: '6 ATS Formats' },
      { label: 'PDF Export', value: 'Multi-Page A4' },
      { label: 'Languages', value: 'EN, AM, AR (RTL)' }
    ]
  },
  {
    id: 'food-ordering-system',
    name: 'Food Ordering System',
    category: 'Food & E-Commerce',
    categoryLabel: 'E-Commerce, Restaurant & Digital Payments',
    tagline: 'End-to-end Ethiopian restaurant ordering with Telebirr & CBE Birr',
    shortDescription: 'A complete food and restaurant ordering system with cart checkout, Ethiopian digital payment integrations (Telebirr & CBE Birr), live order tracking, and a comprehensive restaurant admin management panel.',
    fullDescription: 'Food Ordering System is a full-featured restaurant web application engineered for Ethiopian dining establishments and local customers. On the customer side, users can explore categorized food and beverage menus, view high-res dish details and prices, customize cart quantities, enter delivery/contact details, and checkout using Ethiopian digital payment gateways (Telebirr and CBE Birr) with real-time order tracking. On the administrative side, restaurant managers have a dedicated dashboard to control the full menu catalog (add/edit/delete food items, toggle availability, adjust prices, organize categories), monitor live customer orders, update order fulfillment stages, and review customer transaction histories.',
    problemSolved: 'Digitizes restaurant food ordering for Ethiopian businesses with local payment options (Telebirr & CBE Birr), streamlining table and delivery logistics while eliminating manual phone-order errors.',
    targetAudience: 'Ethiopian restaurants, cafes, food delivery businesses, fast food diners, and local customers seeking fast digital food ordering.',
    features: [
      'Customer Menu Explorer: Interactive food catalog with categories, dish details, pricing & food imagery',
      'Cart & Order Customization: Real-time item additions, quantity increment/decrement, and instant price tallying',
      'Local Ethiopian Payments: Seamless integration for Telebirr & CBE Birr digital transactions',
      'Live Order Status Tracking: Multi-stage order tracking (Received → Preparing → Out for Delivery → Completed)',
      'Admin Restaurant Dashboard: Full back-office control panel for managing daily restaurant operations',
      'Menu & Catalog Management: Add, edit, delete food items, manage categories, and toggle live availability',
      'Live Order Management: Real-time incoming order queue with one-click status updates and customer details',
      'Relational MySQL Database: Secure schema storing users, categories, products, orders, order items & payment logs'
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Telebirr Payment', 'CBE Birr', 'RESTful APIs', 'Responsive Web Design'],
    liveUrl: 'https://imran13.infinityfreeapp.com/',
    featured: true,
    accentColor: 'amber',
    previewType: 'food-ordering',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
        caption: 'Traditional Ethiopian dining dishes with authentic presentation and spiced stews',
        alt: 'Ethiopian food feast presentation'
      },
      {
        url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mobile food ordering cart & digital checkout supporting Telebirr and CBE Birr',
        alt: 'Mobile ordering and delivery interface'
      },
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Live restaurant operations, order status updates, and kitchen queue management',
        alt: 'Restaurant operations and order fulfillment'
      }
    ],
    stats: [
      { label: 'Local Payments', value: 'Telebirr & CBE' },
      { label: 'Architecture', value: 'PHP + MySQL' },
      { label: 'Dashboard', value: 'Live Order Queue' }
    ]
  },
  {
    id: 'dr-addis-dental',
    name: 'Dr. Addis Speciality Dental Care Center',
    category: 'Healthcare',
    categoryLabel: 'Healthcare & Clinical Dentistry',
    tagline: 'Comprehensive clinical dentistry & advanced smile restorations',
    shortDescription: 'A specialized dental and oral health platform providing patient consultations, smile makeovers, and clinical dental procedures with intuitive online booking.',
    fullDescription: 'Dr. Addis Speciality Dental Care Center is an interactive healthcare web platform built to connect patients with top-tier dental treatments and specialists. The application streamlines patient intake, presents procedure knowledge transparently, and empowers visitors to schedule appointments effortlessly.',
    problemSolved: 'Eliminates friction in medical scheduling, reduces clinic front-desk overload, and alleviates patient dental anxiety through transparent procedure breakdowns and credentials.',
    targetAudience: 'Patients, families, and individuals seeking professional dental procedures, smile corrections, and preventative oral health care.',
    features: [
      'Online appointment scheduling with real-time slot selection',
      'Doctor credentials, certifications, and clinical qualifications',
      'Detailed procedure guides for Implants, Orthodontics & Veneers',
      'Root canal therapy & pediatric dental care breakdowns',
      'Patient smile transformation before-and-after showcases',
      'Comprehensive clinic hours, location maps & emergency intake',
      'Interactive preventive oral hygiene guides and consultation booking'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Responsive Web Design'],
    liveUrl: 'https://dr-addis-speciality-dental-care-cen.vercel.app/',
    featured: true,
    accentColor: 'emerald',
    previewType: 'dental',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        caption: 'Specialized dental operatory clinic room equipped with modern dental care chairs',
        alt: 'Clinical dental examination room'
      },
      {
        url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Patient consultation and smile transformation planning with dental practitioners',
        alt: 'Dental patient consultation'
      },
      {
        url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sterilized clinical instruments and diagnostic technology for precision care',
        alt: 'Clinical dental instruments'
      }
    ],
    stats: [
      { label: 'Booking System', value: 'Real-Time Slots' },
      { label: 'Procedures Covered', value: '7+ Clinical Fields' },
      { label: 'Mobile Performance', value: '100% Responsive' }
    ]
  },
  {
    id: 'stay-awake',
    name: 'StayAwake',
    category: 'Productivity',
    categoryLabel: 'Productivity & Utilities',
    tagline: 'Active screen wake-lock utility & fatigue mitigation',
    shortDescription: 'A browser-based productivity tool designed to keep screens active using the Screen Wake Lock API while mitigating fatigue with cognitive alertness checks.',
    fullDescription: 'StayAwake is a focused web utility developed for professionals who need unbroken screen activity during long coding sessions, presentations, live monitoring, or studying. It combines low-level browser APIs with ergonomics and wellness reminders.',
    problemSolved: 'Prevents unwanted display sleep without third-party desktop installations, while proactively counteracting eye strain and cognitive burnout with rhythmic ergonomics.',
    targetAudience: 'Software developers, students, remote professionals, financial analysts, and night-shift operators.',
    features: [
      'Native Screen Wake Lock API integration with fallbacks',
      'Active display keep-alive with one-touch toggle',
      'Built-in 20-20-20 rule ergonomic timer for eye strain prevention',
      'Interactive cognitive alertness check-ins and quick reflex tests',
      'Gentle audio alertness reminders for extended study blocks',
      'Sleek, battery-conscious dark mode interface with status indicators',
      'Zero-installation browser execution for rapid workflow access'
    ],
    technologies: ['React', 'Web APIs', 'Screen Wake Lock', 'Tailwind CSS', 'Audio Synthesis'],
    liveUrl: 'https://stay-awake-two.vercel.app/',
    featured: true,
    accentColor: 'cyan',
    previewType: 'productivity',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Professional developer workstation with active screen wake lock during long coding blocks',
        alt: 'Developer workstation with active displays'
      },
      {
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ergonomic 20-20-20 rule reminders and eye wellness alerts during intensive study',
        alt: 'Ergonomic workspace'
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        caption: 'Zero-install browser execution for real-time presentation and dashboard monitoring',
        alt: 'Laptop productivity interface'
      }
    ],
    stats: [
      { label: 'Core Engine', value: 'Screen Wake Lock API' },
      { label: 'Ergonomics', value: '20-20-20 Rule' },
      { label: 'Footprint', value: 'Zero Install' }
    ]
  },
  {
    id: 'jungle-restaurant',
    name: 'Jungle Restaurant',
    category: 'Hospitality',
    categoryLabel: 'Hospitality & Experiential Dining',
    tagline: 'Immersive botanical dining & exotic fusion gastronomy',
    shortDescription: 'An immersive digital restaurant destination capturing a lush rainforest atmosphere with interactive menus, dietary filters, and cabana reservations.',
    fullDescription: 'Jungle Restaurant brings the sensory richness of an indoor rainforest dining experience onto the web. It delivers a fluid digital menu with instant dietary filtering, seasonal chef showcases, and an atmospheric table and cabana booking experience.',
    problemSolved: 'Transforms traditional static PDF menus into an engaging, accessible, dietary-safe digital showcase while facilitating high-touch private table and event reservations.',
    targetAudience: 'Food enthusiasts, culinary travelers, couples, families, and private celebration hosts seeking memorable dining.',
    features: [
      'Interactive digital culinary menu with high-resolution presentations',
      'Instant dietary filters: Vegan, Halal, Gluten-Free, and Dairy-Free',
      'Direct table and private botanical cabana reservation system',
      'Curated seasonal chef tasting menus & artisan pairings',
      'Atmospheric dining gallery with day/evening environment views',
      'Private event inquiries, celebration packages & dress code guide',
      'Interactive map, parking details, and hours of operation'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design'],
    liveUrl: 'https://junglerestaurant.vercel.app/',
    featured: true,
    accentColor: 'emerald',
    previewType: 'jungle',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lush indoor tropical botanical dining room with ambient hanging lanterns',
        alt: 'Botanical rainforest dining room'
      },
      {
        url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Artisan culinary plating combining exotic tropical spices and fresh produce',
        alt: 'Gourmet restaurant dining plate'
      },
      {
        url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
        caption: 'Private botanical dining cabana with dedicated guest reservation system',
        alt: 'Private garden dining cabana'
      }
    ],
    stats: [
      { label: 'Dietary Filters', value: 'Halal, Vegan, GF' },
      { label: 'Booking', value: 'Cabanas & Tables' },
      { label: 'Experience', value: 'Botanical Dining' }
    ]
  },
  {
    id: 'jungle-house',
    name: 'Jungle House',
    category: 'Hospitality',
    categoryLabel: 'Hospitality, Luxury Lodges & Event Sanctuaries',
    tagline: 'Luxury botanical resort, private forest lodges & event sanctuary',
    shortDescription: 'An exclusive eco-resort and event destination web platform featuring luxury accommodation showcases, lodge availability checking, and experiential retreat bookings.',
    fullDescription: 'Jungle House is a premier luxury hospitality and eco-resort sanctuary nestled in lush natural surroundings. The digital platform provides an immersive guest journey, showcasing bespoke private forest lodges, botanical wellness amenities, seasonal culinary dining, and high-touch reservation workflows for private celebrations, corporate retreats, and bespoke weddings.',
    problemSolved: 'Transforms physical resort exploration and lodge reservation inquiries into an intuitive, visually captivating digital journey with real-time intake and transparent guest accommodations.',
    targetAudience: 'Travelers, honeymooners, corporate retreat organizers, event planners, and families seeking luxury eco-sanctuary stays and private celebrations.',
    features: [
      'Interactive luxury lodge and private suite showcase with panoramic views',
      'Direct guest booking inquiry flow with customizable dates and party size',
      'Exclusive event hosting portal for weddings, corporate summits & celebrations',
      'Botanical spa and wellness activity schedules with guided forest excursions',
      'Curated farm-to-table dining showcases and bespoke private dining menus',
      'High-resolution multi-view gallery capturing day and twilight atmospheres',
      'Fast, mobile-optimized responsive architecture with seamless inquiry routing'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Resort Booking UI', 'Responsive Design'],
    liveUrl: 'https://jungle-house.vercel.app/',
    featured: true,
    accentColor: 'emerald',
    previewType: 'jungle-house',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Private forest luxury villa with panoramic infinity pool overlooking lush botanical canopy',
        alt: 'Jungle House luxury eco-lodge'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Spacious bespoke master suite with natural wood finishes and floor-to-ceiling glass',
        alt: 'Resort master lodge suite'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Open-air botanical celebration pavilion and outdoor dining terrace for private events',
        alt: 'Private event pavilion'
      }
    ],
    stats: [
      { label: 'Accommodations', value: 'Bespoke Forest Lodges' },
      { label: 'Reservations', value: 'Private & Events' },
      { label: 'Atmosphere', value: 'Eco-Luxury Sanctuary' }
    ]
  },
  {
    id: 'itkan-academy',
    name: 'Itkan (إتقان)',
    category: 'Education',
    categoryLabel: 'Islamic & Educational Technology',
    tagline: 'Educational academy & institutional mastery platform',
    shortDescription: 'A structured educational platform rooted in the Islamic concept of Itqān (excellence and mastery), offering comprehensive courses and scholar curricula.',
    fullDescription: 'Itkan is an educational web platform designed to deliver classical and modern disciplines with institutional rigor. Emphasizing clarity, elegance, and Islamic geometric design aesthetics, it connects learners with structured courses, downloadable syllabi, and verified instructors.',
    problemSolved: 'Bridges traditional scholarly education with modern digital learning environments, making structured curricula accessible across devices in both Arabic and English.',
    targetAudience: 'Students of Islamic studies, professionals seeking ethical leadership frameworks, educators, and academic institutions.',
    features: [
      'Structured Islamic course catalog with clear prerequisite pathways',
      'Specialized modules in Quranic recitation, Tajweed, and Arabic grammar',
      'Curricula on Islamic Jurisprudence (Fiqh) & Ethical Leadership',
      'Bilingual Arabic and English typography with seamless RTL balance',
      'Custom Islamic geometric design accents and minimal reading UI',
      'Faculty & scholar profile dossiers with credential verification',
      'Cohort registration, syllabus downloads & live workshop schedules'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Bilingual UI', 'Islamic Geometric Design'],
    liveUrl: 'https://itkan-seven.vercel.app/',
    featured: true,
    accentColor: 'amber',
    previewType: 'itkan',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Classical Islamic architecture and geometric learning halls',
        alt: 'Islamic architectural academy'
      },
      {
        url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scholarly Arabic text analysis, Quranic recitation and Tajweed study curricula',
        alt: 'Arabic manuscript and text study'
      },
      {
        url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Structured academic library with downloadable course syllabi and reading dossiers',
        alt: 'Academic library and course resources'
      }
    ],
    stats: [
      { label: 'Language', value: 'Arabic & English RTL' },
      { label: 'Curricula', value: 'Tajweed & Fiqh' },
      { label: 'Design', value: 'Geometric Symmetry' }
    ]
  },
  {
    id: 'el-pacho-coffee',
    name: 'El Pacho Coffee Roasters',
    category: 'Coffee',
    categoryLabel: 'Specialty Coffee & Micro-Roastery',
    tagline: 'Artisan single-origin micro-roastery & farm-to-cup roasters',
    shortDescription: 'A specialty coffee e-commerce and roastery platform focused on single-origin transparency, roast profiles, and precision brewing recipes.',
    fullDescription: 'El Pacho Coffee Roasters is dedicated to highlighting the craftsmanship behind artisan specialty coffee. The platform tells the story of each micro-lot, from farm altitude and processing methods to cupping notes, while providing interactive brewing guides for home baristas.',
    problemSolved: 'Demystifies complex specialty coffee attributes (processing, cupping scores, elevation) into an engaging buying and brewing journey for coffee lovers.',
    targetAudience: 'Specialty coffee aficionados, home brewers, wholesale café owners, and mindful consumers seeking ethical single-origin beans.',
    features: [
      'Comprehensive single-origin and micro-lot coffee catalog',
      'Detailed processing breakdowns: Washed, Natural, and Anaerobic Fermentation',
      'Transparent farm origin stories, farmer cooperatives & altitude metrics',
      'Curated sensory cupping notes & acidity/body radar profiles',
      'Interactive brewing guides: V60, Chemex, AeroPress & Espresso extraction',
      'Flexible recurring coffee subscription tiers & customized grind options',
      'B2B Wholesale café inquiry portal and bulk roast ordering'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Interactive Brewing UI'],
    liveUrl: 'https://el-pacho-coffee-roasters.vercel.app/',
    featured: false,
    accentColor: 'amber',
    previewType: 'elpacho',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Freshly roasted single-origin artisan coffee beans inspected for cupping notes',
        alt: 'Roasted coffee beans and cupping scoop'
      },
      {
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
        caption: 'Precision barista manual V60 pour-over extraction with interactive brewing guides',
        alt: 'Barista pour-over brew process'
      },
      {
        url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Traceable high-altitude green coffee sacks sourced directly from farmer cooperatives',
        alt: 'Coffee bean burlap sacks'
      }
    ],
    stats: [
      { label: 'Roast Transparency', value: 'Altitude & Cupping' },
      { label: 'Brew Guides', value: 'V60, Chemex & Espresso' },
      { label: 'Ordering', value: 'Retail & Wholesale B2B' }
    ]
  },
  {
    id: 'yellow-flower-coffee',
    name: 'Yellow Flower Coffee',
    category: 'Coffee',
    categoryLabel: 'Specialty Coffee & Lifestyle Café',
    tagline: 'Bright floral specialty beans & aesthetic cafe experience',
    shortDescription: 'A boutique specialty coffee and lifestyle café web experience centered around floral single-origins, botanical cold brews, and pastry pairings.',
    fullDescription: 'Yellow Flower Coffee represents the vibrant, light-roast side of specialty coffee culture. The website reflects the café’s sunlit aesthetic and features signature Gesha varietals, botanical cold brews, artisanal pastry menus, and seamless pickup ordering.',
    problemSolved: 'Provides a fast, visually delightful online ordering and café discovery experience tailored to urban specialty coffee drinkers.',
    targetAudience: 'Coffee enthusiasts, urban café regulars, remote workers, and lovers of floral/fruity light roasts.',
    features: [
      'Curated light roast coffee selection highlighting floral and citrus profiles',
      'Premium Ethiopian single-origins & rare Gesha-style offerings',
      'Artisanal drip bag collections & bottled botanical cold brews',
      'Interactive café pastry menu with recommended coffee pairings',
      'Visual café aesthetic gallery and atmosphere previews',
      'Online ordering for swift in-store or curbside pickup',
      'Retail bean purchase options with brew guide recommendations'
    ],
    technologies: ['React', 'Tailwind CSS', 'Responsive UI', 'Online Ordering Design'],
    liveUrl: 'https://yellowflowercoffee.vercel.app/',
    featured: false,
    accentColor: 'yellow',
    previewType: 'yellowflower',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sunlit specialty coffee counter surrounded by aesthetic floral blooms and glass drippers',
        alt: 'Sunlit cafe counter with yellow flowers'
      },
      {
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        caption: 'Artisanal morning pastries, botanical cold brews, and seasonal pairings',
        alt: 'Cafe interior with pastries and coffee'
      },
      {
        url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
        caption: 'Delicate light-roast floral pour-over preparation highlighting citrus and jasmine notes',
        alt: 'Pour over extraction in cafe'
      }
    ],
    stats: [
      { label: 'Roast Profile', value: 'Floral & Citrus' },
      { label: 'Pickup Ordering', value: 'Instant Cart' },
      { label: 'Aesthetic', value: 'Sunlit Boutique' }
    ]
  },
  {
    id: 'kosy-kawa',
    name: 'Kosy Kawa',
    category: 'Coffee',
    categoryLabel: 'Specialty Coffee Lounge & Bakery',
    tagline: 'Warm neighborhood coffee lounge, pastries & remote-work haven',
    shortDescription: 'A European-inspired coffeehouse and bakery concept designed as a cozy community space, remote-work haven, and artisanal bakery.',
    fullDescription: 'Kosy Kawa combines artisan espresso, fresh-baked Viennoiserie, and a welcoming work-friendly ambiance. The website provides visitors with live workspace amenities (Wi-Fi speeds, quiet zones, power outlet maps), bakery bake times, and neighborhood community events.',
    problemSolved: 'Solves the uncertainty remote workers face when looking for reliable café workspaces, while promoting freshly baked batch schedules and local community gatherings.',
    targetAudience: 'Remote workers, freelance creatives, students, neighborhood locals, and specialty pastry lovers.',
    features: [
      'Complete artisanal coffee menu featuring flat whites, single-origin espressos & matcha',
      'Daily freshly baked pastry schedules for croissants, cinnamon buns & sourdough',
      'Transparent remote-worker amenities: High-speed Wi-Fi ratings, quiet zones & outlet availability',
      'Community event calendar: Book clubs, creative workshops & acoustic evenings',
      'Loyalty program information & digital stamp card benefits',
      'Neighborhood table seating reservations for small study groups',
      'Cozy European aesthetic with warm neutral typography'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Event Calendar UI'],
    liveUrl: 'https://kosy-kawa.vercel.app/',
    featured: false,
    accentColor: 'orange',
    previewType: 'kosykawa',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
        caption: 'Warm European neighborhood coffeehouse with comfortable wood furnishings and warm lighting',
        alt: 'Cozy European cafe interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fresh-out-of-the-oven golden croissants and bakery batch tracking timetable',
        alt: 'Freshly baked croissants'
      },
      {
        url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
        caption: 'Remote-worker laptop friendly tables with verified high-speed Wi-Fi and power outlets',
        alt: 'Remote work table with coffee and laptop'
      }
    ],
    stats: [
      { label: 'Work Amenities', value: 'High-Speed Wi-Fi' },
      { label: 'Bakery Timetable', value: 'Live Fresh Bakes' },
      { label: 'Community', value: 'Event Calendar' }
    ]
  },
  {
    id: 'islamic-inheritance',
    name: 'Islamic Inheritance Calculator (Farā\'iḍ)',
    category: 'Legal-Tech',
    categoryLabel: 'Islamic Legal-Tech & Shariah Finance',
    tagline: 'Precision Shariah estate distribution & Mīrāth calculation engine',
    shortDescription: 'A specialized calculation and educational technology tool designed to compute estate distribution based on classical Islamic inheritance principles.',
    fullDescription: 'The Islamic Inheritance Calculator (Farā\'iḍ) is an educational and computational web engine engineered to model Islamic estate distribution. It handles kinship dynamics, debt and funeral expense deductions, valid bequests (Wasiyyah), Quranic prescribed shares (Furūḍ), exclusion rules (Ḥajb), and fractional adjustments (\'Awl & Radd).',
    problemSolved: 'Simplifies mathematically intricate Islamic inheritance rules into an accessible, transparent, and step-by-step computational workflow for educational and planning purposes.',
    targetAudience: 'Estate planners, educators, legal students, families, and individuals studying Islamic wealth succession.',
    features: [
      'Net estate calculation engine accounting for debts and funeral expenses',
      'Valid Wasiyyah (bequest) threshold consideration (up to 1/3)',
      'Comprehensive kinship selector: Spouses, sons, daughters, parents & grandparents',
      'Collateral relative handling: Full, paternal, and maternal siblings',
      'Precise Quranic prescribed fractions calculation (1/2, 1/3, 2/3, 1/4, 1/6, 1/8)',
      'Complex exclusion logic (Ḥajb al-Ḥirmān and Ḥajb al-Nuqṣān)',
      'Fractional adjustments engine with \'Awl (reduction) and Radd (surplus) rules',
      'Clear visual share distribution breakdown and downloadable estate statements'
    ],
    technologies: ['React', 'TypeScript', 'Math/Algorithm Engine', 'Tailwind CSS', 'Data Visualization'],
    liveUrl: 'https://islamic-inheritance-six.vercel.app/',
    featured: true,
    accentColor: 'violet',
    previewType: 'inheritance',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Formal legal estate distribution documentation, kinship trees, and estate ledgers',
        alt: 'Legal estate documentation and calculation desk'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        caption: 'Computational analytics dashboard computing Quranic fractional shares, Awl and Radd',
        alt: 'Data calculation charts'
      },
      {
        url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Classical jurisprudence texts and mathematical verification records',
        alt: 'Classical legal reference texts'
      }
    ],
    stats: [
      { label: 'Calculation Rigor', value: '100% Precise Math' },
      { label: 'Legal Rules', value: 'Awl, Radd & Hajb' },
      { label: 'Export Format', value: 'Breakdown Statement' }
    ]
  },
  {
    id: 'al-white-garden',
    name: 'Al White Garden Restaurant & Coffee',
    category: 'Hospitality',
    categoryLabel: 'Hospitality, Garden Dining & Specialty Coffee',
    tagline: 'Luminous garden dining, outdoor cabanas & specialty coffee',
    shortDescription: 'An upscale garden restaurant and coffee lounge concept combining elegant outdoor greenery, fine dining, specialty coffee, and private event celebrations.',
    fullDescription: 'Al White Garden Restaurant & Coffee unites lush outdoor landscaping with gastronomy and specialty brew craft. The platform features extensive all-day menus, open-air cabana reservations, and corporate and wedding celebration booking inquiries.',
    problemSolved: 'Provides a seamless high-end reservation experience for outdoor cabanas and large-scale celebrations, paired with multi-course digital menus.',
    targetAudience: 'Fine diners, specialty coffee connoisseurs, event planners, couples, and corporate dinner hosts.',
    features: [
      'Comprehensive all-day menu: Breakfast, Lunch, Dinner & Garden Grill specials',
      'Specialty coffee bar with pour-over stations, cold brews & artisan mocktails',
      'Interactive garden cabana reservation and open-air table booking',
      'Evening garden atmosphere gallery featuring architectural lighting',
      'Dedicated private event portals for weddings, birthdays & corporate dinners',
      'Live booking calendar with guest capacity and dietary preferences',
      'Interactive Google-style directions, parking details, and venue policies'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Reservation System UI'],
    liveUrl: 'https://alwhitegardenrestaurantcoffee.vercel.app/',
    featured: false,
    accentColor: 'emerald',
    previewType: 'garden',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        caption: 'Twilight garden dining illuminated with warm festoon lights and outdoor private cabanas',
        alt: 'Illuminated outdoor garden dining at twilight'
      },
      {
        url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
        caption: 'Outdoor garden dining tables set among manicured palms and landscaped greenery',
        alt: 'Outdoor garden dining tables'
      },
      {
        url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
        caption: 'Garden specialty coffee and signature mocktail bar with outdoor lounge seating',
        alt: 'Garden specialty drink bar'
      }
    ],
    stats: [
      { label: 'Venue Setting', value: 'Outdoor Cabanas' },
      { label: 'Reservations', value: 'Table & Event Booking' },
      { label: 'Gastronomy', value: 'All-Day Dining & Bar' }
    ]
  }
];
