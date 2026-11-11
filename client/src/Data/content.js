/* ============================================================
   TECHNEEST ACADEMY — SITE CONTENT
   ------------------------------------------------------------
   Every piece of editable public-facing copy lives in this file.
   Images live in ./images.js. Real numbers (stats, projects,
   mentors, reviews) come from their original components/APIs —
   nothing numeric is invented here.
   ============================================================ */

export const SITE = {
  name: "Techneest Academy",
  tagline:
    "A web development academy with a built-in internship. Learn the craft, ship real projects, then gain professional experience on a real team.",
  contact: {
    email: "Manager@techneest.com",
    phone: "+91 85959 73101",
    phoneHref: "+918595973101",
    address:
      "T3-331, 3rd Floor, Golden I, Tech Zone 4, Greater Noida, U.P. (201318)",
    hours: "[Support hours]",
  },
};

/* ---------- Navigation ---------- */

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Internship", path: "/internship" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const FOOTER_LINKS = {
  quick: [
    { name: "Home", path: "/" },
    { name: "All Courses", path: "/courses" },
    { name: "Internship Program", path: "/internship" },
    { name: "Digital Products", path: "/digital-product" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
  support: [
    { name: "Help Center (FAQ)", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Refund Policy", path: "/cancellation-refund-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
  ],
};

/* ---------- Home: Hero carousel slides ---------- */

export const HERO_SLIDES = [
  {
    badge: "Web development, end to end",
    title1: "Learn web development.",
    title2: "Get a real internship.",
    text: "Techneest Academy teaches one craft properly — building for the web. Enrol, learn by shipping projects, and step into an internship when you complete your course.",
  },
  {
    badge: "Project-based learning",
    title1: "Build a portfolio,",
    title2: "not just a watch history.",
    text: "Every module ends with something you actually shipped. Our students' live projects — travel platforms, metro route planners, healthcare portals — speak for themselves.",
  },
  {
    badge: "Mentor support",
    title1: "Learn beside developers",
    title2: "who ship for a living.",
    text: "Industry mentors review your code, unblock you fast, and push your work to professional standards — the same standards the internship expects.",
  },
  {
    badge: "Career outcome",
    title1: "From first line of code",
    title2: "to first real assignment.",
    text: "A certificate gets you a glance. Production experience gets you a conversation. Finish your course and start building on a real team.",
  },
];

export const HERO_CTAS = {
  primary: { label: "Explore Courses", path: "/courses" },
  secondary: { label: "How the internship works", path: "/internship" },
};

/* Floating glass cards layered over the hero */
export const HERO_FLOATING_CARDS = [
  { title: "Internship after course completion", meta: "Included with every course" },
  { title: "Live student projects", meta: "Real clients, real deployments" },
];

/* ---------- Home: Why Choose Us ---------- */

export const WHY_REASONS = [
  {
    title: "100% focused on web development",
    description:
      "No scattered catalogue of unrelated topics. Every lesson, project and mentor hour at Techneest goes into a single craft — building for the web — so everything you learn compounds instead of competing for your attention.",
  },
  {
    title: "Internship included after the course",
    description:
      "Completing your course unlocks a structured internship on a real team. You take real assignments, answer to real deadlines, and finish with professional work in your portfolio — no separate fee, no fine print.",
  },
  {
    title: "Project-based from week one",
    description:
      "You learn by shipping. Responsive interfaces, APIs, databases and full products — each stage produces a live project you can demo, defend in an interview, and point to on your résumé.",
  },
  {
    title: "Mentors who review your code",
    description:
      "Industry developers guide you beyond the videos: doubt-solving, code reviews and honest feedback on your work, so you build the habits teams actually expect on day one of a job.",
  },
  {
    title: "Certificate with substance behind it",
    description:
      "Your completion certificate is backed by evidence — deployed projects, reviewed code and internship experience. Employers see proof of work, not just proof of attendance.",
  },
];

/* ---------- Home: Internship path (4 steps) ---------- */

export const PATH_STEPS = [
  {
    title: "Purchase the course",
    description:
      "One payment covers the complete Frontend Development programme and the internship that follows it.",
  },
  {
    title: "Learn and build",
    description:
      "Work through structured lessons with mentor support — every module ends with a project you actually shipped.",
  },
  {
    title: "Complete the course",
    description:
      "Finish the modules, projects and assessments. Completion unlocks the internship automatically.",
  },
  {
    title: "Start the internship",
    description:
      "Join a real team, take real assignments and add professional work to your portfolio.",
  },
];

/* ---------- Home: Gallery ---------- */

export const GALLERY = {
  badge: "Life at Techneest",
  title: "Where learning looks like working",
  subtitle:
    "Classroom sessions, code reviews, team projects and celebrations — a look inside the academy.",
};

/* ---------- Home: Courses section ---------- */

/* Shown when the admin panel has a single (flagship) course —
   the section becomes a large featured showcase instead of a grid. */
export const FEATURED_COURSE = {
  badge: "Flagship programme",
  curriculumTitle: "What you will master",
  curriculum: [
    "Semantic HTML & modern CSS layout systems",
    "JavaScript fundamentals through advanced async patterns",
    "React — components, state, routing and hooks",
    "Responsive, accessible interface engineering",
    "Git, deployment and real-project workflows",
  ],
  toolsTitle: "Tools you will use",
  tools: ["HTML5", "CSS3", "JavaScript", "React", "Git", "Tailwind CSS"],
  internshipNote:
    "Complete the programme and your internship begins — real assignments on a real team, included with your enrolment.",
};

/* ---------- Home: Final CTA ---------- */

export const HOME_FINAL_CTA = {
  title: "Your first developer role starts with your first project.",
  subtitle:
    "Enrol today, learn by building, and finish with an internship on your résumé.",
  primaryCta: { label: "Browse Courses", path: "/courses" },
  secondaryCta: { label: "Talk to Us", path: "/contact" },
};

/* ---------- Courses page ---------- */

export const COURSES_PAGE = {
  breadcrumb: "Courses",
  badge: "Every course includes an internship",
  title: "Learn the craft. Then practise it for real.",
  subtitle:
    "Focused web development training with hands-on projects, mentor code reviews and an internship that starts the moment you complete the course.",
  bottomCta: {
    title: "Not sure whether this is the right step?",
    subtitle:
      "Tell us where you want to end up and we will give you a straight answer.",
    label: "Contact Our Team",
    path: "/contact",
  },
};

/* ---------- Internship page ---------- */

export const INTERNSHIP_PAGE = {
  breadcrumb: "Internship",
  badge: "The Techneest Internship",
  title: "Finish your course. Start your career.",
  subtitle:
    "An internship is not a bonus at Techneest — it is the point. Every course purchase includes a structured internship once you complete the curriculum.",
  primaryCta: { label: "See Courses", path: "/courses" },
  secondaryCta: { label: "Ask a Question", path: "/contact" },
  howItWorks: {
    title: "How the internship works",
    subtitle:
      "A clear path from enrolment to professional experience — no guesswork, no fine print.",
    steps: [
      {
        title: "Complete your course",
        description:
          "Finish all modules and projects in the Frontend Development programme.",
      },
      {
        title: "Get matched",
        description:
          "We place you on a team and assignment that match your track and skill level.",
      },
      {
        title: "Work on real tasks",
        description:
          "Build features, fix issues and ship work reviewed by experienced developers.",
      },
      {
        title: "Graduate with proof",
        description:
          "Leave with live projects, a completion record and experience you can talk about in interviews.",
      },
    ],
  },
  benefits: {
    title: "What the internship gives you",
    items: [
      "[Real client or in-house project assignments]",
      "[Mentor code reviews and feedback]",
      "[Internship completion certificate]",
      "[Portfolio pieces deployed to production]",
      "[Duration] of guided internship work",
    ],
  },
  requirements: {
    title: "What we expect from interns",
    items: [
      "Completed Techneest course (all modules and projects)",
      "A working laptop and a reliable internet connection",
      "[Weekly hours commitment]",
      "Willingness to take feedback and iterate on your work",
    ],
  },
  faqs: [
    {
      question: "Who is eligible for the internship?",
      answer:
        "Any student who purchases a course and completes it. The internship is included with the course — there is no separate fee.",
    },
    {
      question: "Is the internship remote or on-site?",
      answer: "[Internship mode — remote / on-site / hybrid]",
    },
    {
      question: "How long does the internship last?",
      answer: "[Internship duration]",
    },
    {
      question: "Is the internship paid?",
      answer: "[Stipend details, if any]",
    },
    {
      question: "What kind of work will I do?",
      answer:
        "Real development assignments — building features, fixing issues and shipping work reviewed by experienced developers, like the student projects showcased on our home page.",
    },
    {
      question: "What happens after the internship ends?",
      answer:
        "[Post-internship outcome — offer letter, referral support, extended program, etc.]",
    },
  ],
  cta: {
    title: "Ready to move from tutorials to real work?",
    subtitle: "Pick a course and your internship path starts the day you enrol.",
    label: "Explore Courses",
    path: "/courses",
  },
};

/* ---------- About page ---------- */

export const ABOUT_PAGE = {
  breadcrumb: "About",
  badge: "About Techneest Academy",
  title: "One craft. Taught seriously.",
  subtitle:
    "Techneest Academy exists for a single purpose: turning motivated beginners into working web developers — and giving them the professional experience to prove it.",
  story: {
    title: "Our story",
    body: "Techneest Academy grew out of a simple frustration: students finishing courses with certificates but nothing to show an employer. So we rebuilt the model around outcomes — a focused web development curriculum, real student projects shipped to live URLs, and a structured internship after completion. [Add founding year and founder story details here.]",
  },
  mission: {
    title: "Our mission",
    body:
      "Tutorials are everywhere; job-ready developers are not. We close that gap by teaching web development the way it is actually practised — through projects, reviews and deadlines — and by placing every graduate into an internship where the work is real.",
  },
  vision: {
    title: "Our vision",
    body:
      "A generation of developers whose first professional experience begins before they ever sign an offer letter — confident, reviewed and battle-tested on real products.",
  },
  values: {
    title: "What we stand for",
    items: [
      {
        title: "Depth over breadth",
        description:
          "We only teach web development, which means every lesson, project and mentor hour goes into one craft.",
      },
      {
        title: "Proof over promises",
        description:
          "You leave with deployed projects and internship experience — evidence, not just a completion email.",
      },
      {
        title: "Honest guidance",
        description:
          "Straight answers about what the work involves and what it takes to grow as a developer.",
      },
    ],
  },
  team: {
    title: "The people behind Techneest",
    subtitle:
      "A dedicated team of mentors, developers and digital professionals — the same people who review student code and run internship assignments.",
  },
  cta: {
    title: "See what learning here looks like.",
    label: "View Courses",
    path: "/courses",
  },
};

/* ---------- Contact page ---------- */

export const CONTACT_PAGE = {
  breadcrumb: "Contact",
  badge: "We reply fast",
  title: "Questions? Send them over.",
  subtitle:
    "Course advice, payment help, internship queries — whatever it is, the team reads every message.",
  form: {
    title: "Send a message",
    subtitle: "[Response time promise, e.g. 'We reply within one business day']",
    nameLabel: "Your name",
    emailLabel: "Email address",
    subjectLabel: "Subject",
    messageLabel: "How can we help?",
    submit: "Send Message",
    sending: "Sending…",
    successTitle: "Message sent",
    successBody: "Thanks for reaching out — we will get back to you shortly.",
  },
  mapNote: "[Embed a Google Map of the office location here]",
};

/* ---------- Login / Register ---------- */

export const AUTH = {
  login: {
    benefits: [
      "Resume lessons where you left off",
      "Track project and assignment progress",
      "Unlock the internship on completion",
    ],
    formTitle: "Sign in to your account",
    formSubtitle: "Use the credentials you registered with.",
  },
  register: {
    benefits: [
      "Focused web development training",
      "Project-based, mentor-reviewed learning",
      "Internship included after completion",
    ],
    formTitle: "Create your account",
    formSubtitle: "It takes less than a minute.",
  },
};
