import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { SectionWrapper } from "../hoc";
import { useLanguage } from "../i18n/LanguageProvider";
import { hasEmailJsConfiguration, portfolioConfig } from "../config/portfolio";
import SectionHeading from "./SectionHeading";

/**
 * Formulario de contato. Com EmailJS configurado, envia a mensagem pelo servico;
 * sem configuracao, abre o aplicativo de e-mail com a mensagem preenchida.
 */
const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  // "success" | "error" | "" — mostrado abaixo do botao em vez de um alert.
  const [result, setResult] = useState("");
  const { t } = useLanguage();
  const emailConfigMissing = !hasEmailJsConfiguration;

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult("");

    // O rascunho mailto mantem um caminho de contato funcional em ambientes de
    // teste ou publicacoes onde os identificadores publicos do EmailJS nao existem.
    if (emailConfigMissing) {
      const formData = new FormData(formRef.current);
      const name = formData.get("name") || "Hello";
      const email = formData.get("email") || "";
      const message = formData.get("message") || "";
      const subject = encodeURIComponent(`${t.contact.subjectPrefix} ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      window.location.href = `mailto:${portfolioConfig.email}?subject=${subject}&body=${body}`;
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        portfolioConfig.emailJs.serviceId,
        portfolioConfig.emailJs.templateId,
        formRef.current,
        portfolioConfig.emailJs.publicKey
      )
      .then(
        () => {
          setLoading(false);
          setResult("success");
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setResult("error");
        }
      );
  };

  return (
    <>
      <SectionHeading id="contact-title" title={t.contact.title} hint={t.contact.subtitle} />

      <p className="m-0 max-w-[680px] text-[14px] leading-6 text-muted">
        {t.contact.banner} {t.contact.directEmail}{" "}
        <a href={`mailto:${portfolioConfig.email}`} className="text-accent [overflow-wrap:anywhere]">
          {portfolioConfig.email}
        </a>
        .
      </p>

      <div className="panel">
        <div className="panel-bar">
          <span />
          <span />
          <span />
          <b>mail --to breno</b>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 sm:p-6">
          {emailConfigMissing && <p className="m-0 text-[13px] leading-6 text-muted">{t.contact.helper}</p>}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="px-text text-[12px] text-soft">{t.contact.name}</span>
              <input type="text" name="name" placeholder={t.contact.namePlaceholder} required className="field" />
            </label>

            <label className="flex flex-col gap-2">
              <span className="px-text text-[12px] text-soft">{t.contact.email}</span>
              <input type="email" name="email" placeholder={t.contact.emailPlaceholder} required className="field" />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="px-text text-[12px] text-soft">{t.contact.message}</span>
            <textarea
              rows={6}
              name="message"
              placeholder={t.contact.messagePlaceholder}
              required
              className="field resize-y"
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={loading} className="btn-px">
              {loading ? t.contact.sending : emailConfigMissing ? t.contact.openEmail : t.contact.send}{" "}
              <span aria-hidden="true">→</span>
            </button>

            {result && (
              <p role="status" className={`px-text m-0 text-[12px] ${result === "success" ? "text-soft" : "text-accent"}`}>
                {result === "success" ? t.contact.success : t.contact.error}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
