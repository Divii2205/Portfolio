export type ExperienceItem = {
  id: number
  role: string
  company: string
  period: string
  description: string
  skills: string[]
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'UI/UX Designer',
    company: 'URX, Shiphouse',
    period: '2025 (3 months)',
    description:
      'Created user-friendly app screens and web pages that were deployed live. Designed promotional graphics supporting marketing and outreach.',
    skills: ['UI/UX', 'Figma', 'Graphic Design'],
  },
  {
    id: 2,
    role: 'Junior Under Officer',
    company: 'National Cadet Corps',
    period: '2022 - 2024',
    description:
      'Led cadets, maintained discipline, organized drills, and supported execution of unit activities and events.',
    skills: ['Leadership', 'Discipline', 'Teamwork'],
  },
  {
    id: 3,
    role: 'Contributor',
    company: 'NYAS, 1K Girls 1K Futures',
    period: '2020 - 2024',
    description:
      'Built solutions for real-world problems, received mentorship, joined workshops, and collaborated with peers worldwide.',
    skills: ['Problem Solving', 'Critical Thinking', 'Teamwork'],
  },
  {
    id: 4,
    role: 'Teaching Volunteer',
    company: 'Pratham Education Foundation',
    period: '2019 - 2020',
    description:
      'Mentored and taught underprivileged children, helping them in their learning journey.',
    skills: ['Mentorship', 'Communication', 'Patience', 'Confidence'],
  },
]

