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
  { name: "Full-Stack Project", description: "End-to-end product build, frontend through backend." },
  { name: "Consultation", description: "Advice session on architecture, performance, or design." },
] as const;

export const BOOKABLE_SERVICES: string[] = SERVICES.map((service) => service.name);

export const PROJECTS = [
  {
    name: "Quantum Dashboard",
    description:
      "Real-time analytics platform with 3D data visualization and predictive AI insights.",
    tech: ["React", "Three.js", "Python", "AI"],
  },
  {
    name: "Neural Interface",
    description:
      "Brain-computer interface prototype for accessible web navigation using ML models.",
    tech: ["TensorFlow", "WebGL", "Node.js"],
  },
  {
    name: "Synthwave Studio",
    description:
      "Web-based music production tool with real-time audio processing and visual feedback.",
    tech: ["Web Audio", "Canvas", "React"],
  },
  {
    name: "CryptoVerse",
    description:
      "Decentralized portfolio tracker with animated charts and real-time market data.",
    tech: ["Solidity", "React", "D3.js"],
  },
] as const;

export const PROFILE = {
  name: "Areeb",
  role: "Developer — web, mobile, and interactive 3D experiences",
  email: "alliareeb650@gmail.com",
  phone: "033066528075",
  location: "North Karachi, Sector 11-C, Karachi, Pakistan",
  responseTime: "Usually replies within 24 hours",
} as const;
