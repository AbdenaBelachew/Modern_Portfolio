import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Impact from '@/components/Impact';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileDock from '@/components/MobileDock';
import Toaster from '@/components/Toaster';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Impact />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
      <Toaster />
    </>
  );
}
