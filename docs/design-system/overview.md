# Tesoro CRM Design System

**Central hub for all design system documentation**

---

## 📚 Design System Documentation

### Core Documentation
- **[Brand Identity](../product/brand-identity.md)** - Complete brand guidelines, colors, typography
- **[Design Tokens](design-tokens.md)** - Technical implementation of design values
- **[Component Library](components.md)** - UI components with variants and usage
- **[Typography](typography.md)** - Font system and text styling guidelines
- **[Styling](styling.md)** - CSS and styling guidelines

### Quick Reference

#### Brand Colors
- **Primary Blue**: `#003366` - Hero sections, primary CTAs
- **Primary Accent**: `#4BA3FF` - Hover states, highlights  
- **Secondary Gold**: `#F5B400` - Secondary CTAs, badges

#### Typography
- **Display**: Poppins (600, 700) - Headings and brand elements
- **Body**: Inter (400, 500, 600) - Body text and UI elements
- **Monospace**: JetBrains Mono (400) - Code and technical content

#### Spacing Scale
Based on 4px grid: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px

#### Component Status
- ✅ **Button**: Complete with 4 variants, 3 sizes
- ✅ **Card**: Complete with 4 variants, padding options
- ✅ **Input**: Complete with validation states
- ✅ **Badge**: Complete with 7 color variants, 3 sizes
- 🔄 **Modal**: In development
- 📋 **Table**: Planned for next sprint

---

## 🎯 Design Principles

### 1. Consistency
- Use design tokens for all styling decisions
- Follow established patterns across all components
- Maintain visual hierarchy throughout the interface

### 2. Accessibility
- WCAG 2.1 AA compliance minimum
- 4.5:1 contrast ratio for normal text
- Keyboard navigation support for all interactive elements

### 3. Performance
- Optimized component rendering
- Minimal bundle size impact
- Progressive enhancement approach

### 4. Flexibility
- Configurable components via props
- Themeable design tokens
- Responsive design patterns

---

## 🛠️ Implementation

### Development Workflow
1. **Design** → Create/update in Figma
2. **Tokens** → Export to design-tokens.json
3. **Code** → Implement component in src/components/ui/
4. **Documentation** → Update component docs
5. **Testing** → Visual regression and accessibility testing

### File Structure
```
src/
├── components/ui/          # Core UI components
├── styles/                 # Global styles and tokens
└── types/                  # TypeScript definitions

docs/design-system/         # Design documentation
├── overview.md            # This file
├── brand-identity.md      # Brand guidelines
├── tokens.md              # Design token reference
├── components.md          # Component documentation
└── typography.md          # Typography system
```

---

## 📋 Usage Guidelines

### For Developers
1. Always use design tokens instead of hardcoded values
2. Follow component prop interfaces exactly
3. Test accessibility with screen readers
4. Maintain responsive behavior

### For Designers
1. Use Figma component library as source of truth
2. Export tokens via Figma Tokens plugin
3. Document new patterns in component docs
4. Consider mobile-first design approach

### For Content Creators
1. Follow typography hierarchy (H1 → H2 → H3)
2. Use semantic color meanings (success = green, error = red)
3. Maintain consistent spacing patterns
4. Optimize images according to specifications

---

## 🔄 Maintenance

### Regular Reviews
- **Monthly**: Component usage audit
- **Quarterly**: Design token cleanup
- **Annually**: Complete design system review

### Update Process
1. Identify need for change
2. Design and prototype
3. Review with team
4. Implement and test
5. Update documentation
6. Communicate changes

---

**For detailed information on specific aspects of the design system, refer to the individual documentation files linked above.**