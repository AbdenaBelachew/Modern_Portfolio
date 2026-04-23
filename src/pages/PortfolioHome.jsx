import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Architecture from '../components/Architecture';
import Experience from '../components/Experience';
import Services from '../components/Services';
import Contact from '../components/Contact';

const PortfolioHome = () => {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Architecture />
      <Experience />
      <Services />
      <Contact />
    </>
  );
};

export default PortfolioHome;
