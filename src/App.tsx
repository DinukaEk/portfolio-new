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
import CurrentlyBuilding   from './components/CurrentlyBuilding';
import Contact             from './components/Contact';
import Footer              from './components/Footer';
import ProjectPage         from './pages/ProjectPage';

const techItems = [
  'React', 'TypeScript', 'Three.js', 'FastAPI', 'TensorFlow',
  'Next.js', 'MediaPipe', 'Node.js', 'WebGL', 'Docker', 'AWS', 'MongoDB',
];
const softItems = [
  'Problem Solving', 'System Design', 'AR Development', 'Machine Learning',
  'Full-Stack', 'ERP Systems', 'API Design', 'UI Engineering',
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
      {/*
        basename tells React Router where the app is mounted.
        import.meta.env.BASE_URL = '/portfolio-new/' in production (GitHub Pages)
                                 = '/'               in local dev
        This makes all <Route> paths resolve correctly in both environments.
      */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Cursor />
        <Routes>
          <Route path="/"              element={<HomePage />}    />
          <Route path="/project/:slug" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
