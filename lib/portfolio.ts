/**
 * Content from the 2026 portfolio deck (Muhammad Aldryansyah Pamungkas -
 * Portofolio - 2026.pdf). The home page renders straight from this file.
 * Images live in /public/portfolio and were extracted from the same deck.
 */

const img = (name: string) => `/portfolio/${name}.webp`;

export type Accent = "navy" | "coral" | "teal" | "forest" | "plum" | "crimson" | "yellow" | "sky";

export const profile = {
  eyebrow: "Portfolio 2026 · IPB University",
  name: "Muhammad Aldryansyah Pamungkas",
  role: "Full-Stack Software Engineer",
  stackLine: "Vue.js, React, Go, Laravel",
  photo: img("profile"),
  location: "Cirebon, West Java",
  email: "aldryansyahp@gmail.com",
  phone: "+62 895 608 837 548",
  github: "https://github.com/AlcodeFun",
  website: "https://aldryansyahp.vercel.app",
  linkedin: "https://linkedin.com/in/muhammadaldryansyahpamungkas",
};

/** `**bold**` spans are rendered as <strong>. */
export const about = {
  points: [
    "Software engineer with **2 years** across internships and a professional role",
    "Builds **Vue.js and React** frontends and **Go, Laravel and Node.js** backends",
    "Delivered point-of-sale, booking-and-payment and GPS mapping systems from UI to database",
    "Works with product, QA and engineering teams from requirements through release",
  ],
  languages: "Indonesian (native) · English (professional)",
  stats: [
    { value: "2 yrs", label: "Experience across four roles, 2022–2026" },
    { value: "15+", label: "Production point-of-sale features at Nutapos", dark: true },
    { value: "~20%", label: "Less repetitive dev work after the design system I started" },
    { value: "3.86", label: "GPA out of 4.00, Cum Laude, IPB University" },
  ],
};

export const education = {
  school: "IPB University",
  place: "Bogor, Indonesia",
  period: "Aug 2021 – Aug 2025",
  degree: "Bachelor of Applied Science in Computer, Software Engineering Technology",
  gpa: "3.86",
  gpaOutOf: "/ 4.00 GPA",
  honor: "Graduated Cum Laude",
  highlights: [
    { icon: "trophy", title: "1st Place, Business Plan Competition", text: "Olimpiade Vokasi Indonesia (OLIVIA) 2022" },
    { icon: "medal", title: "Perfect 4.00 GPA", text: "Achieved in three semesters" },
    { icon: "globe", title: "International Summer Course 2022", text: "Represented the major with international participants" },
  ],
} as const;

export const techStack = [
  { label: "Languages", items: "JavaScript, TypeScript, Go, PHP, Node.js, Python" },
  { label: "Frontend", items: "Vue.js, React.js, Bootstrap, Electron" },
  { label: "Backend & APIs", items: "Go Echo, Laravel, Node.js, RESTful and third-party APIs" },
  { label: "Databases", items: "MySQL, PostgreSQL, MongoDB, Supabase" },
  { label: "Cloud storage", items: "Cloudflare R2" },
  { label: "Version control", items: "Git on GitHub, GitLab and Bitbucket" },
  { label: "Collaboration", items: "Trello, Jira, Figma, Postman" },
  { label: "Delivery", items: "Agile (Scrum), Waterfall" },
  { label: "AI-agent assisted dev", items: "Claude, ChatGPT, DeepSeek, Gemini, Opencode" },
];

export const currentRole = {
  title: "Frontend Web Developer",
  company: "Nutapos",
  meta: "Nutapos · Yogyakarta · Remote",
  logo: img("logo-nutapos"),
  stats: [
    { value: "15+", label: "production POS features for merchants" },
    { value: "~20%", label: "less repetitive UI work" },
  ],
  work: [
    { title: "Design system", text: "Started a library of reusable UI components and patterns that made screens consistent across the app" },
    { title: "Legacy migration", text: "Built the new Vue.js frontend as a CodeIgniter app moved to a Laravel and Vue stack" },
    { title: "API integration", text: "Connected UIs to backend services with data handling, validation, error states and business rules" },
    { title: "Production support", text: "Diagnosed and fixed defects in live systems without disrupting merchant workflows" },
  ],
};

export const experience: {
  period: string;
  title: string;
  company: string;
  meta: string;
  logo: string;
  accent: Accent;
  points: string[];
  photo?: { src: string; caption: string; sub: string };
  note?: { title: string; text: string };
}[] = [
  {
    period: "Sep – Dec 2022",
    title: "Web Developer",
    company: "Crewnesia",
    meta: "Bogor · Internship",
    logo: img("logo-crewnesia"),
    accent: "plum",
    points: [
      "Built and launched the company website in HTML, CSS, Bootstrap and JS",
      "Refined the UI from direct founder feedback",
    ],
    photo: { src: img("team-crewnesia"), caption: "With the Crewnesia team", sub: "Bogor · 2022" },
  },
  {
    period: "Feb – Jun 2024",
    title: "Fullstack Web Developer",
    company: "Hicolleagues",
    meta: "Jakarta · Internship",
    logo: img("logo-hicolleagues"),
    accent: "yellow",
    points: [
      "Shipped 3+ full-stack features in Vue.js and Go",
      "Built 10+ REST endpoints on Go Echo with clean architecture",
    ],
    photo: { src: img("team-hicolleagues"), caption: "With the HiColleagues team", sub: "Jakarta · 2024" },
  },
  {
    period: "Aug – Dec 2024",
    title: "Software Engineer Intern",
    company: "Okiagaru × IPB",
    meta: "Cianjur · Internship",
    logo: img("logo-okiagaru"),
    accent: "crimson",
    points: [
      "Built a GPS land mapping system in Vue.js and Laravel",
      "Wrote the SRS and SDD covering 20+ requirements",
    ],
    photo: { src: img("team-okiagaru"), caption: "With the Okiagaru Indonesia Agricoop team", sub: "Cianjur · 2024" },
  },
  {
    period: "Sep 2025 – Dec 2026",
    title: "Frontend Web Developer",
    company: "Nutapos",
    meta: "Yogyakarta · Contract",
    logo: img("logo-nutapos"),
    accent: "forest",
    points: [
      "Delivered 15+ production point-of-sale features",
      "Started a design system that cut repetitive work ~20%",
    ],
    note: { title: "Remote role", text: "Worked fully remotely with the Nutapos team." },
  },
];

export const otherExperience = [
  {
    kind: "Teaching",
    title: "Assistant Lecturer",
    subtitle: "Geographic Information Systems",
    meta: "IPB University · Jan–Jun 2025",
    points: [
      "Assisted students in GIS practical sessions on spatial data processing, analysis and visualization",
      "Guided GIS assignments and projects with technical support on geospatial tools",
      "Ran laboratory sessions with the lecturer",
    ],
  },
  {
    kind: "Leadership",
    title: "Vice Head, Competition Division",
    subtitle: "IT Festival 2022",
    meta: "Himpunan Mahasiswa Vokasi Micro IT · Mar–May 2022",
    points: [
      "Coordinated schedules, technical requirements and preparation for several IT competitions",
      "Ran competition activities with the committee and supported participants",
    ],
  },
];

export type Shot = { src: string; alt: string; caption: string };
const shot = (name: string, caption: string, alt = caption): Shot => ({ src: img(name), alt, caption });

export const projects: {
  slug: string;
  year: string;
  org?: string;
  title: string;
  description: string;
  accent: Accent;
  stack: { name: string; role: string }[];
  /** Repository on GitHub, when public. */
  repo?: string;
  /** The long write-up on /projects, when one exists. */
  caseStudy?: string;
  problem?: { title: string; points: string[] };
  solution?: { title: string; points: string[] };
  shots: Shot[];
}[] = [
  {
    slug: "kelana-photo-booth",
    year: "2026",
    org: "Personal business",
    title: "Kelana Photo Booth",
    description:
      "Manages photo sessions end to end: capture, processing, custom layouts and delivery of final photos through a web workflow.",
    accent: "forest",
    stack: [
      { name: "React", role: "Frontend" },
      { name: "Electron", role: "Desktop app" },
      { name: "Node.js", role: "Backend" },
      { name: "Cloudflare R2", role: "Photo storage" },
    ],
    repo: "https://github.com/AlcodeFun/photo-booth",
    caseStudy: "/projects/photo-booth-system",
    shots: [
      shot("kelana-1", "Start screen"),
      shot("kelana-2", "Choose a photo style"),
      shot("kelana-3", "Live capture"),
      shot("kelana-4", "Arrange the photos"),
      shot("kelana-5", "Effects and GIF template"),
      shot("kelana-6", "QR delivery"),
    ],
  },
  {
    slug: "gps-land-mapping-okiagaru",
    year: "2025",
    org: "Okiagaru",
    title: "GPS Land Mapping Okiagaru",
    description:
      "GPS-based agricultural land mapping. Built as a Software Engineer Intern in the IPB × Okiagaru Matching Fund program, and the output became my final project for my bachelor's degree.",
    accent: "forest",
    stack: [
      { name: "Vue.js", role: "Frontend" },
      { name: "Laravel", role: "Backend" },
      { name: "MySQL", role: "Database" },
    ],
    repo: "https://github.com/AlcodeFun/lists/okiagaru-gps-tracker",
    caseStudy: "/projects/okiagaru-gps-land-mapping",
    shots: [
      shot("gps-field-1", "Program team in Cianjur"),
      shot("gps-field-2", "Field survey with farmers"),
      shot("gps-input", "Choose input method"),
      shot("gps-polygon", "Polygon drawing tool"),
      shot("gps-detail", "Land detail and map"),
    ],
  },
  {
    slug: "godong-ijo",
    year: "2025",
    org: "Godong Ijo",
    title: "Godong Ijo Landing Page and CMS",
    description: "Company landing page with a CMS so the team can update content without code.",
    accent: "forest",
    stack: [
      { name: "Vue.js", role: "Frontend" },
      { name: "Laravel", role: "Backend" },
      { name: "MySQL", role: "Database" },
    ],
    shots: [
      shot("godong-handover", "Handover with the client team"),
      shot("godong-menu", "Landing page: menu section"),
      shot("godong-garden", "Vertical Garden page"),
      shot("godong-pricing", "Price list and footer"),
    ],
  },
  {
    slug: "ms-attendance",
    year: "2024",
    org: "Max Samasta",
    title: "MS Attendance",
    description:
      "Frontend screens and REST API integration for an employee attendance system, covering attendance data and user workflows.",
    accent: "teal",
    stack: [
      { name: "Vue.js", role: "Frontend" },
      { name: "Axios · REST API", role: "API integration" },
    ],
    repo: "https://github.com/AlcodeFun/ms-attendance-fe",
    caseStudy: "/projects/ms-attendance",
    shots: [
      shot("ms-login", "Login page"),
      shot("ms-dashboard", "Employee dashboard"),
      shot("ms-tapin", "Tap-in check-in"),
      shot("ms-recap", "HR attendance recap"),
      shot("ms-salary", "Salary recap"),
    ],
  },
  {
    slug: "janlink",
    year: "2023",
    org: "OLIVIA 2023",
    title: "JanLink – OLIVIA 2023 Competition",
    description:
      "Merchant tracking platform that updates locations through AJAX and shows them on a dynamic Google Maps view.",
    accent: "sky",
    stack: [
      { name: "PHP Native", role: "Backend" },
      { name: "AJAX", role: "Live updates" },
      { name: "Google Maps API", role: "Mapping" },
    ],
    repo: "https://github.com/AlcodeFun/JanLink",
    caseStudy: "/projects/janlink",
    problem: {
      title: "Buyers can't find roaming street-food vendors",
      points: [
        "Vendors move through neighborhoods with no fixed stall",
        "Buyers only know a vendor is near when they see the cart",
        "Small vendors have no online menu or reviews",
      ],
    },
    solution: {
      title: "JanLink puts every active vendor on a live map",
      points: [
        "Vendors share their position, refreshed through AJAX",
        "Buyers see nearby vendors and routes on Google Maps",
        "Menus, prices and ratings help buyers choose",
      ],
    },
    shots: [
      shot("janlink-home", "Home page"),
      shot("janlink-catalog", "Food catalog"),
      shot("janlink-vendor", "Vendor page"),
      shot("janlink-admin", "Admin list"),
    ],
  },
  {
    slug: "camp-survivor-cashier",
    year: "2023",
    title: "Camp Survivor Cashier",
    description: "Cashier app with responsive screens and API-based data handling for transaction workflows.",
    accent: "forest",
    stack: [
      { name: "React.js", role: "Frontend" },
      { name: "Bootstrap", role: "UI framework" },
      { name: "JSONPlaceholder API", role: "Data API" },
    ],
    repo: "https://github.com/AlcodeFun/ChasierWeb-CampSurvivor",
    caseStudy: "/projects/camp-survivor-cashier",
    shots: [shot("camp-menu", "Menu and cart"), shot("camp-note", "Item quantity and kitchen note")],
  },
  {
    slug: "foodish-app",
    year: "2023",
    title: "Foodish App",
    description: "Android food-delivery app that manages its data through a REST API and MongoDB.",
    accent: "crimson",
    stack: [
      { name: "Android", role: "Mobile app" },
      { name: "MongoDB", role: "Database" },
      { name: "REST API", role: "API integration" },
    ],
    repo: "https://github.com/AlcodeFun/Foodish-OrderApp",
    caseStudy: "/projects/foodish-order-app",
    shots: [
      shot("foodish-1", "Splash screen"),
      shot("foodish-3", "Login"),
      shot("foodish-6", "Home and categories"),
      shot("foodish-5", "Menu detail"),
      shot("foodish-4", "Cart and checkout"),
      shot("foodish-2", "Settings"),
    ],
  },
];

export const visualDesign: {
  title: string;
  description: string;
  client: string;
  year?: string;
  accent: Accent;
  portrait?: boolean;
  works: { src: string; title: string; meta: string }[];
}[] = [
  {
    title: "Poster Design",
    description: "Posters for print and digital channels, from layout and typography to final artwork.",
    client: "PT Godong Ijo Asri, Okiagaru Indonesia Agricoop",
    year: "2024",
    accent: "crimson",
    portrait: true,
    works: [
      {
        src: img("poster-godong"),
        title: "Penerapan Teknologi Terkini Sebagai Langkah Inovatif dalam Pengembangan Ekowisata PT Godong Ijo Asri",
        meta: "PT Godong Ijo Asri · 2024",
      },
      {
        src: img("poster-okiagaru"),
        title: "Resiliensi Petani Mitra Okiagaru Indonesia Agricoop Melalui Transfer Teknologi Pemetaan Kesesuaian Lahan dan Sistem",
        meta: "Okiagaru Indonesia Agricoop · 2024",
      },
    ],
  },
  {
    title: "Instagram Feeds",
    description: "Feed posts and carousels designed to read as one consistent grid on the profile.",
    client: "PT Godong Ijo Asri",
    year: "2024",
    accent: "coral",
    works: [
      { src: img("ig-1"), title: "Hari Tani Nasional", meta: "24 September 2024" },
      { src: img("ig-2"), title: "Hari Pangan Sedunia", meta: "16 October 2024" },
      { src: img("ig-3"), title: "Hari Sumpah Pemuda", meta: "28 October 2024" },
      { src: img("ig-4"), title: "Hari Pahlawan", meta: "10 November 2024" },
    ],
  },
  {
    title: "E-book Design",
    description: "Cover design and interior page layout for digital books.",
    client: "UNESCO × Sekolah Vokasi",
    accent: "teal",
    works: [{ src: img("ebook-karangrejo"), title: "Desa Wisata Karangrejo", meta: "Tourism village guide, landscape format" }],
  },
  {
    title: "Reels & Animation",
    description: "Short-form video and motion graphics for social media.",
    client: "Kelana Photobooth",
    accent: "plum",
    portrait: true,
    works: [
      { src: img("reel-1"), title: "Brand story", meta: "Reel 01" },
      { src: img("reel-2"), title: "Service area map", meta: "Reel 02" },
    ],
  },
];

export const certifications = [
  { src: img("cert-se"), title: "Software Engineer", meta: "BNSP · 2025–2028", kind: "certificate" },
  { src: img("cert-db"), title: "Database Programmer", meta: "BNSP · 2026–2029", kind: "certificate" },
];

export const achievements = [
  { src: img("award-olivia"), title: "1st Place, Business Plan", meta: "OLIVIA 2022", kind: "award" },
  { src: img("award-reels"), title: "2nd Place, Reels Competition", meta: "Politeknik Elbajo Commodus · 2023", kind: "award" },
  { src: img("award-pln"), title: "Favorite Winner, Short Video", meta: "PLN · 2023", kind: "award" },
];
