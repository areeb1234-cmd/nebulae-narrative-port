export const SERVICES = [
  {
    name: "Web Development",
    description:
      "High-performance web applications built with React, Next.js, and modern frameworks.",
  },
  {
    name: "Mobile App",
    description:
      "Cross-platform mobile experiences with React Native and native-like performance.",
  },
  {
    name: "3D & Interactive",
    description:
      "Immersive 3D web experiences using Three.js, WebGL, and custom shaders.",
  },
  {
    name: "UI/UX Design",
    description:
      "User-centered design with prototyping, motion design, and design systems.",
  },
  {
    name: "Digital Marketing",
    description:
      "Results-focused campaigns, content strategy, SEO, and audience growth across digital channels.",
  },
  { name: "Full-Stack Project", description: "End-to-end product build, frontend through backend." },
  { name: "Consultation", description: "Advice session on architecture, performance, or design." },
] as const;

export const BOOKABLE_SERVICES: string[] = SERVICES.map((service) => service.name);

export const PROJECTS = [
  {
    name: "FurEver Care",
    description:
      "A next-generation pet wellness and AI care platform built for the Aptech TechWiz 6 competition. Features complete UI/UX design, emergency triage protocols, and integrated AI tools.",
    tech: ["React", "Vite", "Tailwind CSS"],
  },
  {
    name: "Justicia",
    description:
      "A full-stack legal services platform featuring comprehensive lawyer profiling, role-based access, and a seamless appointment booking system.",
    tech: ["PHP", "MySQL", "Web Development"],
  },
] as const;

export const PROFILE = {
  name: "M. Areeb",
  role: "Developer — web, mobile, and interactive 3D experiences",
  email: "alliareeb650@gmail.com",
  phone: "03306528075",
  location: "North Karachi, Karachi, Pakistan",
  responseTime: "Usually replies within 24 hours",
} as const;
