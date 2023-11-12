import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from 'react-responsive';

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 600 });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de envio pode ser adicionada aqui se necessário
    // ...

    // Submit do formulário usando o FormSubmit
    formRef.current.submit();
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Entre em contato</p>
        <h3 className={styles.sectionHeadText}>Contato.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
          action="https://formsubmit.co/brenojuandeoliveirapinto@gmail.com"
          method="POST"
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Seu Nome</span>
            <input
              type='text'
              name='name'
              placeholder="Qual é o seu nome?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Seu e-mail</span>
            <input
              type='email'
              name='email'
              placeholder="Qual é o seu endereço de e-mail?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Sua Mensagem</span>
            <textarea
              rows={7}
              name='message'
              placeholder='O que você quer dizer?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </motion.div>

      {!isMobile && (
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className={`xl:flex-1 xl:h-auto md:h-[550px] h-[350px]`}
        >
          <EarthCanvas />
        </motion.div>
      )}
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
