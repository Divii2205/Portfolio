export type AchievementItem = {
  id: string
  title: string
  type: 'award' | 'recognition' | 'milestone'
  year: string
  place?: string
  organization?: string
  description: string
  highlight?: string
  tags: string[]
}

export const achievements: AchievementItem[] = [
  {
    id: 'design-hackathon-2024',
    title: 'Product Design Hackathon Winner',
    type: 'award',
    year: '2024',
    place: '1st Place',
    organization: 'Campus Innovation Lab',
    description:
      'Led a 3-person team to design and prototype an end-to-end logistics tracking experience in 24 hours, focusing on clarity, accessibility, and real-time feedback.',
    highlight: 'Judged best for usability, storytelling, and implementation detail.',
    tags: ['UI/UX', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'oss-contributions',
    title: 'Open Source Design & Frontend Contributions',
    type: 'milestone',
    year: '2023–2024',
    organization: 'GitHub',
    description:
      'Contributed to multiple open-source projects with UI refinements, accessibility fixes, and documentation improvements.',
    highlight: 'Helped ship polished UI to real users across several repositories.',
    tags: ['Open Source', 'Accessibility', 'Frontend'],
  },
  {
    id: 'mentorship-program',
    title: 'Student Mentor for Design & Dev',
    type: 'recognition',
    year: '2024',
    organization: 'Student Developer Club',
    description:
      'Mentored juniors on portfolio building, UX thinking, and frontend fundamentals, running weekly office-hours-style sessions.',
    tags: ['Mentorship', 'Community', 'Leadership'],
  },
  {
    id: 'speaker-invite',
    title: 'Invited Speaker – Design for Developers',
    type: 'recognition',
    year: '2023',
    organization: 'College Tech Fest',
    description:
      'Spoke about turning raw ideas into interfaces, using real case studies from personal and client projects.',
    tags: ['Public Speaking', 'Storytelling'],
  },
]

