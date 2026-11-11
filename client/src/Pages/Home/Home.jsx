import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import UserLayout from '../../Layouts/UserLayout';
import ScrollToTop from '../../Components/ScrollToTop';

import HeroSection from './components/HeroSection';
import FunFact from './components/FunFact';
import WhyChooseUs from './components/WhyChooseUs';
import Courses from './components/Courses';
import Projects from './components/Projects';
import CertificateSection from './components/CertificateSection';
import Mentors from './components/Mentors';
import InternshipPath from './components/InternshipPath';
import Gallery from './components/Gallery';
import TestimonialSection from './components/Testmonial';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';

const Home = () => {

  const navigate = useNavigate();

  /* ================= SCROLL FIX ================= */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================= REFERRAL + COURSE REDIRECT ================= */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const ref = params.get("ref");
    const course = params.get("course");

    // ✅ Save referral
    if (ref) {
      localStorage.setItem("referralCode", ref);
    }

    // 🔥 Redirect to course page
    if (course) {
      navigate(`/course-info/${course}`);
    }
  }, [navigate]);

  return (
    <UserLayout>
      <main className="main-wrapper overflow-x-hidden bg-canvas">

        <HeroSection />
        <FunFact />
        <WhyChooseUs />
        <Courses />
        <Projects />
        <CertificateSection />
        <Mentors />
        <InternshipPath />
        <Gallery />
        <TestimonialSection />
        <FAQ />
        <FinalCTA />
        <ScrollToTop />

      </main>
    </UserLayout>
  );
};

export default Home;
