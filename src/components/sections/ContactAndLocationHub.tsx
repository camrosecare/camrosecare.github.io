import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/daycareData';

const PROGRAM_TO_CHILD_AGE: Record<string, string> = {
  infants: 'Infant (0 – 18 mos)',
  toddlers: 'Toddler (19 mos – 3 yrs)',
  preschool: 'Preschool (3 – 4.5 yrs)',
  schoolage: 'School-Age (4.5 – 12 yrs)'
};

export const ContactAndLocationHub: React.FC<{ onOpenTour: () => void }> = ({ onOpenTour }) => {
  const [formData, setFormData] = useState({
    inquiryType: 'Tour Request',
    name: '',
    email: '',
    phone: '',
    childAge: 'Toddler (19 mos – 3 yrs)',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const formCardRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleFocusTourInquiry = (event: Event) => {
      const detail = (event as CustomEvent<{ programId?: string }>).detail;
      const mappedAge = detail?.programId ? PROGRAM_TO_CHILD_AGE[detail.programId] : undefined;

      setIsSubmitted(false);
      setFormData((prev) => ({
        ...prev,
        inquiryType: 'Tour Request',
        childAge: mappedAge || prev.childAge
      }));

      setTimeout(() => {
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          nameInputRef.current?.focus({ preventScroll: true });
        }, 380);
      }, 60);
    };

    window.addEventListener('camrose:open-tour-inquiry', handleFocusTourInquiry);
    return () => {
      window.removeEventListener('camrose:open-tour-inquiry', handleFocusTourInquiry);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneDigits = formData.phone.replace(/\D/g, '');

    if (!trimmedName) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setFormError('Please enter a valid email address (e.g. parent@example.ca).');
      return;
    }
    if (formData.phone.trim() && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
      setFormError('Please enter a valid 10-digit phone number or leave phone blank.');
      return;
    }

    setFormError(null);
    setIsSubmitted(true);
  };

  const mailtoSubject = encodeURIComponent(
    `${formData.inquiryType} — ${formData.name.trim()} (${formData.childAge})`
  );
  const mailtoBody = encodeURIComponent(
    `Hello Camrose Little Angels Team,\n\n` +
      `Inquiry Type: ${formData.inquiryType}\n` +
      `Parent Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Child's Program / Age: ${formData.childAge}\n\n` +
      `Notes:\n${formData.message || 'Interested in scheduling a tour and confirming current availability.'}\n`
  );

  return (
    <section id="contact" className="py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 tracking-tight">
            We’d Love to <span className="text-blue-600">Welcome You</span> &amp; Your Child
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Conveniently located near downtown Camrose with dedicated parent drop-off parking and secure facility entry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Location Information */}
          <div className="lg:col-span-5 space-y-4">
            {/* Location & Facility Card */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-blue-700 tracking-wider">Facility Address</span>
                  <p className="text-base font-black text-slate-950 mt-0.5">{BUSINESS_INFO.address}</p>
                  <p className="text-xs text-slate-500 font-medium">Camrose, Alberta · Easy access for hospital shift workers</p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onOpenTour}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book a Tour</span>
                </button>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider">Extended Shift Hours</span>
                  <p className="text-base font-black text-slate-950 mt-0.5">{BUSINESS_INFO.hours}</p>
                  <p className="text-xs text-slate-500 font-medium">Closed weekends &amp; Alberta statutory holidays</p>
                </div>
              </div>
            </div>

            {/* Phone & Direct Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-400 shadow-sm transition-all block group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400">Call Directly</span>
                <p className="text-sm font-black text-slate-900 mt-0.5">{BUSINESS_INFO.phone}</p>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-red-400 shadow-sm transition-all block group"
              >
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-400">Email Us</span>
                <p className="text-xs font-black text-slate-900 mt-0.5 truncate">{BUSINESS_INFO.email}</p>
              </a>
            </div>

            {/* Google Map Interactive Preview Container */}
            <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm h-48 relative bg-slate-100">
              <iframe
                title="Camrose Little Angels Daycare Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Direct Parent Contact & Tour Inquiry Form */}
          <div
            id="tour-inquiry-form"
            ref={formCardRef}
            className="lg:col-span-7 bg-white rounded-3xl border-3 border-blue-100 shadow-xl p-6 sm:p-10 scroll-mt-24"
          >
            {isSubmitted ? (
              <div className="p-4 sm:p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-black uppercase tracking-wider">
                    {formData.inquiryType} Prepared
                  </span>
                  <h3 className="text-2xl font-black text-slate-950">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                    Your <strong>{formData.inquiryType.toLowerCase()}</strong> summary for{' '}
                    <strong>{formData.childAge}</strong> is ready. Because this website does not automatically send emails from the browser, please tap below to send your prepared inquiry directly by email or call Director Syed Faran to confirm your visit time.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs text-slate-700 space-y-1 max-w-md mx-auto">
                  <p>
                    <strong className="text-slate-900">Inquiry Type:</strong> {formData.inquiryType}
                  </p>
                  <p>
                    <strong className="text-slate-900">Contact:</strong> {formData.email}
                    {formData.phone ? ` · ${formData.phone}` : ''}
                  </p>
                  <p>
                    <strong className="text-slate-900">Program / Age:</strong> {formData.childAge}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-black shadow-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-yellow-300" />
                    <span>Call {BUSINESS_INFO.phone}</span>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black shadow-sm border-2 border-yellow-300 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email {BUSINESS_INFO.email}</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-slate-500 hover:text-blue-700 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Edit or Start Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-950">Send a Message or Tour Inquiry</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Have questions about availability, infant spots, or shift hours? We’re here to help.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-800">Inquiry Type *</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all"
                  >
                    <option value="Tour Request">Tour Request</option>
                    <option value="Spot Availability Inquiry">Spot Availability Inquiry</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                {formError && (
                  <div className="px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-800">Your Full Name *</label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      required
                      maxLength={80}
                      placeholder="e.g. Jessica Miller"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formError) setFormError(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-800">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={120}
                      placeholder="e.g. jessica@example.ca"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formError) setFormError(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-800">Phone Number</label>
                    <input
                      type="tel"
                      maxLength={20}
                      placeholder="e.g. (780) 555-0199"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (formError) setFormError(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-800">Child's Program / Age</label>
                    <select
                      value={formData.childAge}
                      onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all"
                    >
                      <option value="Infant (0 – 18 mos)">Infant (0 – 18 mos)</option>
                      <option value="Toddler (19 mos – 3 yrs)">Toddler (19 mos – 3 yrs)</option>
                      <option value="Preschool (3 – 4.5 yrs)">Preschool (3 – 4.5 yrs)</option>
                      <option value="School-Age (4.5 – 12 yrs)">School-Age (4.5 – 12 yrs)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-800">Questions or Notes</label>
                  <textarea
                    rows={3}
                    maxLength={1000}
                    placeholder="Tell us about your preferred tour day/time, expected start date, or shift hours..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border-2 border-yellow-300 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{formData.inquiryType === 'Tour Request' ? 'Prepare Tour Inquiry' : 'Prepare Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
