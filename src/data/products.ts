export interface Product {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  idealFor: string[];
  icon: string; // lucide-react icon name
}

export const products: Product[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    tagline: "One goal. One page. More conversions.",
    shortDescription:
      "A focused single-page site built to drive a single action — sign-ups, bookings, or sales — with zero distractions.",
    longDescription:
      "A landing page strips away everything that doesn't convert. No cluttered menus. No rabbit holes. Just a clear message, a compelling offer, and a button that gets clicked. We pair StoryBrand-driven copy with a performance-first build so your page loads fast, ranks well, and turns ad traffic into real leads.",
    features: [
      "Single, conversion-focused layout with one primary CTA",
      "StoryBrand-optimised copy that passes the 5-second test",
      "PageSpeed score ≥ 90 on mobile and desktop",
      "Built-in lead capture form with email integration",
      "A/B test ready — easy to duplicate and iterate",
      "GA4 + Meta Pixel installed and verified",
      "Fully responsive and WCAG 2.1 AA accessible",
    ],
    idealFor: [
      "Paid ad campaigns (Google, Meta, LinkedIn)",
      "Product or service launches",
      "Event registrations and webinar sign-ups",
      "Lead magnet delivery pages",
    ],
    icon: "Zap",
  },
  {
    slug: "company-website",
    name: "Company Website",
    tagline: "Your brand, your story, your credibility.",
    shortDescription:
      "A multi-page professional site that builds trust, explains what you do, and turns visitors into enquiries.",
    longDescription:
      "Your company website is your best salesperson — working 24/7 without a salary. We build multi-page sites that communicate your value clearly, establish authority, and guide every visitor toward contacting you. From homepage to case studies, every page is intentional.",
    features: [
      "Home, About, Services, and Contact pages as standard",
      "Portfolio or case studies section to showcase results",
      "Blog-ready CMS for ongoing content and SEO",
      "Team and culture pages to humanise your brand",
      "Contact forms with spam protection and CRM integration",
      "Local and national SEO technical foundation",
      "Fast, secure, and fully documented for your team",
    ],
    idealFor: [
      "Professional services firms and agencies",
      "B2B companies building credibility with new clients",
      "Consultancies, coaches, and advisory businesses",
      "Established local businesses ready to go digital",
    ],
    icon: "Building2",
  },
  {
    slug: "online-shop",
    name: "Online Shop",
    tagline: "Sell while you sleep.",
    shortDescription:
      "A full e-commerce store with product catalogue, secure checkout, and the tools to manage orders without the headaches.",
    longDescription:
      "Whether you're selling five products or five hundred, your online shop needs to be fast, trustworthy, and easy to manage. We build e-commerce experiences that reduce cart abandonment, simplify inventory, and make repeat purchases feel effortless — so you can focus on your product, not your platform.",
    features: [
      "Product catalogue with variants, pricing, and inventory tracking",
      "Secure checkout with Stripe, PayPal, and Apple/Google Pay",
      "Discount codes, bundles, and promotional pricing",
      "Customer accounts with order history and tracking",
      "Automated order confirmation and shipping emails",
      "Low-stock alerts and inventory management dashboard",
      "SEO-optimised product and category pages",
    ],
    idealFor: [
      "Retailers moving from physical to online sales",
      "Makers, artisans, and independent brands",
      "Businesses selling digital products or courses",
      "Companies launching a direct-to-consumer channel",
    ],
    icon: "ShoppingBag",
  },
  {
    slug: "online-booking",
    name: "Online Booking Service",
    tagline: "Fill your calendar without lifting a finger.",
    shortDescription:
      "An appointment and reservation system built directly into your site — automated, reliable, and stress-free for you and your clients.",
    longDescription:
      "Stop chasing clients back and forth to schedule appointments. We integrate a seamless booking system into your website that handles availability, confirmations, reminders, and payments automatically. Less admin. Fewer no-shows. More time doing the work you love.",
    features: [
      "Real-time availability calendar synced to your schedule",
      "Automated confirmation and reminder emails and SMS",
      "Online payment collection at time of booking",
      "Buffer times, cancellation policies, and rescheduling",
      "Multiple staff and resource management",
      "Recurring appointment support",
      "Two-way sync with Google Calendar and Outlook",
    ],
    idealFor: [
      "Healthcare and wellness clinics",
      "Salons, spas, and beauty professionals",
      "Coaches, consultants, and therapists",
      "Fitness studios, gyms, and personal trainers",
    ],
    icon: "CalendarCheck",
  },
  {
    slug: "blog-website",
    name: "Blog Website",
    tagline: "Build authority. Drive traffic. Earn trust.",
    shortDescription:
      "A content-driven site designed to rank on Google, grow your audience, and position you as the go-to expert in your field.",
    longDescription:
      "A great blog isn't just a collection of posts — it's an organic traffic machine that compounds over time. We build blog sites that are engineered for search, designed for readers, and structured to convert visitors into subscribers and subscribers into clients.",
    features: [
      "Category and tag system for organised, browsable content",
      "Author profiles and multi-author support",
      "SEO-optimised post templates with structured data",
      "Email subscribe integration and newsletter-ready",
      "Social sharing optimised with OG and Twitter card tags",
      "RSS feed for podcast and content syndication",
      "Related posts and internal linking to maximise time on site",
    ],
    idealFor: [
      "Coaches, educators, and thought leaders",
      "Businesses building long-term organic search presence",
      "Journalists, writers, and independent publishers",
      "Brands investing in content marketing over paid ads",
    ],
    icon: "BookOpen",
  },
  {
    slug: "custom-website",
    name: "Unique / Custom Website",
    tagline: "If it's never been built before, you're in the right place.",
    shortDescription:
      "A fully bespoke digital experience — custom interactions, unique layouts, and complex integrations built exactly to your vision.",
    longDescription:
      "Some ideas don't fit a template. If you have a product, platform, or experience that's genuinely different, we design and engineer it from the ground up. No off-the-shelf compromises. Just clean, purposeful code that does exactly what your business needs — and nothing it doesn't.",
    features: [
      "Bespoke UI/UX design tailored to your brand and users",
      "Custom animations and micro-interactions",
      "Third-party API and data integrations",
      "Complex data visualisations and dashboards",
      "Role-based access, authentication, and user portals",
      "Scalable architecture built to grow with your business",
      "Full handover documentation and optional retainer support",
    ],
    idealFor: [
      "Startups with a product that needs a purpose-built web presence",
      "Established brands requiring a bespoke digital experience",
      "Platforms and tools that need custom web infrastructure",
      "Businesses that have outgrown generic website builders",
    ],
    icon: "Sparkles",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
