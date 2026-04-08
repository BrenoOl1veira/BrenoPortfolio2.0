import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { styles } from "../styles";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-center gap-6 text-center`}
      >
        <div className="max-w-3xl rounded-[28px] border border-white/10 bg-[#151030]/85 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">
            Portfolio
          </p>

          <h1 className={styles.heroHeadText}>
            Hello, I&apos;m <span className="text-[#3b82f6]">Breno Oliveira</span>
          </h1>

          <p className={`${styles.heroSubText} mt-4 text-white text-center text-lg`}>
            System Analyst focused on automation, data and business solutions.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-secondary sm:text-base">
            I build integrations, reports and internal tools that help teams
            work with more clarity, speed and reliability.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#works"
              className="rounded-full bg-[#3b82f6] px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-[#2563eb]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-6 flex justify-center gap-5 text-2xl text-white">
            <a
              href="https://www.linkedin.com/in/brenool1veira/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors hover:text-[#0A66C2]"
            >
              <FiLinkedin />
            </a>
            <a
              href="https://github.com/BrenoOl1veira"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors hover:text-gray-400"
            >
              <FiGithub />
            </a>
            <a
              href="mailto:brenooliveira.dev@gmail.com"
              aria-label="Send an email"
              className="transition-colors hover:text-[#60a5fa]"
            >
              <FiMail />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
