# Graft Digital — Claude Code Instructions

## Auto-Deploy Rule
After EVERY change, run:
```
git add -A && git commit -m "update" && git push
```
Vercel auto-deploys on every push to the main branch. The live site updates in ~60 seconds.

## Stack
- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS v4
- Language: TypeScript
- Icons: lucide-react
- Hosting: Vercel
- Repo: https://github.com/waseemb39/apex-digital

## Live URL
https://apex-digital.vercel.app (update this once Vercel assigns the real URL)

## Project Structure
```
src/
  app/           — Pages (page.tsx files)
  components/    — Reusable UI components
docs/
  OPERATIONS_MANUAL.md — Non-technical management guide
```

## Key Constants to Update Before Launch
- BOOK_CALL_LINK in: Navbar.tsx, Hero.tsx, ProvenProcess.tsx, Stakes.tsx, Footer.tsx
- Business name "Graft Digital" in: layout.tsx, Navbar.tsx, Footer.tsx
- GA4/GTM/Meta Pixel IDs in: layout.tsx (add next/script tags)
- Form endpoint in: ContactForm.tsx, TransitionalCTA.tsx

## Styling Rules
- Primary CTA buttons: bg-orange-600 hover:bg-orange-700
- Blue accents: bg-blue-600 / text-blue-600
- Dark sections: bg-slate-900
- Light sections: bg-slate-50 or bg-white
- All CTAs must meet WCAG 2.1 AA contrast ratio (4.5:1 minimum)

## Component Naming
Components use PascalCase and live in src/components/. Each component has a one-line comment at the top describing its owner and purpose.

## Content Placeholders
- "Graft Digital" — replace with real business name
- Testimonials in Testimonials.tsx — replace with real client results
- Stats in Guide.tsx — replace with real numbers
