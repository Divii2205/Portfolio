export type ProjectItem = {
  title: string
  category: string
  description: string
  tech: string[]
  link: string
  repo: string
  gradient: string
  image?: string[]
}

export const projects: ProjectItem[] = [
  {
    title: 'Blogger',
    category: 'Web App',
    description: 'A modern, full-stack social blogging platform built with the MERN stack. Write, share, and discover content with a beautiful, minimalistic interface.',
    tech: ['MongoDB', 'React', 'Node.js'],
    link: 'blogger-tau-five.vercel.app',
    repo: 'https://github.com/Divii2205/Blogger',
    gradient: 'from-[#f5d0fe]/70 via-[#c084fc]/70 to-[#a855f7]/80',
    image: ['/images/Blogger_SS/Home Page Dark Mode.png', '/images/Blogger_SS/Home Page Blogger.png', '/images/Blogger_SS/Post.png', '/images/Blogger_SS/Profile.png'],
  },
  {
    title: 'Coinvert App',
    category: 'App',
    description: 'A React Native mobile application that allows users to convert between different currencies using real-time exchange rates. The app features a clean, intuitive interface and uses the ExchangeRate-API for accurate currency conversion.',
    tech: ['Typescript', 'Kotlin', 'Android'],
    link: 'https://github.com/Divii2205/CoinVert',
    repo: 'https://github.com/Divii2205/CoinVert',
    gradient: 'from-[#c084fc]/70 via-[#a855f7]/70 to-[#7c3aed]/80',
    image: ['/images/Coinvert/Flash Screen.jpeg', '/images/Coinvert/EUR.jpeg', '/images/Coinvert/USD.jpeg'],
  },
  {
    title: 'Deadline Tracker',
    category: 'Web App',
    description: 'A powerful, user-friendly deadline tracking dashboard designed to help you track, and manage your important events, projects, and tasks hassle free! It helps you stay up to date with task completion! This is specially made to track my college related deadlines!',
    tech: ['Javascript'],
    link: 'https://deadline-tracker-v0.vercel.app/',
    repo: 'https://github.com/Divii2205/DeadlineTracker',
    gradient: 'from-[#a78bfa]/70 via-[#8b5cf6]/70 to-[#7c3aed]/80',
    image: ['/images/Deadline Tracker_SS/Home page.png', '/images/Deadline Tracker_SS/Calendar View.png'],
  },
  {
    title: 'Translation Tools',
    category: 'Web App',
    description: 'This project contains two primary tools: a Dictionary and a Language Translator. These tools help users to find word meanings, synonyms, antonyms, and examples or translate text between languages.',
    tech: ['Figma', 'Design Tokens', 'Research'],
    link: 'https://divii2205.github.io/Translator-Dictionary/',
    repo: 'https://github.com/Divii2205/Translator-Dictionary',
    gradient: 'from-[#f0abfc]/70 via-[#f472b6]/70 to-[#db2777]/80',
    image: ['/images/Translator/Landing Page.png', '/images/Translator/Dictionary.png', '/images/Translator/Translation.png'],
  },
]

