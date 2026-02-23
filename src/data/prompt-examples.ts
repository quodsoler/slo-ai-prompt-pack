export interface PromptExample {
  title: string;
  category: string;
  promptText: string;
  responsePreview: string;
}

export const promptExamples: PromptExample[] = [
  {
    title: 'Calendario de Contenido Mensual',
    category: 'Marketing',
    promptText:
      'Actúa como un estratega de contenido digital especializado en el mercado español. Crea un calendario de contenido para Instagram para [TU SECTOR] durante el mes de [MES]. Incluye 20 publicaciones distribuidas entre: posts de valor educativo (40%), contenido de marca personal (30%), y publicaciones orientadas a conversión (30%). Para cada publicación incluye: tipo de formato (carrusel, reel, imagen), gancho inicial, idea principal y CTA. Ten en cuenta festividades y eventos relevantes en España.',
    responsePreview:
      'Un calendario completo con 20 publicaciones listas para producir. Lo que antes te llevaba una tarde entera, resuelto en 90 segundos.',
  },
  {
    title: 'Email de Cobro a Morosos',
    category: 'Business',
    promptText:
      'Redacta un email profesional pero firme para reclamar el pago de una factura vencida hace [X] días a un cliente con el que quiero mantener buena relación comercial. El importe es de [CANTIDAD] euros. El tono debe ser asertivo pero respetuoso, recordando las condiciones acordadas. Incluye una fecha límite concreta para el pago y menciona de forma sutil las consecuencias de no pagar. Adaptado al contexto empresarial español.',
    responsePreview:
      'Un email que consigue que te paguen sin quemar la relación con el cliente. Probado y perfeccionado con decenas de autónomos reales.',
  },
  {
    title: 'Página de Venta con Fórmula PAS',
    category: 'Marketing',
    promptText:
      'Escribe una página de venta usando la fórmula Problema-Agitación-Solución para [TU PRODUCTO/SERVICIO] dirigida a [TU CLIENTE IDEAL] en España. Precio: [X] euros. Incluye: titular principal con beneficio específico, sección de problema con 3 puntos de dolor, agitación emocional, presentación de la solución, 5 beneficios principales, 3 testimonios ficticios (que luego sustituiré por reales), sección de precio con anclaje de valor, garantía y CTA final. Tono profesional y persuasivo, español peninsular.',
    responsePreview:
      'Una página de venta completa y profesional lista para adaptar. Lo que una agencia te cobraría 500-1.000 euros, lo tienes en 2 minutos.',
  },
];
