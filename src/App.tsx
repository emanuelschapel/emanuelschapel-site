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
import PlanningAhead from './pages/PlanningAhead';
import PricingPackages from './pages/PricingPackages';
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
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
