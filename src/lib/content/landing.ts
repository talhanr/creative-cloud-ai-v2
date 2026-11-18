// Landing page copy. Source: Figma "Home new" 58698:3757 (exact text).

export const hero = {
  title: "Your new website starts here",
  subtitle:
    "Explore your website concept in 60 seconds, then have it professionally designed and developed by our expert team.",
  logosTitle: "Working with brands big and small",
} as const;

// Client logos are white "ink" PNGs used as alpha masks (Figma: mask + white fill).
export const clientLogos = [
  { name: "PureGym", src: "/landing/white-logo-ink.png", w: 120, h: 52 },
  { name: "Heavenly Desserts", src: "/landing/white-logo-ink1.png", w: 130, h: 52 },
  { name: "UK Prime Utility", src: "/landing/white-logo-ink2.png", w: 130, h: 52 },
  { name: "Plan Burrito", src: "/landing/white-logo-ink3.png", w: 110, h: 52 },
  { name: "Gatwick Commercials", src: "/landing/white-logo-ink4.png", w: 120, h: 60 },
  { name: "Lighthouse", src: "/landing/white-logo-ink5.png", w: 130, h: 52 },
  { name: "Lakshmi's", src: "/landing/white-logo-ink6.png", w: 110, h: 60 },
  { name: "Driven Transfers", src: "/landing/white-logo-ink7.png", w: 130, h: 52 },
] as const;

export const showcaseImages = [
  { src: "/landing/image1.png", w: 1080, h: 1080 },
  { src: "/landing/image2.png", w: 4096, h: 2461 },
  { src: "/landing/image3.png", w: 1600, h: 1600 },
  { src: "/landing/image4.png", w: 1600, h: 1200 },
  { src: "/landing/image5.png", w: 4096, h: 2461 },
  { src: "/landing/image6.png", w: 1600, h: 1200 },
] as const;

const serviceBody =
  "Branding creates a unique identity for your business. We help build a brand that resonates with your audience.";

export const services = {
  eyebrow: "Our Services",
  title: "What we do for your business?",
  intro:
    "From bespoke websites and digital platforms to SEO and creative marketing, we bring the right expertise together to help businesses build a stronger digital presence.",
  // "Web Design" is shown with the brand gradient in Figma (highlighted item).
  // Hover/expanded state (Figma prototype): body + arrow link + laptop image.
  // Figma uses the Branding body and the same image for every service (placeholder) — flag for Bilal.
  items: [
    { label: "Branding", href: "#", body: serviceBody },
    { label: "Web Design", href: "#", body: serviceBody, highlighted: true },
    { label: "PPC", href: "#", body: serviceBody },
    { label: "SEO", href: "#", body: serviceBody },
    { label: "Social Media Management", href: "#", body: serviceBody },
  ],
  image: { src: "/landing/service-maison-wue.webp", alt: "Maison Wue website on a laptop" },
  // not from Figma — review before launch
  linkLabel: "Explore {service}",
} as const;

const projectTags = ["UI/UX Design", "Web Development", "Digital Marketing"] as const;

export const projects = {
  eyebrow: "Our Work",
  title: "Professional Websites Built for Success",
  intro:
    "From bespoke websites and digital platforms to creative marketing, we bring together design, technology and strategy to help businesses grow and build a stronger online presence.",
  items: [
    {
      name: "AMĖL London",
      body: "AMĖL is an activewear brand built around movement and everyday style. Its online store showcases Capsule 001, with easy browsing by fit, colour and category, plus wishlists and quick-add shopping for a seamless experience.",
      tags: projectTags,
      image: { src: "/landing/frame31.png", alt: "AMĖL London website on a laptop" },
      screen: { src: "/landing/amel-laptop-screen.jpg" },
    },
    {
      name: "Driven Transfers",
      body: "We designed a sleek, prestigious website for a Chauffeur & Corporate Travel business, focusing on elegance and ease of use. Key features include a simple, seamless booking form and multiple contact options, ensuring clients can quickly and easily schedule services or get in touch.",
      tags: projectTags,
      image: { src: "/landing/image1.png", alt: "Driven Transfers website designs" },
    },
    {
      name: "Rental Properties",
      body: "The website for the property rental business was designed to showcase their available properties with ease and style. Focusing on user experience, the site features a clean, modern design that highlights each listing’s key details. Visitors can easily browse properties, view high-quality images, and contact the team for enquiries or bookings.",
      tags: projectTags,
      image: { src: "/landing/image3.png", alt: "Rental property website designs" },
    },
  ],
} as const;

export const about = {
  eyebrow: "ABOUT ROYAL CREATIVE",
  titleLines: ["Built for ambitious", "businesses."],
  body: "Every business has challenges to solve and ambitions to achieve. We bring together strategy, design, development and marketing to deliver the right digital solutions, helping businesses overcome challenges, explore new opportunities and move forward.",
  link: { label: "More about us ↗", href: "#" },
  image: { src: "/landing/about-laptop-mockup.jpg", alt: "Website mockup on a laptop" },
  areas: [
    {
      n: "01",
      title: "Strategy",
      body: "Understanding your business, identifying opportunities and defining the right approach to achieve your objectives.",
    },
    {
      n: "02",
      title: "Design",
      body: "Distinctive, purposeful design that reflects your brand and connects with your audience.",
    },
    {
      n: "03",
      title: "Development",
      body: "Bespoke websites and digital platforms built to solve business challenges and deliver lasting value.",
    },
    {
      n: "04",
      title: "Marketing",
      body: "Targeted campaigns and creative content that increase visibility, attract customers and drive growth.",
    },
  ],
} as const;

const review = {
  quote:
    "They were always responsive and offered great guidance throughout the project. I couldn’t be more happy with the website they created for my van buying business—it’s been a huge success.",
  name: "William Hockley",
  company: "Gatwick Commercials Group",
  logo: "/landing/gatwick-commercials-group-logo1.png",
};

export const testimonials = {
  // Figma says "Testimonals" — corrected (Bilal, 2026-11-17).
  eyebrow: "Testimonials",
  title: "What Our Clients Say About Us",
  intro:
    "See how we’ve helped businesses achieve their goals with effective solutions and reliable service. Hear from our clients about their experiences working with us.",
  // Figma repeats the same review four times.
  items: [review, review, review, review],
  prev: "Previous testimonial",
  next: "Next testimonial",
} as const;

export const marqueeWords = ["Branding", "Web Design", "PPC", "SEO", "Consultation"] as const;

export const createCta = {
  eyebrow: "Build Your Digital Presence",
  title: "Create with Royal",
  body: "Your next website starts with an idea. Tell us about your business and explore what's possible.",
  placeholder: "Describe your vision, and watch AI build your website instantly.",
} as const;
