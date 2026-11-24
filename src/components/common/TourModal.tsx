import React, { useState } from 'react';
import { X, CheckCircle, Clock, User, Mail, Phone, Baby } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/daycareData';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: 'Toddler (19 mo – 3 yrs)',
    preferredDate: '',
    preferredTime: 'Morning (9:30 AM)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.parentName.trim()) errs.parentName = 'Parent name is required';
    if (!emailRegex.test(formData.email.trim())) errs.email = 'Valid email is required';
    if (phoneDigits.length < 10 || phoneDigits.length > 15) errs.phone = 'Valid 10-digit phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between border-b-2 border-yellow-400">
          <div>
            <span className="text-xs uppercase tracking-wider text-yellow-300 font-black">Camrose Little Angels</span>
            <h3 className="text-xl font-black font-jakarta">Schedule a Family Tour</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/15 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">Tour Request Received!</h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-slate-900">{formData.parentName}</span>! Our director will contact you at <span className="font-semibold text-slate-900">{formData.phone}</span> to confirm your tour appointment.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 text-left space-y-1">
              <p><strong className="text-slate-800">Facility:</strong> {BUSINESS_INFO.legalName}</p>
              <p><strong className="text-slate-800">Location:</strong> {BUSINESS_INFO.address}</p>
              <p><strong className="text-slate-800">Direct Phone:</strong> {BUSINESS_INFO.phone}</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-500">
              Come meet our certified educators, explore our playrooms and outdoor discovery grounds, and learn about Alberta Affordability Grants.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  maxLength={80}
                  placeholder="e.g. Jennifer Smith"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.parentName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                />
              </div>
              {errors.parentName && <p className="text-xs text-rose-600 mt-1">{errors.parentName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    maxLength={20}
                    placeholder="(780) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    maxLength={120}
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-700`}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Child's Age Group</label>
                <div className="relative">
                  <Baby className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option value="Infant (0 – 18 mo)">Infant (0 – 18 mo)</option>
                    <option value="Toddler (19 mo – 3 yrs)">Toddler (19 mo – 3 yrs)</option>
                    <option value="Preschool (3 – 4.5 yrs)">Preschool (3 – 4.5 yrs)</option>
                    <option value="School-Age (4.5 – 12 yrs)">Kindergarten & Out-of-School</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time of Day</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option value="Morning (9:30 AM)">Morning (9:30 AM)</option>
                    <option value="Mid-day (1:30 PM)">Mid-day (1:30 PM)</option>
                    <option value="Late Afternoon (4:30 PM)">Late Afternoon (4:30 PM)</option>
                    <option value="Flexible / Callback">Flexible / Request Callback</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Questions or Specific Needs (Optional)</label>
              <textarea
                rows={2}
                maxLength={1000}
                placeholder="Expected start date, allergies, questions about Alberta subsidy..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg border-2 border-yellow-300 active:scale-95"
              >
                Request In-Person Tour
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Or call us directly at <span className="text-slate-800 font-bold">{BUSINESS_INFO.phone}</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
