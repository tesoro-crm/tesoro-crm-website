# Blog Images Guide

This guide explains how to place images for blog posts so they are automatically optimized by Astro.

## 📁 Directory Structure

```
src/
├── content/
│   └── blog/
│       ├── my-article.md
│       └── images/
│           ├── my-article/
│           │   ├── hero-image.jpg      (1200x600px)
│           │   ├── inline-image-1.jpg  (800x400px)
│           │   └── inline-image-2.jpg  (800x400px)
│           └── other-article/
│               └── hero-image.jpg
└── assets/
    └── blog-authors/
        ├── john-doe.jpg
        └── maria-perez.jpg
```

## 🖼️ Hero Images (Important!)

For each blog post you need a hero image:

- **Filename**: `hero-image.jpg` or `hero-image.png`
- **Dimensions**: Minimum 1200x600px (aspect ratio 2:1)
- **Format**: JPG or PNG
- **Location**: `src/content/blog/[article-slug]/images/hero-image.jpg`
- **Alt text**: Descriptive alt text for accessibility

### Example:
```yaml
---
title: "My Blog Article"
heroImage: "/images/blog/my-article/hero-image.jpg"
---
```

## 🖼️ Inline Images (Optional)

For images within the blog post:

- **Location**: `src/content/blog/[article-slug]/images/`
- **Dimensions**: 800x400px or larger
- **Use in Markdown**:
  ```markdown
  ![Alt text describing the image](/images/blog/my-article/inline-image-1.jpg)
  ```

## 🖼️ Author Images

- **Location**: `src/assets/blog-authors/`
- **Dimensions**: 200x200px (1:1 aspect ratio)
- **Format**: JPG
- **Style**: Professional headshot, consistent styling
- **Naming**: `first-last.jpg` (e.g., `maria-perez.jpg`)

## 🎨 Image Requirements

### **File Sizes**
- Hero images: Max 200KB (optimized)
- Inline images: Max 150KB (optimized)
- Author images: Max 50KB

### **Formats**
- Photos: JPG (better compression)
- Graphics/Screenshots: PNG (better quality)
- Icons: SVG (scalable)

### **Optimization**
Images are automatically optimized by Astro's Image component:
- WebP conversion for modern browsers
- Responsive images with srcset
- Lazy loading
- Proper compression

## 📸 Image Sources

### **Free Stock Photos**
- [Unsplash](https://unsplash.com/) - High quality, free
- [Pexels](https://pexels.com/) - Curated collections
- [Pixabay](https://pixabay.com/) - No attribution required

### **Screenshots**
- Use clean, cropped screenshots
- Remove sensitive information
- Add annotations with arrows/circles
- Consistent styling across articles

### **Diagrams & Graphics**
- Use Figma or Canva for custom graphics
- Consistent brand colors
- Clear, readable text
- SVG format when possible

## 🏷️ Alt Text Guidelines

### **Best Practices**
- Describe what the image shows
- Include key information for screen readers
- Keep under 125 characters
- No "image of" or "photo of" prefixes

### **Examples**
✅ "Modern CRM dashboard showing customer data and analytics"
❌ "Image of a computer screen"
❌ "Dashboard screenshot"

## 🔧 Technical Implementation

### **Image Component Usage**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../images/hero-image.jpg';
---

<Image
  src={heroImage}
  alt="Descriptive alt text"
  width={1200}
  height={600}
  format="webp"
  quality={85}
/>
```

### **Responsive Images**
Astro automatically generates:
- Multiple sizes (320px, 640px, 1280px)
- WebP and fallback formats
- Proper srcset attributes

## 📋 Image Checklist

- [ ] Hero image present (1200x600px minimum)
- [ ] Images optimized (<200KB)
- [ ] Alt text descriptive and complete
- [ ] Consistent naming convention
- [ ] Proper file format (JPG/PNG)
- [ ] Author images professional (200x200px)
- [ ] Images tested on mobile

## 🗂️ File Organization

```
📁 src/content/blog/
├── 📄 case-study-1.json
├── 📄 tutorial-2.json
└── 📁 images/
    ├── 📁 case-study-1/
    │   ├── 🖼️ hero-image.jpg
    │   ├── 🖼️ diagram-1.jpg
    │   └── 🖼️ screenshot-1.png
    └── 📁 tutorial-2/
        ├── 🖼️ hero-image.jpg
        └── 🖼️ step-1.jpg
```

## 🚀 Deployment Notes

- Images are copied to `dist/` during build
- Optimized versions are generated automatically
- CDN-ready with proper caching headers
- Lazy loading for performance

---

**Ready to add stunning visuals to your blog posts? Follow this guide for optimal image handling! 📸**
