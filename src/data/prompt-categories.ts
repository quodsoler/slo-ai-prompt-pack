export interface PromptSubcategory {
  name: string;
  samplePrompts: string[];
}

export interface PromptCategory {
  id: string;
  name: string;
  count: number;
  subcategories: PromptSubcategory[];
}

export const promptCategories: PromptCategory[] = [
  {
    id: 'marketing',
    name: 'Marketing y Copywriting',
    count: 105,
    subcategories: [
      {
        name: 'Redes Sociales y Contenido',
        samplePrompts: [
          'Generador de calendarios de contenido mensual adaptados a tu sector',
          'Creador de carruseles para Instagram con ganchos que detienen el scroll',
          'Reciclador de un artículo en 10 piezas para distintas plataformas',
        ],
      },
      {
        name: 'Email Marketing y Newsletters',
        samplePrompts: [
          'Secuencias de bienvenida de 5 emails que convierten suscriptores en clientes',
          'Asuntos de email con tasas de apertura por encima del 40%',
          'Newsletters semanales que se escriben en 10 minutos',
        ],
      },
      {
        name: 'Copywriting y Textos de Venta',
        samplePrompts: [
          'Páginas de venta completas usando la fórmula PAS',
          'Descripciones de producto para ecommerce que destacan beneficios',
          'Anuncios de Google Ads y Meta Ads con múltiples variaciones',
        ],
      },
      {
        name: 'SEO y Contenido Web',
        samplePrompts: [
          'Artículos de blog optimizados para SEO con estructura perfecta',
          'Meta descriptions que aumentan el CTR en Google',
          'Investigación de palabras clave y clusters de contenido',
        ],
      },
      {
        name: 'Estrategia de Marca y Posicionamiento',
        samplePrompts: [
          'Definición de propuesta de valor única para tu negocio',
          'Creación de buyer personas detallados del mercado español',
          'Manual de tono y voz de marca',
        ],
      },
      {
        name: 'Análisis y Optimización',
        samplePrompts: [
          'Análisis de competencia para encontrar huecos en el mercado',
          'Auditor de landing pages que identifica puntos de mejora',
          'Generador de tests A/B para optimizar campañas',
        ],
      },
    ],
  },
  {
    id: 'business',
    name: 'Business y Autónomo',
    count: 105,
    subcategories: [
      {
        name: 'Gestión de Clientes y Ventas',
        samplePrompts: [
          'Propuestas comerciales profesionales que cierran proyectos',
          'Seguimiento de leads sin sonar a spam',
          'Respuestas para las 20 objeciones más comunes de clientes',
        ],
      },
      {
        name: 'Productividad y Organización',
        samplePrompts: [
          'Planificador semanal que prioriza tareas por impacto en facturación',
          'Resumen automático de reuniones con puntos de acción claros',
          'Sistema de revisión trimestral de objetivos de negocio',
        ],
      },
      {
        name: 'Comunicación Profesional',
        samplePrompts: [
          'Emails de cobro a morosos que mantienen la relación comercial',
          'Respuestas a reseñas negativas que convierten críticas en oportunidades',
          'Mensajes de LinkedIn para networking y captación B2B',
        ],
      },
      {
        name: 'Finanzas y Administración',
        samplePrompts: [
          'Documentación trimestral para tu gestoría',
          'Calculadora de tarifas: precios que cubran costes y dejen margen',
          'Informes financieros mensuales comprensibles',
        ],
      },
      {
        name: 'Estrategia de Negocio',
        samplePrompts: [
          'Análisis DAFO personalizado de tu negocio',
          'Plan de acción a 90 días con hitos medibles',
          'Evaluación de nuevas oportunidades y diversificación',
        ],
      },
      {
        name: 'Legal y Compliance',
        samplePrompts: [
          'Borradores de contratos de prestación de servicios',
          'Checklists de protección de datos (RGPD) para tu web',
          'Términos y condiciones adaptadas al mercado español',
        ],
      },
      {
        name: 'Formación y Desarrollo',
        samplePrompts: [
          'Plan de aprendizaje personalizado para tu sector',
          'Contenido formativo para cursos y talleres',
          'Preparación de ponencias y presentaciones profesionales',
        ],
      },
    ],
  },
  {
    id: 'social-media',
    name: 'Social Media',
    count: 65,
    subcategories: [
      {
        name: 'YouTube — Estrategia y Contenido',
        samplePrompts: [
          'Estrategia de canal de YouTube desde cero',
          'Títulos y miniaturas que generan clics',
          'Guiones para YouTube Shorts',
        ],
      },
      {
        name: 'Pinterest y Plataformas Visuales',
        samplePrompts: [
          'Estrategia de Pinterest para tráfico orgánico',
          'Descripciones de pines optimizadas para SEO',
          'Calendarios de contenido visual multiplataforma',
        ],
      },
      {
        name: 'Estrategia Social Media Avanzada',
        samplePrompts: [
          'Plan de social media integral a 90 días',
          'Análisis de métricas y reporting mensual',
          'Estrategia de crecimiento orgánico multiplataforma',
        ],
      },
    ],
  },
];

export const bonusItems = [
  {
    title: 'Guía Completa: Cómo Usar la IA (42 páginas)',
    description:
      '10 capítulos: framework RACE, técnicas avanzadas, workflows diarios, voz de marca, privacidad y más. Para que no solo copies y pegues, sino que domines la IA.',
  },
  {
    title: 'Sistema de Inicio Rápido',
    description:
      'De cero a tu primer resultado en 5 minutos. Configuración, principios clave y por dónde empezar según tu perfil.',
  },
  {
    title: 'Índice de Búsqueda por Objetivo',
    description:
      'Tabla completa con los 275+ prompts organizados por objetivo. Busca por categoría, tiempo disponible o tipo de resultado.',
  },
];
