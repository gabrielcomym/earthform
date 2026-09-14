import type { NavigationItem, ServiceCardProps, TeamMemberCardProps } from '@/design-system'
import type { Language } from '@/design-system/components/LanguageSwitcher'

export type LandingContent = {
  navigationItems: readonly NavigationItem[]
  heroTitle: string
  teseLabel: string
  teseBody: readonly string[]
  metodoLabel: string
  metodoTitle: string
  services: readonly ServiceCardProps[]
  assessoriaLabel: string
  assessoriaTitle: string
  teamMembers: readonly TeamMemberCardProps[]
  atuacaoLabel: string
  expertiseAreas: readonly string[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonLabel: string
  heroAlt: string
  moduleAlt: string
  primaryNavLabel: string
  mobileNavLabel: string
  footerNavLabel: string
  menuLabel: string
  closeMenuLabel: string
  languageLabel: string
}

const portugueseNavigation: readonly NavigationItem[] = [
  { href: '#tese', label: 'Tese' }, { href: '#metodo', label: 'Método' }, { href: '#assessoria', label: 'Assessoria' }, { href: '#atuacao', label: 'Atuação' }, { href: '#contato', label: 'Contato' },
]

const englishNavigation: readonly NavigationItem[] = [
  { href: '#tese', label: 'Thesis' }, { href: '#metodo', label: 'Method' }, { href: '#assessoria', label: 'Advisory' }, { href: '#atuacao', label: 'Expertise' }, { href: '#contato', label: 'Contact' },
]

const portugueseServices: readonly ServiceCardProps[] = [
  { category: 'Decisão antes do código', description: 'Começamos pela incerteza que vale reduzir: quem decide, o que está em jogo e o que muda depois da resposta.' },
  { category: 'Serviços como laboratório', description: 'Diagnósticos e projetos de descoberta validam problemas reais, geram receita e revelam os padrões que merecem virar produto.' },
  { category: 'Design para sistemas complexos', description: 'Transformamos regras, dados e fluxos técnicos em experiências claras para quem precisa avaliar, operar e agir — sem esconder o rigor do domínio.' },
  { category: 'Produtos que escalam', description: 'Padrões comprovados viram fluxos, modelos e software. O objetivo é criar sistemas claros, repetíveis e prontos para ganhar escala.' },
]

const englishServices: readonly ServiceCardProps[] = [
  { category: 'Decisions before code', description: 'We start with the uncertainty worth reducing: who decides, what is at stake, and what changes after the answer.' },
  { category: 'Services as a proving ground', description: 'Diagnostics and discovery projects test real problems, generate revenue and reveal the patterns worth turning into products.' },
  { category: 'Design for complex systems', description: 'We turn rules, data and technical processes into clear experiences for people who need to assess, operate and act — without hiding the rigour of the domain.' },
  { category: 'Products built to scale', description: 'Proven patterns become workflows, models and software. The goal is to create systems that are clear, repeatable and ready to scale.' },
]

const portugueseTeam: readonly TeamMemberCardProps[] = [
  { bio: 'Pedro Seibel é geógrafo, doutor em Geografia pela PUC-Rio e mestre em Gestão Territorial pela Technische Universität München. Há 18 anos, desenvolve inteligência territorial e soluções digitais para desafios ambientais e fundiários, com experiência em projetos para GIZ, Banco Mundial, BID, FAO e PNUD. Combina ciência territorial, dados geoespaciais e inteligência artificial para transformar problemas complexos em produtos e ferramentas de apoio à decisão.', imageSrc: '/assets/Photo_Pedro.png', name: 'Pedro Seibel, PhD', role: 'Geoinformação, gestão territorial e inteligência ambiental' },
  { bio: 'Gabriel Comym é designer de produto e mestre em Artes Computacionais pela Goldsmiths, em Londres. Há mais de 20 anos, desenvolve produtos digitais, plataformas de dados e ferramentas para públicos técnicos. Na McKinsey / QuantumBlack, liderou o design do Kedro, framework open source para ciência de dados reproduzível usado por equipes da NASA, e desenvolveu projetos para Apple, Google, Microsoft, HSBC e Santander.', imageSrc: '/assets/Photo_Gabriel.png', name: 'Gabriel Comym', role: 'Design de produto, estratégia e experiências digitais' },
]

const englishTeam: readonly TeamMemberCardProps[] = [
  { bio: 'Pedro Seibel is a geographer with a PhD from PUC-Rio and a master’s in Territorial Management from Technische Universität München. For 18 years, he has developed territorial intelligence and digital solutions for environmental and land-management challenges, working with GIZ, the World Bank, the IDB, FAO and UNDP. He combines territorial science, geospatial data and AI to turn complex problems into decision-support tools.', imageSrc: '/assets/Photo_Pedro.png', name: 'Pedro Seibel, PhD', role: 'Land, Environmental & Geospatial Intelligence' },
  { bio: 'Gabriel Comym is a product designer with a master’s in Computational Arts from Goldsmiths, University of London. For more than 20 years, he has developed digital products, data platforms and tools for technical audiences. At McKinsey / QuantumBlack, he led the design of Kedro, an open-source framework for reproducible data science used by NASA teams, and developed projects for Apple, Google, Microsoft, HSBC and Santander.', imageSrc: '/assets/Photo_Gabriel.png', name: 'Gabriel Comym', role: 'Product design, strategy and digital experiences' },
]

export const landingContent: Record<Language, LandingContent> = {
  pt: {
    navigationItems: portugueseNavigation, heroTitle: 'Inteligência territorial para decisões que movem capital e impacto.', teseLabel: 'Tese', teseBody: ['Dados territoriais só importam quando ajudam a decidir.', 'Imagens de satélite, cadastros, regras e dados de campo já existem. O desafio é transformar essa informação em respostas claras sobre onde investir, quais riscos assumir, o que priorizar e como acompanhar resultados.'], metodoLabel: 'Método', metodoTitle: 'Da decisão crítica ao produto que escala.', services: portugueseServices, assessoriaLabel: 'Assessoria', assessoriaTitle: 'Design com repertório de território. A Earthform reúne prática em design de produto, estratégia e geoinformação. Trabalhamos próximos ao time, conectando negócio, operação, dados e experiência.', teamMembers: portugueseTeam, atuacaoLabel: 'Atuação', expertiseAreas: ['‣ Restauração e carbono', '‣ Risco fundiário', '‣ Conformidade ambiental', '‣ Monitoramento territorial', '‣ Dados para decisão'], ctaTitle: 'Decisões de alto risco exigem mais que dados.', ctaDescription: 'Transforme dados territoriais e regras complexas em decisões mais rápidas, seguras e acionáveis.', ctaButtonLabel: 'Falar com a Earthform', heroAlt: 'Imagem de território vista por satélite', moduleAlt: 'Imagem territorial em cores naturais', primaryNavLabel: 'Navegação principal', mobileNavLabel: 'Navegação móvel', footerNavLabel: 'Navegação do rodapé', menuLabel: 'Menu', closeMenuLabel: 'Fechar', languageLabel: 'Idioma',
  },
  en: {
    navigationItems: englishNavigation, heroTitle: 'Territorial intelligence for decisions that move capital and impact.', teseLabel: 'Thesis', teseBody: ['Territorial data only matters when it helps people decide.', 'Satellite imagery, land records, regulations, and field data already exist. The challenge is turning this information into clear answers about where to invest, which risks to take, what to prioritise, and how to track outcomes.'], metodoLabel: 'Method', metodoTitle: 'From critical decisions to scalable products.', services: englishServices, assessoriaLabel: 'Advisory', assessoriaTitle: 'Design grounded in territorial expertise. Earthform brings together practice across product design, strategy and geoinformation. We work closely with teams, connecting business, operations, data and experience.', teamMembers: englishTeam, atuacaoLabel: 'Expertise', expertiseAreas: ['‣ Restoration and carbon', '‣ Land tenure risk', '‣ Environmental compliance', '‣ Territorial monitoring', '‣ Data for decision-making'], ctaTitle: 'High-stakes decisions require more than data.', ctaDescription: 'Turn territorial data and complex regulations into faster, safer and more actionable decisions.', ctaButtonLabel: 'Talk to Earthform', heroAlt: 'Satellite view of a territory', moduleAlt: 'Territorial image in natural colours', primaryNavLabel: 'Main navigation', mobileNavLabel: 'Mobile navigation', footerNavLabel: 'Footer navigation', menuLabel: 'Menu', closeMenuLabel: 'Close', languageLabel: 'Language',
  },
}

export const navigationItems = portugueseNavigation
export const services = portugueseServices
export const teamMembers = portugueseTeam
