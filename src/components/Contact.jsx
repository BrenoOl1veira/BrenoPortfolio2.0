import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";

import { styles } from "../styles";
import { AstronautCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 800 });

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
          alert("Mensagem enviada com sucesso!");
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ops! Algo deu errado, tente novamente.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex flex-col gap-10 overflow-visible relative">
      {/* Canvas do astronauta */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className={`w-full relative z-10`}
        style={{
          height: isMobile ? "450px" : "900px",
        }}
      >
        <AstronautCanvas />
      </motion.div>

      {/* Card de contato */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 p-8 rounded-2xl relative z-20"
        style={{
          marginTop: isMobile ? "-80px" : "-100px",
        }}
      >
        <p className={styles.sectionSubText}>Entre em contato</p>
        <h3 className={styles.sectionHeadText}>Contato.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {/* Inputs */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Seu Nome</span>
            <input
              type="text"
              name="name"
              placeholder="Qual é o seu nome?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Seu e-mail</span>
            <input
              type="email"
              name="email"
              placeholder="Qual é o seu endereço de e-mail?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Sua Mensagem</span>
            <textarea
              rows={7}
              name="message"
              placeholder="O que você quer dizer?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
