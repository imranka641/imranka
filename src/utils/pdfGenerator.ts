import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CV_DATA } from '../data/cvData';

/**
 * Generates an exact, crisp 1-page HTML document string for CV export.
 */
export function getModern1PageHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Imran Kedir - Full-Stack Developer CV (1-Page Modern)</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.32;
      font-size: 9pt;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .cv-page {
      width: 210mm;
      min-height: 297mm;
      max-height: 297mm;
      padding: 12mm 14mm 10mm 14mm;
      margin: 0 auto;
      background: #ffffff;
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .top-strip {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, #059669, #0d9488, #0284c7);
    }
    .header {
      border-bottom: 2px solid #059669;
      padding-bottom: 9px;
      margin-bottom: 11px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-name {
      font-size: 21pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      line-height: 1;
    }
    .header-badge {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      padding: 1px 6px;
      border-radius: 4px;
      margin-left: 8px;
      vertical-align: middle;
    }
    .header-role {
      font-size: 9.5pt;
      font-weight: 700;
      color: #059669;
      margin-top: 4px;
      letter-spacing: 0.2px;
    }
    .header-contact {
      text-align: right;
      font-size: 8pt;
      color: #475569;
      line-height: 1.35;
      font-weight: 500;
    }
    .header-contact a {
      color: #0f172a;
      text-decoration: none;
      font-weight: 600;
    }
    .grid-container {
      display: grid;
      grid-template-columns: 32% 68%;
      gap: 14px;
      flex: 1;
    }
    .left-col {
      border-right: 1px solid #e2e8f0;
      padding-right: 12px;
    }
    .right-col {
      padding-left: 2px;
    }
    .section-title {
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #0f172a;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 7px;
      margin-top: 9px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .section-title:first-child {
      margin-top: 0;
    }
    .skill-block {
      margin-bottom: 6px;
    }
    .skill-title {
      font-weight: 700;
      font-size: 8pt;
      color: #1e293b;
      display: block;
    }
    .skill-list {
      font-size: 7.6pt;
      color: #475569;
      line-height: 1.25;
    }
    .badge-pill {
      display: inline-block;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
      padding: 1.5px 5px;
      border-radius: 3px;
      font-size: 7.2pt;
      font-weight: 600;
      margin-right: 3px;
      margin-bottom: 4px;
    }
    .exp-entry {
      margin-bottom: 8.5px;
    }
    .exp-entry:last-child {
      margin-bottom: 0;
    }
    .exp-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .exp-title {
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
    }
    .exp-company {
      font-size: 8.2pt;
      font-weight: 700;
      color: #059669;
    }
    .exp-period {
      font-size: 7.5pt;
      font-weight: 600;
      color: #64748b;
      font-family: monospace;
    }
    .exp-bullets {
      list-style-type: square;
      padding-left: 13px;
      margin-top: 2px;
    }
    .exp-bullets li {
      font-size: 7.7pt;
      color: #334155;
      margin-bottom: 1.5px;
      line-height: 1.26;
    }
    .edu-block {
      margin-bottom: 6px;
      font-size: 8pt;
    }
    .edu-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 8pt;
    }
    .edu-sub {
      color: #64748b;
      font-size: 7.5pt;
    }
    .edu-focus {
      font-size: 7.2pt;
      color: #64748b;
      margin-top: 1px;
      line-height: 1.2;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5pt;
      color: #64748b;
      font-family: monospace;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff; }
      .cv-page { padding: 8mm 10mm 8mm 10mm; width: 100%; height: 100%; }
    }
  </style>
</head>
<body>
  <div class="cv-page">
    <div class="top-strip"></div>
    
    <div class="header">
      <div>
        <div style="display: flex; align-items: baseline;">
          <span class="header-name">${CV_DATA.personalInfo.fullName}</span>
          <span class="header-badge">Verified Full-Stack Engineer</span>
        </div>
        <div class="header-role">FULL-STACK DEVELOPER • REACT, TYPESCRIPT, NODE.JS, PHP, MYSQL</div>
      </div>
      <div class="header-contact">
        <div>📍 ${CV_DATA.personalInfo.location}</div>
        <div>📞 ${CV_DATA.personalInfo.phone} • ✉️ <a href="mailto:${CV_DATA.personalInfo.email}">${CV_DATA.personalInfo.email}</a></div>
        <div>💬 Telegram: <a href="${CV_DATA.personalInfo.telegramUrl}">${CV_DATA.personalInfo.telegram}</a> • 🐙 GitHub: <a href="${CV_DATA.personalInfo.githubUrl}">${CV_DATA.personalInfo.github}</a></div>
      </div>
    </div>

    <div class="grid-container">
      <div class="left-col">
        <div class="section-title">Technical Proficiencies</div>
        <div class="skill-block">
          <span class="skill-title">Frontend</span>
          <div class="skill-list">React.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, CSS3, Vite</div>
        </div>
        <div class="skill-block">
          <span class="skill-title">Backend & APIs</span>
          <div class="skill-list">Node.js, Express.js, PHP, RESTful APIs, JWT Auth, RBAC, Middleware</div>
        </div>
        <div class="skill-block">
          <span class="skill-title">Databases</span>
          <div class="skill-list">MySQL, PostgreSQL, Schema Normalization, Query Indexing, phpMyAdmin</div>
        </div>
        <div class="skill-block">
          <span class="skill-title">DevOps & Tooling</span>
          <div class="skill-list">Git, GitHub, Postman, Linux/Apache/XAMPP, Vercel, InfinityFree</div>
        </div>

        <div class="section-title">Key Architecture</div>
        <div style="margin-top: 3px;">
          <span class="badge-pill">Telebirr & CBE Gateways</span>
          <span class="badge-pill">Role-Based Access (RBAC)</span>
          <span class="badge-pill">Live Order Telemetry</span>
          <span class="badge-pill">Normalized Relational DBs</span>
          <span class="badge-pill">9+ Production Deployments</span>
        </div>

        <div class="section-title">Education</div>
        <div class="edu-block">
          <div class="edu-title">B.Sc. in Information Science</div>
          <div class="edu-sub">Jimma University — Institute of Technology</div>
          <div class="edu-focus">Graduated: 2026 | Ethiopia • Faculty of Computing & Informatics</div>
        </div>

        <div class="section-title">Academic Focus Areas</div>
        <div style="font-size: 7.2pt; color: #475569; line-height: 1.3; margin-bottom: 6px;">
          Software Eng, Web Apps, DB & SQL, Programming & Algorithms, Info Retrieval, Data Mining, Mobile Dev.
        </div>

        <div class="section-title">Certifications</div>
        <div class="edu-block" style="margin-bottom: 4px;">
          <div class="edu-title">Android Fundamentals</div>
          <div class="edu-sub">Udacity • Certified 2024</div>
        </div>
        <div class="edu-block">
          <div class="edu-title">Programming Fundamentals</div>
          <div class="edu-sub">Udacity • Certified 2024</div>
        </div>

        <div class="section-title">Languages</div>
        <div style="font-size: 7.6pt; color: #334155; line-height: 1.35;">
          <div>• <strong>English:</strong> Professional Working</div>
          <div>• <strong>Amharic:</strong> Native / Bilingual</div>
        </div>
      </div>

      <div class="right-col">
        <div class="section-title">Executive Profile</div>
        <p style="font-size: 7.9pt; color: #334155; line-height: 1.34; margin-bottom: 8px;">
          Results-driven Full-Stack Web Developer with proven expertise delivering 9+ verified production systems across e-commerce, healthcare, hospitality, and legal tech. Specialized in modern React/TypeScript user interfaces, secure Node.js/PHP backend architectures, normalized MySQL schemas, and Ethiopian digital payment integrations (Telebirr & CBE Birr).
        </p>

        <div class="section-title">Featured Production Deliverables</div>

        <div class="exp-entry">
          <div class="exp-head">
            <span class="exp-title">Lead Full-Stack Developer — <span class="exp-company">Food Ordering & Commerce</span></span>
            <span class="exp-period">2024</span>
          </div>
          <ul class="exp-bullets">
            <li>Architected and deployed full-lifecycle ordering web application with live multi-stage order tracking and automated cart calculations.</li>
            <li>Engineered seamless checkout integration with Ethiopian payment providers (Telebirr & CBE Birr).</li>
            <li>Developed comprehensive back-office admin dashboard with real-time menu management, transaction audits, and status controls.</li>
          </ul>
        </div>

        <div class="exp-entry">
          <div class="exp-head">
            <span class="exp-title">Frontend & UI Engineer — <span class="exp-company">Dr. Addis Dental Clinic</span></span>
            <span class="exp-period">2024</span>
          </div>
          <ul class="exp-bullets">
            <li>Developed responsive healthcare portal featuring interactive appointment triage, doctor profiles, and transparent service catalogs.</li>
            <li>Engineered accessibility-first UI using React and Tailwind CSS, achieving 95+ Google Lighthouse performance benchmarks.</li>
          </ul>
        </div>

        <div class="exp-entry">
          <div class="exp-head">
            <span class="exp-title">Full-Stack Engineer — <span class="exp-company">Commercial & Hospitality Systems</span></span>
            <span class="exp-period">2023 – 2024</span>
          </div>
          <ul class="exp-bullets">
            <li>Delivered high-converting digital platforms for Jungle House Resort, El Pacho Latin Restaurant, and Kosy Kawa Coffee.</li>
            <li>Designed normalized relational MySQL schemas handling menus, bookings, contact telemetry, and user feedback.</li>
          </ul>
        </div>

        <div class="exp-entry">
          <div class="exp-head">
            <span class="exp-title">Software Developer — <span class="exp-company">Specialized Productivity & Legal Utilities</span></span>
            <span class="exp-period">2023 – 2024</span>
          </div>
          <ul class="exp-bullets">
            <li>Created StayAwake web utility utilizing the Browser Screen Wake Lock API for zero-install developer productivity.</li>
            <li>Built Islamic Jurisprudence mathematical distribution engine calculating exact fractional estate allocations according to Sharia rules.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>Verified Profile • Imran Kedir • Portfolio: https://github.com/imranka641</span>
      <span>Page 1 of 1 • 1-Page Modern A4 Format</span>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Downloads direct 1-Page PDF using an isolated iframe and html2canvas + jsPDF.
 * Using an isolated iframe ensures Tailwind v4's oklch() color definitions do not
 * contaminate the computed styles, allowing html2canvas to render smoothly with 100% standard colors.
 */
export async function downloadCVPdf(): Promise<boolean> {
  let iframe: HTMLIFrameElement | null = null;
  try {
    // Create an isolated iframe to isolate styles from Tailwind v4's oklch variables
    iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.style.top = '0';
    iframe.style.width = '794px'; // standard A4 @ 96 DPI: 210mm ~ 794px
    iframe.style.height = '1123px'; // standard A4 @ 96 DPI: 297mm ~ 1123px
    iframe.style.border = 'none';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.style.zIndex = '-9999';

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      throw new Error('Unable to access iframe document for PDF generation');
    }

    const htmlContent = getModern1PageHtml();
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();

    // Allow iframe rendering lifecycle and fonts to settle
    await new Promise((resolve) => setTimeout(resolve, 350));

    const targetElement = iframeDoc.querySelector('.cv-page') as HTMLElement || iframeDoc.body;

    // Capture using html2canvas from the clean iframe context
    const canvas = await html2canvas(targetElement, {
      scale: 2.2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      windowHeight: 1123,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    pdf.save('Imran_Kedir_FullStack_Developer_CV.pdf');
    return true;
  } catch (error) {
    console.error('Error generating direct PDF:', error);
    // Fallback: trigger print dialog if canvas generation had issues
    window.print();
    return false;
  } finally {
    if (iframe && document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  }
}
