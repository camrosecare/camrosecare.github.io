import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface CategorizedFAQ {
  question: string;
  answer: string;
  category: 'subsidy' | 'hours' | 'meals' | 'safety' | 'enrollment';
}

const EXTENDED_FAQS: CategorizedFAQ[] = [
  {
    question: 'How do the Alberta Child Care Affordability Grants & Subsidies work here?',
    answer:
      'Camrose Little Angels Daycare is an approved facility under the Canada-Alberta Canada-Wide Early Learning and Child Care agreement. All families with children 0 to kindergarten age automatically receive provincial affordability grant fee reductions applied directly to their monthly invoices. Families with household incomes under $180,000 may also qualify for additional provincial subsidies.',
    category: 'subsidy'
  },
  {
    question: 'What are your exact daily operating hours for shift workers?',
    answer:
      'We are open Monday through Friday from 6:00 AM to 6:30 PM. We deliberately designed these extended hours to support healthcare professionals at St. Mary’s Hospital, agricultural workers, and community shift schedules in Camrose.',
    category: 'hours'
  },
  {
    question: 'Are nutritious cooked meals and healthy snacks provided?',
    answer:
      'Yes, absolutely! We serve freshly prepared morning snacks at 8:30 AM, hot nutritious cooked lunches at 11:30 AM, and afternoon snacks at 3:00 PM. All menus follow Canada’s Food Guide. We are 100% nut-aware and accommodate dairy, gluten, and egg allergies.',
    category: 'meals'
  },
  {
    question: 'How do you ensure child safety, security, and cleanliness?',
    answer:
      'Our daycare features keycode-secured access doors, strict photo ID sign-out authorization, fenced outdoor play areas, and commercial-grade daily sanitization. All educators are certified in Standard Child Care First Aid and CPR-C with clean vulnerable sector police checks.',
    category: 'safety'
  },
  {
    question: 'How do I book an in-person facility tour or register my child?',
    answer:
      'You can easily book a tour through our website by clicking the "Book a Tour" button or calling us directly at (780) 678-0701. Tours typically take 25–30 minutes and allow you to see the classrooms, meet the educators, and review paperwork.',
    category: 'enrollment'
  },
  {
    question: 'What is the educator-to-child ratio in each room?',
    answer:
      'We strictly maintain and often exceed Alberta licensing standards: Infants (0–18 mos) are 1:3 or 1:4; Toddlers (19 mos–3 yrs) are 1:6; Preschoolers (3–4.5 yrs) are 1:8; and School-age children are 1:10 to 1:15.',
    category: 'enrollment'
  },
  {
    question: 'Do you offer school bus transportation to and from local schools?',
    answer:
      'Yes! Camrose Little Angels has its own school bus and offers transportation as an optional add-on for $50/month between all schools inside Camrose and the daycare for kindergarten and out-of-school care students.',
    category: 'hours'
  }
];

export const InteractiveFaqSection: React.FC<{ onOpenTour: () => void }> = ({ onOpenTour }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    return EXTENDED_FAQS.filter((faq) => {
      return activeCategory === 'all' || faq.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <section id="faqs" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 tracking-tight">
            Frequently Asked <span className="text-red-600">Parent Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
            Everything you need to know about Alberta child care grants, daily hours, meals, and enrollment.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'subsidy', label: 'Alberta $10/Day & Subsidy' },
              { id: 'hours', label: '6:00 AM – 6:30 PM Hours' },
              { id: 'meals', label: 'Nutritious Meals' },
              { id: 'safety', label: 'Safety & Ratios' },
              { id: 'enrollment', label: 'Enrollment & Tours' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-200">
              <p className="text-sm font-bold text-slate-500">No questions found in this category.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                }}
                className="mt-2 text-xs text-blue-600 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${
                    isOpen ? 'border-blue-500 bg-blue-50/20 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  >
                    <span className="font-black text-sm sm:text-base text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100/80 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Tour Help Box */}
        <div className="mt-10 p-5 bg-yellow-50 rounded-2xl border-2 border-yellow-200 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h4 className="font-black text-xs sm:text-sm text-slate-900">Have a specific question about your child?</h4>
            <p className="text-xs text-slate-600">Our program supervisor is happy to answer all questions during a private tour.</p>
          </div>
          <button
            onClick={onOpenTour}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 border-2 border-yellow-300 cursor-pointer"
          >
            Book a Tour
          </button>
        </div>
      </div>
    </section>
  );
};
