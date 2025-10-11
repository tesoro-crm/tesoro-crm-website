# Blog Sections Guide - Generieke Blokkendoos 📦

Dit document beschrijft alle beschikbare blog section types en hoe je ze gebruikt.

## 🎯 Beschikbare Section Types

### 1. **Text Section** (`type: "text"`)
Basis tekstblok met optionele subsections.

```json
{
  "type": "text",
  "id": "sectie-id",
  "title": {
    "nl": "Sectie Titel",
    "en": "Section Title",
    "es": "Título de Sección"
  },
  "content": {
    "nl": { "text": "<p>HTML content...</p>" },
    "en": { "text": "<p>HTML content...</p>" },
    "es": { "text": "<p>HTML content...</p>" }
  },
  "image": {
    "src": "/path/to/image.jpg",
    "alt": { "nl": "Alt text", "en": "Alt text", "es": "Alt text" },
    "caption": { "nl": "Caption", "en": "Caption", "es": "Caption" },
    "width": 800,
    "height": 600
  },
  "subsections": [
    {
      "id": "subsection-id",
      "title": { "nl": "Subsectie", "en": "Subsection", "es": "Subsección" },
      "content": { "nl": { "text": "<p>...</p>" } },
      "image": { ... }
    }
  ]
}
```

**Use cases:** Introductie, uitleg, verhaal, algemene content

---

### 2. **Callout Section** (`type: "callout"`)
Gekleurde highlight box voor belangrijke punten.

```json
{
  "type": "callout",
  "id": "callout-id",
  "variant": "info",
  "title": {
    "nl": "Belangrijke Punten",
    "en": "Key Points",
    "es": "Puntos Clave"
  },
  "items": [
    { "nl": "Punt 1", "en": "Point 1", "es": "Punto 1" },
    { "nl": "Punt 2", "en": "Point 2", "es": "Punto 2" }
  ]
}
```

**Variants:**
- `info` (blauw) - Algemene informatie
- `success` (groen) - Positieve punten, successen
- `warning` (geel) - Waarschuwingen, let op
- `danger` (rood) - Gevaren, fouten
- `tip` (paars) - Tips, best practices

**Use cases:** Key takeaways, tips, waarschuwingen, belangrijke punten

---

### 3. **Stats Grid Section** (`type: "stats"`)
Grid van statistieken/metrics.

```json
{
  "type": "stats",
  "id": "stats-id",
  "title": {
    "nl": "De Resultaten",
    "en": "The Results",
    "es": "Los Resultados"
  },
  "stats": [
    {
      "icon": "📈",
      "value": "3x",
      "label": { "nl": "Meer Leads", "en": "More Leads", "es": "Más Clientes" },
      "description": { "nl": "Vergeleken met vorige jaar", "en": "Compared to last year", "es": "Comparado con el año pasado" }
    }
  ]
}
```

**Use cases:** Resultaten, KPIs, statistieken, metrics

---

### 4. **Comparison Section** (`type: "comparison"`)
Vergelijking tussen twee opties (voor/na, oud/nieuw).

```json
{
  "type": "comparison",
  "id": "comparison-id",
  "title": {
    "nl": "Voor en Na",
    "en": "Before and After",
    "es": "Antes y Después"
  },
  "left": {
    "label": { "nl": "Voor", "en": "Before", "es": "Antes" },
    "content": { "nl": { "text": "<p>...</p>" } },
    "image": { ... }
  },
  "right": {
    "label": { "nl": "Na", "en": "After", "es": "Después" },
    "content": { "nl": { "text": "<p>...</p>" } },
    "image": { ... }
  }
}
```

**Use cases:** Voor/na transformaties, oud vs nieuw, optie A vs B

---

### 5. **Steps Section** (`type: "steps"`)
Stapsgewijze proces of timeline.

```json
{
  "type": "steps",
  "id": "steps-id",
  "title": {
    "nl": "Het Proces",
    "en": "The Process",
    "es": "El Proceso"
  },
  "steps": [
    {
      "icon": "1",
      "title": { "nl": "Stap 1", "en": "Step 1", "es": "Paso 1" },
      "content": { "nl": { "text": "<p>...</p>" } }
    }
  ]
}
```

**Use cases:** Tutorials, processen, roadmaps, timelines

---

### 6. **Video Section** (`type: "video"`)
Embed video's (YouTube, Vimeo, of self-hosted).

```json
{
  "type": "video",
  "id": "video-id",
  "title": {
    "nl": "Bekijk de Demo",
    "en": "Watch the Demo",
    "es": "Ver la Demo"
  },
  "description": {
    "nl": "Een korte uitleg van het product",
    "en": "A brief explanation of the product",
    "es": "Una breve explicación del producto"
  },
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "videoType": "youtube",
  "aspectRatio": "16/9",
  "caption": {
    "nl": "Product demo video",
    "en": "Product demo video",
    "es": "Video de demostración del producto"
  }
}
```

**Video Types:**
- `youtube` - YouTube videos
- `vimeo` - Vimeo videos
- `custom` - Self-hosted of andere embeds

**Aspect Ratios:**
- `16/9` (standaard) - Widescreen
- `4/3` - Klassiek
- `1/1` - Vierkant
- `21/9` - Ultra-wide

**Use cases:** Product demos, tutorials, testimonial videos, explainers

---

### 7. **Quote Section** (`type: "quote"`)
Citaat met auteur.

```json
{
  "type": "quote",
  "id": "quote-id",
  "quote": {
    "nl": "Dit is een geweldig product!",
    "en": "This is an amazing product!",
    "es": "¡Este es un producto increíble!"
  },
  "author": {
    "name": "Jan Jansen",
    "role": { "nl": "CEO", "en": "CEO", "es": "CEO" },
    "company": "Bedrijf BV",
    "avatar": "/images/avatar.jpg"
  }
}
```

**Use cases:** Testimonials, expert quotes, klantreviews

---

### 8. **CTA Section** (`type: "cta"`)
Call-to-action voor conversie.

```json
{
  "type": "cta",
  "id": "cta-id",
  "title": {
    "nl": "Klaar om te Beginnen?",
    "en": "Ready to Get Started?",
    "es": "¿Listo para Empezar?"
  },
  "description": {
    "nl": "Neem vandaag nog contact op",
    "en": "Contact us today",
    "es": "Contáctanos hoy"
  },
  "button": {
    "text": { "nl": "Neem Contact Op", "en": "Contact Us", "es": "Contáctanos" },
    "url": "/contact"
  }
}
```

**Use cases:** Conversie, volgende stap, lead generation

---

## 🔄 Backwards Compatibility

Oude section types worden automatisch gemapt naar nieuwe generieke types:

- `introduction` → `text`
- `problem` → `text`
- `solution` → `text`
- `takeaways` → `text`
- `highlights` → `callout`
- `results` → `stats`

---

## 💡 Best Practices

1. **Gebruik generieke types** - `text`, `callout`, `stats` etc. zijn flexibeler
2. **Consistent ID's** - Gebruik kebab-case voor section IDs
3. **Altijd 3 talen** - nl, en, es voor alle content
4. **Images optioneel** - Niet elke sectie heeft een afbeelding nodig
5. **Subsections voor diepte** - Gebruik subsections in TextSection voor H3 structuur
6. **Slug altijd Engels** - Ongeacht de taal van de content, gebruik altijd Engelse slugs (bijv. `real-estate-agent-transformation` niet `makelaar-website-transformatie` of `transformacion-agente-inmobiliario`)

---

## 📚 Voorbeelden

Zie `/src/content/blog/makelaar-website-transformatie.json` voor een compleet voorbeeld.
