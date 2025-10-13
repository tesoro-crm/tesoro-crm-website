# TESORO CRM - SYSTEM SITEMAP & NAVIGATION GUIDE
## Versie 1.16.0 - Complete System Map voor Version Tracking

*Laatst bijgewerkt: 2025-10-13*  
*Base URL: https://crm.tesoro.estate*

---

## 🗺️ HOOFDNAVIGATIE STRUCTUUR

```
📊 Dashboard (/)
├── 📈 KPI Overview
├── 🔔 Notifications Center  
├── 📋 Recent Activities
├── 📊 Deal Pipeline Table
└── ⚡ Quick Actions

📱 Activities (/activities)
├── 📧 Email Activities
├── 📞 Call Logs
├── 💬 WhatsApp Messages
├── 📅 Meetings
└── 📋 Task Activities

🎯 Leads (/leads)
├── 📝 Lead Management
├── 🔄 Lead Conversion
├── 📊 Lead Sources
└── 📈 Lead Analytics

💼 Deals (/deals)
├── 📋 Deal Overview Table
├── 🔍 Deal Search & Filters
├── 📊 Pipeline Stages
└── 📈 Deal Analytics
    └── Deal Detail (/deals/[id])
        ├── 🏠 Properties Tab
        │   ├── Property Matching Algorithm
        │   ├── Property Suggestions
        │   └── Property Assignment
        ├── ✅ Tasks Tab
        │   ├── Task Creation Modal
        │   ├── Task Assignment
        │   ├── Due Date Management
        │   └── Task Completion Tracking
        ├── 📝 Notes Tab
        │   ├── Rich Text Editor (TipTap)
        │   ├── Note History
        │   └── Note Sharing
        ├── 📧 Emails Tab
        │   ├── Email Composition
        │   ├── Template Selection
        │   ├── Email History
        │   └── Attachment Management
        ├── 💬 WhatsApp Tab
        │   ├── WhatsApp Integration (Twilio)
        │   ├── Message History
        │   └── Media Sharing
        └── 📎 Attachments Tab
            ├── File Upload System
            ├── Document Preview
            └── File Management

👥 Relations (/relations)
├── 🏢 Company Relations
├── 👤 Personal Relations
├── 🔗 Relationship Types
└── 📊 Relationship Analytics

👤 Contacts (/contacts)
├── 👥 Contact Database (1000+)
├── 🔍 Contact Search
├── 📊 Contact Segmentation
├── 📧 Contact Communication
└── 🏷️ Contact Tagging

🏠 Properties (/properties)
├── 🏠 Property Database (1,085+)
├── 🔍 Advanced Search & Filters
├── 📊 Property Analytics
├── 🏷️ Property Status Management
└── Property Detail (/properties/[id])
    ├── 📋 General Information
    ├── 📸 Photo Gallery + Watermarks
    ├── 💰 Pricing & Financial Data
    ├── 🏠 Property Features
    ├── 📍 Location Details
    ├── 🔗 Connected Deals/Contacts
    └── 📎 Property Attachments

🏗️ Projects (/projects)
├── 📋 Project Overview
├── 👨‍💼 Developer Information
├── 🌐 Project Websites
└── 📊 Project Analytics

📅 Calendar (/calendar)
├── 📅 Calendar Events
├── 🔄 Calendar Export
└── 📱 External Integration
```

---

## ⚙️ SETTINGS HIERARCHY COMPLETE MAP

```
⚙️ Settings (/settings)
├── 👤 GENERAL
│   ├── Personal Settings (/settings/personal-settings)
│   │   ├── Personal Preferences (default)
│   │   ├── Password (/settings/personal-settings/password)
│   │   ├── Email (/settings/personal-settings/email)
│   │   └── Notifications (/settings/personal-settings/notification)
│   └── Company Settings (/settings/my-company)
│       ├── Company Settings (default)
│       ├── Email Settings (/settings/my-company/email)
│       │   ├── Signatures Tab
│       │   └── Transactional Email Tab
│       ├── Call Settings (/settings/my-company/call)
│       │   ├── Twilio Settings Tab
│       │   └── Mask Verification Tab
│       ├── Watermark (/settings/my-company/watermark)
│       ├── Reference Numbers (/settings/my-company/reference-numbers)
│       ├── Tags (/settings/my-company/tags)
│       ├── API Keys (/settings/my-company/api)
│       ├── AI Settings (/settings/my-company/ai-settings) ⭐
│       ├── Client Portal Settings (/settings/my-company/client-portal-settings)
│       └── Threshold (/settings/my-company/threshold)
├── 💳 SUBSCRIPTIONS
│   └── Subscription & Plans (/settings/subscription)
├── 👥 USER AND CONTROLS
│   └── Users (/settings/users)
├── 📄 TEMPLATES
│   ├── Email (/settings/email)
│   ├── Transactional Email (/settings/transactional-email)
│   ├── PDF (/settings/pdf)
│   └── AI Prompt (/settings/ai-prompt) ⭐
├── 🌐 WEBSITE
│   ├── Website Settings (/settings/website)
│   └── XML Import (/settings/xml-import)
├── 🏠 MLS
│   ├── Feed Export (/settings/feed-import)
│   └── Feed Manager (/settings/feed-manager)
└── 📅 CALENDAR
    └── Calendar Export (/settings/calendar-export)
```

---

## 🔧 FUNCTIONALITEITEN PER MODULE

### 📊 Dashboard Features
- **KPI Widgets:** Real-time metrics
- **Activity Feed:** Live updates 
- **Quick Actions:** Fast navigation
- **Pipeline Overview:** Visual deal stages
- **Notification Center:** System alerts

### 💼 Deals Management  
- **Pipeline Stages:** Customizable workflow
- **Property Matching:** AI-assisted suggestions
- **Task Management:** Integrated ToDo system
- **Communication Hub:** Email + WhatsApp + Notes
- **Document Management:** File attachments
- **Activity Tracking:** Complete audit trail

### 🏠 Properties Core Features
- **Mass Database:** 1,085+ properties
- **Price Range:** €145K - €4.5M+
- **Status System:** Voor verkoop, Verkocht, etc.
- **Photo Management:** Watermark integration
- **Search Engine:** Advanced filtering
- **Reference System:** TSR prefix numbering

### 👥 Contact & Relations
- **Contact Database:** 1,000+ contacts
- **Relationship Mapping:** Multi-entity connections
- **Communication History:** Full interaction log
- **Segmentation:** Tag-based organization
- **Import/Export:** Data management tools

---

## 🚀 GEAVANCEERDE INTEGRATIES

### 🤖 AI SYSTEEM (v1.16.0)
```
AI Settings (/settings/my-company/ai-settings)
├── Status: ENABLED ✅
├── Provider: OpenAI
├── Model: GPT-4o Mini
├── Translation Service ⭐
│   ├── Provider: OpenAI
│   └── Model: GPT-4o Mini
└── Unbranding Service ⭐
    ├── Provider: OpenAI
    └── Model: GPT-4o Mini
```

### 📞 TWILIO COMMUNICATION STACK
```
Call Settings (/settings/my-company/call)
├── Twilio Call Number: +18582992443
├── Twilio WhatsApp: +18582992443
├── Masking: Active
└── User Verification System
    ├── Phone Verification
    ├── Status Tracking
    └── Revoke Options
```

### 🌐 CLIENT PORTAL ECOSYSTEM
```
Client Portal (/settings/my-company/client-portal-settings)
├── Status: ENABLED ✅
├── Portal URL: https://tesoroweb.app/auth/signin?id=[API_KEY]
├── API Integration: sxQKJCNhk1xFY1aZUbOB4EhE5lLGc__9
└── External Access: Self-service client interface
```

---

## 🏷️ DATA CATEGORIZATION SYSTEMS

### Tags System (7/50 gebruikt)
```
Tags (/settings/my-company/tags)
├── BARGAIN (Blauw) - Koopjes identificatie
├── CONTRACTS (Paars) - Contract tracking  
├── CRISTINA (Paars) - Agent-specifieke tag
├── PRIVATE (Bruin) - Privé listings
├── SPECIAL (Turquoise) - Bijzondere properties
├── VIP (Geel) - VIP klant behandeling
└── WHATSAPP (Groen) - WhatsApp communicatie marker
```

### Status Hierarchies
```
Deal Statuses: New → In Progress → Under Contract → Closed/Lost
Property Statuses: Available → Reserved → Sold → Off Market
Contact Types: Lead → Prospect → Client → Past Client
```

---

## ⚠️ AUTOMATION & ALERTS

### Threshold System
```
Thresholds (/settings/my-company/threshold)
├── Time on Market Monitoring
├── Orange Alert: 60 dagen ⚠️
│   └── "Follow-up voordat properties stale worden"
└── Red Alert: 90 dagen 🚨
    └── "Rode status voor langdurige listings"
```

### Automated Workflows
- **Property Watermarking:** Auto-apply op upload
- **Reference Generation:** TSR[nummer]C format
- **Email Templates:** Signature injection
- **API Synchronization:** Real-time client portal sync
- **Communication Logging:** Auto-track alle interacties

---

## 🔄 VERSION TRACKING TEMPLATE

### Voor Toekomstige Updates:
```
## VERSIE [X.X.X] CHANGELOG
### 📅 Datum: [YYYY-MM-DD]
### 🔗 Jira Tickets: [TICKET-NUMBERS]

#### ✨ NIEUWE FEATURES
- [ ] Module/Feature naam (/url)
  - Beschrijving
  - Screenshots: [filenames]
  - Impact niveau: [Hoog/Medium/Laag]

#### 🔄 GEWIJZIGDE FEATURES  
- [ ] Existing Module (/url)
  - Wat is veranderd
  - Voor/Na vergelijking
  - Screenshots: [filenames]

#### 🗂️ URL WIJZIGINGEN
- [ ] Oude URL → Nieuwe URL
  - Reden voor wijziging
  - Migratie impact

#### 🔧 BACKEND WIJZIGINGEN
- [ ] API Updates
- [ ] Integratie wijzigingen  
- [ ] Database schema updates
```

---

## 📱 RESPONSIVE & ACCESS PATTERNS

### URL Patterns Ontdekt
```
Base Patterns:
- /{module} - Module overzicht
- /{module}/[id] - Detail view
- /settings/{category} - Settings sectie
- /settings/{category}/{subsection} - Settings detail

Query Parameters:
- ?tab={tab_name} - Tab switching
- ?id={identifier} - Entity identification
- Search & Filter parameters per module
```

### Navigation States
```
Active States: [active] class op current page
Tab States: Tab switching binnen modules  
Modal States: Overlay modals voor create/edit
Loading States: Data fetching indicators
```

---

## 🎯 QUICK ACCESS REFERENCE

### Belangrijkste URLs voor Frequent Use:
```
📊 Dashboard: /
💼 Deals: /deals
🏠 Properties: /properties  
👤 Contacts: /contacts
⚙️ AI Settings: /settings/my-company/ai-settings
📞 Communication: /settings/my-company/call
🌐 Client Portal: /settings/my-company/client-portal-settings
🏷️ Tags: /settings/my-company/tags
```

### Search Functionaliteit
- **Global Search:** Header search bar
- **Module Search:** Per-module search filters
- **Advanced Filters:** Multi-criteria filtering
- **Saved Searches:** Filter presets

---

## 📋 SITEMAP GEBRUIK INSTRUCTIES

### Voor Version Updates:
1. **Compare** deze sitemap met nieuwe versie
2. **Identify** nieuwe URLs/features via Jira tickets
3. **Document** wijzigingen in changelog sectie
4. **Update** sitemap structuur waar nodig
5. **Screenshot** nieuwe features
6. **Test** nieuwe navigation flows

### Voor Navigation:
1. **Gebruik** URL patterns voor snelle navigatie
2. **Reference** feature lists per module
3. **Check** integration points voor troubleshooting
4. **Follow** hierarchy voor systematic exploration

---

*Deze sitemap dient als master reference voor alle toekomstige Tesoro CRM updates en navigation. Combineer met Jira version info voor complete change tracking.*

**🔄 Status:** MASTER SITEMAP v1.16.0 VOLTOOID  
**📊 Coverage:** 100% van ontdekte functionaliteiten  
**⚡ Volgende:** Ready voor version comparison met nieuwe releases