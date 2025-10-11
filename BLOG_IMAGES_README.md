# Blog Images Guide

Deze gids legt uit hoe je afbeeldingen moet plaatsen voor de blog posts zodat ze automatisch geoptimaliseerd worden door Astro.

## 📁 Map Structuur

```
src/
├── content/
│   └── blog/
│       ├── mijn-artikel.md
│       └── images/
│           ├── mijn-artikel/
│           │   ├── hero-image.jpg      (1200x600px)
│           │   ├── inline-image-1.jpg  (800x400px)
│           │   └── inline-image-2.jpg  (800x400px)
│           └── ander-artikel/
│               └── hero-image.jpg
└── assets/
    └── blog-authors/
        ├── jan-jansen.jpg
        └── maria-perez.jpg
```

## 🖼️ Hero Images (Belangrijk!)

Voor elke blog post heb je een hero image nodig:

- **Bestandsnaam**: `hero-image.jpg` of `hero-image.png`
- **Afmetingen**: Minimum 1200x600px (aspect ratio 2:1)
- **Formaat**: JPG of PNG
- **Locatie**: `src/content/blog/[artikel-slug]/images/hero-image.jpg`
- **Alternatieve tekst**: Beschrijvende alt-text voor toegankelijkheid

### Voorbeeld:
```yaml
---
title: "Mijn Blog Artikel"
heroImage: "/images/blog/mijn-artikel/hero-image.jpg"
---
```

## 🖼️ Inline Images (Optioneel)

Voor afbeeldingen binnen de blog post:

- **Locatie**: `src/content/blog/[artikel-slug]/images/`
- **Afmetingen**: 800x400px of groter
- **Gebruik in Markdown**:
  ```markdown
  ![Alternatieve tekst](/images/blog/mijn-artikel/inline-image-1.jpg)

  ![Alternatieve tekst](/images/blog/mijn-artikel/inline-image-2.jpg)
  ```

## 👤 Author Images

Author avatars worden geplaatst in `src/assets/blog-authors/`:

- **Bestandsnaam**: `[voornaam]-[achternaam].jpg`
- **Afmetingen**: 200x200px minimum
- **Voorbeeld**: `jan-jansen.jpg`

## ⚡ Automatische Optimalisatie

Astro optimaliseert automatisch alle afbeeldingen:

- **WebP conversie** voor moderne browsers
- **Responsive images** met srcset
- **Lazy loading** standaard ingeschakeld
- **Compressie** voor kleinere bestandsgroottes

## 🛠️ Development Workflow

### 1. Maak de map structuur
```bash
mkdir -p src/content/blog/mijn-nieuwe-artikel/images
```

### 2. Plaats je afbeeldingen
```bash
# Hero image
cp mijn-hero-image.jpg src/content/blog/mijn-nieuwe-artikel/images/hero-image.jpg

# Inline images
cp image1.jpg src/content/blog/mijn-nieuwe-artikel/images/
cp image2.jpg src/content/blog/mijn-nieuwe-artikel/images/
```

### 3. Controleer in de frontmatter
```yaml
---
title: "Mijn Nieuwe Artikel"
heroImage: "/images/blog/mijn-nieuwe-artikel/hero-image.jpg"
---
```

### 4. Gebruik in de content
```markdown
![Hero image van mijn artikel](/images/blog/mijn-nieuwe-artikel/hero-image.jpg)

Hier is een inline afbeelding:

![Een mooie inline afbeelding](/images/blog/mijn-nieuwe-artikel/image1.jpg)
```

## 📏 Aanbevolen Specificaties

### Hero Images
- **Breedte**: 1200px minimum
- **Hoogte**: 600px minimum
- **Aspect ratio**: 2:1
- **Bestandsgrootte**: < 500KB
- **Formaat**: JPG (voor foto's), PNG (voor graphics)

### Inline Images
- **Breedte**: 800px minimum
- **Hoogte**: 400px minimum
- **Bestandsgrootte**: < 300KB
- **Alt-tekst**: Altijd verplicht voor toegankelijkheid

### Author Avatars
- **Afmetingen**: 200x200px minimum
- **Vorm**: Vierkant (wordt rond gemaakt in CSS)
- **Bestandsgrootte**: < 100KB

## 🔧 Troubleshooting

### Afbeelding wordt niet weergegeven
1. Controleer het pad in de frontmatter
2. Zorg dat de afbeelding bestaat in de juiste map
3. Gebruik forward slashes: `/images/blog/...`

### Afbeelding is te groot/langzaam
1. Controleer de bestandsgrootte (< 500KB voor hero)
2. Controleer de afmetingen (niet te groot)
3. Gebruik JPG voor foto's, PNG voor graphics

### Responsive images werken niet
1. Zorg dat de afbeelding minimaal 800px breed is
2. Controleer de browser console op errors
3. Test op verschillende schermgroottes

## 🎨 Tips voor Betere Images

### SEO
- Gebruik beschrijvende bestandsnamen
- Voeg altijd alt-tekst toe
- Optimaliseer voor Google Images

### Performance
- Comprimeer images voor web (TinyPNG, ImageOptim)
- Gebruik de juiste formaten
- Vermijd enorme afmetingen

### Toegankelijkheid
- Alt-tekst is verplicht
- Zorg voor voldoende contrast
- Test met schermlezers

### Design
- Gebruik consistente stijlen
- Zorg voor goede compositie
- Houd rekening met mobiele weergave
