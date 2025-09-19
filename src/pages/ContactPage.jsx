import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  UserIcon,
  AtSymbolIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Your name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Please add a subject";
    if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters";
    return e;
  }, [form]);

  const hasError = (field) => touched[field] && errors[field];

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length) return;
    setSending(true);
    // Simulate sending; integrate EmailJS or backend later
    setTimeout(() => {
      setSending(false);
      setForm(initialForm);
      Swal.fire({
        title: "Message sent!",
        text: "We will get back to you within 24 hours.",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    }, 900);
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            Contact Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            We’re here to help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Questions about our summaries, exam prep, or academic help? Send us
            a message and we’ll respond promptly.
          </motion.p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Get in touch
            </h2>
            <p className="text-gray-600 mb-6">
              Reach us through any of the channels below.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a
                    href="mailto:hello@orthochronicles.com"
                    className="font-medium text-gray-800 hover:text-green-600"
                  >
                    hello@orthochronicles.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <a
                    href="tel:+1234567890"
                    className="font-medium text-gray-800 hover:text-green-600"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium text-gray-800">
                    OrthoChronicles, India
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="h-48 w-full rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-green-700 text-sm">
                Map Placeholder
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-600">Your name</label>
                  <div className="relative mt-1">
                    <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      onBlur={() => setTouched({ ...touched, name: true })}
                      placeholder=" Student Name"
                      className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                        hasError("name") ? "border-red-300" : "border-gray-200"
                      } bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                  {hasError("name") && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <div className="relative mt-1">
                    <AtSymbolIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      onBlur={() => setTouched({ ...touched, email: true })}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                        hasError("email") ? "border-red-300" : "border-gray-200"
                      } bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                  {hasError("email") && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm text-gray-600">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  onBlur={() => setTouched({ ...touched, subject: true })}
                  placeholder="How can we help?"
                  className={`w-full mt-1 px-3 py-3 rounded-xl border ${
                    hasError("subject") ? "border-red-300" : "border-gray-200"
                  } bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {hasError("subject") && (
                  <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="mt-5">
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onBlur={() => setTouched({ ...touched, message: true })}
                  placeholder="Write your message..."
                  className={`w-full mt-1 px-3 py-3 rounded-xl border ${
                    hasError("message") ? "border-red-300" : "border-gray-200"
                  } bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {hasError("message") && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  We usually reply within 24 hours.
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium disabled:opacity-70"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  {sending ? "Sending…" : "Send message"}
                </motion.button>
              </div>
            </form>

            {/* FAQs */}
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Frequently asked
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "How fast will I get a response?",
                    a: "We aim to respond within one business day.",
                  },
                  {
                    q: "Can you help with exam prep plans?",
                    a: "Yes, share your target timeline and we’ll suggest a plan.",
                  },
                  {
                    q: "Do you offer student discounts?",
                    a: "We run seasonal offers—ask us for current deals.",
                  },
                ].map((item, idx) => (
                  <Disclosure key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Disclosure({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl bg-white">
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-medium text-gray-800">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            open ? "rotate-90" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 text-gray-600"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
