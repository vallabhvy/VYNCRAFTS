// Display/filter order. `tier` drives leadership visual hierarchy in the Team section.
export const teamMembers = [
  {
    name: 'Chaitanya',
    position: 'Core Team Member',
    tier: 'core',
    avatar: '/team/chaitanya.svg',
    color: '#5B4EFE',
  },
  {
    name: 'Suhas',
    position: 'Founder',
    tier: 'founder',
    avatar: '/team/suhas.svg',
    color: '#C8FF3E',
  },
  {
    name: 'Vallabh',
    position: 'Co-Founder',
    tier: 'cofounder',
    avatar: '/team/vallab.svg',
    color: '#F56B4A',
  },
  {
    name: 'Bhagya',
    position: 'Core Team Member',
    tier: 'core',
    avatar: '/team/bhagya.svg',
    color: '#8579A5',
  },
] as const

export type TeamMemberName = (typeof teamMembers)[number]['name']

// Leadership-ordered list for the Team showcase (Founder > Co-Founder > Core).
const tierRank = { founder: 0, cofounder: 1, core: 2 } as const
export const teamBySeniority = [...teamMembers].sort(
  (a, b) => tierRank[a.tier] - tierRank[b.tier],
)

export const teamStats = [
  { value: '4+', label: 'Core Team Members' },
  { value: '25+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
]

export const projects = [
  {
    id: 'harvest-table',
    name: 'Harvest Table',
    description: 'Restaurant reservation platform',
    type: 'Website',
    technologies: ['React', 'Node.js', 'MongoDB'],
    member: 'Chaitanya',
    image: '/projects/harvest-table.svg',
    accent: '#5B4EFE',
    demoHref: 'https://example.com/harvest-table',
    caseStudyHref: '#project-harvest-table',
  },
  {
    id: 'atelier',
    name: 'Atelier Studio',
    description: 'Creative studio AI assistant',
    type: 'AI Chatbot',
    technologies: ['Python', 'OpenAI', 'FastAPI'],
    member: 'Suhas',
    image: '/projects/atelier.svg',
    accent: '#C8FF3E',
    demoHref: 'https://example.com/atelier',
    caseStudyHref: '#project-atelier',
  },
  {
    id: 'pulse-ai',
    name: 'Pulse AI Support',
    description: '24/7 customer support automation',
    type: 'AI Chatbot',
    technologies: ['Next.js', 'LangChain', 'Postgres'],
    member: 'Suhas',
    image: '/projects/pulse-ai.svg',
    accent: '#C8FF3E',
    demoHref: 'https://example.com/pulse-ai',
    caseStudyHref: '#project-pulse-ai',
  },
  {
    id: 'northline',
    name: 'Northline Retail',
    description: 'Retail analytics dashboard',
    type: 'Dashboard',
    technologies: ['React', 'TypeScript', 'Recharts'],
    member: 'Vallabh',
    image: '/projects/northline.svg',
    accent: '#F56B4A',
    demoHref: 'https://example.com/northline',
    caseStudyHref: '#project-northline',
  },
  {
    id: 'insight-metrics',
    name: 'Insight Metrics',
    description: 'Real-time KPI visualization suite',
    type: 'Dashboard',
    technologies: ['Vue', 'D3.js', 'Supabase'],
    member: 'Vallabh',
    image: '/projects/insight-metrics.svg',
    accent: '#F56B4A',
    demoHref: 'https://example.com/insight-metrics',
    caseStudyHref: '#project-insight-metrics',
  },
  {
    id: 'clearpath',
    name: 'Clearpath Services',
    description: 'High-converting service landing page',
    type: 'Landing Page',
    technologies: ['Next.js', 'Tailwind', 'Framer'],
    member: 'Bhagya',
    image: '/projects/clearpath.svg',
    accent: '#8579A5',
    demoHref: 'https://example.com/clearpath',
    caseStudyHref: '#project-clearpath',
  },
  {
    id: 'bloom-studio',
    name: 'Bloom Studio',
    description: 'Brand microsite with motion design',
    type: 'Landing Page',
    technologies: ['Astro', 'GSAP', 'Tailwind'],
    member: 'Bhagya',
    image: '/projects/bloom-studio.svg',
    accent: '#8579A5',
    demoHref: 'https://example.com/bloom-studio',
    caseStudyHref: '#project-bloom-studio',
  },
  {
    id: 'summit',
    name: 'Summit Legal',
    description: 'Professional services website',
    type: 'Website',
    technologies: ['React', 'Node.js', 'Sanity'],
    member: 'Chaitanya',
    image: '/projects/summit.svg',
    accent: '#5B4EFE',
    demoHref: 'https://example.com/summit',
    caseStudyHref: '#project-summit',
  },
]

export const clientMarks = [
  { name: 'Harvest Table', mark: 'HT' },
  { name: 'Northline', mark: 'NL' },
  { name: 'Clearpath', mark: 'CP' },
  { name: 'Summit Legal', mark: 'SL' },
  { name: 'Atelier', mark: 'AT' },
]

export const services = [
  {
    title: 'Website Development',
    description: 'Fast, responsive websites built around clarity, speed and conversion.',
    icon: 'code',
    featured: true,
  },
  {
    title: 'AI Chatbots',
    description:
      'Smart assistants that answer questions, qualify leads and support customers around the clock.',
    icon: 'message',
  },
  {
    title: 'Business Automation',
    description: 'Automated workflows that connect your tools and remove repetitive manual tasks.',
    icon: 'automation',
  },
  {
    title: 'Dashboards & Analytics',
    description: 'Decision-ready dashboards that make business performance easier to track.',
    icon: 'chart',
  },
  {
    title: 'Landing Pages',
    description: 'Focused pages designed to turn campaigns, ads and launches into action.',
    icon: 'layout',
  },
  {
    title: 'Portfolio Websites',
    description:
      'Premium portfolio sites for creators, freelancers and firms that need instant credibility.',
    icon: 'briefcase',
    wide: true,
  },
]

export const team = [
  { name: 'Arjun', role: 'Frontend & Design', university: 'Northeastern University', initials: 'AR', color: '#5B4EFE' },
  { name: 'Maya', role: 'Backend & DevOps', university: 'Georgia Tech', initials: 'MY', color: '#C8FF3E' },
  { name: 'Sofia', role: 'Product & Strategy', university: 'UT Austin', initials: 'SO', color: '#F56B4A' },
  { name: 'James', role: 'QA & Delivery', university: 'University of Michigan', initials: 'JA', color: '#5B4EFE' },
]

export const processSteps = [
  {
    title: 'Discovery',
    description: 'We clarify your goals, audience, constraints and what success should look like.',
  },
  {
    title: 'Planning',
    description: 'Scope, timeline and deliverables are agreed upfront so the build has direction.',
  },
  {
    title: 'Design',
    description: 'We shape the interface, content hierarchy and conversion flow before development.',
  },
  {
    title: 'Development',
    description: 'Clean, maintainable builds with performance and accessibility baked in.',
  },
  {
    title: 'Testing',
    description: 'Cross-device checks, form flows and speed audits happen before handoff.',
  },
  {
    title: 'Launch',
    description: 'Launch support, documentation and a clear path for future improvements.',
  },
]

export const testimonials = [
  {
    name: 'Priya Sharma',
    business: 'Harvest Table - Restaurant Owner',
    quote:
      'They delivered in under two weeks and our booking page actually works on phones now. Reservations went up immediately — no fluff, just results.',
    avatar: '/avatars/priya-sharma.svg',
  },
  {
    name: 'Ravi ',
    business: 'Northline Retail - E-Commerce',
    quote:
      'Transparent pricing from day one. When we asked for something that would hurt performance, they told us straight and offered a better path.',
    avatar: '/avatars/marcus-chen.svg',
  },
  {
    name: 'Kumar Patel',
    business: 'Clearpath Services - Local Business',
    quote:
      'First agency that responded within a day and kept responding. The site feels professional without feeling like a template.',
    avatar: '/avatars/elena-ruiz.svg',
  },
]

export const contactLinks = {
  email: 'team@vyncrafts.com',
  /** International format without + */
  whatsappNumber: '918310985209',
} as const

const defaultWhatsAppMessage =
  "Hi VynCrafts, I'd like to discuss a project. Can we chat about what you can build for my business?"

export function getWhatsAppLink(message = defaultWhatsAppMessage) {
  if (!contactLinks.whatsappNumber) return null

  return `https://wa.me/${contactLinks.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function getFastContactLink() {
  return getWhatsAppLink() ?? `mailto:${contactLinks.email}?subject=${encodeURIComponent('Project inquiry')}`
}
