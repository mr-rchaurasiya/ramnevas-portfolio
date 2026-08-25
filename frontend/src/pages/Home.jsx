import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Hobbies from '../components/Hobbies';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import ScrollAnimate from '../components/ScrollAnimate';

const Home = () => {
  return (
    <main>
      <Hero />
      <ScrollAnimate direction="up">
        <About />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Skills />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Experience />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Education />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Projects />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Achievements />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Hobbies />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Resume />
      </ScrollAnimate>
      <ScrollAnimate direction="up">
        <Contact />
      </ScrollAnimate>
    </main>
  );
};

export default Home;

