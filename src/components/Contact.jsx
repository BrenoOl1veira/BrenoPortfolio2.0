import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

import { styles } from "../styles";
import { AstronautCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

/**
 * Componente Contact
 * ----------------------------------------
 * Renderiza a seção de contato com:
 * - Canvas animado do astronauta
 * - Formulário de contato funcional via EmailJS
 * - Responsividade para desktop e mobile
 */
const Contact = () => {
  const formRef = useRef();               // Referência ao formulário
  const [loading, setLoading] = useState(false);  // Estado de envio
  const isMobile = useMediaQuery({ maxWidth: 800 }); // Detecta se é mobile

  /**
   * handleSubmit
   * ----------------------------------------
   * Envia os dados do formulário via EmailJS
   * - Previne reload da página
   * - Mostra loading enquanto envia
   * - Exibe alert de sucesso ou erro
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
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
      
      {/* ==================== Canvas do astronauta ==================== */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className={`w-full relative z-10`}
        style={{
          height: isMobile ? "450px" : "900px", // Altura responsiva
        }}
      >
        <AstronautCanvas />
      </motion.div>

      {/* ==================== Card de contato ==================== */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 p-8 rounded-2xl relative z-20"
        style={{
          marginTop: isMobile ? "-80px" : "-100px", // Posicionamento sobreposto ao canvas
        }}
      >
        {/* Cabeçalho da seção */}
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/* ==================== Formulário ==================== */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {/* Input: Nome */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {/* Input: Email */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="What's your email address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {/* Input: Mensagem */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {/* Botão de envio */}
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// Exporta o componente com SectionWrapper para layout e animações padrão de seção
export default SectionWrapper(Contact, "contact");
