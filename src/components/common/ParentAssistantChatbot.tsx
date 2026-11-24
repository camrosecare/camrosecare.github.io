import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircleHeart,
  X,
  Send,
  RotateCcw,
  Phone,
  Mail,
  Calendar,
  ClipboardCheck,
  Calculator,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/daycareData';
import {
  ChatAction,
  ChatActionType,
  ConversationContext,
  ResponseClassification,
  STARTER_QUESTIONS,
  StarterQuestion,
  matchParentQuestion
} from '../../data/chatbotKnowledgeBase';

interface ParentAssistantChatbotProps {
  onOpenTour: () => void;
  onOpenSubsidy: () => void;
  onOpenHandbook: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  classification?: ResponseClassification;
  topic?: string;
  sourceCitation?: string;
  highlights?: string[];
  actions?: ChatAction[];
  followUps?: StarterQuestion[];
}

const CLASSIFICATION_BADGES: Record<
  ResponseClassification,
  { label: string; style: string; icon: 'shield' | 'sparkles' }
> = {
  official: {
    label: 'Official Camrose Little Angels Policy',
    style: 'bg-blue-50 text-blue-800 border-blue-200',
    icon: 'shield'
  },
  guidance: {
    label: 'General Childcare & Parenting Guidance',
    style: 'bg-amber-50 text-amber-900 border-amber-300',
    icon: 'sparkles'
  },
  boundary: {
    label: 'Safety Boundary — Non-Medical',
    style: 'bg-rose-50 text-rose-800 border-rose-200',
    icon: 'shield'
  },
  fallback: {
    label: 'Not Listed in Parent Guide',
    style: 'bg-slate-100 text-slate-700 border-slate-300',
    icon: 'shield'
  }
};

function createWelcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    sender: 'bot',
    classification: 'official',
    topic: 'Parent FAQ & Family Conversation Assistant',
    sourceCitation: 'Parent & Registration Guide',
    text: 'Hi! Ask me about ages accepted (0–12 years), hours (Mon–Fri 6:00 AM – 6:30 PM), Alberta $10/Day & subsidies, meals, school bus pickup, registration—or chat about first-day transitions, parenting routines, and raising kids in Camrose!',
    followUps: STARTER_QUESTIONS.slice(0, 3),
    actions: [
      { label: 'Book a Tour', type: 'tour' },
      { label: 'Open Register Now', type: 'register' }
    ]
  };
}

export const ParentAssistantChatbot: React.FC<ParentAssistantChatbotProps> = ({
  onOpenTour,
  onOpenSubsidy,
  onOpenHandbook
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage()]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 120);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleActionClick = (actionType: ChatActionType) => {
    if (actionType === 'tour') {
      setIsOpen(false);
      onOpenTour();
    } else if (actionType === 'subsidy') {
      setIsOpen(false);
    } else if (actionType === 'handbook') {
      setIsOpen(false);
      onOpenHandbook();
    }
  };

  const submitQuestion = (rawText: string) => {
    const trimmed = rawText.trim().slice(0, 300);
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'user',
      text: trimmed
    };

    const reply = matchParentQuestion(trimmed, conversationContext);
    setConversationContext(reply.updatedContext);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'bot',
      classification: reply.classification,
      text: reply.answer,
      topic: reply.topic,
      sourceCitation: reply.sourceCitation,
      highlights: reply.highlights,
      actions: reply.actions,
      followUps: reply.followUps
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuestion(inputValue);
  };

  const handleReset = () => {
    setConversationContext({});
    setMessages([createWelcomeMessage()]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const renderActionButton = (action: ChatAction, idx: number) => {
    if (action.type === 'call') {
      return (
        <a
          key={`${action.type}-${idx}`}
          href={`tel:${BUSINESS_INFO.phone}`}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black transition-colors shadow-2xs"
        >
          <Phone className="w-3 h-3 shrink-0" />
          <span>{action.label}</span>
        </a>
      );
    }

    if (action.type === 'email') {
      return (
        <a
          key={`${action.type}-${idx}`}
          href={`mailto:${BUSINESS_INFO.email}`}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-[11px] font-bold transition-colors"
        >
          <Mail className="w-3 h-3 shrink-0 text-blue-700" />
          <span>{action.label}</span>
        </a>
      );
    }

    if (action.type === 'register') {
      return (
        <a
          key={`${action.type}-${idx}`}
          href={BUSINESS_INFO.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black transition-colors shadow-2xs"
        >
          <ClipboardCheck className="w-3 h-3 shrink-0" />
          <span>{action.label}</span>
        </a>
      );
    }

    const buttonConfig: Record<
      Exclude<ChatActionType, 'call' | 'email' | 'register' | 'subsidy'>,
      { icon: React.ComponentType<{ className?: string }>; style: string }
    > = {
      tour: {
        icon: Calendar,
        style: 'bg-red-600 hover:bg-red-500 text-white'
      },
      handbook: {
        icon: BookOpen,
        style: 'bg-indigo-600 hover:bg-indigo-700 text-white'
      }
    };

    if (action.type === 'subsidy') return null;

    const cfg = buttonConfig[action.type];
    const Icon = cfg.icon;

    return (
      <button
        key={`${action.type}-${idx}`}
        type="button"
        onClick={() => handleActionClick(action.type)}
        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-colors shadow-2xs cursor-pointer ${cfg.style}`}
      >
        <Icon className="w-3 h-3 shrink-0" />
        <span>{action.label}</span>
      </button>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            role="dialog"
            aria-modal="false"
            aria-label="Ask Little Angels · Care & Parent Chat"
            className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-5 sm:bottom-5 z-50 sm:w-[410px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border-3 border-blue-600 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-red-600 px-4 py-3 text-white border-b-2 border-yellow-300 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-yellow-400 text-blue-950 flex items-center justify-center shadow-sm shrink-0">
                  <MessageCircleHeart className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-yellow-300 block">
                    Camrose Little Angels
                  </span>
                  <h3 className="text-sm font-black truncate leading-tight">
                    Ask Little Angels · Care &amp; Parent Chat
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  title="Reset chat"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  title="Close assistant"
                  aria-label="Close Parent Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grounded Source Disclaimer & Active Age Context */}
            <div className="bg-amber-50 border-b border-amber-200 px-3.5 py-1.5 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-bold text-slate-700 shrink-0 flex-wrap">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Answers based on Camrose Little Angels Parent &amp; Registration Guide</span>
              </div>
              {conversationContext.childAgeMention && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-black">
                  <span>Age: {conversationContext.childAgeMention}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setConversationContext((prev) => ({
                        ...prev,
                        childAgeGroup: undefined,
                        childAgeMention: undefined
                      }))
                    }
                    className="hover:text-blue-950 cursor-pointer"
                    aria-label="Clear remembered age group"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/70">
              {messages.map((msg, msgIndex) => {
                const badge = msg.classification ? CLASSIFICATION_BADGES[msg.classification] : null;
                const isLatestBotMessage = msg.sender === 'bot' && msgIndex === messages.length - 1;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-700 text-white font-semibold rounded-br-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm space-y-2'
                      }`}
                    >
                      {msg.sender === 'bot' && badge && (
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wide ${badge.style}`}
                        >
                          {badge.icon === 'sparkles' ? (
                            <Sparkles className="w-2.5 h-2.5 shrink-0" />
                          ) : (
                            <ShieldCheck className="w-2.5 h-2.5 shrink-0" />
                          )}
                          <span>{badge.label}</span>
                        </div>
                      )}

                      {msg.sender === 'bot' && msg.topic && (
                        <div className="font-black text-[11px] text-slate-900 leading-snug">
                          {msg.topic}
                        </div>
                      )}

                      <p className="font-medium">{msg.text}</p>

                      {msg.sender === 'bot' && msg.highlights && msg.highlights.length > 0 && (
                        <ul className="space-y-1 pt-1 border-t border-slate-100">
                          {msg.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {msg.sender === 'bot' && msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.actions.map((act, idx) => renderActionButton(act, idx))}
                        </div>
                      )}

                      {msg.sender === 'bot' && msg.sourceCitation && (
                        <div className="pt-1 border-t border-slate-100 text-[10px] font-bold text-slate-400">
                          Source: {msg.sourceCitation}
                        </div>
                      )}
                    </div>

                    {/* Follow-up conversation chips below the latest bot reply */}
                    {isLatestBotMessage && msg.followUps && msg.followUps.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                        {msg.followUps.map((fup) => (
                          <button
                            key={fup.id}
                            type="button"
                            onClick={() => submitQuestion(fup.query)}
                            className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
                          >
                            {fup.label} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick-Tap Starter Questions */}
            <div className="px-3 py-2 bg-white border-t border-slate-200 shrink-0">
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => submitQuestion(q.query)}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Input Form */}
            <form
              onSubmit={handleFormSubmit}
              className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                maxLength={300}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about policies, parenting tips, Camrose..."
                aria-label="Ask a parent FAQ or childcare question"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white text-xs font-semibold text-slate-900 outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-slate-200 disabled:text-slate-400 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-Left Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-3 sm:left-5 z-50 p-1 pr-3 sm:p-1.5 sm:pr-3.5 bg-blue-700 hover:bg-blue-600 text-white rounded-full shadow-lg border-2 border-yellow-400 flex items-center gap-1.5 sm:gap-2 transition-colors cursor-pointer"
          aria-label="Open Ask Little Angels Chat"
          title="Ask Little Angels · Care & Parent Chat"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-yellow-400 text-blue-950 flex items-center justify-center shrink-0">
            <MessageCircleHeart className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-black tracking-tight whitespace-nowrap">Ask Little Angels</span>
        </button>
      )}
    </>
  );
};
