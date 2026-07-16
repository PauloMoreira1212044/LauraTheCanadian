"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PartyHat from "./PartyHat";
import RibbonBow from "./RibbonBow";
import Balloons from "./Balloons";
import { fireConfettiBurst, driftConfetti } from "@/lib/confetti";

// Prefix for static assets so the photo resolves correctly when the site is
// hosted under a sub-path (e.g. GitHub Pages: /LauraTheCanadian). Empty locally.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* ------------------------------------------------------------------ *
 * Animation timeline (seconds). Everything is driven off these numbers,
 * so tweaking the pacing of the reveal is a one-stop edit.
 *
 * Order of the show:
 *   1. bow unties   2. lid lifts   3. photo rises
 *   4. hat drops    5. confetti    6. message appears
 * ------------------------------------------------------------------ */
const TL = {
  bow: { delay: 0.0, duration: 0.5 },
  lid: { delay: 0.45, duration: 0.6 },
  photo: { delay: 0.95, duration: 0.7 },
  headline: { delay: 1.15, duration: 0.5 },
  hat: { delay: 1.6, duration: 0.55 },
  confettiAt: 1.95,
  message: { delay: 2.05, duration: 0.55 },
  aliveAt: 2.6,
};

/* Reduced-motion timeline: skip the big motion, just gently fade the
   final scene into place with a light stagger. */
const TL_RM = {
  bow: { delay: 0.0, duration: 0.25 },
  lid: { delay: 0.05, duration: 0.3 },
  photo: { delay: 0.1, duration: 0.35 },
  headline: { delay: 0.05, duration: 0.35 },
  hat: { delay: 0.15, duration: 0.35 },
  confettiAt: 0.2,
  message: { delay: 0.2, duration: 0.4 },
  aliveAt: 0.6,
};

type Phase = "closed" | "opening";

export default function GiftReveal() {
  const reduced = useReducedMotion();
  const T = reduced ? TL_RM : TL;

  const [phase, setPhase] = useState<Phase>("closed");
  const [alive, setAlive] = useState(false);
  // Bumped on replay to force the animated subtree to remount and snap
  // back to its "closed" initial state instead of animating in reverse.
  const [runId, setRunId] = useState(0);

  const open = phase === "opening";

  function handleOpen() {
    if (phase === "closed") setPhase("opening");
  }

  function handleReplay() {
    setAlive(false);
    setPhase("closed");
    setRunId((n) => n + 1);
    // Let the remount settle at "closed", then play the whole thing again.
    window.setTimeout(() => setPhase("opening"), 480);
  }

  // Fire the confetti burst and flip on the "alive" background at the right
  // moments in the timeline.
  useEffect(() => {
    if (phase !== "opening") return;
    const t1 = window.setTimeout(fireConfettiBurst, T.confettiAt * 1000);
    const t2 = window.setTimeout(() => setAlive(true), T.aliveAt * 1000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, runId]);

  // Gentle, sparse confetti drift once the scene is alive (skipped for
  // reduced-motion users — driftConfetti is already a no-op for them).
  useEffect(() => {
    if (!alive || reduced) return;
    const id = window.setInterval(driftConfetti, 3000);
    return () => window.clearInterval(id);
  }, [alive, reduced]);

  return (
    <>
      {alive && <Balloons />}

      <div className="relative flex w-full max-w-md flex-col items-center">
        {/* Everything that resets on replay lives under this keyed wrapper. */}
        <div key={runId} className="flex w-full flex-col items-center">
          {/* ---------- Headline (appears once the box is open) ---------- */}
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ delay: T.headline.delay, duration: T.headline.duration }}
            className="mb-4 text-center font-display text-3xl font-bold leading-tight text-coral sm:text-4xl"
          >
            Happy Birthday, Laura! <span className="align-middle">🎉</span>
          </motion.h1>

          {/* ------------------------- The stage ------------------------ *
           * Centering is handled by static wrapper <div>s (left-1/2 +
           * -translate-x-1/2). Framer Motion animates ONLY the inner element's
           * transforms, so its transform writes never fight the CSS centering.
           * z-order (low -> high): lid < photo < box-front < bow < hat.
           * The lid sits BEHIND the photo so, once lifted, it tucks away
           * behind the rising photo instead of covering it.
           * ----------------------------------------------------------------- */}
          <div
            className="relative h-[380px] w-[264px] no-select"
            style={{ perspective: 1000 }}
          >
            {/* Lid — hinged at the back (top edge), rotates up and tilts off.
                z below the photo so it lifts behind the rising photo, then
                fades away in the second half of its travel ("up and off") so it
                leaves no stray edges poking out beside the photo. */}
            <div className="absolute bottom-[120px] left-1/2 z-[15] w-[220px] -translate-x-1/2">
              <motion.div
                initial={{ rotateX: 0, y: 0, opacity: 1 }}
                animate={
                  open
                    ? { rotateX: -122, y: -34, opacity: 0 }
                    : { rotateX: 0, y: 0, opacity: 1 }
                }
                transition={{
                  delay: T.lid.delay,
                  duration: T.lid.duration,
                  ease: "easeInOut",
                  // hold the lid solid while it lifts, then fade it out.
                  opacity: {
                    delay: T.lid.delay + T.lid.duration * 0.5,
                    duration: T.lid.duration * 0.5,
                  },
                }}
                style={{ transformOrigin: "50% 0%" }}
                className="h-[42px] w-full rounded-xl bg-gradient-to-b from-pink to-coral shadow-soft"
              >
                {/* Ribbon band across the lid. */}
                <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-sunny/95" />
              </motion.div>
            </div>

            {/* Framed photo of Laura — rises up out of the box. Behind the box
                front (below) so it looks like it emerges from inside. */}
            <div className="absolute bottom-[88px] left-1/2 z-20 w-[152px] -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, y: 78, scale: 0.5 }}
                animate={
                  open
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 78, scale: 0.5 }
                }
                transition={{
                  delay: T.photo.delay,
                  duration: T.photo.duration,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: "50% 100%" }}
                className="rounded-[22px] bg-white p-1.5 shadow-frame"
              >
                <div className="overflow-hidden rounded-[16px]">
                  {/* Real photo. Always mounted from first paint, so it is
                      fully loaded (preloaded) long before the box is tapped —
                      the reveal is instant with no flicker. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_PATH}/imgLaura.jpeg`}
                    alt="Laura"
                    draggable={false}
                    decoding="async"
                    className="h-[176px] w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Box body (front panel). In front of the photo's lower edge so
                the photo looks seated inside. Tiny wobble on open. */}
            <div className="absolute bottom-0 left-1/2 z-30 w-[196px] -translate-x-1/2">
              <motion.div
                animate={
                  open && !reduced
                    ? { rotate: [0, -2.5, 2.5, -1.5, 0] }
                    : { rotate: 0 }
                }
                transition={{ duration: 0.45 }}
                className="relative h-[132px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-coral to-pink shadow-soft"
              >
                {/* Dark inner rim = the front lip / mouth of the open box. */}
                <div className="absolute inset-x-0 top-0 h-5 bg-[#d94e66]" />
                {/* Vertical ribbon down the front. */}
                <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-sunny/95" />
              </motion.div>
            </div>

            {/* Party hat — drops from the top and settles on her head with a
                little bounce (spring). Nudged a hair right to sit on her head. */}
            <div
              className="absolute bottom-[244px] z-[60] w-[72px] -translate-x-1/2"
              style={{ left: "calc(50% + 6px)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -460, rotate: -34 }}
                animate={
                  open
                    ? { opacity: 1, y: 0, rotate: -15 }
                    : { opacity: 0, y: -460, rotate: -34 }
                }
                transition={
                  reduced
                    ? { delay: T.hat.delay, duration: T.hat.duration }
                    : {
                        default: {
                          type: "spring",
                          stiffness: 260,
                          damping: 12,
                          delay: T.hat.delay,
                        },
                        opacity: { duration: 0.15, delay: T.hat.delay },
                      }
                }
                style={{ transformOrigin: "50% 100%" }}
              >
                <PartyHat className="h-auto w-full drop-shadow-[0_6px_6px_rgba(80,40,80,0.25)]" />
              </motion.div>
            </div>

            {/* Ribbon bow — sits on the lid, unties and falls off first. */}
            <div className="absolute bottom-[150px] left-1/2 z-50 w-[104px] -translate-x-1/2">
              <motion.div
                initial={{ opacity: 1, y: 0, rotate: 0 }}
                animate={
                  open
                    ? { opacity: 0, y: 96, rotate: 24 }
                    : { opacity: 1, y: 0, rotate: 0 }
                }
                transition={{
                  delay: T.bow.delay,
                  duration: T.bow.duration,
                  ease: "easeIn",
                }}
                className={phase === "closed" ? "animate-bow-wiggle" : ""}
              >
                <RibbonBow className="h-auto w-full drop-shadow-[0_5px_5px_rgba(80,40,80,0.2)]" />
              </motion.div>
            </div>

            {/* Generous, accessible tap target over the whole box (closed only). */}
            {phase === "closed" && (
              <button
                type="button"
                onClick={handleOpen}
                aria-label="Open the gift box"
                className="absolute inset-0 z-[70] cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lilac/50"
              />
            )}

            {/* Hint text under the closed box. Absolutely positioned so it does
                not shift the layout when it fades out. */}
            <motion.p
              initial={false}
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute -bottom-10 left-0 right-0 text-center font-display text-lg font-medium text-slate-500"
            >
              Tap to open 🎁
            </motion.p>
          </div>

          {/* ------------------------- Message -------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: T.message.delay, duration: T.message.duration }}
            className="mt-14 max-w-sm space-y-3 text-center font-display text-[17px] leading-relaxed text-slate-600"
          >
            <p>Officially 26 and the coolest Canadian I&apos;ve met.</p>
            <p>
              One day I&apos;ll visit Canada and we&apos;ll go through that
              ChatGPT list of questions again, and we&apos;ll find out how much
              has changed.
            </p>
            <p>
              As we say back home in Portugal:{" "}
              <span className="font-bold text-teal">Parabéns! 🥳</span>
            </p>
          </motion.div>
        </div>

        {/* --------------------- Replay affordance -------------------- */}
        {alive && (
          <motion.button
            type="button"
            onClick={handleReplay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            aria-label="Play the surprise again"
            className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-xl shadow-soft ring-1 ring-black/5 transition hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lilac/50"
          >
            🔄
          </motion.button>
        )}
      </div>
    </>
  );
}
