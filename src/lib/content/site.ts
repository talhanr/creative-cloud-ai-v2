// Site-wide copy for header + footer. Source: Figma "Home new" 58698:3757.
// Phase 4 pages don't exist yet, so their links point to "#".

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Web Design", href: "#" },
  { label: "Marketing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

// Marketing submenu is not designed in Figma; items are the marketing service pages.
export const marketingNav: NavLink[] = [
  { label: "Marketing", href: "#" },
  { label: "SEO", href: "#" },
  { label: "PPC", href: "#" },
  { label: "Branding", href: "#" },
  { label: "Social Media Management", href: "#" },
];

// Business phone (Bilal, 2026-11-17). Single source for every "call us" link.
export const phone = { display: "01293 365070", href: "tel:+441293365070" } as const;

export const headerCta = { label: "Call Now", href: phone.href, ariaLabel: `Call Now ${phone.display}` } as const;

export const footer = {
  cta: {
    title: "Have something in mind?",
    body: "From digital platforms to branding and marketing, we're here to discuss your next project.",
    button: "Let's Talk",
    href: "#",
  },
  tagline: "Your Business. Our Focus.",
  subline: "Your new website starts here",
  exploreTitle: "Explore",
  explore: [
    { label: "Home", href: "/" },
    { label: "Web Design", href: "#" },
    { label: "Digital Marketing", href: "#" },
    { label: "Blog", href: "#" },
  ] satisfies NavLink[],
  contactTitle: "Get in touch",
  email: "hello@royalcreative.co.uk",
  phone,
  address: "7 Argyll Ct, Crawley RH11 8ZF",
  followTitle: "Follow",
  social: [
    { label: "Message us", icon: "/landing/message-circle.svg", href: "#" },
    { label: "Facebook", icon: "/landing/social-media-facebook-logo.svg", href: "#" },
    { label: "Instagram", icon: "/landing/instagram.svg", href: "#" },
  ],
  backToTop: "Back to top",
  copyright: "© 2026 Royal Creative. All rights reserved.",
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ] satisfies NavLink[],
} as const;
