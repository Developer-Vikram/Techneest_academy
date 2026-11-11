/* ============================================================
   TECHNEEST ACADEMY — IMAGE CONSTANTS (UNSPLASH)
   ------------------------------------------------------------
   All public-facing image URLs live here, grouped by section.
   Every URL was verified with `curl -I` → HTTP 200 on 2026-11-11.
   Swap any entry freely; components read from this file only.

   Helper below appends Unsplash's recommended delivery params.
   ============================================================ */

const u = (id, w) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ---------- HERO CAROUSEL (4 slides, large) ---------- */
export const HERO_SLIDES_IMAGES = [
  u("photo-1522202176988-66273c2fd55f", 1920), // students collaborating on laptops
  u("photo-1517245386807-bb43f82c33c4", 1920), // workshop / classroom session
  u("photo-1531482615713-2afd69097998", 1920), // mentor guiding developers
  u("photo-1523240795612-9a054b0db644", 1920), // students studying together
];

/* ---------- WHY CHOOSE US (collage) ---------- */
export const WHY_IMAGES = {
  main: u("photo-1552664730-d307ca884978", 1200), // team strategy session
  top: u("photo-1516321318423-f06f85e504b3", 800), // laptop & code
  bottom: u("photo-1531545514256-b1400bc00f31", 800), // group learning
};

/* ---------- COURSES SECTION (fallback / showcase art) ---------- */
export const COURSES_IMAGES = {
  showcase: u("photo-1498050108023-c5249f4df085", 1600), // code on macbook
  fallback: u("photo-1461749280684-dccba630e2f6", 900), // code on screen
};

/* ---------- INTERNSHIP PATH ---------- */
export const INTERNSHIP_IMAGES = {
  path: u("photo-1600880292203-757bb62b4baf", 1200), // professionals shaking hands
  pageHero: u("photo-1553877522-43269d4ea984", 1920), // workshop whiteboard
  teamwork: u("photo-1521737604893-d14cc237f11d", 1200), // team at work
  review: u("photo-1556761175-5973dc0f32e7", 1200), // office review meeting
};

/* ---------- MENTORS ---------- */
export const MENTOR_IMAGES = {
  sectionBg: u("photo-1524178232363-1fb2b075b655", 1600), // lecture hall
};

/* ---------- GALLERY (bento grid, 10 images) ---------- */
export const GALLERY_IMAGES = [
  { src: u("photo-1515378960530-7c0da6231fb1", 1200), alt: "Student working on a laptop with code on screen", caption: "Focus hours" },
  { src: u("photo-1559136555-9303baea8ebd", 1200), alt: "Modern open-plan tech office workspace", caption: "Our workspace" },
  { src: u("photo-1543269865-cbf427effbad", 1200), alt: "Students collaborating around a laptop", caption: "Team projects" },
  { src: u("photo-1509062522246-3755977927d7", 1200), alt: "Teacher guiding students in a classroom", caption: "Classroom sessions" },
  { src: u("photo-1555066931-4365d14bab8c", 1200), alt: "Programming code displayed on a dark screen", caption: "Code reviews" },
  { src: u("photo-1529156069898-49953e39b3ac", 1200), alt: "Graduates celebrating together", caption: "Graduation day" },
  { src: u("photo-1542831371-29b0f74f9713", 1200), alt: "Colorful code editor on a monitor", caption: "Everyday building" },
  { src: u("photo-1517694712202-14dd9538aa97", 1200), alt: "Developer typing on a laptop at a desk", caption: "Practice sprints" },
  { src: u("photo-1522542550221-31fd19575a2d", 1200), alt: "Designer and developer reviewing work on screens", caption: "Mentor feedback" },
  { src: u("photo-1541339907198-e08756dedf3f", 1200), alt: "Graduation cap on books at a university", caption: "Certificates earned" },
];

/* ---------- PAGE HEADERS (inner pages, breadcrumbs) ---------- */
export const PAGE_HEADER_IMAGES = {
  courses: u("photo-1504384308090-c894fdcc538d", 1920), // desk workspace with code
  internship: INTERNSHIP_IMAGES.pageHero,
  about: u("photo-1522071820081-009f0129c71c", 1920), // team collaboration
  contact: u("photo-1517048676732-d65bc937f952", 1920), // meeting room
};

/* ---------- AUTH (Login / Register full-screen backgrounds) ---------- */
export const AUTH_IMAGES = {
  login: u("photo-1544717305-2782549b5136", 1920), // student with laptop
  register: u("photo-1546410531-bb4caa6b424d", 1920), // learning & notes
};

/* ---------- ABOUT PAGE ---------- */
export const ABOUT_IMAGES = {
  story: u("photo-1587614382346-4ec70e388b28", 1200), // desk with laptop & notebook
  mission: u("photo-1434030216411-0b793f4b4173", 1200), // student writing notes
  values: u("photo-1427504494785-3a9ca7044f45", 1200), // education & books
};

/* Real Techneest team photos — restored from the original
   TeamMomentsGallery section (not Unsplash; these are real people). */
export const TEAM_IMAGES = [
  {
    src: "https://i.ibb.co/r2V9VP9g/main-jpg.jpg",
    alt: "The Techneest Academy team together",
    title: "The Techneest Academy Team",
    desc: "A united team of creators, developers and strategists driving innovation and growth every day.",
  },
  {
    src: "https://i.ibb.co/DPdd4NVz/ghff-jpg.jpg",
    alt: "Team members turning ideas into reality",
    title: "Turning Ideas Into Reality",
    desc: "Every line of code, every design and every strategy is crafted with passion, precision and purpose.",
  },
  {
    src: "https://i.ibb.co/Z1p4j1ML/party-jpg.jpg",
    alt: "Team having rooftop conversations",
    title: "Rooftop Conversations",
    desc: "An evening of meaningful connections, fresh ideas and shared moments that strengthen the Techneest Academy culture.",
  },
  {
    src: "https://i.ibb.co/mrxLDMMB/dance-jpg.jpg",
    alt: "Team celebrating at an event",
    title: "Dance. Celebrate. Repeat.",
    desc: "A night filled with music, energy and unforgettable memories.",
  },
  {
    src: "https://i.ibb.co/YFn125Sn/2-1-jpg.jpg",
    alt: "Passionate creators at work",
    title: "Passionate Creators",
    desc: "Empowering learners with practical skills, real-world projects, and career-focused education.",
  },
  {
    src: "https://i.ibb.co/nMBbznF7/dinner-jpg.jpg",
    alt: "Team dinner and connections",
    title: "Dinner & Connections",
    desc: "Great food, meaningful conversations and unforgettable moments.",
  },
];

/* ---------- CERTIFICATES SECTION ---------- */
export const CERTIFICATE_IMAGES = {
  celebration: u("photo-1571260899304-425eee4c7efc", 1200), // student celebrating success
};

/* ---------- FINAL CTA BAND OVERLAY ---------- */
export const CTA_IMAGES = {
  band: u("photo-1573164713988-8665fc963095", 1920), // confident professional
};

/* ---------- MISC / DECORATIVE ---------- */
export const MISC_IMAGES = {
  dashboard: u("photo-1551288049-bebda4e38f71", 1200), // analytics on screen
  nightCode: u("photo-1517180102446-f3ece451e9d8", 1200), // coding at night
  books: u("photo-1497633762265-9d179a990aa6", 1200), // stack of books
};

export default {
  HERO_SLIDES_IMAGES,
  WHY_IMAGES,
  COURSES_IMAGES,
  INTERNSHIP_IMAGES,
  MENTOR_IMAGES,
  GALLERY_IMAGES,
  PAGE_HEADER_IMAGES,
  AUTH_IMAGES,
  ABOUT_IMAGES,
  CERTIFICATE_IMAGES,
  CTA_IMAGES,
  MISC_IMAGES,
};
