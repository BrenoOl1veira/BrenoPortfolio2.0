import React, { lazy, Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useEnhancedGraphics } from "../utils/performance";

const AstronautCanvas = lazy(() => import("./canvas/Astronaut"));

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 800 });
  const enhancedGraphics = useEnhancedGraphics();
  const emailConfigMissing = [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].some((value) =>
    value.startsWith("YOUR_")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailConfigMissing) {
      const formData = new FormData(formRef.current);
      const name = formData.get("name") || "Hello";
      const email = formData.get("email") || "";
      const message = formData.get("message") || "";
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:brenooliveira.dev@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    setLoading(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setLoading(false);
        alert("Message sent successfully!");
        formRef.current.reset();
      },
      (error) => {
        setLoading(false);
        console.error(error);
        alert("Oops! Something went wrong, please try again.");
      }
    );
  };

  return (
    <div className="xl:mt-12 flex flex-col gap-10 overflow-visible relative">
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="w-full relative z-10 overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-b from-[#0f172a] to-[#050816]"
        style={{
          height: enhancedGraphics ? (isMobile ? "340px" : "560px") : "180px",
        }}
      >
        {enhancedGraphics ? (
          <Suspense fallback={null}>
            <AstronautCanvas />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="max-w-xl text-sm leading-7 text-secondary sm:text-base">
              Let&apos;s connect to talk about automation, data projects and product ideas.
            </p>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 p-8 rounded-2xl relative z-20"
        style={{
          marginTop: enhancedGraphics ? (isMobile ? "-60px" : "-90px") : "0px",
        }}
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {emailConfigMissing && (
          <p className="mt-4 text-sm leading-6 text-secondary">
            The email service is not configured yet. The form will open your
            default email app with the message ready to send.
          </p>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="What's your name?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="What's your email address?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              placeholder="What do you want to say?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : emailConfigMissing ? "Open Email App" : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
