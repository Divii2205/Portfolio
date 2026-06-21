export type ProjectItem = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  repo: string;
  gradient: string;
  image?: string[];
};

export const projects: ProjectItem[] = [
  {
    title: "UI/UX Designing",
    category: "Web + App Design",
    description:
      "Worked with 3+ startups on website and app UI/UX design. URX: A platform that sells keyboards and gaming assets. Shiphouse: A logistics management platform. College Dashboard: All in one platform.",
    tech: ["Figma", "Research"],
    link: "https://www.figma.com/design/enq1syc0YcY5fLzJ22t4YU/Design-Portfolio?node-id=0-1&t=zixFGUNS8qF05bvP-1",
    repo: "",
    gradient: "from-[#f0abfc]/70 via-[#f472b6]/70 to-[#db2777]/80",
    image: ["/images/Projects.png"],
  },
  {
    title: "NotebookLM RAG",
    category: "AI · RAG App",
    description:
    "A document chat app that lets you upload files, ask questions in plain language, and get answers from the uploaded content. Built with a Gemini-backed retrieval pipeline indexed into Qdrant.",
    tech: ["Next.js", "Gemini", "Qdrant", "RAG"],
    link: "https://google-notebooklm-2205.vercel.app/",
    repo: "https://github.com/Divii2205/Google-NotebookLM-RAG",
    gradient: "from-[#c084fc]/70 via-[#a855f7]/70 to-[#7c3aed]/80",
    image: ["/images/NotebookLM/live.png"],
  },
  {
    title: "Multi-Persona Chatbot",
    category: "AI Chatbot",
    description:
      "A multi-persona AI chatbot that lets you switch between different AI personalities, each with its own tone, style, and suggested questions. Every persona runs its own conversation thread.",
    tech: ["Next.js", "TypeScript", "LLM"],
    link: "https://multi-persona-chatbot.vercel.app/",
    repo: "https://github.com/Divii2205/Multi-Persona-Chatbot",
    gradient: "from-[#f5d0fe]/70 via-[#c084fc]/70 to-[#a855f7]/80",
    image: [
      "/images/MultiPersona/live.png",
      "/images/MultiPersona/Chat 01.png"
    ],
  },
  {
    title: "MoodScape Generator",
    category: "Creative Web App",
    description:
    "A creative app that helps people build a vibe based on how they feel. Pick a mood and it responds with matching visuals and sound to create an atmosphere for relaxing, focusing, or just enjoying the moment.",
    tech: ["React", "TypeScript", "Web Audio"],
    link: "https://moodscape-generator.vercel.app/",
    repo: "https://github.com/Divii2205/MoodScape-Generator",
    gradient: "from-[#f0abfc]/70 via-[#f472b6]/70 to-[#db2777]/80",
    image: [
      "/images/MoodScape/live.png",
      "/images/MoodScape/dreamy.png",
      "/images/MoodScape/chaos.png",
    ],
  },
  {
    title: "Project Manager",
    category: "Web App",
    description:
    "Track your personal projects from idea to shipped — a calm, premium dashboard for everything you build. Manage status, progress, priority, and tech stack across your portfolio in one place.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://project-manager-taupe-ten.vercel.app/",
    repo: "https://github.com/Divii2205/Project-Manager",
    gradient: "from-[#c084fc]/70 via-[#a855f7]/70 to-[#7c3aed]/80",
    image: [
      "/images/Project Manager/Dashboard.png",
      "/images/Project Manager/Project Page.png",
      "/images/Project Manager/Create Project.png",
    ],
  },
  {
    title: "Blogger",
    category: "Web App",
    description:
      "A modern, full-stack social blogging platform built with the MERN stack. Write, share, and discover content with a beautiful, minimalistic interface.",
    tech: ["MongoDB", "React", "Node.js"],
    link: "blogger-tau-five.vercel.app",
    repo: "https://github.com/Divii2205/Blogger",
    gradient: "from-[#f5d0fe]/70 via-[#c084fc]/70 to-[#a855f7]/80",
    image: [
      "/images/Blogger_SS/Home Page Dark Mode.png",
      "/images/Blogger_SS/Home Page Blogger.png",
      "/images/Blogger_SS/Post.png",
      "/images/Blogger_SS/Profile.png",
    ],
  },
];
