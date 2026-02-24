export const privacyPolicy = {
  title: 'Política de Privacidad',
  lastUpdated: '2026-02-23',
  sections: [
    {
      heading: '1. Responsable del Tratamiento',
      content: `Identidad: [NOMBRE_COMPLETO]
NIF/CIF: [NIF_CIF]
Dirección: [DIRECCION]
Email de contacto: [EMAIL_CONTACTO]`,
    },
    {
      heading: '2. Datos que Recopilamos',
      content: `Recopilamos los siguientes tipos de datos:

**Datos de navegación (analíticos):** Dirección IP anonimizada, tipo de navegador, páginas visitadas, tiempo de permanencia y fuente de tráfico, mediante Google Analytics 4.

**Datos publicitarios:** Identificadores de cookies para Google Ads y Meta (Facebook) Pixel, utilizados para medir la efectividad de nuestras campañas publicitarias.

**Datos de compra:** Los datos de pago y facturación son procesados exclusivamente por Systeme.io (nuestro procesador de pagos). No almacenamos datos de tarjeta de crédito en nuestro sitio web.`,
    },
    {
      heading: '3. Base Legal del Tratamiento',
      content: `**Consentimiento (Art. 6.1.a RGPD):** Para cookies analíticas y de marketing. Solo se activan tras tu consentimiento expreso en el banner de cookies.

**Ejecución del contrato (Art. 6.1.b RGPD):** Para procesar tu compra y entregarte el producto digital adquirido.

**Interés legítimo (Art. 6.1.f RGPD):** Para la prevención de fraude y seguridad del sitio web.`,
    },
    {
      heading: '4. Período de Conservación',
      content: `- Datos analíticos: 26 meses (período estándar de GA4)
- Datos publicitarios: 90 días (cookies de Google Ads y Facebook Pixel)
- Datos de compra: Según la política de retención de Systeme.io y las obligaciones fiscales aplicables (mínimo 4 años según normativa española)
- Cookie de consentimiento: 12 meses`,
    },
    {
      heading: '5. Tus Derechos',
      content: `De conformidad con el RGPD y la LOPD-GDD, tienes derecho a:

- **Acceso:** Solicitar una copia de tus datos personales.
- **Rectificación:** Corregir datos inexactos o incompletos.
- **Supresión:** Solicitar la eliminación de tus datos ("derecho al olvido").
- **Portabilidad:** Recibir tus datos en formato estructurado y legible por máquina.
- **Oposición:** Oponerte al tratamiento de tus datos en determinados supuestos.
- **Limitación:** Solicitar la restricción del tratamiento de tus datos.

Para ejercer cualquiera de estos derechos, escríbenos a [EMAIL_CONTACTO].

También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): https://www.aepd.es`,
    },
    {
      heading: '6. Transferencias Internacionales de Datos',
      content: `Algunos de nuestros proveedores de servicios están ubicados fuera del Espacio Económico Europeo:

- **Google LLC (EE.UU.):** Google Analytics 4 y Google Ads. Transferencia protegida mediante Cláusulas Contractuales Tipo de la UE.
- **Meta Platforms Inc (EE.UU.):** Facebook Pixel. Transferencia protegida mediante Cláusulas Contractuales Tipo de la UE.
- **Systeme.io (UE — AWS Irlanda):** Procesamiento de pagos y entrega de producto. Los datos se almacenan en la UE.`,
    },
    {
      heading: '7. Cookies',
      content: `Utilizamos las siguientes cookies en nuestro sitio web:`,
    },
  ],
};

export const cookieTable = [
  {
    name: 'cookie_consent',
    provider: 'Propio',
    purpose: 'Almacena las preferencias de consentimiento de cookies del usuario',
    type: 'Necesaria',
    duration: '1 año',
  },
  {
    name: '_ga',
    provider: 'Google Analytics',
    purpose: 'Distingue usuarios únicos',
    type: 'Analítica',
    duration: '2 años',
  },
  {
    name: '_ga_*',
    provider: 'Google Analytics',
    purpose: 'Mantiene el estado de la sesión',
    type: 'Analítica',
    duration: '2 años',
  },
  {
    name: '_gid',
    provider: 'Google Analytics',
    purpose: 'Distingue usuarios únicos',
    type: 'Analítica',
    duration: '24 horas',
  },
  {
    name: '_gcl_au',
    provider: 'Google Ads',
    purpose: 'Almacena datos de conversión',
    type: 'Marketing',
    duration: '90 días',
  },
  {
    name: '_fbp',
    provider: 'Meta (Facebook)',
    purpose: 'Rastrea visitas para entrega de anuncios',
    type: 'Marketing',
    duration: '90 días',
  },
];

export const legalNotice = {
  title: 'Aviso Legal',
  sections: [
    {
      heading: '1. Datos Identificativos (Art. 10 LSSI)',
      content: `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa al usuario de los siguientes datos:

- **Titular:** [NOMBRE_COMPLETO]
- **NIF/CIF:** [NIF_CIF]
- **Domicilio:** [DIRECCION]
- **Email de contacto:** [EMAIL_CONTACTO]
- **Datos registrales:** [REGISTRO_MERCANTIL]`,
    },
    {
      heading: '2. Objeto',
      content: `El presente sitio web tiene como finalidad la promoción y venta de productos digitales relacionados con inteligencia artificial y productividad para profesionales y autónomos en España.`,
    },
    {
      heading: '3. Propiedad Intelectual e Industrial',
      content: `Todos los contenidos de este sitio web, incluyendo textos, imágenes, diseños, logotipos y código fuente, están protegidos por la legislación vigente en materia de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa del titular.`,
    },
    {
      heading: '4. Responsabilidad',
      content: `El titular no se responsabiliza de los posibles daños o perjuicios derivados de interferencias, interrupciones, virus informáticos, averías o desconexiones en el funcionamiento operativo del sistema electrónico, motivadas por causas ajenas a su control.`,
    },
    {
      heading: '5. Ley Aplicable y Jurisdicción',
      content: `Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de [CIUDAD].`,
    },
  ],
};

export const termsAndConditions = {
  title: 'Términos y Condiciones',
  sections: [
    {
      heading: '1. Información General',
      content: `Este documento regula las condiciones generales de contratación del producto digital "Pack de 275+ Prompts IA para Marketing y Negocios" (en adelante, "el Producto") ofrecido por [NOMBRE_COMPLETO] con NIF/CIF [NIF_CIF] y domicilio en [DIRECCION] (en adelante, "el Vendedor").`,
    },
    {
      heading: '2. Naturaleza del Producto',
      content: `El Producto es un contenido digital de descarga/acceso inmediato que incluye:
- 275+ prompts de inteligencia artificial organizados por categorías (PDF)
- Guía Completa de IA para Marketing y Negocios (PDF)
- Guía de inicio rápido
- Actualizaciones futuras

No se envía ningún producto físico. La entrega es exclusivamente electrónica.`,
    },
    {
      heading: '3. Precio y Pago',
      content: `- **Precio:** 27 € (IVA del 21% incluido)
- **Forma de pago:** Tarjeta de crédito/débito a través de Stripe (procesado por Systeme.io)
- **Pago único:** No hay suscripciones ni cargos recurrentes
- Todos los precios mostrados incluyen el IVA aplicable (21% para productos digitales en España)`,
    },
    {
      heading: '4. Entrega del Producto',
      content: `Tras completar la compra, recibirás un email automático con los enlaces de acceso al producto en un plazo máximo de 5 minutos. Si no recibes el email, revisa tu carpeta de spam o contacta con nosotros en [EMAIL_CONTACTO].`,
    },
    {
      heading: '5. Garantía de Devolución',
      content: `Ofrecemos una garantía de devolución de 30 días desde la fecha de compra. Si por cualquier motivo no estás satisfecho con el producto, puedes solicitar la devolución íntegra del importe pagado contactando a [EMAIL_CONTACTO]. No se requiere justificación.`,
    },
    {
      heading: '6. Derecho de Desistimiento',
      content: `De conformidad con la Directiva 2011/83/UE sobre derechos de los consumidores y el Real Decreto Legislativo 1/2007, el consumidor dispone de un plazo de 14 días naturales para ejercer el derecho de desistimiento.

No obstante, al tratarse de un contenido digital suministrado de forma inmediata, el consumidor acepta expresamente durante el proceso de compra (gestionado por Systeme.io) que renuncia al derecho de desistimiento una vez iniciada la descarga o acceso al contenido digital, conforme al artículo 103.m) del citado Real Decreto.

En cualquier caso, nuestra garantía comercial de 30 días (apartado 5) ofrece una protección superior al derecho de desistimiento legal.`,
    },
    {
      heading: '7. Uso del Producto',
      content: `La licencia adquirida es personal e intransferible. El comprador puede utilizar los prompts para fines propios y para proyectos de sus clientes, pero no puede redistribuir, revender ni compartir el acceso al producto con terceros.`,
    },
    {
      heading: '8. Limitación de Responsabilidad',
      content: `Los resultados obtenidos mediante el uso de los prompts dependen de múltiples factores, incluyendo la herramienta de IA utilizada, la personalización aplicada y el contexto de uso. El Vendedor no garantiza resultados específicos de facturación, ahorro de tiempo u otros beneficios mencionados con fines orientativos en la página de venta.`,
    },
    {
      heading: '9. Protección de Datos',
      content: `El tratamiento de datos personales se rige por nuestra Política de Privacidad, accesible en /politica-privacidad.`,
    },
    {
      heading: '10. Ley Aplicable y Jurisdicción',
      content: `El presente contrato se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de [CIUDAD], sin perjuicio del fuero del consumidor cuando este resulte de aplicación.`,
    },
  ],
};
