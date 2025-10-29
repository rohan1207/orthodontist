import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  BuildingOffice2Icon,
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

    const messageBody = `
*New Contact Form Submission*
-----------------------------
*Name:* ${form.name}
*Email:* ${form.email}
*Subject:* ${form.subject}
*Message:*
${form.message}
-----------------------------
    `.trim();

    const encodedMessage = encodeURIComponent(messageBody);
    // WhatsApp wa.me requires only digits (no '+' or spaces)
    const phoneNumber = "918884886275";
    const sanitizedPhone = phoneNumber.replace(/[^0-9]/g, "");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Build platform-specific URLs
    const appUrl = `whatsapp://send?phone=${sanitizedPhone}&text=${encodedMessage}`; // iOS/Android app
    const webUrl = `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`; // Universal web fallback
    const desktopUrl = `https://web.whatsapp.com/send?phone=${sanitizedPhone}&text=${encodedMessage}`; // Desktop web

    if (isMobile) {
      // Try to open the native app first; if it fails, fallback to web after a short delay
      window.location.href = appUrl;
      setTimeout(() => {
        // If app didn't open, navigate to web URL
        try {
          if (!document.hidden) {
            window.location.href = webUrl;
          }
        } catch (_) {
          window.location.href = webUrl;
        }
      }, 1200);
    } else {
      // Desktop: open Web WhatsApp in a new tab
      window.open(desktopUrl, "_blank", "noopener");
    }

    setTimeout(() => {
      setSending(false);
      setForm(initialForm);
      setTouched({});
      Swal.fire({
        title: "Redirecting to WhatsApp",
        text: "Your message is ready to be sent. Please confirm in WhatsApp.",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });
    }, 500);
  }

  const InfoCard = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
      <div className="bg-[#DCE6D5] p-3 rounded-full">
        {React.createElement(icon, { className: "w-6 h-6 text-[#006D5B]" })}
      </div>
      <div>
        <h3 className="font-semibold text-[#4B4B4B]">{title}</h3>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-[#F9F9F9] mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DCE6D5] text-[#006D5B] text-sm font-bold mb-4"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            GET IN TOUCH
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#005c4d] mb-4"
          >
            Contact Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-[#4B4B4B] max-w-3xl mx-auto"
          >
            Have a question, a suggestion, or need academic support? We're here
            to help. Fill out the form below, and a member of our team will get
            back to you.
          </motion.p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#005c4d] mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <InfoCard icon={EnvelopeIcon} title="Email Us">
                <a
                  href="mailto:orthochronicles@gmail.com"
                  className="hover:text-[#006D5B] transition-colors"
                >
                  orthochronicles@gmail.com
                </a>
              </InfoCard>
              <InfoCard icon={PhoneIcon} title="Call Us">
                <a
                  href="tel:+1234567890"
                  className="hover:text-[#006D5B] transition-colors"
                >
                  +918884886275
                </a>
              </InfoCard>
              {/* <InfoCard icon={BuildingOffice2Icon} title="Our Office">
                OrthoChronicles, Pune, India
              </InfoCard> */}
            </div>

            {/* <div className="mt-8 pt-8 border-t border-gray-200/80">
              <h3 className="text-lg font-semibold text-[#4B4B4B] mb-4">
                Office Hours
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">Monday - Friday:</span> 9am -
                  6pm
                </li>
                <li>
                  <span className="font-medium">Saturday:</span> 10am - 4pm
                </li>
                <li>
                  <span className="font-medium">Sunday:</span> Closed
                </li>
              </ul>
            </div> */}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Your Name"
                  name="name"
                  type="text"
                  form={form}
                  setForm={setForm}
                  touched={touched}
                  setTouched={setTouched}
                  errors={errors}
                />
                <InputField
                  label="Your Email"
                  name="email"
                  type="email"
                  form={form}
                  setForm={setForm}
                  touched={touched}
                  setTouched={setTouched}
                  errors={errors}
                />
              </div>

              <div className="mt-6">
                <InputField
                  label="Subject"
                  name="subject"
                  type="text"
                  form={form}
                  setForm={setForm}
                  touched={touched}
                  setTouched={setTouched}
                  errors={errors}
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#4B4B4B] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onBlur={() => setTouched({ ...touched, message: true })}
                  placeholder="Please describe your question in detail..."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    hasError("message") ? "border-red-400" : "border-gray-300"
                  } bg-white text-[#4B4B4B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006D5B] transition-all`}
                />
                {hasError("message") && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="mt-8 flex items-center justify-end">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  type="submit"
                  className="inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-[#006D5B] text-white font-semibold disabled:opacity-70 hover:bg-[#005c4d] transition-colors shadow-md hover:shadow-lg"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  {sending ? "Sending…" : "Send Message"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-[#005c4d] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How fast will I get a response?",
                a: "We are committed to timely communication. You can expect a response from our team within one business day.",
              },
              {
                q: "Can you help with creating a personalized exam preparation plan?",
                a: "Absolutely. Share your target exam date and current progress, and our academic advisors will help you craft a tailored study plan.",
              },
              {
                q: "Where to get answers of question papers?",
                a: "Contact us.",
              },
            ].map((item, idx) => (
              <Disclosure key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const InputField = ({
  label,
  name,
  type,
  form,
  setForm,
  touched,
  setTouched,
  errors,
}) => {
  const hasError = touched[name] && errors[name];
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#4B4B4B] mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        onBlur={() => setTouched({ ...touched, [name]: true })}
        placeholder={label}
        className={`w-full px-4 py-3 rounded-lg border ${
          hasError ? "border-red-400" : "border-gray-300"
        } bg-white text-[#4B4B4B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006D5B] transition-all`}
      />
      {hasError && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  );
};

function Disclosure({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200/80 rounded-xl bg-white shadow-sm">
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-semibold text-lg text-[#4B4B4B]">{question}</span>
        <motion.div animate={{ rotate: open ? 90 : 0 }}>
          <UserIcon className="w-5 h-5 text-[#006D5B]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
