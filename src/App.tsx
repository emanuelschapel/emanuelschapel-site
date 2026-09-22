import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AvailabilityBar } from './components/layout/AvailabilityBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileCallBar from './components/layout/MobileCallBar';
import Home from './pages/Home';
import ImmediateNeed from './pages/ImmediateNeed';
import Services from './pages/Services';
import Obituaries from './pages/Obituaries';
import Tribute from './pages/Tribute';
import PlanningAhead from './pages/PlanningAhead';
import PricingPackages from './pages/PricingPackages';
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

/**
 * Scroll to the top on route change — unless the URL carries a hash, in which case scroll
 * to that element instead. Previously this fired unconditionally, which is why every
 * "Learn More" link (/services#burial etc.) landed at the top of the Services page.
 *
 * The target is looked up after paint, since the destination page has only just rendered.
 * Each anchored section sets `scroll-mt-*` so it clears the sticky availability bar + header.
 *
 * Keyed on the navigation (`key`) rather than the URL, so two links to the same anchor —
 * "Choose Silver" then "Ask about Gold", both → #pricing-form — each scroll to it.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start' });
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollManager />
      {/* Bar + header stick as one block, so the 24/7 phone number never scrolls away.
          Their combined height (~7rem) is what the home hero subtracts from the viewport. */}
      <div className="sticky top-0 z-40">
        <AvailabilityBar />
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/immediate-need" element={<ImmediateNeed />} />
        <Route path="/services" element={<Services />} />
        <Route path="/obituaries" element={<Obituaries />} />
        <Route path="/obituaries/:slug" element={<Tribute />} />
        <Route path="/planning-ahead" element={<PlanningAhead />} />
        <Route path="/pricing" element={<PricingPackages />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <MobileCallBar />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
