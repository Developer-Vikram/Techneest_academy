import React, { useState } from "react"
import {
    ChevronDown,
    HelpCircle,
    Clock,
    GraduationCap,
    Briefcase,
    Video,
    DollarSign,
    RefreshCw,
    ShieldCheck,
    AlarmClock,
    FileText,
    Zap,
    Shield,
    Users,
} from "lucide-react"

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null)

    const faqs = [
        {
            question: "Who can join Techneest Academy courses?",
            answer: "Anyone can join, including students, job seekers, freelancers, business owners, and professionals looking to upgrade their digital skills.",
            icon: GraduationCap,
            category: "Getting Started"
        },
        {
            question: "Do I need any prior experience to enroll?",
            answer: "No. Most of our courses are designed for beginners and guide you step-by-step from fundamentals to advanced concepts.",
            icon: Briefcase,
            category: "Career Support"
        },
        {
            question: "Will I receive a certificate after completing a course?",
            answer: "Yes, students receive a course completion certificate from Techneest Academy after successfully completing the course requirements.",
            icon: Video,
            category: "Learning Format"
        },
        {
            question: "Are the courses practical or theory-based?",
            answer: "Our courses focus on practical learning through real-world projects, assignments, case studies, and hands-on exercises",
            icon: DollarSign,
            category: "Results"
        },
        {
            question: " Will I get lifetime access to the course?",
            answer: "Yes, once enrolled, you get lifetime access to course content, future updates, and learning resources.",
            icon: RefreshCw,
            category: "Access"
        },
        {
            question: "Can I learn at my own pace?",
            answer: "Absolutely. You can access the course anytime and learn according to your schedule from any device.",
            icon: ShieldCheck,
            category: "Guarantee"
        },
        {
            question: "Do you provide mentorship and support?",
            answer: "Yes, students receive guidance, doubt-solving support, and mentorship throughout their learning journey.",
            icon: AlarmClock,
            category: "Flexibility"
        },
        {
            question: "How do I get started with Techneest Academy?",
            answer: "Simply choose your preferred course, complete the enrollment process, and start learning immediately from your student dashboard.",
            icon: FileText,
            category: "Certification"
        }
    ]

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="w-full bg-white py-12 md:py-20">
            <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                        <HelpCircle size={14} aria-hidden="true" />
                        Have questions?
                    </span>

                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl md:text-5xl">
                        Frequently asked{' '}
                        <span className="text-gradient">questions</span>
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                        Answers about courses, certification, mentorship and your
                        journey with Techneest Academy.
                        <span className="mt-1 block text-sm font-semibold text-brand">
                            Still curious? The contact page is one click away.
                        </span>
                    </p>
                </div>

                {/* FAQ Grid - Desktop */}
                <div className="mt-12 hidden gap-4 md:grid md:grid-cols-2">
                    {faqs.map((faq, index) => {
                        const Icon = faq.icon
                        const isOpen = activeIndex === index

                        return (
                            <div
                                key={index}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isOpen}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault()
                                        toggleFAQ(index)
                                    }
                                }}
                                className={`cursor-pointer rounded-2xl border bg-white transition-all duration-300 ${isOpen
                                    ? 'border-brand shadow-lift'
                                    : 'border-line hover:border-softdeep hover:shadow-card'
                                    }`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="p-5">
                                    {/* Question */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-soft">
                                                    <Icon size={14} className="text-brand" aria-hidden="true" />
                                                </span>
                                                <span className="rounded-full bg-canvas px-2 py-0.5 text-xs font-semibold text-muted">
                                                    {faq.category}
                                                </span>
                                            </div>
                                            <h3 className="pr-4 text-base font-bold text-navy">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <ChevronDown
                                            size={20}
                                            aria-hidden="true"
                                            className={`mt-1 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand" : "text-muted/50"
                                                }`}
                                        />
                                    </div>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-3 max-h-40" : "max-h-0"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed text-muted">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* FAQ List - Mobile (Vertical) */}
                <div className="mt-12 space-y-3 md:hidden">
                    {faqs.map((faq, index) => {
                        const Icon = faq.icon
                        const isOpen = activeIndex === index

                        return (
                            <div
                                key={index}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isOpen}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault()
                                        toggleFAQ(index)
                                    }
                                }}
                                className="cursor-pointer rounded-2xl border border-line bg-white transition-all duration-300 hover:border-softdeep"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="p-4">
                                    {/* Question */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-soft">
                                                    <Icon size={12} className="text-brand" aria-hidden="true" />
                                                </span>
                                                <span className="rounded-full bg-canvas px-2 py-0.5 text-xs font-medium text-muted">
                                                    {faq.category}
                                                </span>
                                            </div>
                                            <h3 className="pr-4 text-sm font-bold leading-relaxed text-navy">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <ChevronDown
                                            size={18}
                                            aria-hidden="true"
                                            className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand" : "text-muted/50"
                                                }`}
                                        />
                                    </div>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-3 max-h-40" : "max-h-0"
                                            }`}
                                    >
                                        <p className="text-xs leading-relaxed text-muted">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Quick Stats */}
                <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">

                    <div className="rounded-2xl border border-line bg-canvas p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card">
                        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-soft">
                            <Clock size={22} className="text-brand" aria-hidden="true" />
                        </span>
                        <p className="text-base font-bold text-navy">24/7 Support</p>
                        <p className="mt-1 text-xs text-muted">Always here to help</p>
                    </div>

                    <div className="rounded-2xl border border-line bg-canvas p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card">
                        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                            <Zap size={22} className="text-green-600" aria-hidden="true" />
                        </span>
                        <p className="text-base font-bold text-navy">Fast Response</p>
                        <p className="mt-1 text-xs text-muted">Within 2 hours</p>
                    </div>

                    <div className="rounded-2xl border border-line bg-canvas p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card">
                        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-soft">
                            <Shield size={22} className="text-iris" aria-hidden="true" />
                        </span>
                        <p className="text-base font-bold text-navy">Secure Learning</p>
                        <p className="mt-1 text-xs text-muted">100% safe platform</p>
                    </div>

                    <div className="rounded-2xl border border-line bg-canvas p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card">
                        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                            <Users size={22} className="text-warm" aria-hidden="true" />
                        </span>
                        <p className="text-base font-bold text-navy">1525+ Students</p>
                        <p className="mt-1 text-xs text-muted">Learning across India</p>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default FAQ
