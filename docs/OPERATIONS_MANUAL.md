# Apex Digital — Operations Manual

> Written for non-technical team members. No developer knowledge required to follow this guide.

---

## 1. How the Website Works

This website is built with **Next.js** and deployed on **Vercel**. Every time a change is pushed to GitHub, Vercel automatically rebuilds and republishes the site within ~60 seconds.

**You never need to log into a server or run commands to publish content changes** — just edit a file and push.

---

## 2. Key Files & What They Do

| File | What it controls | Who updates it |
|------|-----------------|----------------|
| `src/app/page.tsx` | Homepage — assembles all sections in order | Website Owner |
| `src/app/about/page.tsx` | About page content | Content Manager |
| `src/app/services/page.tsx` | Services page content | Content Manager |
| `src/app/contact/page.tsx` | Contact page content | Content Manager |
| `src/components/Hero.tsx` | Homepage hero headline, subhead, and CTA buttons | Content Manager |
| `src/components/Problem.tsx` | The 3 problem cards (External / Internal / Philosophical) | Content Manager |
| `src/components/Guide.tsx` | Authority stats (100+ clients, 2×, etc.) + empathy paragraph | Content Manager |
| `src/components/ProvenProcess.tsx` | The 3-step "Here's How It Works" process | Content Manager |
| `src/components/Testimonials.tsx` | Client testimonial cards | Content Manager |
| `src/components/TransitionalCTA.tsx` | Lead magnet email form section | Website Owner |
| `src/components/ContactForm.tsx` | Booking enquiry form | Website Owner |
| `src/components/Footer.tsx` | Footer links, CTA, copyright | Website Owner |
| `src/components/Navbar.tsx` | Navigation links and CTA button | Website Owner |
| `src/app/layout.tsx` | Site title and meta description (for Google) | Website Owner |
| `CLAUDE.md` | Instructions for Claude Code (auto-deploy settings) | Technical Manager |

---

## 3. How to Update Content (No Coding Required)

### Update a Headline or Paragraph

1. Open the relevant `.tsx` file from the table above
2. Find the text you want to change — it will be in quotes (e.g. `"More Clients. More Revenue."`)
3. Change the text between the quotes
4. Save the file
5. Ask Claude Code: *"Commit and push my changes"*
6. Wait ~60 seconds — your live site will update automatically

### Update Testimonials

Open `src/components/Testimonials.tsx`. Find the `testimonials` array near the top. Each testimonial has these fields:

```
name:        Client's full name
title:       Their job title and company
avatar:      Two capital initials (e.g. "SM" for Sarah Mitchell)
avatarColor: Background colour class (e.g. "bg-blue-600")
problem:     What problem they had before
result:      The result they got after working with you (use a direct quote)
metric:      Short result summary shown as a badge (e.g. "3× more leads")
```

Replace the placeholder data with real client information. Keep the same format.

### Update the 3-Step Process

Open `src/components/ProvenProcess.tsx`. Find the `steps` array. Each step has:

- `number` — "01", "02", "03"
- `icon` — an emoji
- `title` — 3–5 words
- `description` — under 15 words

### Update the Booking/Contact Form

The form in `src/components/ContactForm.tsx` currently logs submissions to the browser console. Before launch, you must connect it to a real email service.

**To connect Formspree (easiest, free):**
1. Create a free account at formspree.io
2. Create a new form — you'll get a form endpoint URL
3. Give Claude Code: *"Connect the contact form to Formspree using endpoint [YOUR ENDPOINT URL]"*

### Update the Meta Title & Description (for Google)

Open `src/app/layout.tsx`. Change the `title` and `description` values inside the `metadata` object.

---

## 4. The Booking CTA Button

The "Book a Free Strategy Call" button appears in 5 places:
- Navbar (top right)
- Hero section (center)
- ProvenProcess section
- Stakes section
- Footer

All five link to `#contact` — the contact form on the homepage. To change them all to a Calendly link:
1. Tell Claude Code: *"Replace all #contact links with [YOUR CALENDLY LINK]"*
2. Claude will update all five locations automatically

---

## 5. Adding a New Page

Tell Claude Code: *"Create a new page called /case-studies with the same Navbar and Footer as the other pages"*

---

## 6. Changing Brand Colors

The color scheme is set in Tailwind classes throughout the components. To change the entire color scheme:

- **Primary blue** (`bg-blue-600`, `text-blue-600`) — for accents, stats, guide section
- **CTA orange** (`bg-orange-600`) — for all primary CTA buttons
- **Dark navy** (`bg-slate-900`) — for dark sections (hero, stakes, footer)

To change the brand colors, tell Claude Code: *"Change the primary CTA button color from orange to [COLOR]"*

---

## 7. Weekly Content Checklist

Every Monday, the Content Manager should review:

- [ ] Are the testimonials real and current? (update if new results available)
- [ ] Is the authority stat (100+ businesses) still accurate?
- [ ] Are all CTA links working and pointing to the correct destination?
- [ ] Is the lead guide download connected and sending emails?

---

## 8. Pre-Launch Checklist (Phase 5)

Before going live with a real domain, complete these steps:

- [ ] Replace placeholder company name "Apex Digital" with your real business name
- [ ] Update logo in `Navbar.tsx` and `Footer.tsx`
- [ ] Replace placeholder testimonials with 3 real client stories
- [ ] Connect `ContactForm.tsx` to Formspree or an email API
- [ ] Connect `TransitionalCTA.tsx` email form to Mailchimp or ConvertKit
- [ ] Update `BOOK_CALL_LINK` constants with your real Calendly link
- [ ] Add your GA4 ID, GTM ID, and Meta Pixel ID
- [ ] Update `metadata` in `layout.tsx` with your real business name and description
- [ ] Register domain and connect it to Vercel
- [ ] Verify HTTPS is active (Vercel handles this automatically)

---

## 9. Who Owns What

| Role | Responsibility | Weekly Time |
|------|---------------|------------|
| Website Owner | Final decisions on content, strategy, and CTAs | 2 hrs/week |
| Content Manager | Updates copy, testimonials, blog posts | 3 hrs/week |
| Technical Manager | Monitors uptime, updates, escalates issues | 1 hr/week |
| Analytics Reviewer | Pulls weekly scorecard numbers from GA4 | 1 hr/week |

---

*Last updated: 2026-05-20*
