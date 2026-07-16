# 🎁 Happy Birthday, Laura!

A tiny, single-page birthday surprise. When you open the page you see a wrapped
gift box; tap it and — bow unties, lid lifts, a photo of Laura rises out, a party
hat drops onto her head, confetti bursts, and the birthday message appears.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, and **canvas-confetti**. No backend, no database — it's a
single static page, ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. Tap/click the box to play the surprise, and
use the little 🔄 button to watch it again.

## Edit the message

All the copy lives in **`components/GiftReveal.tsx`**:

- The headline (`Happy Birthday, Laura! 🎉`) is the `<motion.h1>` near the top.
- The three-paragraph message is the `<motion.div>` block labelled
  `{/* Message */}` further down.
- The closed-box hint (`Tap to open 🎁`) is the `<motion.p>` inside the stage.

Just change the text in place — no other wiring needed.

## Replace the photo

The photo that rises out of the box is **`public/imgLaura.jpeg`**.

1. Drop your new image into `public/`.
2. Either name it `imgLaura.jpeg` (it'll just work), or name it something else
   and update the `src="/imgLaura.jpeg"` line in `components/GiftReveal.tsx`.

A portrait photo works best (it's cropped to fit the frame). The image is
mounted from first paint, so it's preloaded and the reveal is flicker-free.

## Tweak the animation

The whole reveal is driven by one timeline object at the top of
`components/GiftReveal.tsx`:

```ts
const TL = {
  bow:   { delay: 0.0,  duration: 0.5 },
  lid:   { delay: 0.45, duration: 0.6 },
  photo: { delay: 0.95, duration: 0.7 },
  ...
};
```

Change those `delay` / `duration` values (in seconds) to re-pace the show.
`TL_RM` right below it is the calmer timeline used when the visitor has
**`prefers-reduced-motion`** turned on — that path skips the big motion and just
fades the final scene (box open, photo, hat, message) into place, and confetti
is suppressed.

## Deploy to Vercel

No configuration or environment variables needed.

1. Push this project to a Git repo (GitHub / GitLab / Bitbucket).
2. Go to <https://vercel.com/new> and **import** the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.

That's it. 🎉
