# Auditoría de PETLIBRO para reconstrucción en Shopify

**Fecha de captura:** 27 de agosto de 2026  
**Mercado observado:** Estados Unidos / USD  
**Páginas auditadas:**

- Home: https://petlibro.com/
- PDP: https://petlibro.com/products/petlibro-granary-automatic-pet-feeder-with-camera?variant=40913462001711

> Objetivo: documentar la arquitectura, contenido, UX de conversión, catálogo, recursos visuales y requisitos técnicos necesarios para recrear una tienda inspirada en PETLIBRO dentro de Shopify Online Store 2.0. No se recomienda copiar marca, logotipo, textos, fotografías ni material protegido; la implementación debe usar identidad y activos propios.

---

## 1. Resumen ejecutivo

PETLIBRO no funciona como una landing page simple. Es un ecosistema DTC de pet-tech con tres motores principales:

1. **Descubrimiento de categoría:** mega-menú visual, home por categorías y productos destacados.
2. **Conversión del dispositivo:** PDP con galería, beneficios, garantías, variantes y financiación.
3. **Expansión del LTV:** consumibles recurrentes, suscripción de Video Cloud, bundles y cross-sells en carrito.

La reconstrucción debe conservar esa lógica, pero mejorar la arquitectura y el rendimiento. La página observada carga aproximadamente **163 scripts y 78 hojas de estilo en la home**, señal de una acumulación importante de código, píxeles y aplicaciones. Copiarla literalmente trasladaría también esa deuda técnica.

### Prioridades recomendadas

| Prioridad | Qué replicar | Decisión |
|---|---|---|
| P0 | Header, navegación, PDP, variantes, ATC, carrito | Réplica funcional con diseño propio |
| P0 | Galería sincronizada con variantes | Componente nativo Horizon extendido |
| P0 | Garantías, envío y confianza | Bloques editables |
| P1 | Tabs ancladas Overview / Specs / FAQ / Reviews | Barra sticky ligera |
| P1 | Consumible recurrente y bundles | Metafields + product lists |
| P1 | Reviews | Integración desacoplada del tema |
| P2 | Suscripción Video Cloud | Solo si el modelo de negocio tiene servicio digital |
| P2 | Quiz, trade-up y press carousel | Después de validar el producto |

---

## 2. Arquitectura global de la tienda

### 2.1 Barra superior y header

- Announcement bar sobre el header: promoción activa y umbral de envío gratis.
- Umbral observado: **envío gratis desde USD 99**.
- Header desktop observado: aproximadamente **64 px** de alto; anuncio + header suman cerca de **111 px**.
- Logo centrado/visible con navegación principal y utilidades de cuenta, búsqueda y carrito.
- Mega-menú con imágenes y enlaces editoriales, no un dropdown de texto básico.
- Navegación principal observada:
  - Granary 2 — New
  - Litter Box
  - Feeders
  - Fountains
  - Bundles
  - Learn
  - Support
- Subnavegación por familias:
  - Feeders: One RFID, Polar, Granary, accesorios, Petlibro Care y comparador.
  - Fountains: Dockstream 2, Stainless Steel, accesorios, Petlibro Care y selector.
  - Litter Box: Luma, bundles, Video Cloud AI y accesorios.
  - Camera: Scout, bundles y Video Cloud AI.

### 2.2 Carrito lateral

El carrito no es un drawer mínimo. Contiene:

- Estado vacío y CTA “Shop now”.
- Recomendaciones “You might also like”.
- Quick Add desde el drawer.
- Subtotal, ahorro, envío, impuestos y total.
- Campo de código promocional.
- CTA principal de checkout.
- Mensaje de urgencia / countdown.
- Barra de resumen móvil “Review My Cart”.

Productos recomendados observados en el estado vacío:

- Dockstream 2 Splash Shield — USD 12.99.
- Cove Placemat — USD 24.99.
- Granary Slow Feeder Bowl — USD 19.99.
- RFID Collar Tag — USD 14.99.
- Dockstream 2 Smart Fountain — USD 89.99.
- Stainless Steel Fountain — USD 39.99, antes USD 49.99.

### 2.3 Footer

- Captura de email con consentimiento de marketing.
- Navegación por catálogo, empresa, soporte y políticas.
- Selector de país/idioma.
- CTA de descarga de PETLIBRO App.
- Redes sociales y copyright.

---

## 3. Auditoría de la home

La home observada tiene un recorrido de aproximadamente **6,125 px de contenido principal** en desktop, más header y footer. Se divide en siete grupos Shopify principales.

### 3.1 Orden de secciones

| # | Sección | Contenido / objetivo de conversión | Componente recomendado |
|---:|---|---|---|
| 1 | Hero carousel | Dockstream 2, Granary 2, Luma, perks/quiz | `home-hero-carousel` |
| 2 | Shop by category | Litter Box, Feeders, Fountains, Camera | `category-grid` |
| 3 | New & Popular | Cinco productos con CTA doble | `featured-product-stories` |
| 4 | Trade-up banner | Oferta de actualización y descuento | `promotion-banner` |
| 5 | Social feed | “Follow along for more” | `social-gallery` |
| 6 | Trusted by / press | Citas de medios y slider | `press-quotes` |
| 7 | Brand manifesto | “Designed better for your lives together” | `brand-story-banner` |

### 3.2 Hero

Características funcionales:

- Carrusel de campañas, no una imagen estática.
- Activos desktop y móvil independientes.
- Vídeo e imagen pueden coexistir.
- Badge de estado: “Best seller” o “New release”.
- Headline corto, subheadline y uno o dos CTA.
- Contenido y contraste cambian por slide.
- Carga eager solo para el primer slide; los demás deben diferirse.

Campañas observadas:

- Dockstream 2 — “Our most advanced fountain yet”.
- Granary 2 — “Better feeding starts with knowing”.
- Luma Smart Litter Box — “Know who did what, when, and how much”.
- Pet Vibe Check / captación — descuentos y perks.

### 3.3 Shop by category

Cuatro categorías con imagen lifestyle, titular, descripción y dos rutas:

- Compra directa.
- Contenido educativo “Learn more”.

Esto permite capturar tráfico con distinta intención: usuarios listos para comprar y usuarios aún en consideración.

### 3.4 New & Popular

Productos observados:

- Granary 2 Series — nuevo lanzamiento.
- Luma Smart Litter Box — best seller.
- Dockstream 2 Smart Cordless Fountain.
- One RFID Feeder — best seller.
- Scout Smart Camera.

Patrón: imagen grande + badge + nombre + beneficio de una línea + CTA “Buy/Shop Now” + CTA educativo.

### 3.5 Prueba social y marca

- Slider de menciones y reseñas editoriales.
- Social gallery visual.
- Cierre emocional de marca antes de newsletter y footer.
- La home equilibra producto y vínculo humano-animal; no es solo un catálogo.

---

## 4. Auditoría del producto

### 4.1 Datos principales

| Campo | Valor observado |
|---|---|
| Producto | Granary Smart Camera Feeder |
| Handle | `petlibro-granary-automatic-pet-feeder-with-camera` |
| Product ID | `7032414502959` |
| Tipo | Auto Feeder |
| Precio | USD 139.99–149.99 |
| Variante solicitada | Single Bowl / White |
| Variant ID | `40913462001711` |
| SKU | `PL-AF203-04W` |
| Barcode | `752859356387` |
| Disponibilidad | In stock |
| Peso registrado | 2,130 g |
| Capacidad | 5 L |
| Rating estructurado | 4.8 / 5, 186 reviews |
| Rating mostrado en interfaz | 214 reviews |

**Hallazgo de calidad:** la interfaz muestra 214 reseñas, pero el JSON-LD declara 186. En la reconstrucción debe existir una sola fuente de verdad para evitar inconsistencias en SEO, confianza y rich results.

### 4.2 Variantes

| Estilo | Color | Precio | Variant ID | SKU | Barcode |
|---|---|---:|---:|---|---|
| Single Bowl | White | $139.99 | 40913462001711 | PL-AF203-04W | 752859356387 |
| Single Bowl | Black | $139.99 | 44336963158063 | PL-AF203-04B | 782943477803 |
| Dual Bowl | White | $149.99 | 41835977605167 | PL-AF203-06W | — |
| Dual Bowl | Black | $149.99 | 44336963190831 | PL-AF203-06B | — |

La selección de variante debe actualizar simultáneamente:

- Precio.
- Variant ID en el formulario.
- Disponibilidad.
- Imagen principal.
- Galería relevante.
- Texto de la variante en sticky ATC.
- Add-ons compatibles.

### 4.3 Above the fold / bloque de compra

Orden observado:

1. Galería principal con “See full gallery”.
2. Nombre del producto.
3. Tagline: “Make every mealtime a dinner date”.
4. Rating y cantidad de reseñas.
5. Precio.
6. Tres señales de confianza:
   - Free shipping $99+.
   - 30-day money-back guarantee.
   - Hassle-free warranty.
7. Modal/drawer con detalles de shipping y support.
8. Financiación desde USD 35/mes con Affirm y otras opciones.
9. Seis beneficios compactos.
10. Selector de estilo.
11. Promoción contextual hacia Granary 2.
12. Selector de color.
13. Estimación dinámica de entrega.
14. Add-ons.
15. Suscripción Video Cloud.
16. Bundle.
17. Add to Cart.

### 4.4 Beneficios del producto

- Hasta 10 comidas o snacks al día.
- Cámara integrada 1080p y lente gran angular de 145°.
- Wi-Fi y control por app.
- Audio bidireccional en tiempo real.
- Sellado cuádruple para frescura.
- Capacidad de 5 L.

### 4.5 Garantías y logística

- Envío estándar en EE. UU. continental:
  - USD 5.99 para pedidos menores de USD 34.99.
  - USD 9.99 entre USD 35 y USD 98.99.
  - Gratis desde USD 99.
- Entrega comunicada: 5–8 días hábiles, con margen adicional en festivos.
- Política de devolución de 30 días.
- Garantía y soporte de 24 meses.
- En devoluciones no relacionadas con falla del producto, el envío de retorno se descuenta del reembolso.

### 4.6 Galería

El catálogo del producto contiene **14 imágenes registradas** más vídeos y recursos duplicados para distintos layouts. Los primeros activos combinan:

- Packshot principal.
- Uso con perro/gato.
- Interfaz móvil de monitoreo.
- Close-up de cámara y panel.
- Versiones Single/Dual Bowl.
- Versiones White/Black.
- Vídeo de producto.

Formatos predominantes observados:

- 1800 × 1920, relación 0.938:1.
- 1600 × 1600, relación 1:1.
- Banners 1920 × 1020 aprox.
- Recursos separados para desktop y móvil en secciones narrativas.

Regla para la reconstrucción: asignar media a variantes con el objeto `featured_media`; evitar renderizar múltiples galerías duplicadas en el DOM.

### 4.7 Upsells, recurrencia y LTV

#### Consumible

- Food Desiccant Bag — 12 pack.
- One-time: USD 25.99.
- Suscripción: USD 18.19 con 30% off inicial.
- Frecuencias: cada 3 o 6 meses.

#### Video Cloud

| Plan | Precio presentado | Historial | Reemplazo de dispositivo | Cancelación |
|---|---:|---:|---|---|
| Plus | $95.99/año en oferta; referencia $119.99 | 30 días | Sí | 7 días |
| Standard | $47.99/año en oferta; referencia $59.99 | 7 días | Sí | 7 días |
| Sin suscripción | $0 | SD card | No | — |

El flujo muestra primero una comparación, luego tarjetas de plan, y vuelve a presentar un upsell posterior al ATC (“Save every moment with Video Cloud”). Es una doble oportunidad de monetización.

#### Bundle

- Dockstream 2 Smart Fountain — USD 89.99, 15% off dentro del bundle.
- Granary Slow Feeder Bowl — USD 19.99, 15% off dentro del bundle.

### 4.8 Barra de navegación interna

Tabs observadas:

- PURCHASE
- OVERVIEW
- SPECS
- FAQ
- REVIEWS

Debe implementarse como navegación anclada con estado activo por `IntersectionObserver`, sticky debajo del header, compatible con Theme Editor y con `prefers-reduced-motion`.

### 4.9 Storytelling / Overview

| Bloque | Promesa | Evidencia visual |
|---|---|---|
| Picture perfect, day and night | Cámara 1080p + visión nocturna | Feeder y vista nocturna |
| An extra set of eyes and ears | Detección de movimiento/sonido y alertas | App + mascota |
| Record your pet, not your space | Cámara inclinada hacia abajo, 145° | Ángulo de visión |
| Personalized feeding at a tap | Horarios y porciones en app | UI de programación |
| Give them a call | Audio bidireccional | Mascota + control remoto |
| In the loop and in the know | Alertas de batería, comida y atasco | Notificaciones de app |
| Prevent food jamming | Compatibilidad con alimento seco | Infografía de kibble |

Después aparecen:

- Banner de almacenamiento Video Cloud.
- Comparativa visual de planes.
- Sección de descarga de PETLIBRO App.
- Vídeo “How to install the feeder”.

### 4.10 FAQ completa observada

1. Solo funciona con alimento seco; no wet food.
2. En Dual Bowl la porción se divide entre ambos platos según el splitter.
3. Adecuado para gatos y mascotas pequeñas/medianas; no orientado a perros grandes.
4. Capacidad de 5 litros.
5. Kibble aplicable: 2–15 mm de diámetro.
6. Hasta 50 porciones por comida.
7. Cada porción: aproximadamente 20 ml / 10 g / 1/12 cup.
8. Hasta 6 comidas diarias y un total teórico comunicado de 24 cups.
9. Cambiar la bolsa desecante cada dos semanas.
10. Las porciones pueden variar por horario.
11. Dispensador cerrado para dificultar que la mascota extraiga comida al moverlo.
12. Baterías como respaldo: mantienen horarios, pero desactivan Wi-Fi, cámara y controles asociados para ahorrar energía.
13. Los bowls son removibles.
14. Los vídeos de microSD se consultan desde Replay en la app, no directamente desde PC/teléfono.
15. Reembolso de software dentro de 7 días.
16. Reembolsos de software se tramitan con soporte.
17. Video Cloud requiere un plan separado por feeder y el dispositivo debe vincularse primero a la app.

### 4.11 Specs que debe contener nuestra versión

La página estadounidense comunica parte de las specs como imagen. Para una versión mejor, deben existir también como HTML accesible y rastreable:

- Modelo: PLAF203 / familia AF203.
- Capacidad: 5 L.
- Cámara: 1080p HD, IR night vision, 145°.
- Comidas: hasta 10 en la oferta actual; revisar coherencia con FAQ histórica de 6 comidas.
- Porción: aprox. 20 ml / 10 g / 1/12 cup.
- Máximo: 50 porciones por comida.
- Kibble: 2–15 mm.
- Energía: adaptador DC 5 V + respaldo con 3 baterías alcalinas D.
- Entrada del adaptador: AC 110–240 V.
- Wi-Fi: 2.4 y 5 GHz.
- Sistemas: iOS y Android.
- Dimensiones de referencia internacional: 34 × 19 × 19 cm.
- Peso neto internacional: 1.7 kg single bowl / 1.95 kg dual bowl.

**Hallazgo:** existen discrepancias históricas entre regiones y versiones de la página. Antes de publicar, validar specs contra el manual y el producto real.

---

## 5. Diseño visual y sistema de tokens

### 5.1 Tokens observados

| Token | Valor aproximado |
|---|---|
| Tipografía principal | `sohne` |
| Body size | 16 px |
| Fondo global | #FFFFFF / #F7F7F6 según módulo |
| Texto principal | #121212 / #2A2A2A |
| CTA principal | #121212 o #2A2A2A |
| CTA text | #FFFFFF |
| Verde de acción / campaña | #315800 |
| Hover verde | #0CAC39 |
| Precio sale | #E5553A |
| Badge sale | #ED1C24 |
| Border | #F0F1F3 |
| Header desktop | 64 px |
| Header móvil | 58 px declarado |
| Page width declarado | 120 rem |
| Grid gap desktop | 8 px |
| Grid gap móvil | 4 px |
| Variant pills radius | 40 px |
| Botones globales base | radio 0 px; módulos específicos lo modifican |
| Duración UI estándar | 0.2 s |

### 5.2 Dirección visual

- Minimalismo editorial con fondos blancos y grises cálidos.
- Fotografía lifestyle de alta resolución.
- Uso limitado de color; el producto y las campañas aportan la mayor saturación.
- Headlines grandes y copy corto.
- Bordes suaves, casi sin sombras.
- Producto presentado como tecnología doméstica, no como accesorio barato.

### 5.3 Responsive

- Hero y banners usan archivos desktop/mobile separados.
- Galería cambia a carrusel táctil en móvil.
- La columna de compra deja de ser lateral y pasa a flujo vertical.
- Tabs se vuelven scroll horizontal.
- Bundle y comparativas deben convertirse en cards horizontales o tablas desplazables.
- Sticky ATC móvil debe respetar safe-area y no cubrir chat/cookies.
- Todos los CTA deben mantener al menos 44 × 44 px de área táctil.

---

## 6. Tecnología y aplicaciones detectadas

### 6.1 Plataforma

- Shopify Online Store.
- Theme ID observado en assets: `t/117`.
- Arquitectura personalizada con prefijos `dl-*` sobre componentes Shopify/Dawn heredados.
- Formularios AJAX de producto y cart drawer.

### 6.2 Integraciones detectadas

| Área | Integración / señal observada | Recomendación |
|---|---|---|
| Reviews | AfterShip / Automizely Reviews | Mantener desacoplado y lazy-load |
| Subscriptions | Recharge | Solo cargar en productos elegibles |
| Returns | AfterShip Returns | No necesario en primera versión visual |
| Gifts / promos | BOGOS / Secomapp | Reemplazar con Shopify Functions si es posible |
| Support | Yuma AI widget | Diferir hasta interacción |
| CRM | Braze | Depende del stack del negocio |
| Analytics | GA4, Google Ads, Meta, Bing, Clarity, Taboola | Gobernar con consent mode |
| Financing | Affirm, Shop Pay, Klarna, Afterpay | Usar bloques dinámicos Shopify |
| Geolocation | Country redirect app | Preferir Shopify Markets |

### 6.3 Riesgos de rendimiento detectados

- Alrededor de 163 scripts en la home.
- Aproximadamente 177 elementos `img` y numerosos duplicados para desktop/mobile, menús y popups.
- Múltiples píxeles y trackers de terceros.
- jQuery 3.3.1 y un archivo adicional `old-jquery.min.js` en PDP.
- Repetición de galería y media para layouts alternos.
- Varias hojas CSS pequeñas por módulo y aplicaciones.
- Popups y exit-intent con imágenes grandes cargadas en el documento.
- Vídeos repetidos en el DOM.

Objetivos para nuestra implementación:

- LCP móvil < 2.5 s.
- CLS < 0.1.
- INP < 200 ms.
- JS propio inicial < 120 KB comprimido como objetivo.
- Una sola instancia de galería y una sola fuente de variantes.
- Apps no críticas cargadas tras consentimiento, interacción o idle.
- Imágenes AVIF/WebP con `srcset`, `sizes`, width y height.

---

## 7. SEO, contenido y accesibilidad

### SEO observado

- Product JSON-LD con Offer, AggregateRating y return policy.
- Organization y Website schema globales.
- FAQPage schema en PDP.
- Canonical limpio sin variant query.
- Meta description orientada a beneficio y control remoto.

### Problemas / oportunidades

- Rating UI y JSON-LD no coinciden.
- Specs esenciales están parcialmente incrustadas en imágenes.
- Algunos alt texts son excesivos y parecen keyword stuffing.
- Varios recursos decorativos tienen alt vacío correctamente, pero otros reutilizan textos irrelevantes.
- No todos los headings visuales están marcados como H1/H2/H3; la home indexada solo expuso dos headings principales dentro de `main`.

### Requisitos para la reconstrucción

- Un H1 único por página.
- Jerarquía H2/H3 real, no texto en `div`.
- Specs y comparativas en HTML.
- FAQ visible y JSON-LD generado desde la misma fuente.
- Rating schema desde el mismo proveedor que pinta el widget.
- Botones y sliders con nombres accesibles.
- `aria-live` para precio, disponibilidad y ATC.
- Navegación completa por teclado.
- `prefers-reduced-motion`.

---

## 8. Arquitectura recomendada en Horizon

### 8.1 Componentes globales

- Announcement bar.
- Header + mega-menu visual.
- Predictive search.
- Cart drawer.
- Product card / quick add.
- Badge, price, rating y icon systems.
- Newsletter y footer.
- Modal/drawer compartido.

### 8.2 Secciones de home

- `home-hero-carousel.liquid`
- `category-grid.liquid`
- `featured-product-stories.liquid`
- `promotion-banner.liquid`
- `social-gallery.liquid`
- `press-quotes.liquid`
- `brand-story-banner.liquid`

### 8.3 Bloques / secciones PDP

- Galería nativa Horizon extendida.
- Product information compuesto por bloques.
- Trust benefits.
- Variant picker.
- Delivery estimate.
- Add-on selector.
- Subscription selector.
- Bundle builder.
- Sticky PDP navigation.
- Feature storytelling.
- Specs table.
- App download banner.
- Installation video.
- FAQ.
- Reviews.
- Sticky add-to-cart.

### 8.4 Metafields recomendados

| Namespace/key | Tipo | Uso |
|---|---|---|
| `custom.tagline` | single line | Subtítulo del producto |
| `custom.key_benefits` | metaobject list | Beneficios con icono |
| `custom.specifications` | metaobject list | Specs accesibles |
| `custom.compatible_addons` | product list | Add-ons |
| `custom.bundle_products` | product list | Bundle |
| `custom.delivery_note` | rich text | Entrega |
| `custom.feature_stories` | metaobject list | Overview |
| `custom.installation_video` | file / URL | Tutorial |
| `custom.faqs` | metaobject list | FAQ + schema |
| `custom.app_links` | metaobject | App Store / Google Play |

### 8.5 Principio de implementación

- Reutilizar primero los componentes de Horizon.
- Extender mediante settings/metafields.
- Componer antes de crear una sección nueva.
- Evitar HTML, CSS y JS duplicados.
- Mantener la clonación visual separada de marca, contenido y datos comerciales.

---

## 9. Plan de ejecución

### Fase 0 — Legal y activos

- Definir identidad propia.
- Fotografías, vídeos, copy, reviews y claims propios.
- Validar certificaciones y especificaciones reales.

### Fase 1 — Base y design system

- Importar Horizon limpio.
- Definir tokens, tipografía, color, spacing, radius y motion.
- Construir header, footer, mega-menu, cart drawer y cards.

### Fase 2 — PDP que convierte

- Product gallery.
- Product information.
- Variantes y sincronización de media.
- Garantías, entrega, sticky ATC.
- Add-ons y bundle.
- FAQ, specs y reviews.

### Fase 3 — Home

- Hero.
- Categorías.
- Featured products.
- Press/social proof.
- Brand story.

### Fase 4 — LTV

- Suscripción de consumibles.
- Upsells post-ATC.
- Cross-sells del carrito.
- Email capture / quiz.

### Fase 5 — QA y performance

- Theme Check.
- Lighthouse móvil/desktop.
- Pruebas de variantes, ATC, cantidad, remove, discounts y checkout.
- Safari iOS, Chrome Android y desktop.
- Theme Editor: add/remove/reorder de todos los bloques.
- Accesibilidad y structured data.

---

## 10. Criterios de aceptación para considerar la clonación completa

- [ ] Home y PDP coinciden en jerarquía, ritmo visual y comportamiento responsive.
- [ ] Todo el contenido se edita desde Theme Editor o metafields.
- [ ] No hay copy, assets ni marca de PETLIBRO dentro del tema final.
- [ ] Variantes actualizan precio, media, SKU y disponibilidad sin recarga.
- [ ] Cart drawer permite agregar, cambiar cantidad y eliminar.
- [ ] Add-ons, bundle y suscripción no duplican líneas ni rompen descuentos.
- [ ] FAQ y specs son HTML accesible.
- [ ] Reviews y JSON-LD comparten la misma cifra.
- [ ] Sticky nav y sticky ATC funcionan sin tapar contenido.
- [ ] Desktop, tablet y móvil tienen composición propia, no solo escalado.
- [ ] Theme Check sin nuevos errores.
- [ ] Objetivos de Core Web Vitals cumplidos.
- [ ] Imágenes y vídeos propios optimizados y responsive.
- [ ] Consentimiento y analytics configurados por mercado.

---

## 11. Decisión estratégica final

La mejor reconstrucción no es descargar PETLIBRO ni intentar convertir su HTML directamente a Liquid. La ruta correcta es:

1. **Horizon como base.**
2. **Recrear el sistema de diseño y los patrones UX.**
3. **Modelar el contenido con sections, blocks, metafields y metaobjects.**
4. **Usar activos y copy propios.**
5. **Implementar primero PDP + cart drawer**, porque concentran la venta.
6. **Construir la home después**, alimentándola con los mismos componentes reutilizables.

Esto produce una tienda visualmente comparable, pero más rápida, editable, legalmente más segura y preparada para escalar productos.
