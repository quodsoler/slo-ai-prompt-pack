# Mega Pack: 50 Prompts Avanzados de Automatización

> **Producto complementario** | Prompts A-001 a A-050
>
> Este pack avanzado es el complemento perfecto del Pack de 200+ Prompts. Aquí vas un paso más allá: automatizaciones con Zapier y Make.com, fórmulas inteligentes para hojas de cálculo, y cadenas de prompts multi-paso que resuelven tareas complejas de principio a fin. Si el pack principal te da las piezas, este te enseña a montar la máquina.

---

## Categoría 1: Flujos de Automatización con Zapier/Make.com

### A-001: Automatización Email-a-CRM

**Prompt:**
> Diseña un flujo de automatización completo en [Zapier/Make.com] para capturar leads desde email y registrarlos automáticamente en mi CRM:
> - CRM que uso: [HubSpot/Pipedrive/Notion/Google Sheets]
> - Correo: [Gmail/Outlook]
> - Criterio para identificar un lead en email: [asunto contiene "presupuesto" / viene de formulario web / etc.]
> - Datos a extraer: [nombre, email, empresa, teléfono, mensaje]
>
> Describe el flujo paso a paso: Trigger → Filtro → Acciones → Confirmación. Incluye: configuración del trigger, filtros necesarios, mapeo de campos, y acción de notificación. Formato: diagrama textual con cada paso numerado.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier o Make.com + CRM
**Resultado esperado:** Un flujo listo para implementar que capture leads automáticamente desde el correo y los registre en tu CRM sin intervención manual.
**Consejos:**
- En Make.com, usa el módulo "Watch Emails" con filtros por asunto o remitente para evitar procesar todos los correos.
- Añade un paso de deduplicación para evitar registros duplicados en el CRM.

---

### A-002: Pipeline de Publicación en Redes Sociales

**Prompt:**
> Diseña un flujo de automatización para programar y publicar contenido en redes sociales automáticamente:
> - Fuente de contenido: [Google Sheets / Notion / Airtable con un calendario editorial]
> - Redes sociales objetivo: [Instagram, LinkedIn, Twitter]
> - Herramienta de publicación: [Buffer/Hootsuite/Later]
> - Frecuencia: [X posts/semana por red]
>
> El flujo debe: (1) detectar nuevo contenido en la fuente, (2) formatear el post para cada red social (longitud, hashtags, menciones), (3) programarlo en la herramienta de publicación, (4) marcar como "programado" en la fuente. Incluye triggers, filtros, y acciones detalladas.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier/Make.com + Google Sheets/Notion + Buffer/Hootsuite
**Resultado esperado:** Un sistema que toma contenido de tu calendario editorial y lo programa automáticamente en múltiples redes.
**Consejos:**
- Usa columnas separadas en tu hoja para el texto de cada red (LinkedIn es más largo, Twitter más corto).
- Programa las publicaciones en los horarios óptimos para España: LinkedIn 8-9h, Instagram 13-14h y 20-21h.

---

### A-003: Generación Automática de Facturas

**Prompt:**
> Diseña un flujo para generar facturas automáticamente cuando un proyecto se marca como completado:
> - Herramienta de gestión: [Notion/Trello/Asana/Google Sheets]
> - Herramienta de facturación: [Holded/Quipu/Facturas.com/Google Docs]
> - Datos de factura: base imponible, IVA 21%, retención IRPF 15% (si aplica)
> - Trigger: [cambio de estado a "Completado" / columna marcada]
>
> El flujo debe: (1) detectar el cambio de estado, (2) extraer datos del proyecto (cliente, importe, concepto), (3) crear la factura en la herramienta de facturación con numeración correlativa, (4) enviar la factura por email al cliente, (5) registrar en hoja de seguimiento de cobros. Incluye gestión de errores.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Zapier/Make.com + herramienta de facturación + email
**Resultado esperado:** Un flujo end-to-end que genera y envía facturas sin intervención manual al completar un proyecto.
**Consejos:**
- En España, la numeración de facturas debe ser correlativa y sin saltos: incluye un paso de verificación.
- Añade un delay de 24h antes de enviar para poder revisar la factura si es necesario.

---

### A-004: Onboarding Automático de Clientes

**Prompt:**
> Diseña un flujo de onboarding automático que se dispare cuando un nuevo cliente firma un contrato o realiza un pago:
> - Trigger: [pago recibido en Stripe / formulario completado / fila añadida en Sheets]
> - Pasos del onboarding: [email de bienvenida → cuestionario inicial → acceso a herramientas → reunión de kickoff]
> - Herramientas: [email, Google Forms, Calendly, Notion/Drive]
>
> Describe cada paso con tiempos (inmediato, +1 día, +3 días): (1) Email de bienvenida con accesos, (2) Envío de cuestionario/brief del proyecto, (3) Crear carpeta/proyecto en herramienta de gestión, (4) Programar reunión de kickoff vía Calendly, (5) Notificación interna al equipo. Incluye rama condicional: si el cuestionario no se completa en 48h, enviar recordatorio.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Zapier/Make.com + email + Calendly + Google Forms + gestor de proyectos
**Resultado esperado:** Un onboarding profesional y consistente que no requiere seguimiento manual.
**Consejos:**
- El email de bienvenida debe enviarse en los 5 minutos siguientes al pago.
- Incluye un vídeo de bienvenida grabado para dar un toque personal sin esfuerzo repetido.

---

### A-005: Sistema de Lead Scoring Automatizado

**Prompt:**
> Diseña un sistema de lead scoring automatizado para mi negocio:
> - Fuentes de leads: [formulario web, email, LinkedIn, referidos]
> - Criterios de puntuación: [industria, tamaño empresa, cargo, interacción con contenido, urgencia]
> - CRM o base de datos: [HubSpot/Notion/Google Sheets]
> - Umbral de lead caliente: [puntuación mínima para contactar]
>
> Crea la tabla de puntuación (criterio + puntos), el flujo automatizado que asigna puntos al recibir cada interacción, y la notificación cuando un lead supera el umbral. Incluye: decay (reducción de puntos si no hay interacción en X días) y escalado automático de leads fríos a secuencia de nurturing.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Zapier/Make.com + CRM/Sheets + email
**Resultado esperado:** Un sistema que prioriza automáticamente los leads con mayor probabilidad de conversión.
**Consejos:**
- Empieza con 5-7 criterios simples y refina con datos reales después de 3 meses.
- En el mercado español B2B, la fuente "referido" debería tener doble puntuación que otras fuentes.

---

### A-006: Repurposing Automático de Contenido

**Prompt:**
> Diseña un flujo que tome un artículo de blog publicado y automáticamente genere contenido para otras plataformas:
> - Fuente: [RSS del blog / webhook de WordPress / nueva fila en Sheets]
> - Outputs deseados: [3 posts de LinkedIn, 5 tweets, 1 carrusel de Instagram, 1 email para newsletter]
>
> El flujo debe: (1) detectar nuevo artículo, (2) extraer título y contenido, (3) usar un módulo de IA (OpenAI/Claude API) para generar las versiones adaptadas, (4) guardar los outputs en una hoja de contenido, (5) opcionalmente programarlos en Buffer/Hootsuite. Incluye los prompts específicos que debe usar cada módulo de IA para cada plataforma.

**Nivel:** Avanzado
**Herramientas:** ChatGPT API + Make.com + WordPress/Blog + Buffer + Google Sheets
**Resultado esperado:** Un sistema que multiplica x5 cada pieza de contenido sin esfuerzo adicional.
**Consejos:**
- Ajusta el tono por plataforma: LinkedIn más profesional, Twitter más directo, Instagram más visual.
- Revisa los outputs de IA antes de publicar; automatiza la generación, no la publicación final.

---

### A-007: Recopilación Automática de Feedback de Clientes

**Prompt:**
> Diseña un flujo para recopilar feedback de clientes automáticamente al finalizar cada proyecto:
> - Trigger: [proyecto marcado como entregado / factura pagada / X días después de entrega]
> - Herramienta de encuesta: [Google Forms / Typeform / email directo]
> - Destino de las respuestas: [Google Sheets / Notion / CRM]
>
> El flujo debe: (1) enviar encuesta de satisfacción, (2) si la puntuación es ≥8/10 → pedir reseña pública (Google Business/LinkedIn), (3) si la puntuación es <6/10 → alertar para seguimiento personal, (4) registrar todas las respuestas para análisis. Incluye la encuesta (5 preguntas NPS + abiertas).

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier/Make.com + Google Forms/Typeform + email
**Resultado esperado:** Un sistema que captura feedback de cada cliente y convierte a los satisfechos en promotores.
**Consejos:**
- El mejor momento para pedir feedback es justo cuando el cliente está contento (entrega exitosa).
- Mantén la encuesta en 3-5 preguntas máximo; más de eso y no la completarán.

---

### A-008: Notificaciones de Pagos Recibidos

**Prompt:**
> Diseña un flujo de notificaciones inteligentes para pagos recibidos:
> - Plataforma de pago: [Stripe/PayPal/transferencia bancaria detectada]
> - Notificaciones deseadas: [Slack, email, WhatsApp, actualización en Sheets]
> - Datos a incluir: [cliente, importe, concepto, fecha]
>
> El flujo debe: (1) detectar nuevo pago, (2) identificar a qué factura corresponde, (3) enviar notificación con los datos, (4) actualizar el estado de la factura en tu hoja de seguimiento a "Cobrada", (5) disparar el email de agradecimiento al cliente. Incluye gestión de pagos parciales.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier/Make.com + Stripe/Banco + Sheets + Slack/email
**Resultado esperado:** Saber al instante cuándo recibes un pago y tener la contabilidad actualizada automáticamente.
**Consejos:**
- Si usas Stripe, el trigger "Payment Intent Succeeded" es más fiable que "Charge Succeeded".
- Para transferencias bancarias, usa servicios como Plaid o revisa la API de tu banco si la ofrece.

---

### A-009: Organización Automática de Archivos

**Prompt:**
> Diseña un flujo para organizar archivos de clientes automáticamente:
> - Almacenamiento: [Google Drive / Dropbox / OneDrive]
> - Estructura de carpetas: [Cliente > Año > Tipo (facturas, contratos, entregables)]
> - Trigger: [nuevo archivo subido / nuevo email con adjunto / formulario]
>
> El flujo debe: (1) detectar nuevo archivo, (2) renombrar con formato estándar [AAAA-MM-DD_Cliente_Tipo_Descripción], (3) mover a la carpeta correcta basándose en el nombre/tipo, (4) registrar en un índice maestro (Google Sheets). Incluye reglas de nomenclatura y clasificación automática.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier/Make.com + Google Drive/Dropbox + Sheets
**Resultado esperado:** Un sistema de archivos ordenado que se organiza solo y permite encontrar cualquier documento en segundos.
**Consejos:**
- Crea las plantillas de carpetas para nuevos clientes como parte del flujo de onboarding (A-004).
- Usa una nomenclatura consistente desde el día 1; migrar archivos desordenados es más costoso.

---

### A-010: Programación Automática de Citas

**Prompt:**
> Diseña un flujo de programación de citas que elimine el ping-pong de emails:
> - Herramienta de calendario: [Calendly/Cal.com/Google Calendar]
> - Tipos de cita: [consulta inicial 30min, reunión de proyecto 60min, llamada rápida 15min]
> - Integraciones: [email de confirmación, reminder, Zoom/Google Meet, CRM]
>
> El flujo completo: (1) cliente selecciona horario en enlace de reserva, (2) creación automática de evento con enlace de videoconferencia, (3) email de confirmación con agenda de la reunión, (4) reminder 24h y 1h antes, (5) post-reunión: enviar resumen y próximos pasos, (6) registrar en CRM. Incluye gestión de cancelaciones y reagendamiento.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Calendly/Cal.com + Zapier/Make.com + Zoom + email
**Resultado esperado:** Un sistema de reservas profesional que gestiona todo el ciclo de la reunión sin esfuerzo manual.
**Consejos:**
- Bloquea horas de "no reuniones" en tu calendario para proteger tu tiempo de trabajo profundo.
- En España, evita programar reuniones entre 14-16h (horario de comida) y los viernes por la tarde.

---

### A-011: Generación Automática de Informes Semanales

**Prompt:**
> Diseña un flujo que genere y envíe un informe semanal automatizado:
> - Fuentes de datos: [Google Analytics, Google Ads, CRM, hojas de cálculo]
> - Datos a incluir: [tráfico web, leads generados, ventas cerradas, tareas completadas, ingresos]
> - Destinatarios: [yo mismo / equipo / clientes]
> - Formato: [email con resumen + enlace a dashboard / PDF adjunto]
>
> El flujo: (1) cada viernes a las 17h, recopilar datos de las fuentes, (2) calcular KPIs clave y variación vs. semana anterior, (3) generar un resumen narrativo usando IA, (4) formatear como email o documento, (5) enviar a destinatarios. Incluye un sistema de semáforos (rojo/amarillo/verde) para cada KPI.

**Nivel:** Avanzado
**Herramientas:** ChatGPT API + Make.com + Google Analytics + Sheets + email
**Resultado esperado:** Un informe semanal profesional que se genera y envía solo cada viernes.
**Consejos:**
- Para clientes, este informe automático demuestra profesionalidad y justifica tu retainer.
- Empieza con 5 KPIs máximo; más de eso y el informe pierde claridad.

---

### A-012: Backup Automático de Datos Críticos

**Prompt:**
> Diseña un sistema de backup automático para los datos críticos de mi negocio:
> - Datos a respaldar: [base de datos de clientes, facturas, contratos, contenido, configuraciones]
> - Ubicaciones actuales: [Google Drive, Notion, Sheets, CRM]
> - Destino del backup: [segundo Drive / Dropbox / disco externo vía escritorio]
> - Frecuencia: [diario / semanal]
>
> El flujo: (1) según frecuencia, exportar datos de cada fuente, (2) comprimir y nombrar con fecha, (3) subir al destino de backup, (4) verificar que el backup se completó, (5) notificar éxito o fallo, (6) eliminar backups de más de [90] días. Incluye un plan de recuperación: qué hacer si necesitas restaurar.

**Nivel:** Avanzado
**Herramientas:** Make.com + APIs de cada servicio + almacenamiento de backup
**Resultado esperado:** Tranquilidad de saber que tus datos están respaldados automáticamente cada día/semana.
**Consejos:**
- El RGPD exige que puedas recuperar datos ante incidentes: tener backups es obligatorio.
- Prueba la restauración al menos una vez al trimestre para asegurarte de que funciona.

---

### A-013: Seguimiento Automático de Menciones de Marca

**Prompt:**
> Diseña un flujo para monitorizar menciones de tu marca/nombre en internet:
> - Términos a monitorizar: [nombre de marca, nombre personal, producto principal]
> - Fuentes: [Google Alerts, Twitter/X, LinkedIn, medios online]
> - Acción al detectar mención: [notificación Slack/email, registro en Sheets, alerta urgente si negativa]
>
> El flujo: (1) configurar alertas en cada fuente, (2) centralizar todas las menciones en un dashboard, (3) clasificar por sentimiento (positivo/neutro/negativo) usando IA, (4) notificar inmediatamente las negativas, (5) programar respuesta para las positivas. Incluye plantillas de respuesta para cada tipo de mención.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier/Make.com + Google Alerts + Sheets
**Resultado esperado:** Estar siempre al tanto de lo que se dice de tu marca y responder a tiempo.
**Consejos:**
- Las menciones negativas sin respuesta en 24h causan más daño que las respondidas rápido.
- Incluye variaciones del nombre (con/sin tildes, abreviaturas) en los términos de búsqueda.

---

### A-014: Automatización de Seguimiento Comercial

**Prompt:**
> Diseña un flujo de seguimiento comercial automático para leads que no convierten inmediatamente:
> - CRM/Base de datos: [Pipedrive/HubSpot/Notion/Sheets]
> - Secuencia de seguimiento: [email 1 a los 3 días, email 2 a los 7 días, email 3 a los 14 días, llamada a los 21 días]
> - Condiciones de parada: [lead responde / lead compra / lead pide no contactar]
>
> El flujo: (1) lead entra al pipeline, (2) espera X días, (3) enviar email personalizado con merge fields, (4) verificar si ha respondido o comprado, (5) si no → siguiente paso, (6) si sí → parar secuencia y notificar, (7) al final de la secuencia sin respuesta → mover a "frío" y programar re-contacto en 90 días. Incluye las plantillas de cada email de seguimiento.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Zapier/Make.com + CRM + email
**Resultado esperado:** Un sistema de seguimiento comercial que nunca pierde un lead por olvido.
**Consejos:**
- Personaliza cada email: el genérico "¿has podido revisar mi propuesta?" funciona peor que un email con valor añadido.
- El re-contacto a los 90 días es sorprendentemente efectivo: muchos leads necesitan ese tiempo.

---

### A-015: Proceso Automático de Contratación

**Prompt:**
> Diseña un flujo para automatizar la gestión de candidatos cuando necesitas contratar:
> - Fuente de candidatos: [formulario web / email / LinkedIn]
> - Fases del proceso: [recepción CV, screening, entrevista 1, prueba técnica, entrevista 2, oferta]
> - Herramientas: [Google Forms + Sheets / Notion / Trello]
>
> El flujo: (1) candidato envía CV/formulario, (2) acuse de recibo automático, (3) registro en base de datos con puntuación automática basada en criterios, (4) notificación al responsable con los mejores candidatos, (5) al cambiar de fase: enviar comunicación correspondiente al candidato, (6) rechazados: email de agradecimiento automático. Incluye plantillas de cada comunicación.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier/Make.com + Google Forms + Sheets/Notion + email
**Resultado esperado:** Un proceso de contratación profesional y eficiente que da buena imagen y ahorra horas.
**Consejos:**
- En España, responder a todos los candidatos (incluidos rechazados) mejora tu marca empleadora.
- Incluye un criterio de descarte automático (experiencia mínima, ubicación) para filtrar rápido.

---

### A-016: Automatización de Encuestas Post-Servicio

**Prompt:**
> Diseña un flujo que envíe automáticamente una encuesta de satisfacción y gestione las respuestas:
> - Trigger: [servicio entregado / factura marcada como pagada / X días después]
> - Plataforma de encuesta: [Google Forms / Typeform / email directo con enlaces]
> - Escala de satisfacción: [1-10 NPS / estrellas / emoji]
>
> El flujo: (1) enviar encuesta, (2) recopilar respuesta, (3) si puntuación ≥ 9 → pedir reseña en Google + LinkedIn, (4) si puntuación 7-8 → agradecer + preguntar cómo mejorar, (5) si puntuación ≤ 6 → alerta inmediata + llamada de seguimiento, (6) compilar datos mensualmente para informe de satisfacción.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Zapier/Make.com + Google Forms + Sheets + email
**Resultado esperado:** Un sistema que mide la satisfacción de cada cliente y convierte a los promotores en marketing gratuito.
**Consejos:**
- El NPS (Net Promoter Score) es el estándar: "Del 0 al 10, ¿nos recomendarías?"
- Envía la encuesta en el momento de máxima satisfacción, no semanas después.

---

### A-017: Automatización de Renovaciones y Contratos

**Prompt:**
> Diseña un flujo para gestionar renovaciones de contratos automáticamente:
> - Base de datos de contratos: [Sheets / Notion / CRM con fechas de fin]
> - Aviso previo deseado: [30 / 60 / 90 días antes del vencimiento]
> - Acciones: [email al cliente, notificación interna, generación de nuevo contrato]
>
> El flujo: (1) verificar diariamente contratos próximos a vencer, (2) a -90 días: alerta interna para preparar propuesta de renovación, (3) a -60 días: enviar propuesta de renovación al cliente, (4) a -30 días: seguimiento si no ha respondido, (5) a -7 días: último aviso, (6) si renueva: generar nuevo contrato, (7) si no renueva: encuesta de salida + mover a "ex-cliente" para futura reactivación.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Make.com + Sheets/CRM + email + generador de documentos
**Resultado esperado:** No perder nunca una renovación por olvido y maximizar la retención de clientes.
**Consejos:**
- El 30% de contratos que no se renuevan es por falta de seguimiento, no por insatisfacción.
- Ofrece un incentivo de renovación anticipada (5-10% de descuento por renovar 30 días antes).

---

### A-018: Flujo de Gestión de Incidencias

**Prompt:**
> Diseña un flujo para gestionar incidencias y reclamaciones de clientes automáticamente:
> - Canal de entrada: [email / formulario web / WhatsApp]
> - Niveles de prioridad: [baja, media, alta, crítica]
> - SLA de respuesta: [alta <2h, media <8h, baja <24h]
>
> El flujo: (1) recibir incidencia, (2) clasificar automáticamente por palabras clave (urgente, error, no funciona = alta), (3) asignar ticket con número correlativo, (4) enviar acuse de recibo con número y SLA, (5) notificar al responsable según prioridad, (6) si SLA próximo a vencer sin respuesta: escalar, (7) al resolver: email de cierre + encuesta de satisfacción, (8) registrar para análisis mensual de incidencias.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Make.com + email/formulario + Sheets/Notion + notificaciones
**Resultado esperado:** Un sistema profesional de gestión de incidencias que garantiza respuesta rápida y registro completo.
**Consejos:**
- En España, la ley de consumo exige responder a reclamaciones en plazos razonables: este flujo te cubre.
- Analiza las incidencias mensualmente para identificar problemas recurrentes y solucionarlos en origen.

---

## Categoría 2: IA + Hojas de Cálculo para Análisis de Negocio

### A-019: Dashboard Financiero en Google Sheets

**Prompt:**
> Diseña la estructura y fórmulas de un dashboard financiero completo en Google Sheets para un autónomo en España:
> - Pestaña 1: Ingresos (factura, cliente, importe, IVA, retención IRPF, neto, fecha, estado)
> - Pestaña 2: Gastos (concepto, proveedor, importe, IVA soportado, categoría, deducible sí/no)
> - Pestaña 3: Dashboard (resumen mensual, P&L, IVA a liquidar, IRPF estimado)
>
> Para cada celda calculada, proporciona la fórmula exacta de Google Sheets. Incluye: SUMIFS, QUERY, condicionales con IF, formato condicional para semáforos. El dashboard debe mostrar: facturación mensual, gastos por categoría, beneficio neto, IVA trimestral (repercutido - soportado), y provisión de IRPF.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Un dashboard financiero funcional que te da visibilidad completa de tus finanzas con actualización automática.
**Consejos:**
- Usa validación de datos para las columnas de categoría y estado para evitar errores de escritura.
- Fórmula clave: =SUMIFS(Ingresos!E:E, Ingresos!G:G, ">="&DATE(AÑO,MES,1), Ingresos!G:G, "<"&DATE(AÑO,MES+1,1)) para totales mensuales.

---

### A-020: Previsión de Ingresos con Media Móvil

**Prompt:**
> Crea un modelo de previsión de ingresos en Google Sheets usando media móvil y tendencia lineal:
> - Datos históricos: [tengo X meses de facturación mensual]
> - Quiero proyectar: [próximos 6/12 meses]
>
> Incluye las fórmulas para: (1) media móvil de 3 meses: =AVERAGE(OFFSET(celda,-2,0,3,1)), (2) tendencia lineal: =FORECAST(mes_futuro, rango_datos, rango_meses), (3) escenario pesimista (-20%), base, y optimista (+20%). Explica cómo interpretar cada proyección y cuándo confiar más en una u otra. Incluye un gráfico sugerido.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Una proyección de ingresos basada en datos reales que te ayuda a planificar con cabeza.
**Consejos:**
- Necesitas mínimo 6 meses de datos para que la media móvil sea útil; 12+ meses es ideal.
- Ajusta manualmente la estacionalidad: agosto siempre baja, Q4 suele subir.

---

### A-021: Limpieza y Categorización Automática de Datos

**Prompt:**
> Genera las fórmulas de Google Sheets necesarias para limpiar y categorizar automáticamente un listado de movimientos bancarios:
> - Columna A: Fecha
> - Columna B: Concepto (texto del banco, a menudo críptico)
> - Columna C: Importe
>
> Necesito fórmulas que: (1) =TRIM(CLEAN(B2)) para limpiar texto, (2) categorizar automáticamente usando IFS o REGEXMATCH basándose en palabras clave (ej: si contiene "AMAZON" → "Herramientas", si contiene "CUOTA AUTONOMO" → "Seguridad Social"), (3) separar ingresos de gastos, (4) marcar posibles duplicados con COUNTIFS. Proporciona una tabla de reglas de categorización para un autónomo típico en España con 15-20 reglas.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Un sistema que convierte tu extracto bancario en una contabilidad categorizada en minutos.
**Consejos:**
- Fórmula clave: =IFS(REGEXMATCH(B2,"CUOTA.*AUTONOMO"),"Seg. Social", REGEXMATCH(B2,"AMAZON|GOOGLE"),"Software", TRUE,"Sin categorizar")
- Revisa los "sin categorizar" cada mes y añade nuevas reglas a medida que aparecen conceptos nuevos.

---

### A-022: Análisis de Rentabilidad por Cliente

**Prompt:**
> Diseña una hoja de cálculo de rentabilidad por cliente con estas fórmulas:
> - Pestaña "Tiempo": registro de horas por cliente y proyecto
> - Pestaña "Ingresos": facturas por cliente
> - Pestaña "Dashboard": rentabilidad calculada
>
> Fórmulas necesarias: (1) horas totales por cliente: =SUMIFS(Tiempo!C:C, Tiempo!A:A, cliente), (2) ingresos totales por cliente: =SUMIFS(Ingresos!D:D, Ingresos!B:B, cliente), (3) tarifa hora efectiva: =ingresos/horas, (4) margen: =(ingresos-costes)/ingresos, (5) ranking con =RANK. Formato condicional: verde si tarifa hora > objetivo, rojo si < 50% del objetivo. Incluye gráfico de Pareto sugerido.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Saber exactamente qué clientes son rentables y cuáles te están costando dinero.
**Consejos:**
- Registra el tiempo real, no el estimado: la diferencia te revelará dónde pierdes rentabilidad.
- Incluye tiempo no facturable (emails, reuniones, desplazamientos) asignado a cada cliente.

---

### A-023: Seguimiento de Gastos con Alertas

**Prompt:**
> Crea un sistema de seguimiento de gastos en Google Sheets con alertas automáticas:
> - Presupuesto mensual por categoría: [lista con categoría y límite EUR]
> - Registro de gastos: [fecha, concepto, categoría, importe, deducible]
>
> Fórmulas: (1) gasto acumulado por categoría: =SUMIFS con filtro de mes, (2) porcentaje consumido: =gasto/presupuesto, (3) formato condicional: verde <70%, amarillo 70-90%, rojo >90%, (4) =IF(porcentaje>0.9, "⚠️ ALERTA", "OK") para avisos. Incluye una fila de totales y un gráfico de barras comparando presupuesto vs. real por categoría.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Un control de gastos visual que te avisa antes de que te pases del presupuesto.
**Consejos:**
- Revisa y ajusta los presupuestos cada trimestre basándote en datos reales.
- Crea una categoría "impuestos" y provisiona el IVA trimestral y la retención de IRPF mensualmente.

---

### A-024: Tracking de KPIs del Negocio

**Prompt:**
> Diseña un cuadro de mando de KPIs en Google Sheets con fórmulas automáticas:
> - KPIs a rastrear: facturación mensual, número de clientes activos, ticket medio, tasa de cobro, margen neto, horas facturables/totales, NPS
> - Para cada KPI: valor actual, objetivo, variación vs. mes anterior, tendencia 3 meses
>
> Fórmulas clave: (1) variación: =(actual-anterior)/anterior, (2) tendencia: =SPARKLINE con datos de últimos 3 meses, (3) estado: =IFS(actual>=objetivo,"🟢", actual>=objetivo*0.8,"🟡", TRUE,"🔴"), (4) promedio móvil para suavizar variaciones. Diseña el layout visual y explica cada fórmula paso a paso.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Un dashboard de una sola pestaña que muestra la salud de tu negocio de un vistazo.
**Consejos:**
- =SPARKLINE(rango, {"charttype","line";"color","blue"}) crea mini-gráficos dentro de celdas.
- Revisa el cuadro de mando cada lunes; la consistencia es más importante que la sofisticación.

---

### A-025: Gestión de Inventario con Fórmulas

**Prompt:**
> Crea un sistema de gestión de inventario en Google Sheets para un pequeño negocio:
> - Productos: [lista con nombre, SKU, precio de coste, precio de venta, stock mínimo]
> - Movimientos: entrada (compra a proveedor) y salida (venta)
>
> Fórmulas: (1) stock actual: =stock_inicial + SUMIFS(entradas) - SUMIFS(salidas), (2) valor del inventario: =stock_actual * precio_coste, (3) margen por producto: =(pvp-coste)/pvp, (4) alerta de reposición: =IF(stock_actual<=stock_minimo, "REPONER", "OK"), (5) rotación: =ventas_periodo / stock_medio. Incluye un resumen con: valor total del inventario, productos con alerta, y los 5 más/menos vendidos.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Control completo del inventario con alertas de reposición y análisis de rotación.
**Consejos:**
- Para negocios pequeños, Google Sheets es suficiente y más flexible que software de inventario.
- Haz inventario físico mensual y reconcilia con las cifras de la hoja.

---

### A-026: Cálculo de Time Tracking y Facturación

**Prompt:**
> Diseña un sistema de time tracking en Google Sheets conectado a facturación:
> - Campos: fecha, cliente, proyecto, tarea, hora inicio, hora fin, horas, tarifa, importe
> - Resúmenes: por cliente, por proyecto, por semana, por mes
>
> Fórmulas: (1) horas: =(hora_fin-hora_inicio)*24, (2) importe: =horas*tarifa, (3) total por cliente/mes: =SUMPRODUCT((clientes=cliente)*(mes=mes_actual)*importes), (4) horas facturables vs. totales: ratio de productividad, (5) proyección mensual: =(total_hasta_hoy/días_trabajados)*días_laborables_del_mes. Formato de entrada rápida optimizado para registro diario.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Un registro de tiempo limpio que genera automáticamente los datos para facturar a cada cliente.
**Consejos:**
- Registra el tiempo en bloques de 15 minutos para un balance entre precisión y practicidad.
- Calcula tu ratio facturable/total: lo ideal es >65%; por debajo, estás dedicando demasiado a administración.

---

### A-027: Cálculo de Customer Lifetime Value (CLV)

**Prompt:**
> Calcula el Customer Lifetime Value de mi negocio en Google Sheets:
> - Datos por cliente: [fecha primer proyecto, facturación total, número de proyectos, fecha último proyecto]
> - O datos agregados: [ticket medio, frecuencia de compra media, vida media del cliente en meses]
>
> Fórmulas: (1) CLV simple: =ticket_medio * frecuencia_anual * vida_media_años, (2) CLV con margen: =CLV_simple * margen_neto, (3) vida media del cliente: =AVERAGE de meses entre primer y último proyecto, (4) tasa de retención: =clientes_que_repiten / clientes_totales. Incluye el análisis: si tu CPA (coste de adquisición) < CLV, tu negocio es viable. Calcula el ratio CLV:CPA ideal.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Saber cuánto vale un cliente a lo largo de su vida para tomar mejores decisiones de inversión en captación.
**Consejos:**
- Un ratio CLV:CPA de 3:1 o superior indica un negocio saludable.
- Segmenta el CLV por tipo de cliente o canal de adquisición para invertir donde más rentabilidad hay.

---

### A-028: Análisis de Resultados de Test A/B

**Prompt:**
> Crea una hoja de cálculo para analizar resultados de tests A/B:
> - Variante A: [nombre, visitantes, conversiones]
> - Variante B: [nombre, visitantes, conversiones]
> - Métrica principal: [tasa de conversión / CTR / tasa de compra]
>
> Fórmulas: (1) tasa de conversión: =conversiones/visitantes, (2) diferencia relativa: =(B-A)/A, (3) significancia estadística simplificada: =IF(ABS(z_score)>1.96, "Significativo al 95%", "No significativo"), donde z_score se calcula con las proporciones y tamaños muestrales. Incluye la fórmula completa del z-test para proporciones. Indica cuántos visitantes más necesitas si no es significativo.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Saber con confianza estadística si una variante es mejor que otra antes de tomar decisiones.
**Consejos:**
- Necesitas mínimo 100 conversiones por variante para resultados fiables.
- No pares el test antes de tiempo aunque una variante "parezca" ganar: es un error común.

---

### A-029: Modelo de Previsión de Cashflow

**Prompt:**
> Diseña un modelo de previsión de cashflow (tesorería) a 12 semanas en Google Sheets:
> - Saldo inicial: [EUR]
> - Cobros previstos: [cliente, importe, semana estimada, probabilidad %]
> - Pagos fijos: [concepto, importe, semana]
> - Pagos variables previstos: [concepto, importe, semana]
>
> Fórmulas: (1) cobro ponderado: =importe*probabilidad, (2) saldo semanal: =saldo_anterior + cobros_ponderados - pagos, (3) formato condicional: rojo si saldo < 0, amarillo si < 1 mes de gastos fijos, verde si > 2 meses. Incluye una fila de "saldo mínimo de la semana" para identificar los puntos de mayor riesgo.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Visibilidad de tu tesorería a 3 meses vista con probabilidades ponderadas para planificar con realismo.
**Consejos:**
- Clasifica los cobros: seguro (90%), probable (60%), posible (30%) para un cashflow realista.
- Las semanas de pago de impuestos trimestrales (modelo 303/130) son las más críticas: provisiona.

---

### A-030: Análisis de Datos de Encuestas y Market Research

**Prompt:**
> Crea una hoja de cálculo para organizar y analizar datos de investigación de mercado:
> - Tipo de datos: [respuestas de encuesta / datos de competidores / datos de mercado]
> - Campos: [según tu investigación]
>
> Incluye fórmulas para: (1) COUNTIF/COUNTIFS para frecuencias de respuestas, (2) AVERAGE, MEDIAN, STDEV para estadísticas descriptivas, (3) tablas dinámicas sugeridas para segmentación, (4) gráficos recomendados para cada tipo de dato (barras para categóricos, líneas para tendencias, dispersión para correlaciones). Proporciona un template con datos de ejemplo y las fórmulas aplicadas.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Un framework reutilizable para analizar cualquier conjunto de datos de mercado.
**Consejos:**
- =QUERY es la fórmula más potente de Google Sheets para análisis: permite consultas tipo SQL sobre tus datos.
- Visualiza siempre los datos antes de sacar conclusiones: un gráfico revela patrones que los números ocultan.

---

### A-031: Cuadro de Mando Comercial

**Prompt:**
> Diseña un cuadro de mando comercial en Google Sheets para seguir tu pipeline de ventas:
> - Fases del pipeline: [lead, contacto, propuesta, negociación, cerrado-ganado, cerrado-perdido]
> - Datos por oportunidad: [cliente, servicio, valor, fase, fecha entrada, probabilidad, fecha cierre estimada]
>
> Fórmulas: (1) valor ponderado del pipeline: =SUMPRODUCT(valores*probabilidades), (2) tasa de conversión por fase, (3) pipeline velocity: =oportunidades * valor_medio * tasa_conversión / ciclo_venta_días, (4) embudo visual con REPT("█", ...) para barras horizontales en celdas. Incluye: previsión de cierre del mes y comparativa con objetivo.

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Un CRM simplificado en Sheets que te da visibilidad comercial completa.
**Consejos:**
- Actualiza el pipeline al menos 2 veces por semana para que las previsiones sean fiables.
- Para autónomos, un Sheets es más ágil que un CRM complejo hasta que superes los 50 leads activos.

---

### A-032: Calculadora de Precios y Márgenes

**Prompt:**
> Crea una calculadora de precios en Google Sheets que determine el precio óptimo:
> - Inputs: coste por hora tuyo, horas estimadas, costes directos, margen objetivo, IVA
> - Outputs: precio por coste+margen, precio recomendado, comparativa con mercado
>
> Fórmulas: (1) coste total: =horas*tarifa_hora + costes_directos, (2) precio mínimo: =coste_total/(1-margen_minimo), (3) precio recomendado: =coste_total/(1-margen_objetivo), (4) desglose con IVA y retención IRPF: base + IVA 21% - retención 15% = a cobrar. Incluye un slider/input donde cambias el margen y ves cómo cambia el precio final.

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Una herramienta que te da el precio correcto en segundos para cualquier propuesta.
**Consejos:**
- Crea una copia para cada propuesta importante y guárdala como referencia.
- Tu tarifa hora debería incluir los gastos fijos prorrateados, no solo tu "sueldo" deseado.

---

### A-033: Análisis de Estacionalidad

**Prompt:**
> Analiza la estacionalidad de mi negocio en Google Sheets:
> - Datos: facturación mensual de los últimos [12/24/36] meses
> - Formato: Mes | Facturación
>
> Fórmulas: (1) media mensual anualizada: =AVERAGE de cada mes a lo largo de los años, (2) índice estacional: =media_mes / media_global, (3) desviación estándar por mes para medir variabilidad, (4) gráfico de líneas con todos los años superpuestos para visualizar patrones. Interpreta los resultados: qué meses son fuertes, cuáles débiles, y recomendaciones para suavizar la estacionalidad (promociones en meses bajos, ahorro en meses altos).

**Nivel:** Avanzado
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Entender los ciclos de tu negocio para planificar mejor el cashflow y las acciones comerciales.
**Consejos:**
- En España, los patrones típicos son: enero lento, primavera fuerte, agosto muerto, septiembre reactiva, noviembre-diciembre fuerte.
- Usa el índice estacional para ajustar tus proyecciones mensuales (no asumas facturación uniforme).

---

### A-034: Comparativa de Proveedores/Herramientas

**Prompt:**
> Crea una matriz de decisión en Google Sheets para comparar opciones (proveedores, herramientas, o cualquier decisión con múltiples criterios):
> - Opciones a comparar: [lista de 3-5 opciones]
> - Criterios de evaluación: [precio, calidad, soporte, facilidad, integración, etc.]
> - Peso de cada criterio: [importancia relativa del 1-10]
>
> Fórmulas: (1) puntuación ponderada: =SUMPRODUCT(puntuaciones*pesos)/SUM(pesos), (2) ranking: =RANK, (3) formato condicional: barra de datos para comparación visual, (4) análisis de sensibilidad: ¿cambia el ranking si el peso de X criterio sube o baja? Incluye una conclusión automática: =INDEX(opciones, MATCH(MAX(puntuaciones_ponderadas), puntuaciones_ponderadas, 0)).

**Nivel:** Intermedio
**Herramientas:** ChatGPT + Google Sheets
**Resultado esperado:** Una decisión objetiva basada en datos en lugar de intuición o sesgo.
**Consejos:**
- Define los criterios y pesos ANTES de evaluar las opciones para evitar sesgo de confirmación.
- Incluye siempre un criterio de "coste total de propiedad" (no solo el precio de compra).

---

## Categoría 3: Cadenas de Prompts Multi-Paso

### A-035: Cadena Completa de Estrategia de Contenidos (5 Pasos)

**Paso 1 - Investigación y Pilares:**
> Actúa como estratega de contenido. Mi negocio es [descripción]. Mi público objetivo es [descripción]. Identifica 5 pilares temáticos de contenido que atraigan a mi audiencia. Para cada pilar, sugiere 10 temas específicos de artículos/posts. Organiza en tabla: pilar | tema | keyword principal | intención de búsqueda | dificultad estimada.

**Paso 2 - Calendario Editorial:**
> Con los pilares y temas del paso anterior, crea un calendario editorial para [4 semanas]. Distribuye: 2 artículos de blog/semana, 5 posts de LinkedIn/semana, 3 posts de Instagram/semana. Formato tabla: fecha | plataforma | pilar | tema | formato (artículo, carrusel, vídeo, etc.) | CTA.

**Paso 3 - Creación de Contenido:**
> Desarrolla el siguiente contenido del calendario: [selecciona 1 artículo y 3 posts]. Para el artículo: outline completo con H2/H3, intro, desarrollo, conclusión (1.500 palabras). Para los posts: copy completo listo para publicar adaptado a cada plataforma.

**Paso 4 - Adaptación Multi-Plataforma:**
> Toma el artículo del paso 3 y adáptalo a: 1 hilo de Twitter/X (8-10 tweets), 1 carrusel de Instagram (10 slides con texto), 1 email para newsletter (300 palabras), 3 fragmentos para Stories con encuestas o preguntas.

**Paso 5 - Métricas y Optimización:**
> Para el contenido creado, define: KPIs por plataforma (qué medir), benchmarks (qué considerar éxito), calendario de revisión (cuándo analizar), y plan B (qué hacer si no funciona). Formato de dashboard con semáforos.

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Una estrategia de contenido completa de un mes, desde la investigación hasta las métricas.
**Consejos:**
- Ejecuta los 5 pasos en la misma conversación para que la IA mantenga el contexto.
- Adapta la frecuencia de publicación a tu capacidad real: mejor menos y consistente que mucho y abandonar.

---

### A-036: Pipeline de Propuesta Comercial (4 Pasos)

**Paso 1 - Investigación del Cliente:**
> Investiga a la empresa [nombre] para preparar una propuesta comercial. Busca: qué hacen, su tamaño, problemas públicos del sector, competidores, presencia digital. Organiza en un briefing de 1 página que me permita hablar con conocimiento en la reunión.

**Paso 2 - Propuesta Personalizada:**
> Con el briefing anterior, redacta una propuesta comercial para ofrecerles [mi servicio]. Incluye: problema identificado, solución propuesta, alcance, entregables, cronograma, inversión (EUR + IVA 21%), y caso de éxito similar si existe. Tono profesional pero cercano.

**Paso 3 - Email de Envío y Seguimiento:**
> Escribe: (1) el email para enviar la propuesta (breve, 100 palabras), (2) un email de seguimiento para 5 días después si no responden, (3) un email final para 12 días después con un enfoque diferente (urgencia suave o nuevo ángulo).

**Paso 4 - Contrato:**
> Si aceptan la propuesta, genera un contrato de servicios que incluya: partes, objeto del contrato, alcance, precio y forma de pago, plazos, propiedad intelectual, confidencialidad, resolución de conflictos (legislación española), y cláusula de protección de datos (RGPD). Nota: este borrador debe ser revisado por un profesional legal.

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Todo el ciclo comercial cubierto: desde investigar al cliente hasta tener el contrato listo.
**Consejos:**
- Personaliza el Paso 1 con información real del cliente para que toda la cadena sea relevante.
- No envíes el contrato del Paso 4 sin revisión legal; es un borrador de partida.

---

### A-037: Lanzamiento de Producto/Servicio (5 Pasos)

**Paso 1 - Investigación de Mercado:**
> Mi nuevo producto/servicio es [descripción]. Analiza: demanda potencial en España, competidores existentes, precio del mercado, canales de distribución habituales, y barreras de entrada. Resume en un informe ejecutivo de 1 página.

**Paso 2 - Estrategia de Posicionamiento y Precio:**
> Con el análisis anterior, recomienda: posicionamiento (low-cost/medio/premium), precio óptimo (EUR), propuesta de valor única, y 3 mensajes clave de marketing. Justifica cada decisión con los datos del mercado.

**Paso 3 - Materiales de Marketing:**
> Crea los materiales de lanzamiento: (1) copy de landing page completo (headline, subheadline, beneficios, CTA), (2) 3 variaciones de anuncio para Google Ads (títulos ≤30 caracteres, descripciones ≤90 caracteres), (3) secuencia de 3 emails de lanzamiento.

**Paso 4 - Plan de Lanzamiento:**
> Diseña un plan de lanzamiento de 4 semanas: Semana -2 (pre-lanzamiento), Semana -1 (hype), Semana 0 (lanzamiento), Semana +1 (post-lanzamiento). Para cada semana: acciones, canales, contenido, presupuesto estimado.

**Paso 5 - Métricas de Éxito:**
> Define los KPIs de lanzamiento: métricas de vanidad vs. métricas de negocio. Establece umbrales de éxito/fracaso para las primeras 4 semanas. Incluye un plan de contingencia: qué hacer si las ventas son <50% del objetivo.

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Un plan de lanzamiento completo con todos los materiales necesarios.
**Consejos:**
- Ejecuta esta cadena 4-6 semanas antes de la fecha de lanzamiento deseada.
- El Paso 3 genera borradores; refínalos manualmente con tu conocimiento del cliente.

---

### A-038: Copy Completo de Web (4 Pasos)

**Paso 1 - Homepage:**
> Escribe el copy completo de la página principal de mi web: Mi negocio: [descripción]. Público: [quién]. Diferenciador: [qué me hace único]. Incluye: hero section (headline + subheadline + CTA), sección de problemas que resuelvo, sección de servicios (3-4), sección de cómo trabajo (3 pasos), social proof, y CTA final. Todo en español para el mercado español.

**Paso 2 - Página "Sobre Mí/Nosotros":**
> Redacta la página "Sobre mí" con los datos: [tu historia, experiencia, valores, misión]. Incluye: historia personal/profesional (por qué haces lo que haces), datos que generan confianza (años experiencia, clientes, resultados), valores del negocio, y un CTA que conecte con los servicios. Tono: auténtico, cercano pero profesional.

**Paso 3 - Páginas de Servicios:**
> Para cada uno de estos servicios, escribe una página de ventas: [Servicio 1: descripción y precio], [Servicio 2], [Servicio 3]. Cada página: headline orientada a beneficio, descripción del problema, cómo lo resuelves, qué incluye, proceso de trabajo, precio (EUR + IVA), FAQ específica (3-4 preguntas), y CTA.

**Paso 4 - Página de Contacto:**
> Escribe el copy de la página de contacto que: genere confianza (no es solo un formulario), explique qué esperar al contactar (tiempo de respuesta, formato), incluya datos de contacto (email, teléfono, ubicación), note sobre RGPD para el formulario, y un micro-FAQ ("¿Cuánto tardas en responder?", "¿La primera consulta es gratuita?").

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Todo el copy de tu web listo para entregar al diseñador.
**Consejos:**
- Mantén la misma conversación para que el tono sea consistente en todas las páginas.
- Pide que incluya indicaciones de [imagen aquí] para el diseñador.

---

### A-039: Cluster de Contenido SEO (4 Pasos)

**Paso 1 - Keyword Research:**
> Mi negocio es [descripción]. Mi página pilar será sobre [tema principal]. Genera un cluster de 15-20 keywords relacionadas: incluye keyword, volumen estimado de búsqueda en España, intención (informacional/transaccional/navegacional), y dificultad estimada. Organiza jerárquicamente.

**Paso 2 - Página Pilar:**
> Crea el outline completo de la página pilar (3.000-5.000 palabras) sobre [tema principal]. Incluye: título SEO, meta description (≤155 caracteres), estructura H2/H3, contenido de cada sección con puntos clave, y dónde enlazar a los artículos cluster (internal linking plan).

**Paso 3 - Artículos Cluster:**
> Para cada una de estas 5 keywords cluster, genera un outline de artículo: [keyword 1], [keyword 2], [keyword 3], [keyword 4], [keyword 5]. Cada outline: título SEO, meta description, H2/H3, puntos clave, enlace de vuelta a la página pilar, y CTA.

**Paso 4 - Estrategia de Internal Linking:**
> Dibuja (en formato texto/tabla) el mapa completo de internal linking entre la página pilar y los artículos cluster. Incluye: qué ancla de texto usar para cada enlace, dirección del enlace, y prioridad de publicación (qué publicar primero).

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude + herramienta SEO (Ahrefs/Semrush para validar)
**Resultado esperado:** Una estrategia de contenido SEO completa con página pilar, artículos cluster y plan de enlazado.
**Consejos:**
- Valida los volúmenes de búsqueda con una herramienta SEO real; la IA estima pero no tiene datos exactos.
- Publica la página pilar primero y después los artículos cluster enlazando de vuelta.

---

### A-040: Campaña de Email Marketing End-to-End (4 Pasos)

**Paso 1 - Estrategia y Segmentación:**
> Diseña una campaña de email marketing para [objetivo: vender producto, evento, fidelización]. Mi lista tiene [X] suscriptores. Define: segmentos (por comportamiento, interés, fase del cliente), objetivo por segmento, y la secuencia de emails necesaria.

**Paso 2 - Redacción de Emails:**
> Para el segmento principal, escribe [3/5/7] emails de la secuencia. Cada email: asunto (2 opciones A/B), preview text, cuerpo completo (150-300 palabras), CTA con texto del botón, y nota del día de envío. La secuencia debe tener un arco narrativo (no emails sueltos).

**Paso 3 - Automatización:**
> Describe el flujo de automatización para esta campaña: triggers de entrada, condiciones (si abre/no abre, si hace clic/no), ramas condicionales, y exits. Formato de diagrama textual. Incluye las etiquetas/tags a aplicar en cada paso.

**Paso 4 - Métricas y Optimización:**
> Define: KPIs de la campaña (open rate, CTR, conversión, revenue), benchmarks para mi sector en España, plan de A/B testing (qué testear primero), y plan de optimización post-campaña (qué hacer con los datos).

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude + plataforma de email (Systeme.io, Brevo, Mailchimp)
**Resultado esperado:** Una campaña de email completa lista para cargar en tu plataforma de email marketing.
**Consejos:**
- En España, los mejores días para enviar emails B2B son martes y jueves a las 10h.
- Empieza con A/B test de asuntos: es el cambio con mayor impacto en open rate.

---

### A-041: Pipeline de Identidad de Marca (4 Pasos)

**Paso 1 - Descubrimiento:**
> Voy a crear/renovar mi marca. Mi negocio: [descripción]. Mi público: [quién]. Mis competidores: [nombres]. Analiza: qué personalidad de marca encaja, qué arquetipos de marca aplicar, y cómo debería sentirse mi marca (adjetivos, sensaciones). Incluye un mood board textual.

**Paso 2 - Elementos Verbales:**
> Genera: nombre de marca (si necesito uno, 10 opciones), tagline (5 opciones), propuesta de valor, declaración de misión, declaración de visión, y personalidad de marca (tono de voz, vocabulario a usar y evitar, nivel de formalidad). Todo para el mercado español.

**Paso 3 - Guía de Voz de Marca:**
> Crea una guía de voz de marca completa: (1) personalidad en 5 adjetivos, (2) cómo hablamos vs. cómo no hablamos (ejemplos concretos), (3) tono por canal (web, email, redes, propuestas), (4) vocabulario preferido y prohibido, (5) plantillas de mensajes tipo (saludo, cierre, disculpa, celebración).

**Paso 4 - Briefing para Diseñador:**
> Genera un briefing de diseño visual para un diseñador gráfico basado en los pasos anteriores: paleta de colores sugerida (con códigos hex), tipografías sugeridas, estilo fotográfico, estilo de iconografía, y referencias visuales (marcas con estética similar). El briefing debe ser lo suficientemente claro para que un diseñador cree el logo y la identidad visual.

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Una identidad de marca completa (verbal + briefing visual) lista para implementar.
**Consejos:**
- Involucra a clientes actuales en el Paso 1: pregúntales cómo perciben tu marca actual.
- La guía de voz (Paso 3) es el documento más útil a largo plazo: consúltala antes de crear cualquier comunicación.

---

### A-042: Análisis de Competencia a Estrategia (3 Pasos)

**Paso 1 - Mapeo Competitivo:**
> Analiza a mis 5 principales competidores en [sector] en España: [nombre1], [nombre2], [nombre3], [nombre4], [nombre5]. Para cada uno: servicios que ofrecen, rango de precios, posicionamiento, presencia online (web, redes, SEO), puntos fuertes y débiles. Tabla comparativa.

**Paso 2 - Gaps y Oportunidades:**
> Con el análisis anterior, identifica: (1) qué ofrecen todos pero mal (oportunidad de mejora), (2) qué no ofrece ninguno (oportunidad de diferenciación), (3) segmentos de mercado desatendidos, (4) canales que no están usando. Prioriza las oportunidades por facilidad de ejecución e impacto potencial.

**Paso 3 - Plan de Acción:**
> Basándote en las oportunidades identificadas, crea un plan de acción a 90 días: 3-5 iniciativas concretas, cada una con: qué hacer, por qué (vinculado al gap), recursos necesarios, timeline, KPI de éxito. Incluye quick wins (impacto rápido) y apuestas estratégicas (mayor impacto a medio plazo).

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Un plan de diferenciación basado en datos reales de la competencia.
**Consejos:**
- Visita las webs de los competidores antes de ejecutar esta cadena para dar contexto real.
- Repite este ejercicio cada 6 meses: la competencia cambia.

---

### A-043: Persona a Contenido (4 Pasos)

**Paso 1 - Crear Buyer Persona:**
> Crea un buyer persona detallado para mi negocio [descripción]. Incluye: nombre ficticio, edad, cargo, empresa tipo, retos diarios, objetivos, miedos, fuentes de información, redes sociales que usa, proceso de compra, objeciones típicas. Hazlo específico para España.

**Paso 2 - Customer Journey Map:**
> Con el buyer persona anterior, mapea su customer journey: (1) Desconocimiento, (2) Reconocimiento del problema, (3) Consideración de soluciones, (4) Decisión, (5) Post-compra. Para cada fase: qué piensa, qué siente, qué busca, qué contenido necesita, y cómo puedo impactarle.

**Paso 3 - Contenido por Fase:**
> Para cada fase del journey, genera 5 ideas de contenido con: título, formato (blog, vídeo, infografía, email, post social), plataforma, keyword si aplica, y CTA apropiada para esa fase. Total: 25 piezas de contenido alineadas con el journey.

**Paso 4 - Calendario y Priorización:**
> Prioriza las 25 piezas de contenido por: impacto esperado, esfuerzo de producción, y fase del funnel a cubrir. Selecciona las 8 prioritarias y distribúyelas en un calendario de 4 semanas con fechas y responsable.

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Un plan de contenido 100% alineado con las necesidades reales de tu cliente ideal.
**Consejos:**
- Si tienes clientes reales, basa el buyer persona en ellos, no en suposiciones.
- Prioriza contenido de las fases de consideración y decisión: es donde se genera el ROI.

---

### A-044: Revisión Anual de Negocio (4 Pasos)

**Paso 1 - Recopilación de Datos:**
> Voy a hacer la revisión anual de mi negocio. Organiza estos datos en un informe estructurado: Facturación total [EUR], gastos totales [EUR], beneficio neto [EUR], número de clientes [X], ticket medio [EUR], servicios más vendidos [lista], tasa de retención [%], NPS [si lo tienes]. Compara con el año anterior si tengo datos.

**Paso 2 - Análisis DAFO Actualizado:**
> Con los datos del paso anterior y mi conocimiento del mercado actual [describe brevemente la situación de tu sector en España], genera un DAFO actualizado. Sé específico y honesto. Cruza los cuadrantes para generar 4 estrategias: FO (ofensiva), DO (reorientación), FA (defensiva), DA (supervivencia).

**Paso 3 - Objetivos para el Próximo Año:**
> Basándote en el análisis, propón 5 objetivos SMART para el próximo año: (1) financiero, (2) de clientes/crecimiento, (3) operativo/productividad, (4) de desarrollo profesional, (5) de equilibrio vida/trabajo. Cada objetivo con: métrica concreta, plazo, hitos trimestrales.

**Paso 4 - Plan de Acción Q1:**
> Para los objetivos definidos, crea el plan de acción del primer trimestre: para cada objetivo, define 2-3 iniciativas con: acciones concretas, responsable, deadline, recursos necesarios, KPI de seguimiento. Incluye un calendario semanal del Q1 con las acciones clave distribuidas.

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Una revisión anual completa con análisis, objetivos y plan de acción para empezar el año con dirección clara.
**Consejos:**
- Hazlo en la primera quincena de enero para aprovechar la energía de año nuevo.
- Comparte los objetivos con un mentor, socio o amigo emprendedor para crear compromiso.

---

### A-045: Auditoría de Redes Sociales a Estrategia (3 Pasos)

**Paso 1 - Auditoría:**
> Audita mi presencia actual en redes sociales. Mis perfiles: [lista de redes con URL o @]. Para cada red analiza: número de seguidores, frecuencia de publicación actual, tipo de contenido que publico, engagement rate estimado, coherencia con mi marca, y qué está funcionando vs. qué no.

**Paso 2 - Benchmarking:**
> Compara mi presencia con 3 competidores/referentes del sector en España: [nombres]. Para cada uno: qué hacen mejor que yo, frecuencia, tipo de contenido que les funciona, nivel de engagement. Identifica 5 prácticas que puedo adaptar.

**Paso 3 - Nueva Estrategia:**
> Con la auditoría y el benchmarking, diseña mi estrategia de redes sociales para los próximos 3 meses: redes prioritarias (máximo 2-3), pilares de contenido, frecuencia de publicación, formatos a usar, calendario semanal tipo, KPIs objetivo, y herramientas recomendadas. Incluye 10 ideas de contenido para el primer mes.

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Una estrategia de redes sociales basada en datos que sustituya al "publico cuando me acuerdo".
**Consejos:**
- Sé realista con la frecuencia: 3 posts buenos/semana > 7 posts mediocres.
- En España, LinkedIn crece más rápido que cualquier otra red para B2B; no lo ignores.

---

### A-046: Comunicación de Crisis (4 Pasos)

**Paso 1 - Evaluación de la Situación:**
> Ha ocurrido [describe la crisis: reseña negativa viral, error de servicio, problema legal, etc.]. Evalúa: gravedad (1-10), alcance (quién lo sabe), urgencia (cuánto tiempo tengo), y potencial de escalada. Identifica a todos los stakeholders afectados.

**Paso 2 - Mensaje Oficial:**
> Redacta el comunicado oficial/respuesta para cada canal necesario: (1) respuesta pública (redes sociales/web), (2) comunicación a clientes afectados (email), (3) comunicación interna (equipo), (4) respuesta a medios (si aplica). Cada mensaje con el tono apropiado: transparente, empático, orientado a soluciones.

**Paso 3 - Plan de Acción Inmediato:**
> Define las acciones de las próximas 48 horas: qué hacer primero, quién responde, qué canales monitorizar, qué NO hacer (errores comunes en crisis), cómo medir si la situación mejora o empeora. Incluye un checklist secuencial.

**Paso 4 - Plan de Recuperación:**
> Diseña un plan de recuperación a 30 días: acciones para restaurar la confianza, seguimiento con afectados, mejoras operativas para que no se repita, comunicación proactiva sobre los cambios realizados, y métricas para saber cuándo la crisis ha terminado.

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Una respuesta coordinada a cualquier crisis que proteja tu reputación y retenga la confianza del cliente.
**Consejos:**
- La velocidad de respuesta es crítica: las primeras 2-4 horas definen cómo se percibe tu gestión.
- Nunca borres contenido negativo sin responder primero: se nota y empeora las cosas.

---

### A-047: Estrategia de Pricing (3 Pasos)

**Paso 1 - Análisis de Costes y Valor:**
> Mis servicios son [lista con descripción]. Para cada uno, analiza: coste real de prestación (tiempo + recursos), valor percibido por el cliente, precio actual, y disposición a pagar estimada. Incluye un análisis de elasticidad-precio: ¿perdería clientes si subo un 20%?

**Paso 2 - Modelo de Pricing:**
> Recomienda un modelo de pricing: por hora, por proyecto, por valor, retainer, freemium+premium, tiers, o híbrido. Justifica la elección. Diseña la tabla de precios con 3 niveles (básico/estándar/premium). Para cada nivel: qué incluye, precio, para quién es.

**Paso 3 - Implementación:**
> Plan de implementación: cómo comunicar los nuevos precios a clientes existentes (email template incluido), pricing para nuevos clientes, estrategia de descuentos (cuándo sí y cuándo no), y calendario de revisión de precios (cuándo y cómo revisar cada 6 meses).

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude + Google Sheets
**Resultado esperado:** Una estrategia de precios profesional que maximiza ingresos sin perder clientes.
**Consejos:**
- Subir precios es el cambio con mayor impacto en el beneficio neto de un autónomo.
- Haz la subida gradual: 10-15% es más fácil de absorber que un salto del 30%.

---

### A-048: Pipeline de Reclutamiento (4 Pasos)

**Paso 1 - Definición del Puesto:**
> Necesito contratar a [puesto]. Define: descripción del puesto, responsabilidades clave (5-7), requisitos técnicos, requisitos de soft skills, rango salarial orientativo para España, y tipo de contrato (autónomo colaborador / cuenta ajena / prácticas).

**Paso 2 - Oferta de Empleo:**
> Redacta la oferta de empleo para publicar en [LinkedIn / InfoJobs / Indeed / web propia]: título atractivo, descripción de la empresa/proyecto (vendedora), responsabilidades, requisitos, qué ofrecemos, cómo aplicar. Tono que refleje la cultura de la empresa. Incluye elementos diferenciadores.

**Paso 3 - Proceso de Selección:**
> Diseña el proceso de selección: (1) screening de CV (criterios de filtro), (2) primera entrevista telefónica (guión de 15 min con preguntas clave), (3) prueba técnica (diseña una prueba de 1-2 horas relevante para el puesto), (4) entrevista final (preguntas de cultura y fit). Incluye scorecard para puntuar candidatos.

**Paso 4 - Comunicaciones:**
> Genera todas las plantillas de comunicación: (1) acuse de recibo de candidatura, (2) invitación a entrevista, (3) envío de prueba técnica con instrucciones, (4) oferta formal, (5) rechazo educado (para cada fase). Todas en español, tono profesional y cálido.

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Un proceso de contratación profesional de principio a fin.
**Consejos:**
- En España, el convenio colectivo de tu sector define el salario mínimo: consúltalo.
- Sé transparente con el rango salarial en la oferta: ahorra tiempo a todos.

---

### A-049: Customer Journey Mapping (3 Pasos)

**Paso 1 - Mapeo de Touchpoints:**
> Mi negocio es [descripción]. Mapea todos los puntos de contacto (touchpoints) que un cliente tiene conmigo desde que me descubre hasta que se convierte en cliente recurrente. Incluye: cómo me encuentra, primera impresión, proceso de contratación, experiencia durante el servicio, entrega, post-servicio, y recompra. Para cada touchpoint: qué experimenta el cliente, qué emoción siente, qué acción toma.

**Paso 2 - Análisis de Gaps:**
> Para cada touchpoint identificado, evalúa: ¿funciona bien o es un punto de fricción? Identifica los 5 mayores gaps (donde la experiencia no cumple expectativas). Para cada gap: impacto en la retención/satisfacción, causa raíz, y solución propuesta con nivel de esfuerzo.

**Paso 3 - Plan de Mejora:**
> Prioriza las mejoras y crea un plan de implementación: quick wins (< 1 semana), mejoras a medio plazo (1-4 semanas), y transformaciones (> 1 mes). Incluye métricas para medir la mejora en cada touchpoint y un calendario de implementación.

**Nivel:** Intermedio
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Un mapa completo de la experiencia del cliente con acciones concretas para mejorarla.
**Consejos:**
- Habla con 3-5 clientes reales para validar tu mapa de experiencia: la percepción del cliente puede ser muy distinta a la tuya.
- Los gaps en post-servicio son los que más afectan a la retención y las recomendaciones.

---

### A-050: Plan de Entrada a Nuevo Mercado (4 Pasos)

**Paso 1 - Análisis del Mercado Objetivo:**
> Quiero expandir mi negocio [descripción] a [nuevo mercado: nueva ciudad, nueva industria, nuevo segmento, o LATAM]. Analiza: tamaño del mercado, competencia existente, diferencias culturales/regulatorias, barreras de entrada, y coste estimado de entrada.

**Paso 2 - Adaptación de la Oferta:**
> ¿Necesito adaptar mi servicio/producto para este nuevo mercado? Analiza: qué funciona tal cual, qué necesita ajuste (precio, formato, comunicación, entrega), y qué es completamente nuevo que necesito crear. Incluye un análisis de pricing: ¿puedo mantener mis precios o debo ajustar?

**Paso 3 - Estrategia de Go-To-Market:**
> Diseña la estrategia de entrada: canales de captación, primeros clientes objetivo (los early adopters), propuesta de valor adaptada, materiales de marketing necesarios, presupuesto de lanzamiento, y timeline. Incluye un "market test" mínimo viable que pueda ejecutar en 30 días con presupuesto limitado.

**Paso 4 - KPIs y Criterios de Decisión:**
> Define: KPIs para los primeros 90 días, umbral de éxito (sigo adelante), umbral de fracaso (abandono), y umbrales intermedios (ajusto). Incluye un plan B si el mercado no responde como esperaba. Sé realista con los tiempos: ¿cuánto tarda un mercado nuevo en dar frutos?

**Nivel:** Avanzado
**Herramientas:** ChatGPT/Claude
**Resultado esperado:** Un plan completo y realista para expandir tu negocio a un nuevo mercado.
**Consejos:**
- Si el nuevo mercado es LATAM: adapta vocabulario (autónomo → monotributo/RIF), moneda, y referencias legales.
- Prueba con un MVP antes de invertir fuerte: una landing page + 100 EUR en ads te da datos reales en 2 semanas.
