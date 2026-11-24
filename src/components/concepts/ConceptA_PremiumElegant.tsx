import React, { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Download
} from 'lucide-react';
import { BUSINESS_INFO, DAYCARE_PROGRAMS, TESTIMONIALS } from '../../data/daycareData';
import { RealisticBabyHero } from '../common/RealisticBabyHero';
import { RollingPosterGallery } from '../gallery/RollingPosterGallery';
import { AnimatedLittleAngelsLogo } from '../common/AnimatedLittleAngelsLogo';
const ParentHandbookModal = lazy(() =>
  import('../philosophy/ParentHandbookModal').then((m) => ({
    default: m.ParentHandbookModal
  }))
);
import { DailyLifeAndNutrition } from '../sections/DailyLifeAndNutrition';
import { ParentResourcesHub } from '../sections/ParentResourcesHub';
import { InteractiveFaqSection } from '../sections/InteractiveFaqSection';
import { ContactAndLocationHub } from '../sections/ContactAndLocationHub';
import { WhyChooseLittleAngelsCarousel } from '../sections/WhyChooseLittleAngelsCarousel';

interface ConceptProps {
  onOpenTour: (programId?: string) => void;
  onOpenSubsidy: () => void;
  onOpenExport?: () => void;
}

export const ConceptA_PremiumElegant: React.FC<ConceptProps> = ({ onOpenTour, onOpenSubsidy, onOpenExport }) => {
  const [activeProgramTab, setActiveProgramTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHandbookModalOpen, setIsHandbookModalOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'Philosophy & Society' },
    { href: '#programs', label: 'Programs (0–12y)' },
    { href: '#gallery', label: '3D Art Carousel' },
    { href: '#daily-life', label: 'Daily Life & Food' },
    { href: '#features', label: 'Why Choose Us' },
    { href: '#resources', label: 'Parent Resources' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Location & Hours' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-outfit selection:bg-yellow-300 selection:text-blue-950 overflow-x-hidden">
      {/* Primary Color Top Welcome Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-red-600 text-white text-xs py-2 sm:py-2.5 px-3 sm:px-4 shadow-sm border-b-2 border-yellow-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-yellow-300 shrink-0"></span>
            <span>Camrose Little Angels Daycare Society</span>
            <span className="text-white/60 hidden sm:inline">·</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-black text-yellow-200">
              Alberta $10/Day Childcare Partner
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-semibold">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/95">
              <Clock className="w-3.5 h-3.5 text-yellow-300" />
              <span>Mon–Fri: 6:00 AM – 6:30 PM</span>
            </span>
            {onOpenExport ? (
              <button
                onClick={onOpenExport}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                title="Export HTML code, download offline package, or copy code for auditor"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export / Download Hub</span>
              </button>
            ) : (
              <a
                href="/camrose_care_concept_a_audit_package.zip"
                download="camrose_care_concept_a_audit_package.zip"
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs transition-transform active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Package</span>
              </a>
            )}
            <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-yellow-300 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-yellow-300" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation - Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
          {/* Zone 1: Animated Little Angels Logo with Motion, Glitter & Welcome Voice */}
          <div className="shrink-0">
            <AnimatedLittleAngelsLogo size="md" showSoundButton={true} />
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 text-xs font-bold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenTour()}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-full transition-all shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5 border-2 border-yellow-300 cursor-pointer"
            >
              <span>Book a Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-white border-b-2 border-slate-200 px-6 py-4 space-y-3"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-bold text-slate-700 hover:text-blue-600 py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSubsidy();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-50 text-blue-800 text-xs font-black text-center"
                >
                  Estimate Subsidy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-5 pb-12 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-amber-50/40">
        {/* Calm Static Ambient Highlights */}
        <div className="absolute top-10 left-10 w-56 h-56 bg-yellow-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Preserved Feature 1: Realistic Cutout Baby with Authentic Voice & Natural Overlap */}
          <div>
            <RealisticBabyHero
              onOpenTour={() => onOpenTour()}
            />
          </div>
        </div>
      </section>

      {/* Children's Creative Exhibition: Cartoon Billboard, 3D Rolling Poster Gallery & Integrated Our Philosophy Playground */}
      <RollingPosterGallery
        includePhilosophy
        onOpenTour={onOpenTour}
        onOpenSubsidy={onOpenSubsidy}
      />

      {/* Programs Section with Animated Tabs */}
      <section id="programs" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
              Programs Tailored for <span className="text-blue-600">Every Age (0–12 Years)</span>
            </h2>
          </div>

          {/* Animated Tabs in Primary Colors */}
          <div className="flex justify-start sm:justify-center mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-full border-2 border-slate-200 gap-1">
              {DAYCARE_PROGRAMS.map((prog, idx) => (
                <motion.button
                  key={prog.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveProgramTab(idx)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
                    activeProgramTab === idx
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {prog.title.replace(' Program', '').replace(' Studio', '')}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Program Animated Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgramTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl border-3 border-blue-100 shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-slate-600">
                    <span className="px-3.5 py-1 bg-yellow-400 text-slate-950 rounded-full text-xs font-black">
                      Ages: {DAYCARE_PROGRAMS[activeProgramTab].ageRange}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span>{DAYCARE_PROGRAMS[activeProgramTab].ratio}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {DAYCARE_PROGRAMS[activeProgramTab].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {DAYCARE_PROGRAMS[activeProgramTab].description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-800">Room Highlights:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DAYCARE_PROGRAMS[activeProgramTab].highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onOpenTour(DAYCARE_PROGRAMS[activeProgramTab].id)}
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 border-2 border-yellow-300 cursor-pointer"
                    >
                      <span>Book a Tour</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    <span className="text-xs font-bold text-slate-500">
                      {DAYCARE_PROGRAMS[activeProgramTab].schedule}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full min-h-[340px] relative">
                  <img
                    src={DAYCARE_PROGRAMS[activeProgramTab].image}
                    alt={DAYCARE_PROGRAMS[activeProgramTab].title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* NEW SECTION: Daily Life, Scratch-Cooked Nutrition & Transportation Coordination */}
      <DailyLifeAndNutrition onOpenTour={() => onOpenTour()} />

      {/* Why Choose Us - Compact Swipeable Card Carousel */}
      <WhyChooseLittleAngelsCarousel />

      {/* NEW SECTION: Parent Resources & Tool Center */}
      <ParentResourcesHub
        onOpenHandbook={() => setIsHandbookModalOpen(true)}
        onOpenSubsidy={onOpenSubsidy}
        onOpenTour={() => onOpenTour()}
      />

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 tracking-tight">
              Words from Local <span className="text-red-600">Camrose Families</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Read authentic feedback from working healthcare professionals, educators, and local parents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-b from-white to-blue-50/30 p-8 rounded-3xl border-2 border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400 text-sm">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-black text-xs text-slate-950">{t.author}</p>
                    <p className="text-[11px] text-slate-500 font-bold">{t.relation} · {t.location}</p>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                    {t.program.replace(' Studio', '')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Searchable Interactive FAQs */}
      <InteractiveFaqSection onOpenTour={() => onOpenTour()} />

      {/* Affordability Banner in Royal Blue with Cherry Red Button */}
      <section id="affordability" className="py-20 bg-blue-700 text-white relative overflow-hidden border-t-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black leading-tight text-white">
              Affordable, High-Quality Care for Every Family in Camrose.
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto font-medium">
              Spaces fill quickly. Book your in-person visit to meet the educators, explore our playrooms, and verify your provincial grant savings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenTour()}
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-full font-black text-sm transition-all shadow-xl border-2 border-yellow-300 cursor-pointer"
              >
                Book a Tour
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenSubsidy}
                className="w-full sm:w-auto px-7 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-full font-black text-sm transition-all shadow-md cursor-pointer"
              >
                Estimate Subsidy
              </motion.button>
            </div>

            <div className="pt-8 text-xs text-blue-100/90 flex flex-wrap justify-center items-center gap-4 sm:gap-6 font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-yellow-300" />
                {BUSINESS_INFO.address}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-yellow-300" />
                {BUSINESS_INFO.phone}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-yellow-300" />
                {BUSINESS_INFO.email}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Location, Map & Direct Contact Form Hub */}
      <ContactAndLocationHub onOpenTour={() => onOpenTour()} />

      {/* Modern Upgraded Daycare Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-14 pb-24 sm:py-16 text-xs border-t-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {/* Branding Column */}
            <div className="space-y-4">
              <AnimatedLittleAngelsLogo size="sm" showSoundButton={false} />
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {BUSINESS_INFO.legalName} is a licensed non-profit early childhood society serving families across Camrose with play-based care, hot cooked meals, and shift-friendly hours.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Alberta $10/Day Partner</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Explore Care</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#about" className="hover:text-yellow-400 transition-colors">Philosophy & Society</a></li>
                <li><a href="#programs" className="hover:text-yellow-400 transition-colors">Infants to School-Age</a></li>
                <li><a href="#gallery" className="hover:text-yellow-400 transition-colors">3D Artwork Carousel</a></li>
                <li><a href="#daily-life" className="hover:text-yellow-400 transition-colors">Daily Routines & Food Menu</a></li>
                <li><a href="#features" className="hover:text-yellow-400 transition-colors">Why Choose Us</a></li>
                <li><a href="#resources" className="hover:text-yellow-400 transition-colors">Parent Resource Guides</a></li>
                <li><a href="#faqs" className="hover:text-yellow-400 transition-colors">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Operating Hours Column */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Operating Schedule</h4>
              <p className="text-xs text-slate-300 font-bold">{BUSINESS_INFO.hours}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Early drop-off starting at 6:00 AM specifically accommodates hospital healthcare shifts and working parents in Camrose.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsHandbookModalOpen(true)}
                  className="text-xs text-yellow-400 hover:text-yellow-300 font-bold underline decoration-dotted"
                >
                  View Parent Handbook Policies →
                </button>
              </div>
            </div>

            {/* Contact Column */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Connect With Us</h4>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>{BUSINESS_INFO.address}</span>
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>{BUSINESS_INFO.phone}</span>
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </p>
              <div className="pt-3">
                <button
                  onClick={() => onOpenTour()}
                  className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md border border-yellow-300 cursor-pointer"
                >
                  Book a Tour
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Licensed Child Care</span>
              <span>·</span>
              <span>Alberta Approved</span>
              <span>·</span>
              <span>Non-Profit Society</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Parent Handbook Modal */}
      {isHandbookModalOpen && (
        <Suspense fallback={null}>
          <ParentHandbookModal
            isOpen={isHandbookModalOpen}
            onClose={() => setIsHandbookModalOpen(false)}
            onOpenTour={() => onOpenTour()}
            onOpenSubsidy={onOpenSubsidy}
          />
        </Suspense>
      )}
    </div>
  );
};
