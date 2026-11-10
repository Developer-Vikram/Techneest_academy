import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Headphones,
  HelpCircle,
  Mail,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout";

const FAQ = ({ faqs = [] }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // Default Questions
  const defaultFaqs = [
    {
      question: "What is Techneest Academy?",
      answer:
        "Techneest Academy is an online learning platform offering practical, skill-based courses designed for beginners to professionals. We focus on real-world projects and income-generating skills in programming, web development, graphic design, and social media earning.",
    },
    {
      question: "Do I get lifetime access to courses?",
      answer:
        "Yes! All courses include lifetime access. You can learn anytime at your own pace without any deadlines or restrictions. Plus, you get all future updates for free.",
    },
    {
      question: "Will I get a certificate after completing a course?",
      answer:
        "Absolutely! After successful completion, you receive a verified certificate from Techneest Academy that you can share on LinkedIn, add to your resume, and showcase to potential employers.",
    },
    {
      question: "Are the courses beginner-friendly?",
      answer:
        "Yes, all courses are structured from beginner to advanced levels with real-world examples, hands-on projects, and expert mentorship. No prior experience needed for most courses.",
    },
    {
      question: "Can I access the courses on mobile?",
      answer:
        "Yes! Our platform is fully mobile-responsive, so you can learn anywhere, anytime from your phone, tablet, or laptop. All course materials are optimized for mobile viewing.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "We support all major payment methods including UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and digital wallets. EMI options are also available.",
    },
    {
      question: "Is there any refund policy?",
      answer:
        "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with the course quality within the first 7 days, we'll issue a full refund — no questions asked.",
    },
    {
      question: "How can I get placement assistance?",
      answer:
        "After course completion, you get access to our placement cell including resume reviews, mock interviews, portfolio building, and connections with 200+ hiring partners.",
    },
  ];

  const finalFaqs = faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const quickTopics = [
    "Certificate",
    "Refund",
    "Payment",
    "Mobile",
    "Placement",
    "Lifetime",
  ];

  const stats = [
    { value: `${finalFaqs.length}+`, label: "FAQ Topics" },
    { value: "24/7", label: "Support" },
    { value: "5000+", label: "Happy Students" },
    { value: "92%", label: "Satisfaction" },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setOpenIndex(value ? 0 : null);
  };

  // Filter FAQs based on search
  const filteredFaqs = searchQuery
    ? finalFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : finalFaqs;

  return (
    <UserLayout>
      <main className="min-h-screen bg-white">
        {/* ================= HERO (search-first) ================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 via-white to-white">
          {/* Dotted pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(#d8b4fe 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse at top, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at top, black 30%, transparent 75%)",
            }}
          ></div>
          {/* Glows */}
          <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-purple-300/40 blur-3xl"></div>
          <div className="pointer-events-none absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl"></div>

          <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-14 text-center sm:px-6 md:pb-20 md:pt-20">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-3.5 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                Help Center
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-gray-900 sm:text-5xl md:text-6xl">
              How can we{" "}
              <span className="bg-gradient-to-r from-purple-600 to-[#00C6FF] bg-clip-text text-transparent">
                help you
              </span>{" "}
              today?
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
              Everything you need to know about Techneest Academy, answered in
              one place. Search below or pick a popular topic.
            </p>

            {/* Big search */}
            <div className="relative mx-auto mt-9 max-w-2xl">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-[#00C6FF] opacity-20 blur-md"></div>
              <div className="relative flex items-center rounded-2xl border border-gray-200 bg-white shadow-xl shadow-purple-500/10 transition-all focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-500/10">
                <Search className="ml-5 h-5 w-5 shrink-0 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your question..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-transparent px-4 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none md:py-5 md:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch("")}
                    className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick topics */}
            {faqs.length === 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-medium text-gray-500">
                  Popular:
                </span>
                {quickTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleSearch(topic)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                      searchQuery.toLowerCase() === topic.toLowerCase()
                        ? "border-transparent bg-gradient-to-r from-purple-600 to-[#00C6FF] text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:text-purple-600"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= STATS STRIP ================= */}
        <section className="border-y border-gray-100 bg-gray-50/60">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-gray-200/70 md:grid-cols-4 md:divide-y-0">
            {stats.map((stat, i) => (
              <div key={i} className="px-4 py-6 text-center md:py-7">
                <p className="bg-gradient-to-r from-purple-600 to-[#00C6FF] bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-500 md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FAQ + SIDEBAR ================= */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ---------- Accordion ---------- */}
            <div className="order-1 lg:col-span-8">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {searchQuery ? "Search results" : "Common questions"}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery
                      ? `${filteredFaqs.length} result${
                          filteredFaqs.length === 1 ? "" : "s"
                        } for "${searchQuery}"`
                      : "Tap any question to see the answer"}
                  </p>
                </div>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-14 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <HelpCircle className="h-7 w-7 text-gray-300" />
                  </div>
                  <p className="font-semibold text-gray-800">
                    No matching questions found
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try a different keyword or ask our team directly.
                  </p>
                  <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      onClick={() => handleSearch("")}
                      className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-purple-300 hover:text-purple-600"
                    >
                      Clear search
                    </button>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-[#00C6FF] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                    >
                      Ask support
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  {filteredFaqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div
                        key={faq.question}
                        className={`relative transition-colors duration-300 ${
                          isOpen ? "bg-purple-50/40" : "hover:bg-gray-50/70"
                        }`}
                      >
                        {/* Active left accent */}
                        <span
                          className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-[#00C6FF] transition-opacity duration-300 ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        ></span>

                        <button
                          onClick={() => toggleFAQ(index)}
                          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-7 sm:py-6"
                          aria-expanded={isOpen}
                        >
                          <span
                            className={`shrink-0 text-sm font-bold tabular-nums transition-colors sm:text-base ${
                              isOpen ? "text-purple-600" : "text-gray-300"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={`flex-1 text-base font-semibold leading-snug transition-colors sm:text-lg ${
                              isOpen ? "text-gray-900" : "text-gray-800"
                            }`}
                          >
                            {faq.question}
                          </span>

                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                              isOpen
                                ? "rotate-45 border-transparent bg-gradient-to-br from-purple-600 to-[#00C6FF] text-white shadow-md"
                                : "border-gray-200 bg-white text-gray-500"
                            }`}
                          >
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                          </span>
                        </button>

                        {/* Smooth height animation */}
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-6 pl-[3.25rem] pr-5 text-sm leading-relaxed text-gray-600 sm:pl-[4.5rem] sm:pr-16 sm:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ---------- Sticky support card ---------- */}
            <aside className="order-2 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-6 text-white shadow-2xl shadow-purple-900/20 sm:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple-600/40 blur-3xl"></div>
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-500/30 blur-3xl"></div>

                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-[#00C6FF] shadow-lg">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold sm:text-2xl">
                      Still have questions?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Can't find the answer you're looking for? Our friendly
                      support team is here to help.
                    </p>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                        <Clock className="h-5 w-5 shrink-0 text-cyan-300" />
                        <div>
                          <p className="text-[11px] text-white/60">
                            Quick response
                          </p>
                          <p className="text-sm font-semibold">
                            Within 4 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                        <Headphones className="h-5 w-5 shrink-0 text-purple-300" />
                        <div>
                          <p className="text-[11px] text-white/60">
                            Always available
                          </p>
                          <p className="text-sm font-semibold">
                            24/7 Live Support
                          </p>
                        </div>
                      </div>

                      <a
                        href="mailto:Manager@techneest.com"
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur transition hover:bg-white/10"
                      >
                        <Mail className="h-5 w-5 shrink-0 text-pink-300" />
                        <div className="min-w-0">
                          <p className="text-[11px] text-white/60">Email us</p>
                          <p className="truncate text-sm font-semibold">
                            Manager@techneest.com
                          </p>
                        </div>
                      </a>
                    </div>

                    <Link
                      to="/contact"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Contact Support
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ================= BOTTOM CTA ================= */}
        <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-purple-600 to-[#00C6FF] px-6 py-12 text-center sm:px-12 md:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            ></div>
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl"></div>

            <div className="relative">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                Ready to start your learning journey?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 md:text-base">
                Join 5000+ students building real-world skills with practical,
                project-based courses.
              </p>
              <Link
                to="/courses"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl md:text-base"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </UserLayout>
  );
};

export default FAQ;
