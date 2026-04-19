import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider }   from './context/ThemeContext';
import ScrollToTop         from './components/ScrollToTop';
import Cursor              from './components/Cursor';
import Navbar              from './components/Navbar';
import Hero                from './components/Hero';
import Marquee             from './components/Marquee';
import About               from './components/About';
import Projects            from './components/Projects';
import Experience          from './components/Experience';
import Certifications      from './components/Certifications';
import CurrentlyBuilding   from './components/CurrentlyBuilding';
import Contact             from './components/Contact';
import Footer              from './components/Footer';
import ProjectPage         from './pages/ProjectPage';

const techItems = [
  'Python', 'TypeScript',  'JavaScript',  'React',  'Three.js',  'Tailwind CSS',
  'PHP',  'FastAPI',  'TensorFlow',  'Next.js',  'Laravel',  'MediaPipe',  'Node.js',
  'DevOps',  'Docker',  'AWS',  'Azure',  'MySQL',  'MongoDB',
];
const softItems = [
  'Problem Solving', 'Critical Thinking', 'Leadership', 'Flexibility', 'Communication', 'Team Collaboration',
  'Adaptability', 'System Design', 'AR Development', 'Machine Learning', 'Full-Stack', 'ERP Systems', 'API Design', 'UI Engineering',
];

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee items={techItems} speed={40} />
        <About />
        <Marquee items={softItems} speed={50} inverted />
        <Projects />
        <Experience />
        <Certifications />
        <CurrentlyBuilding />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Resets scroll position on every route change */}
        <ScrollToTop />
        <Cursor />
        <Routes>
          <Route path="/portfolio-new/"              element={<HomePage />}    />
          <Route path="/portfolio-new/project/:slug" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
