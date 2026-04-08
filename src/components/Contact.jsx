import React, { lazy, Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useElementVisibility, useEnhancedGraphics } from "../utils/performance";
import { useLanguage } from "../i18n/LanguageProvider";

const AstronautCanvas = lazy(() => import("./canvas/Astronaut"));

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 800 });
  const enhancedGraphics = useEnhancedGraphics();
  const { t } = useLanguage();
  const sceneRef = useRef(null);
  const shouldRenderAstronaut = useElementVisibility(sceneRef, {
    rootMargin: "220px 0px",
    threshold: 0.05,
  });
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
      const subject = encodeURIComponent(`${t.contact.subjectPrefix} ${name}`);
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
        alert(t.contact.success);
        formRef.current.reset();
      },
      (error) => {
        setLoading(false);
        console.error(error);
        alert(t.contact.error);
      }
    );
  };

  return (
    <div className="xl:mt-12 flex flex-col gap-10 overflow-visible relative">
      <motion.div
        ref={sceneRef}
        variants={slideIn("right", "tween", 0.2, 1)}
        className="w-full relative z-10 overflow-hidden rounded-[28px] border border-white/5 bg-gradient-to-b from-[#0f172a] to-[#050816]"
        style={{
          height: isMobile ? "340px" : enhancedGraphics ? "560px" : "460px",
        }}
      >
        {shouldRenderAstronaut ? (
          <Suspense fallback={null}>
            <AstronautCanvas />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="max-w-xl text-sm leading-7 text-secondary sm:text-base">
              {t.contact.banner}
            </p>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 p-8 rounded-2xl relative z-20"
        style={{
          marginTop: isMobile ? "-60px" : "-90px",
        }}
      >
        <p className={styles.sectionSubText}>{t.contact.subtitle}</p>
        <h3 className={styles.sectionHeadText}>{t.contact.title}</h3>

        {emailConfigMissing && (
          <p className="mt-4 text-sm leading-6 text-secondary">
            {t.contact.helper}
          </p>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">{t.contact.name}</span>
            <input
              type="text"
              name="name"
              placeholder={t.contact.namePlaceholder}
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">{t.contact.email}</span>
            <input
              type="email"
              name="email"
              placeholder={t.contact.emailPlaceholder}
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">{t.contact.message}</span>
            <textarea
              rows={7}
              name="message"
              placeholder={t.contact.messagePlaceholder}
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? t.contact.sending : emailConfigMissing ? t.contact.openEmail : t.contact.send}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
