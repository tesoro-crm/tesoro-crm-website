# AI Agent Blog Quick Start Guide

Deze gids helpt AI agents om snel en efficiënt blog posts te genereren voor Tesoro CRM.

## 🚀 Snelstart in 5 Stappen

### Stap 1: Bepaal het Blog Type

Kies uit deze templates:

| Type | Gebruik Voor | Lengte | Secties |
|------|-------------|--------|---------|
| **Case Study** | Klant succesverhalen | 1800-2200w | Intro → Problem → Solution → Results → Quote → Takeaways → CTA |
| **How-To Guide** | Praktische instructies | 1200-1600w | Intro → Solution (stappen) → Technical → Takeaways → FAQ → CTA |
| **Thought Leadership** | Trends & inzichten | 1500-2000w | Intro → Problem → Solution → Timeline → Takeaways → CTA |
| **Product Feature** | Nieuwe features | 1000-1400w | Intro → Solution → Results → Takeaways → CTA |

### Stap 2: Vul de Meta Data In

```json
{
  "meta": {
    "id": "[slug-format]",
    "version": "1.0.0",
    "createdAt": "[ISO-8601-timestamp]",
    "updatedAt": "[ISO-8601-timestamp]",
    "author": {
      "name": "Maria Perez",
      "image": "/images/authors/maria-perez.jpg",
      "bio": {
        "nl": "CRM specialist bij Tesoro",
        "en": "CRM specialist at Tesoro",
        "es": "Especialista en CRM en Tesoro"
      }
    },
    "category": "[case-study|how-to|thought-leadership|product]",
    "tags": ["tag1", "tag2", "tag3"],
    "featured": false,
    "draft": true,
    "readingTime": 0,
    "aiGenerated": true
  }
}
```

### Stap 3: Schrijf de Hero Section

**Title Formules** (kies er één):
- `[Probleem] naar [Oplossing]: [Resultaat]`
- `Hoe [Doelgroep] [Resultaat] bereikt`
- `[Aantal] Manieren om [Doel] te [Actie]`

**Voorbeelden**:
- ✅ "Van WordPress naar Professionele Website: 3x Meer Leads"
- ✅ "Hoe Makelaars 5 Uur per Week Besparen met Automatisering"
- ✅ "7 CRM Features die Elke Makelaar Nodig Heeft"

```json
{
  "hero": {
    "title": {
      "nl": "[Nederlandse title]",
      "en": "[English title]",
      "es": "[Título en español]"
    },
    "description": {
      "nl": "[140-160 karakters met keyword]",
      "en": "[140-160 characters with keyword]",
      "es": "[140-160 caracteres con palabra clave]"
    },
    "image": {
      "src": "/images/blog/[slug]/hero.jpg",
      "alt": {
        "nl": "[Beschrijvende alt text met keyword]",
        "en": "[Descriptive alt text with keyword]",
        "es": "[Texto alternativo descriptivo con palabra clave]"
      },
      "width": 1200,
      "height": 600
    },
    "publishDate": "[YYYY-MM-DD]"
  }
}
```

### Stap 4: Bouw de Secties

#### Verplichte Volgorde:
1. **Introduction** (altijd eerst)
2. **Problem** (optioneel, maar aanbevolen)
3. **Solution** (kern content)
4. **Results** (voor case studies)
5. **Quote** (optioneel, na belangrijke punten)
6. **Takeaways** (voor conclusie)
7. **CTA** (altijd laatste)

#### Sectie Templates:

**Introduction**:
```json
{
  "type": "introduction",
  "id": "intro",
  "content": {
    "nl": {
      "text": "<p>[Hook: vraag, statement, of scenario]</p><p>[Context en preview]</p>"
    },
    "en": { "text": "<p>[Hook]</p><p>[Context and preview]</p>" },
    "es": { "text": "<p>[Gancho]</p><p>[Contexto y vista previa]</p>" }
  }
}
```

**Problem**:
```json
{
  "type": "problem",
  "id": "het-probleem",
  "title": {
    "nl": "Het Probleem: [Beschrijving]",
    "en": "The Problem: [Description]",
    "es": "El Problema: [Descripción]"
  },
  "content": {
    "nl": { "text": "<p>[Beschrijf het probleem met voorbeelden]</p>" },
    "en": { "text": "<p>[Describe the problem with examples]</p>" },
    "es": { "text": "<p>[Describe el problema con ejemplos]</p>" }
  },
  "highlights": [
    {
      "nl": "Probleem punt 1",
      "en": "Problem point 1",
      "es": "Punto de problema 1"
    }
  ]
}
```

**Solution** (met subsecties):
```json
{
  "type": "solution",
  "id": "de-oplossing",
  "title": {
    "nl": "De Oplossing",
    "en": "The Solution",
    "es": "La Solución"
  },
  "subsections": [
    {
      "id": "stap-1",
      "title": {
        "nl": "Stap 1: [Titel]",
        "en": "Step 1: [Title]",
        "es": "Paso 1: [Título]"
      },
      "content": {
        "nl": { "text": "<p>[Uitleg van stap]</p>" },
        "en": { "text": "<p>[Step explanation]</p>" },
        "es": { "text": "<p>[Explicación del paso]</p>" }
      }
    }
  ]
}
```

**Results** (met metrics):
```json
{
  "type": "results",
  "id": "resultaten",
  "title": {
    "nl": "De Resultaten",
    "en": "The Results",
    "es": "Los Resultados"
  },
  "metrics": [
    {
      "value": "3x",
      "label": {
        "nl": "Meer leads",
        "en": "More leads",
        "es": "Más clientes potenciales"
      }
    }
  ],
  "content": {
    "nl": { "text": "<p>[Context bij cijfers]</p>" },
    "en": { "text": "<p>[Context for numbers]</p>" },
    "es": { "text": "<p>[Contexto para números]</p>" }
  }
}
```

**Quote**:
```json
{
  "type": "quote",
  "id": "testimonial",
  "quote": {
    "nl": "[1-3 zinnen testimonial]",
    "en": "[1-3 sentence testimonial]",
    "es": "[Testimonial de 1-3 oraciones]"
  },
  "author": "[Naam]",
  "role": {
    "nl": "[Functie, Bedrijf]",
    "en": "[Role, Company]",
    "es": "[Rol, Empresa]"
  }
}
```

**Takeaways**:
```json
{
  "type": "takeaways",
  "id": "key-takeaways",
  "title": {
    "nl": "Belangrijkste Lessen",
    "en": "Key Takeaways",
    "es": "Lecciones Clave"
  },
  "items": [
    {
      "nl": "[Takeaway 1: 10-20 woorden]",
      "en": "[Takeaway 1: 10-20 words]",
      "es": "[Conclusión 1: 10-20 palabras]"
    }
  ]
}
```

**CTA** (verplicht als laatste):
```json
{
  "type": "cta",
  "id": "conclusion",
  "title": {
    "nl": "Klaar voor [Actie]?",
    "en": "Ready for [Action]?",
    "es": "¿Listo para [Acción]?"
  },
  "content": {
    "nl": { "text": "<p>[Call to action tekst]</p>" },
    "en": { "text": "<p>[Call to action text]</p>" },
    "es": { "text": "<p>[Texto de llamada a la acción]</p>" }
  },
  "buttons": [
    {
      "text": {
        "nl": "Primaire Actie",
        "en": "Primary Action",
        "es": "Acción Primaria"
      },
      "url": "/contact",
      "style": "primary"
    }
  ]
}
```

### Stap 5: Voeg SEO & Meta Toe

```json
{
  "seo": {
    "canonicalURL": "https://tesorohq.io/blog/[slug]",
    "socialImage": "/images/blog/[slug]/social.jpg",
    "keywords": ["primair keyword", "secundair keyword", "long-tail"]
  },
  "relatedPosts": ["post-1", "post-2", "post-3"],
  "faq": [
    {
      "question": {
        "nl": "[Vraag]",
        "en": "[Question]",
        "es": "[Pregunta]"
      },
      "answer": {
        "nl": "[Antwoord: 50-150 woorden]",
        "en": "[Answer: 50-150 words]",
        "es": "[Respuesta: 50-150 palabras]"
      }
    }
  ]
}
```

## ✅ Validatie Checklist

Voor je de blog post opslaat, controleer:

### Structuur
- [ ] Meta object compleet met alle velden
- [ ] Hero section met title, description, image in alle 3 talen
- [ ] Minimaal 3 secties (intro, content, cta)
- [ ] Eerste sectie is `introduction`
- [ ] Laatste sectie is `cta`
- [ ] Alle sectie IDs zijn uniek

### Talen
- [ ] Nederlands compleet en correct
- [ ] Engels compleet en correct
- [ ] Spaans compleet en correct
- [ ] Alle LocalizedText objecten hebben nl, en, es

### Content Kwaliteit
- [ ] Title 40-60 karakters
- [ ] Description 140-160 karakters
- [ ] Totale lengte binnen richtlijnen (1200-2500w)
- [ ] Leestijd berekend (totaal woorden / 200)
- [ ] Keywords natuurlijk verwerkt
- [ ] Geen spelling fouten

### Images
- [ ] Hero image: 1200x600px
- [ ] Alt texts in alle 3 talen
- [ ] Images bestaan in /public/images/blog/[slug]/
- [ ] Bestandsgroottes geoptimaliseerd

### SEO
- [ ] Canonical URL ingevuld
- [ ] Social image ingevuld
- [ ] 3-5 keywords gedefinieerd
- [ ] 2-3 related posts gelinkt

## 🎯 Tone of Voice Cheat Sheet

### Nederlands
- **Aanspreekvorm**: "Je" (informeel)
- **Zinnen**: Kort en krachtig (max 20 woorden)
- **Stijl**: Direct, praktisch, vriendelijk
- **Voorbeeld**: "Je website werkt 24/7 voor je. Maar alleen als hij goed is."

### English
- **Aanspreekvorm**: "You" (professional)
- **Zinnen**: Clear and concise
- **Stijl**: Professional, confident, helpful
- **Voorbeeld**: "Your website works 24/7 for you. But only if it's good."

### Español
- **Aanspreekvorm**: "Tú" (informal but respectful)
- **Zinnen**: Slightly longer, flowing
- **Stijl**: Warm, professional, relationship-focused
- **Voorbeeld**: "Tu sitio web trabaja 24/7 para ti. Pero solo si es bueno."

## 🚫 Veelgemaakte Fouten

### ❌ Vermijd Dit:

1. **Incomplete vertalingen**
```json
// FOUT
"title": {
  "nl": "Nederlandse titel",
  "en": "English title"
  // es ontbreekt!
}
```

2. **Verkeerde sectie volgorde**
```json
// FOUT
"sections": [
  { "type": "cta" },  // CTA mag niet eerst!
  { "type": "introduction" }
]
```

3. **Te lange zinnen**
```
// FOUT (45 woorden)
"De implementatie van een modern CRM systeem voor vastgoedprofessionals vereist een zorgvuldige afweging..."

// GOED (3 korte zinnen)
"Een modern CRM systeem implementeren? Dat vereist zorgvuldige afweging. Denk aan gebruiksvriendelijkheid en kosten."
```

4. **Generieke content**
```
// FOUT
"Ons product is het beste."

// GOED
"Tesoro bespaart makelaars 5 uur per week."
```

5. **Missing alt texts**
```json
// FOUT
"alt": { "nl": "afbeelding" }

// GOED
"alt": {
  "nl": "Makelaar werkt op laptop met Tesoro CRM",
  "en": "Real estate agent working on laptop with Tesoro CRM",
  "es": "Agente inmobiliario trabajando en portátil con Tesoro CRM"
}
```

## 📊 Content Formules

### Opening Hooks

**Vraag**:
- NL: "Heb je ooit [probleem] gehad?"
- EN: "Have you ever [problem]?"
- ES: "¿Alguna vez has [problema]?"

**Statement**:
- NL: "In de wereld van [industrie] gaat het om [waarde]."
- EN: "In the world of [industry], [value] matters."
- ES: "En el mundo de [industria], [valor] importa."

**Scenario**:
- NL: "Stel je voor: [situatie]..."
- EN: "Imagine: [situation]..."
- ES: "Imagina: [situación]..."

### Transitie Zinnen

**Van Problem naar Solution**:
- NL: "Maar het hoeft niet zo te zijn."
- EN: "But it doesn't have to be this way."
- ES: "Pero no tiene que ser así."

**Van Solution naar Results**:
- NL: "De cijfers spreken voor zich."
- EN: "The numbers speak for themselves."
- ES: "Los números hablan por sí mismos."

**Naar CTA**:
- NL: "Klaar om te beginnen?"
- EN: "Ready to get started?"
- ES: "¿Listo para comenzar?"

## 🔧 Handige Tools

### Lengte Berekenen
```javascript
// Reading time (woorden / 200)
const wordCount = text.split(/\s+/).length;
const readingTime = Math.ceil(wordCount / 200);
```

### Validatie
```javascript
// Check alle talen aanwezig
function hasAllLanguages(obj) {
  return obj.nl && obj.en && obj.es;
}

// Check sectie volgorde
function validateSectionOrder(sections) {
  return sections[0].type === 'introduction' &&
         sections[sections.length - 1].type === 'cta';
}
```

## 📚 Voorbeelden per Type

### Case Study Template
```json
{
  "sections": [
    { "type": "introduction" },
    { "type": "problem" },
    { "type": "solution", "subsections": [...] },
    { "type": "results" },
    { "type": "quote" },
    { "type": "takeaways" },
    { "type": "cta" }
  ]
}
```

### How-To Template
```json
{
  "sections": [
    { "type": "introduction" },
    { "type": "solution", "subsections": [
      { "id": "stap-1" },
      { "id": "stap-2" },
      { "id": "stap-3" }
    ]},
    { "type": "takeaways" },
    { "type": "cta" }
  ]
}
```

### Thought Leadership Template
```json
{
  "sections": [
    { "type": "introduction" },
    { "type": "problem" },
    { "type": "solution" },
    { "type": "takeaways" },
    { "type": "cta" }
  ]
}
```

## 🎓 Leer van Voorbeelden

Bekijk deze voorbeeld posts:
- `/src/content/blog/makelaar-website-transformatie.json` - Complete case study
- Volg de structuur en tone of voice
- Let op de sectie volgorde en content lengte

## 💡 Pro Tips

1. **Start met Nederlands** - Vertaal daarna naar EN en ES
2. **Gebruik concrete cijfers** - "3x meer leads" niet "veel meer leads"
3. **Voeg altijd context toe** - Leg uit waarom iets belangrijk is
4. **Gebruik actieve zinnen** - "Maak een website" niet "Een website wordt gemaakt"
5. **Test je content** - Lees het hardop, klinkt het natuurlijk?

## 🆘 Hulp Nodig?

- **Volledige guidelines**: Zie `AI_BLOG_GUIDELINES.md`
- **Type definitions**: Zie `src/types/blog.ts`
- **Voorbeelden**: Zie `src/content/blog/*.json`
- **Contact**: team@tesorohq.io

---

**Succes met het schrijven! 🚀**
