import { useEffect, useRef, useState } from "react";
import { onCritterCommand } from "../utils/critterBus";

// Sprites em pixel. Mini Claude (mesmo do hub): o = corpo, d = barriga, k = olhos.
const BODY = [".oooooooo.", ".ookookoo.", "oookookooo", ".dddddddd."];
const LEGS = [".o.o..o.o.", "..o.oo.o..", "..o....o.."];
// Bug: g = corpo, k = patas. Coracao: x = preenchido.
const BUG = [".k.k.", "kgggk", ".ggg.", "k.k.k"];
const HEART = [".x.x.", "xxxxx", ".xxx.", "..x.."];

const PX = 5;
const W = 10 * PX;
const H = 5 * PX;
const CANVAS_H = 80;
const GRAVITY = 0.0012; // px/ms²
const SLEEP_AFTER = 25000; // ms sem interacao ate ele cochilar
const STORAGE_KEY = "mini-claude-bugs";

const readCount = () => {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const saveCount = (count) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(count));
  } catch {
    // sem armazenamento; o contador vale so para esta visita
  }
};

const rand = (min, max) => min + Math.random() * (max - min);

/**
 * Mini Claude em pixel andando sobre o chao tracejado do hero.
 *
 * - Clique nele: pula e fala uma frase.
 * - Clique no chao: solta um bug; ele corre, come e soma no contador.
 * - Mouse sobre o chao: ele segue o cursor. Parado em cima dele: coracoes.
 * - 25 s sem interacao: cochila (zZz) e acorda com qualquer movimento.
 * - Comandos do terminal (claude, dance, sleep, bug, pet) via critterBus.
 *
 * Toda a simulacao roda dentro de um unico efeito, fora do ciclo de render do
 * React; o React so desenha o balao de fala e o contador.
 */
const Critter = ({ copy }) => {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const bubbleRef = useRef(null);
  const copyRef = useRef(copy);
  const [speech, setSpeech] = useState(null);
  const [bugs, setBugs] = useState(readCount);

  // As falas mudam com o idioma; a simulacao sempre le a versao mais recente.
  useEffect(() => {
    copyRef.current = copy;
  }, [copy]);

  useEffect(() => {
    if (!speech) return undefined;
    const timeout = setTimeout(() => setSpeech(null), 1800);
    return () => clearTimeout(timeout);
  }, [speech]);

  useEffect(() => {
    const stage = stageRef.current;
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    const css = getComputedStyle(document.documentElement);
    const tok = (name) => css.getPropertyValue(name).trim();
    const C = {
      o: tok("--accent"),
      d: tok("--accent-dark"),
      k: tok("--eye"),
      bug: tok("--bug"),
      legs: tok("--muted"),
      heart: tok("--soft"),
      fg: tok("--fg"),
    };

    const s = {
      x: 0, y: 0, vy: 0, dir: 1, frame: 0, lastStep: 0, pauseUntil: 0,
      blink: 0, nextBlink: 0, width: 0,
      mode: "walk", modeUntil: 0, forcedSleep: false,
      lastActivity: performance.now(), lastZ: 0,
      pointer: null, hoverSince: 0, lastHeart: 0,
      bug: null, particles: [], count: readCount(), lineIndex: 0,
    };

    const say = (text) => setSpeech({ text, id: performance.now() });
    const hop = (velocity = 0.25) => {
      if (s.y === 0) s.vy = velocity;
    };
    const burst = (type, amount) => {
      for (let i = 0; i < amount; i++) {
        s.particles.push({
          type,
          x: s.x + W / 2 + rand(-14, 14),
          y: s.y + H + rand(0, 8),
          vx: rand(-0.02, 0.02),
          vy: rand(0.025, 0.055),
          life: rand(800, 1300),
        });
      }
    };
    const overCritter = (p) => p.x >= s.x && p.x <= s.x + W && p.y >= s.y && p.y <= s.y + H + 6;

    const wake = (force = false) => {
      if (s.mode !== "sleep" || (s.forcedSleep && !force)) return;
      s.mode = "walk";
      s.forcedSleep = false;
      hop(0.3);
      say(copyRef.current.wake);
    };
    const activity = () => {
      s.lastActivity = performance.now();
      wake();
    };
    const dropBug = (x) => {
      if (s.bug) return;
      s.bug = { x: Math.max(8, Math.min(x, s.width - 8)), y: CANVAS_H - 12, vy: 0 };
    };

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      s.width = stage.clientWidth;
      cv.width = Math.round(s.width * dpr);
      cv.height = Math.round(CANVAS_H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      s.x = Math.max(0, Math.min(s.x, s.width - W));
    };

    const sprite = (rows, ox, oy, px, colorOf, mirror = false) => {
      rows.forEach((row, ry) =>
        [...row].forEach((cell, rx) => {
          const color = colorOf(cell);
          if (!color) return;
          const col = mirror ? row.length - 1 - rx : rx;
          ctx.fillStyle = color;
          ctx.fillRect(Math.round(ox + col * px), Math.round(oy + ry * px), px, px);
        })
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, s.width, CANVAS_H);

      if (s.bug) {
        sprite(BUG, s.bug.x - 7.5, CANVAS_H - s.bug.y - 12, 3, (c) => (c === "g" ? C.bug : c === "k" ? C.legs : null));
      }

      const eyesClosed = s.blink > 0 || s.mode === "sleep";
      const legs = s.y > 0 || s.mode === "sleep" ? LEGS[2] : LEGS[s.frame];
      sprite(
        [...BODY, legs],
        s.x,
        CANVAS_H - H - s.y,
        PX,
        (c) => (c === "." ? null : c === "k" && eyesClosed ? C.o : C[c]),
        s.dir < 0
      );

      s.particles.forEach((p) => {
        const cy = CANVAS_H - p.y;
        ctx.globalAlpha = Math.min(1, p.life / 400);
        if (p.type === "heart") sprite(HEART, p.x - 5, cy, 2, (c) => (c === "x" ? C.heart : null));
        else if (p.type === "spark") {
          ctx.fillStyle = C.fg;
          ctx.fillRect(Math.round(p.x), Math.round(cy), 2, 2);
        } else {
          ctx.fillStyle = C.fg;
          ctx.font = "10px Silkscreen, monospace";
          ctx.fillText("z", p.x, cy);
        }
      });
      ctx.globalAlpha = 1;

      if (bubbleRef.current) bubbleRef.current.style.left = `${s.x + W / 2}px`;
    };

    const step = (now, every) => {
      if (now - s.lastStep > every) {
        s.frame ^= 1;
        s.lastStep = now;
      }
    };

    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(64, now - last);
      last = now;

      // Pulo e queda do bug usam a mesma gravidade.
      if (s.y > 0 || s.vy > 0) {
        s.vy -= GRAVITY * dt;
        s.y = Math.max(0, s.y + s.vy * dt);
        if (s.y === 0) s.vy = 0;
      }
      if (s.bug && s.bug.y > 0) {
        s.bug.vy -= GRAVITY * dt;
        s.bug.y = Math.max(0, s.bug.y + s.bug.vy * dt);
      }

      if (s.mode === "walk" && !s.bug && now - s.lastActivity > SLEEP_AFTER) s.mode = "sleep";

      if (s.mode === "sleep") {
        if (now - s.lastZ > 900) {
          s.lastZ = now;
          s.particles.push({ type: "z", x: s.x + (s.dir > 0 ? W - 6 : 2), y: H + 2, vx: 0.012 * s.dir, vy: 0.018, life: 1700 });
        }
      } else if (s.mode === "dance") {
        if (now > s.modeUntil) s.mode = "walk";
        else if (s.y === 0) {
          hop(0.22);
          s.dir *= -1;
          burst("spark", 2);
        }
      } else {
        const p = s.pointer;

        // Carinho: mouse parado em cima dele por um tempinho solta coracoes.
        if (p && overCritter(p)) {
          if (!s.hoverSince) s.hoverSince = now;
          s.pauseUntil = Math.max(s.pauseUntil, now + 300);
          if (now - s.hoverSince > 700 && now - s.lastHeart > 450) {
            s.lastHeart = now;
            burst("heart", 1);
          }
        } else {
          s.hoverSince = 0;
        }

        const chasing = s.bug && s.bug.y === 0;
        const target = chasing ? s.bug.x - W / 2 : p ? p.x - W / 2 : null;
        if (chasing || now > s.pauseUntil) {
          if (target !== null) {
            const dx = target - s.x;
            if (Math.abs(dx) > 3) {
              const speed = chasing ? 0.13 : 0.07;
              s.dir = Math.sign(dx);
              s.x += s.dir * Math.min(Math.abs(dx), speed * dt);
              step(now, chasing ? 90 : 140);
            }
          } else {
            s.x += s.dir * dt * 0.05;
            if (s.x <= 0) s.dir = 1;
            if (s.x >= s.width - W) s.dir = -1;
            step(now, 160);
            if (Math.random() < 0.0008) s.pauseUntil = now + rand(1000, 2000);
          }
        }
        s.x = Math.max(0, Math.min(s.x, s.width - W));

        if (chasing && Math.abs(s.x + W / 2 - s.bug.x) < 6) {
          s.bug = null;
          s.count += 1;
          saveCount(s.count);
          setBugs(s.count);
          burst("spark", 8);
          hop(0.28);
          say(`${copyRef.current.eat} #${s.count}`);
          s.pauseUntil = now + 1200;
        }
      }

      s.particles.forEach((particle) => {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.life -= dt;
      });
      s.particles = s.particles.filter((particle) => particle.life > 0);

      if (s.blink > 0) s.blink -= dt;
      else if (now > s.nextBlink) {
        s.blink = 120;
        s.nextBlink = now + rand(2000, 5000);
      }

      draw();
    };

    const local = (event) => {
      const rect = cv.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: CANVAS_H - (event.clientY - rect.top) };
    };
    const onPointerMove = (event) => {
      s.pointer = local(event);
    };
    const onPointerLeave = () => {
      s.pointer = null;
      s.hoverSince = 0;
    };
    const onClick = (event) => {
      const p = local(event);
      if (overCritter(p)) {
        if (s.mode === "sleep") {
          wake(true);
          return;
        }
        const lines = copyRef.current.lines;
        say(lines[s.lineIndex++ % lines.length]);
        hop();
        s.pauseUntil = performance.now() + 1400;
      } else {
        dropBug(p.x);
      }
    };

    const offCommand = onCritterCommand((command) => {
      activity();
      const now = performance.now();
      if (command === "hello") {
        say(copyRef.current.hello);
        hop(0.3);
        burst("spark", 6);
      } else if (command === "dance") {
        wake(true);
        s.mode = "dance";
        s.modeUntil = now + 4000;
        say(copyRef.current.dance);
      } else if (command === "sleep") {
        s.mode = "sleep";
        s.forcedSleep = true;
      } else if (command === "bug") {
        wake(true);
        dropBug(rand(20, s.width - 20));
      } else if (command === "pet") {
        wake(true);
        burst("heart", 6);
        hop(0.18);
        say(copyRef.current.pet);
      }
    });

    const onResize = () => {
      size();
      draw();
    };
    const activityEvents = ["pointermove", "keydown", "scroll", "touchstart"];

    size();
    cv.addEventListener("click", onClick);
    cv.addEventListener("pointermove", onPointerMove);
    cv.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    activityEvents.forEach((name) => window.addEventListener(name, activity, { passive: true }));
    // Anda sempre, mesmo com "efeitos de animacao" desligados no sistema (igual ao hub).
    const timer = setInterval(tick, 16);

    return () => {
      clearInterval(timer);
      offCommand();
      cv.removeEventListener("click", onClick);
      cv.removeEventListener("pointermove", onPointerMove);
      cv.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      activityEvents.forEach((name) => window.removeEventListener(name, activity));
    };
  }, []);

  return (
    <div className="mt-7">
      <div ref={stageRef} className="stage-floor relative h-[84px]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={copy.label}
          className="critter-canvas pixelated absolute bottom-1 left-0 h-[80px] w-full"
        />
        <div
          ref={bubbleRef}
          aria-live="polite"
          className={`px-text pointer-events-none absolute bottom-[44px] -translate-x-1/2 whitespace-nowrap bg-fg px-2 py-[6px] text-[11px] text-bg shadow-px-sm ${
            speech ? "" : "hidden"
          }`}
        >
          {speech?.text}
        </div>
      </div>

      <div className="hint mt-3 flex flex-wrap justify-between gap-2">
        <span>{copy.hint}</span>
        <span>
          {copy.counter}: <span className="text-accent">{bugs}</span>
        </span>
      </div>
    </div>
  );
};

export default Critter;
