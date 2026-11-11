import React, { useState, useEffect } from "react";

import UserLayout from "../../Layouts/UserLayout";

import { useDispatch, useSelector } from "react-redux";

import { sendMessage } from "../../redux/slices/contactSlice";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { CONTACT_PAGE, SITE } from "../../Data/content";
import { PAGE_HEADER_IMAGES } from "../../Data/images";
import PageHeader from "../../Components/PageHeader";

const ContactPage = () => {
  // =========================================
  // SCROLL TOP
  // =========================================

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // =========================================
  // REDUX
  // =========================================

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contact);

  // =========================================
  // USER DATA
  // =========================================

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isLoggedIn = !!user;

  // =========================================
  // STATES
  // =========================================

  const [formData, setFormData] = useState({
    name: isLoggedIn ? user.firstname : "",
    email: isLoggedIn ? user.email : "",
    subject: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sendMessage(formData))
      .unwrap()
      .then(() => {
        setSubmitSuccess(true);
        toast.success("Message sent successfully!");
        setFormData((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
        setTimeout(() => setSubmitSuccess(false), 5000);
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  const contactDetails = [
    {
      icon: Building2,
      label: "Legal entity",
      content: SITE.name,
      href: null,
    },
    {
      icon: MapPin,
      label: "Visit us",
      content: SITE.contact.address,
      href: null,
    },
    {
      icon: Phone,
      label: "Call us",
      content: SITE.contact.phone,
      href: `tel:${SITE.contact.phoneHref}`,
    },
    {
      icon: Mail,
      label: "Email us",
      content: SITE.contact.email,
      href: `mailto:${SITE.contact.email}`,
    },
  ];

  const inputClasses = (readOnly) =>
    `w-full rounded-xl border border-line px-5 py-4 text-sm text-navy placeholder:text-muted/50 outline-none transition-all focus:border-brand focus:ring-4 focus:ring-brand/10 ${
      readOnly ? "bg-canvas text-muted" : "bg-white"
    }`;

  return (
    <UserLayout>
      <main className="min-h-screen bg-canvas">
        {/* ========================================= */}
        {/* PAGE HEADER */}
        {/* ========================================= */}

        <PageHeader
          image={PAGE_HEADER_IMAGES.contact}
          badge={CONTACT_PAGE.badge}
          title={CONTACT_PAGE.title}
          subtitle={CONTACT_PAGE.subtitle}
          crumb={CONTACT_PAGE.breadcrumb}
        />

        {/* ========================================= */}
        {/* MAIN GRID */}
        {/* ========================================= */}

        <div className="mx-auto max-w-[95rem] px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* ---------- LEFT: DETAILS ---------- */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-navy md:text-3xl">
                Official channels
              </h2>
              <p className="mt-2 text-muted">
                Every way to reach the team, in one place.
              </p>

              <ul className="mt-8 space-y-4">
                {contactDetails.map((detail) => (
                  <li
                    key={detail.label}
                    className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-softdeep md:p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-soft text-brand transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                      <detail.icon size={20} aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted/60">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="mt-1 block break-words text-base font-bold text-navy transition-colors hover:text-brand"
                        >
                          {detail.content}
                        </a>
                      ) : (
                        <p className="mt-1 break-words text-base font-bold leading-relaxed text-navy">
                          {detail.content}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* MAP PLACEHOLDER — replace this block with a real
                  Google Maps <iframe> embed of the office location. */}
              <div
                role="img"
                aria-label={`Map showing the ${SITE.name} office location`}
                className="mt-6 flex h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-soft/50 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand shadow-card">
                  <MapPin size={22} aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold text-navy">
                  Office location map
                </p>
                <p className="max-w-xs px-4 text-xs text-muted">
                  {CONTACT_PAGE.mapNote}
                </p>
              </div>
            </motion.div>

            {/* ---------- RIGHT: FORM ---------- */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-fit rounded-2xl border border-line bg-white p-8 shadow-card md:p-10"
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-brand/30">
                  <Send size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy">
                    {CONTACT_PAGE.form.title}
                  </h3>
                  <p className="text-sm text-muted">
                    {CONTACT_PAGE.form.subtitle}
                  </p>
                </div>
              </div>

              {/* SUCCESS MESSAGE */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  aria-live="polite"
                  className="mb-8 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="text-sm font-bold text-green-900">
                      {CONTACT_PAGE.form.successTitle}
                    </h4>
                    <p className="mt-0.5 text-sm text-green-700">
                      {CONTACT_PAGE.form.successBody}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* NAME + EMAIL */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted"
                    >
                      {CONTACT_PAGE.form.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      readOnly={isLoggedIn}
                      required
                      placeholder="Your full name"
                      className={inputClasses(isLoggedIn)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted"
                    >
                      {CONTACT_PAGE.form.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      readOnly={isLoggedIn}
                      required
                      placeholder="you@example.com"
                      className={inputClasses(isLoggedIn)}
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted"
                  >
                    {CONTACT_PAGE.form.subjectLabel}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What is this about?"
                    className={inputClasses(false)}
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted"
                  >
                    {CONTACT_PAGE.form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    required
                    placeholder="Tell us a little more…"
                    className={`${inputClasses(false)} resize-none`}
                  ></textarea>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:shadow-xl hover:shadow-iris/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? CONTACT_PAGE.form.sending
                    : CONTACT_PAGE.form.submit}
                  {!loading && <Send size={15} aria-hidden="true" />}
                </button>

                {/* RESPONSE NOTE */}
                <p className="flex items-center justify-center gap-2 text-xs text-muted">
                  <Clock size={13} aria-hidden="true" />
                  We read every message ourselves
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
};

export default ContactPage;
