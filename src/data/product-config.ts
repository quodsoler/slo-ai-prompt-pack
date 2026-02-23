export const productConfig = {
  name: 'Pack de 275+ Prompts IA para Marketing y Negocios',
  price: 27,
  originalPrice: 67,
  currency: 'EUR',
  totalValue: 2450,

  headline:
    'Copia, Pega y Lanza: 275+ Prompts de IA Listos para Usar que Te Ahorran +10 Horas a la Semana en Marketing y Gestión de Tu Negocio',
  subheadline:
    'La colección más completa de prompts de inteligencia artificial diseñada específicamente para profesionales, autónomos y emprendedores en España. Sin cursos largos. Sin tecnicismos. Solo resultados desde el minuto uno.',
  preheadline:
    'El 73% de los profesionales en España ya están usando IA en su trabajo diario. Los que no, están perdiendo horas cada semana en tareas que podrían resolverse en minutos.',

  socialProof:
    'Usado por profesionales de marketing en toda España | Compatible con ChatGPT y Claude',

  valueStack: [
    { item: '105+ Prompts de Marketing y Copywriting', value: 197 },
    { item: '105+ Prompts de Business y Autónomo', value: 197 },
    { item: '65+ Prompts de Social Media', value: 147 },
    { item: 'Guía de Inicio Rápido con la IA', value: 47 },
    { item: 'Índice de Referencia Rápida', value: 27 },
    { item: 'Formato dual: Notion + PDF', value: 17 },
    { item: 'Actualizaciones futuras incluidas', value: 97 },
  ],

  guarantee:
    'Compra sin ningún riesgo. Si en los próximos 30 días sientes que el pack no te ha ahorrado al menos 10 veces lo que has pagado, te devolvemos el 100% de tu dinero. Sin preguntas. Sin formularios. Sin complicaciones.',

  upsell: {
    name: 'Sistema Completo de IA',
    price: 17,
    description:
      'Lleva tu productividad al siguiente nivel con plantillas avanzadas de automatización, workflows completos y estrategias de IA para escalar tu negocio.',
  },

  ctaLabels: {
    hero: 'Quiero Mis 275+ Prompts Ahora — 27 €',
    priceOffer: 'Sí, quiero mis 275+ prompts por solo 27 €',
    final: 'Quiero Mis 275+ Prompts Ahora — 27 €',
    stickyBar: 'Quiero Mis Prompts',
  },
} as const;

export type ProductConfig = typeof productConfig;
