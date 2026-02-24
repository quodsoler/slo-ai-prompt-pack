export const productConfig = {
  name: 'Pack de 275+ Prompts IA para Marketing y Negocios',
  price: 27,
  originalPrice: 67,
  currency: 'EUR',

  headline:
    'Deja de Perder Horas con la IA. 275+ Prompts Profesionales que Trabajan por Ti Desde el Minuto Uno.',
  subheadline:
    'Copia, pega y obtén resultados profesionales en 90 segundos. Marketing, ventas, contenido, gestión… Todo adaptado al mercado español. Sin cursos. Sin tecnicismos. Solo resultados.',
  preheadline:
    'Para autónomos, freelancers y emprendedores en España que quieren dejar de perder tiempo con la IA y empezar a ganar dinero con ella.',

  socialProof:
    'Compatible con ChatGPT, Claude y Gemini | Formato PDF | Acceso inmediato',

  valueStack: [
    { item: '105+ Prompts de Marketing y Copywriting — emails, posts, páginas de venta, SEO, anuncios', value: 297 },
    { item: '105+ Prompts de Gestión de Negocio — propuestas, contratos, cobros, planificación, finanzas', value: 297 },
    { item: '65+ Prompts de Social Media — Instagram, LinkedIn, YouTube, Pinterest, estrategia', value: 197 },
    { item: 'BONUS: Guía Completa de IA para Marketing y Negocios (42 págs., 10 capítulos)', value: 197 },
    { item: 'BONUS: Sistema de Inicio Rápido — de cero a resultados en 5 minutos', value: 47 },
    { item: 'BONUS: Índice de Búsqueda por Objetivo — encuentra el prompt exacto en segundos', value: 27 },
    { item: 'BONUS: Actualizaciones de por vida incluidas', value: 97 },
  ],

  guarantee:
    'Garantía "10x o Te Devolvemos Todo." Usa los prompts durante 30 días completos. Si no recuperas al menos 10 veces los 27 € que has invertido — ya sea en horas ahorradas, contenido creado o propuestas enviadas — te devolvemos hasta el último céntimo. Un email. Sin preguntas. Sin formularios. El riesgo es 100% nuestro.',

  upsell: {
    name: 'Sistema Completo de IA',
    price: 17,
    description:
      'Lleva tu productividad al siguiente nivel con plantillas avanzadas de automatización, workflows completos y estrategias de IA para escalar tu negocio.',
  },

  ctaLabels: {
    hero: 'Quiero Mis 275+ Prompts + Guía Gratis',
    priceOffer: 'Sí, quiero todo por solo 27 €',
    final: 'Quiero Empezar a Ahorrar Horas Hoy — 27 €',
    stickyBar: 'Conseguir Mis Prompts — 27 €',
  },
} as const;

export type ProductConfig = typeof productConfig;
