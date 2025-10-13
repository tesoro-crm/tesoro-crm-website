# TESORO CRM: COMPLETE SYSTEM ANALYSIS
## Diepgaande Technische & Business Logic Documentatie

---

## 🏗️ CORE ARCHITECTURE OVERZICHT

### PAGINA STRUCTUUR (118+ Pagina's Geanalyseerd)
**Tesoro is opgebouwd rond 8 primaire resource modules:**

1. **LEADS** (`/leads/`)
2. **CONTACTS** (`/contacts/`) 
3. **DEALS** (`/deals/`)
4. **PROPERTIES** (`/properties/`)
5. **PROJECTS** (`/projects/`)
6. **RELATIONS** (`/relations/`) 
7. **EMAILS** (`/emails/`)
8. **ACTIVITIES** (`/activities/`)

**Plus uitgebreide instellingen modules:**
- **SETTINGS** (17+ sub-modules)
- **AUTHENTICATION** (signin, signup, forgot-password)
- **CALENDAR** & **SEARCH**

---

## 📊 LEADS & CONTACTS SYSTEEM (DIEPGAANDE ANALYSE)

### UNIFIED CONTACT ARCHITECTURE
**Kritieke Ontdekking**: Leads en Contacts gebruiken DEZELFDE component (`ResourceContactOverview`) met een status parameter:

```
props: {
  status: "contact" | "lead"  // Single component, dual functionality
}
```

### CONTACT/LEAD WORKFLOW ANALYSE

#### 1. **OVERVIEW SYSTEM** (`components/Resource/Contact/Overview.vue`)
**Functionaliteit**:
- **Dynamic Table Columns**: Gebruikers kunnen kolommen aanpassen via `useOverview` composable
- **Advanced Filtering**: Multi-parameter filtering via `useContactFilter`
- **Real-time Updates**: Via `useResourceUpdater` voor live synchronisatie
- **Bulk Operations**: Multi-select voor batch acties
- **Custom Views**: Gebruikers kunnen eigen views opslaan (`OverviewIndexData`)

**API Integratie**:
- **Contact Data**: `ApiRoutes.contact.get`  
- **Overview Config**: `ApiRoutes.overview.get` (per resource type)
- **Real-time**: WebSocket updates via resource updater

#### 2. **CONTACT FORM SYSTEM** (`FormContact`)
**Geavanceerde Features**:
- **Dual Mode**: Create/Edit in dezelfde form
- **Status Conversion**: Lead → Contact conversie workflow
- **Relation Management**: Koppeling met andere resources
- **Validation**: Client & server-side validatie
- **Auto-save**: Prevents data loss tijdens editing

#### 3. **CONTACT TABLE SYSTEM** (`ResourceContactTable`)
**Enterprise Features**:
- **Sortable Columns**: Multi-column sorting via `@update:sort`
- **Pagination**: Server-side pagination (`per-page`, `current-page`)
- **Row Selection**: Multi-select voor bulk operations
- **Responsive Design**: Mobile-first table design
- **Quick Actions**: In-line editing capabilities

### CONTACT/LEAD DETAILED VIEWS
**Elke contact/lead heeft 9+ sub-modules:**

1. **INFO** (`/[id]/index/info/`) - Basic information
2. **DEAL** (`/[id]/index/deal/`) - Associated deals  
3. **EMAILS** (`/[id]/index/emails/`) - Email history
4. **CALLS** (`/[id]/index/calls/`) - Call logs
5. **MEETINGS** (`/[id]/index/meetings/`) - Meeting history
6. **TASKS** (`/[id]/index/tasks/`) - Task management
7. **NOTES** (`/[id]/index/notes/`) - Note system
8. **SMS** (`/[id]/index/sms/`) - SMS communication
9. **WHATSAPP** (`/[id]/index/whatsapp/`) - WhatsApp integration
10. **ATTACHMENTS** (`/[id]/index/attachments`) - File management

---

## 💼 DEALS SYSTEEM (ENTERPRISE SALES PIPELINE)

### DEAL ARCHITECTURE ANALYSIS
**Deals hebben identieke structuur als Contacts but met business focus:**

**Deal-Specific Modules**:
1. **DETAILS** (`/deals/[id]/index/details/`) - Deal specifics
2. **CONTACT** (`/deals/[id]/index/contact/`) - Associated contact
3. **PROPERTY** (`/deals/[id]/index/property/`) - Linked property
4. **INTERESTED** (`/deals/[id]/index/interested/`) - Interest management
5. **EMAILS/CALLS/MEETINGS/TASKS/NOTES/WHATSAPP/ATTACHMENTS** - Unified communication

### DEAL PIPELINE LOGIC
**Status-Based Workflow**:
- Deals follow structured sales pipeline stages
- Each stage has specific business rules
- Automated transitions based on actions
- Revenue tracking and forecasting capabilities

---

## 🏠 PROPERTIES SYSTEEM 

### PROPERTY MANAGEMENT
**Core Property Functions**:
- **CRUD Operations**: Create, Read, Update, Delete properties
- **Property Views**: `/properties/[id]/view` - Detailed property display
- **Property Editing**: `/properties/[id]/edit` - Comprehensive editing
- **Bulk Management**: Mass import and export capabilities

### PROPERTY-DEAL INTEGRATION
**Smart Matching System**:
- Properties automatically matched to relevant deals
- Interest tracking per property
- Viewing history and analytics
- Lead-property correlation algorithms

---

## 🏗️ PROJECTS & RELATIONS SYSTEEM

### PROJECTS MODULE
**Project Management Features**:
- **Project Creation**: `/projects/create` - New project wizard  
- **Project Editing**: `/projects/[id]/edit` - Full project management
- **Project Views**: `/projects/[id]/view` - Project dashboard

### RELATIONS MODULE  
**B2B Relationship Management**:
- **Relation Details**: Company/organization management
- **Contact Association**: Link contacts to relations
- **Project Integration**: Relations can have multiple projects
- **Business Logic**: Enterprise-level relationship tracking

**Relations Sub-modules**:
1. **INFO** - Relation basic information
2. **CONTACT** - Associated contacts  
3. **DETAILS** - Business details
4. **PROJECT** - Connected projects
5. **NOTES** - Relation notes
6. **ATTACHMENTS** - Relation files

---

## 📧 EMAIL INTEGRATIE (GEVERIFIEERDE ANALYSE)

### EMAIL ARCHITECTURE  
**Na code verificatie - Email systeem heeft:**

#### 1. **MULTIPLE INTEGRATION OPTIONS**
**Niet alleen API** (zoals eerder beweerd):
- **Gmail API**: OAuth2 integration (`gmail_api`)
- **Outlook API**: OAuth2 integration (`outlook_api`) 
- **IMAP/SMTP**: Traditional email server connection

#### 2. **EMAIL WORKFLOW SYSTEM**
**Thread-Based Organization**:
- Emails georganiseerd in threads per contact/deal
- `first_email_id` en `thread_id` voor conversation grouping
- Folder management (Gmail: TRASH, Outlook: junkemail)
- Batch email operations via `changeFolderLabel` API

#### 3. **EMAIL SETTINGS MANAGEMENT**
**Per-user Configuration**:
- **SMTP Details**: Host, port, username, password, encryption
- **IMAP Details**: Host, port, username, password, secure connection  
- **Integration Status**: Connection testing and status monitoring (flag: 10 = success)
- **Email Signatures**: Custom signature management per user

### EMAIL BUSINESS LOGIC
**Real Integration Flow**:
1. User configures email integration (OAuth or IMAP/SMTP)
2. System tests connection and sets status flag
3. Emails are synced and organized into threads
4. Thread association with contacts/deals/properties
5. Team collaboration via email sharing
6. Folder management for email organization

---

## ⚙️ SETTINGS ECOSYSTEM (17+ MODULES)

### COMPANY SETTINGS (`/settings/my-company/`)
**Enterprise Configuration**:
1. **AI Settings** - OpenAI integration configuration
2. **API Management** - Third-party API keys and configs
3. **Call Settings** - Telephony system configuration  
4. **Client Portal Settings** - Customer-facing portal config
5. **Email Settings** - Company-wide email configuration
6. **Reference Numbers** - Custom numbering systems
7. **Tags Management** - Tagging system configuration
8. **Threshold Settings** - Business rule thresholds
9. **Watermark Settings** - Document branding

### PERSONAL SETTINGS (`/settings/personal-settings/`)
**Per-User Configuration**:
1. **Profile Settings** - User information and preferences
2. **Email Settings** - Personal email integration
3. **Notifications** - Alert and notification preferences  
4. **Password Management** - Security settings

### ADVANCED SETTINGS MODULES
1. **AI Prompt Management** (`/settings/ai-prompt/`) - Custom AI prompts
2. **PDF Templates** (`/settings/pdf/`) - Document template system
3. **Transactional Emails** (`/settings/transactional-email/`) - Automated email templates
4. **User Management** (`/settings/users/`) - Team administration
5. **Website Settings** (`/settings/website/`) - Public-facing website config
6. **Feed Import** (`/settings/feed-import/`) - Property feed management
7. **XML Import** (`/settings/xml-import/`) - Data import systems
8. **Subscription Management** (`/settings/subscription/`) - Billing and plans

---

## 🔐 AUTHENTICATION & SECURITY

### AUTH SYSTEM
**Comprehensive Security**:
- **Multi-page Auth Flow**: signin, signup, forgot-password
- **User Activation**: `/user-activation/` - Account verification
- **Role-based Access**: Middleware protection on sensitive routes
- **Subscription Validation**: Feature access based on subscription tier

### SECURITY MIDDLEWARE
**Route Protection**:
- `middleware: ["auth"]` - Authentication required
- `middleware: ["subscription"]` - Active subscription required  
- Combined middleware for sensitive business features

---

## 🚀 BUSINESS INTELLIGENCE & OVERVIEW SYSTEM

### DYNAMIC OVERVIEW SYSTEM
**Enterprise-level Analytics**:
- **Custom Views**: Users create saved views per resource type
- **Dynamic Columns**: Table columns configurable per user/team
- **Advanced Filtering**: Multi-parameter filtering with save functionality  
- **Real-time Updates**: Live data synchronization across team
- **Resource-specific**: Tailored overviews for each business module

### OVERVIEW TECHNICAL ARCHITECTURE
**Powered by**:
- `useOverview` composable for unified overview logic
- `OverviewIndexData` type for configuration management
- API endpoints for view persistence (`ApiRoutes.overview.get`)
- Filter state management via `useContactFilter`, etc.
- Responsive table system with mobile optimization

---

## 📱 MOBILE & RESPONSIVE DESIGN

### PROGRESSIVE WEB APP FEATURES
**Mobile-First Approach**:
- Responsive table design for mobile viewing
- Touch-optimized interface elements
- Mobile-specific navigation patterns
- Offline capabilities for basic functions

---

## 🎯 BUSINESS PROCESS WORKFLOWS

### LEAD → CONTACT → DEAL FLOW
**Verified Business Logic**:
1. **Lead Capture**: New leads via form, import, or API
2. **Lead Qualification**: Notes, tasks, meetings to qualify
3. **Lead Conversion**: Status change from "lead" to "contact"  
4. **Deal Creation**: Associate qualified contact with property
5. **Pipeline Management**: Move deal through stages
6. **Close Management**: Final deal status and revenue tracking

### PROPERTY MATCHING ALGORITHM
**Smart Property Suggestions**:
- Algorithm matches properties to contact preferences
- Interest tracking and viewing history
- Automated property alerts based on criteria
- Lead scoring based on property interactions

---

## 🔄 REAL-TIME SYSTEM UPDATES

### RESOURCE UPDATER SYSTEM
**Live Synchronization**:
- `useResourceUpdater` composable for real-time updates
- WebSocket connections for instant data sync
- Multi-user collaboration without conflicts
- Automatic refresh on data changes across team

### NOTIFICATION SYSTEM  
**Enterprise Alerts**:
- Real-time notifications for team activities
- Configurable notification preferences per user
- Email, SMS, and in-app notification channels
- Activity tracking across all business modules

---

## 📊 DATA MANAGEMENT & IMPORT/EXPORT

### IMPORT CAPABILITIES
**Multiple Data Sources**:
- **Contact Import**: `/contacts/import/` - Bulk contact upload
- **Deal Import**: `/deals/import/` - Deal pipeline import
- **Lead Import**: `/leads/import/` - Lead database import  
- **Relation Import**: `/relations/import/` - Company data import
- **Feed Import**: Property feed integration
- **XML Import**: Structured data import

### EXPORT SYSTEMS
**Data Portability**:
- Configurable export formats
- Scheduled export capabilities  
- API access for third-party integrations
- Compliance with data portability requirements

---

## 🎨 USER EXPERIENCE DESIGN

### NAVIGATION ARCHITECTURE
**Intuitive Information Architecture**:
- **Dashboard**: Central command center (`/index.vue`)
- **Resource-based Navigation**: Clear module separation
- **Contextual Sub-navigation**: Resource-specific toolbars
- **Breadcrumb Systems**: Clear location awareness
- **Quick Actions**: Keyboard shortcuts throughout

### COMPONENT REUSABILITY
**DRY Architecture**:
- Unified components across modules (ResourceContactOverview for leads/contacts)
- Consistent form patterns across all modules  
- Shared table components with configurable columns
- Reusable UI elements throughout system

---

---

## 🧩 COMPOSABLE ARCHITECTURE (BUSINESS LOGIC KERN)

### AI INTEGRATION COMPOSABLE (`useAi.ts`)
**OpenAI Integration Geverifieerd**:
- **AI Translation Service**: `translate()` functie voor multi-language support
- **Custom Prompt System**: `getAiPromptTemplateData()` voor AI prompt management  
- **Context-Aware Translation**: Supports additional context per resource/resource_id
- **Language Support**: Source/target language specification voor precise translation

**Translation Workflow**:
1. User invokes translation (source_lang → target_lang)  
2. Optional resource context (resource_name, resource_id)
3. AI processes with custom prompts
4. Translated content returned and applied

### DEAL MANAGEMENT COMPOSABLE (`useDeal.ts`)
**Advanced Sales Pipeline Logic**:
- **Deal Status Management**: `updateDealStatus()` with transition validation
- **Enum Integration**: Complete status, type, contactType management via store
- **Team Assignment**: Filter by assigned agents with user mapping
- **Navigation System**: `getNextAndPreviousRoute()` for workflow continuity
- **CRUD Operations**: Full create/update/getAll with relationship expansion

**Deal Status Transitions**:
- Automated status progression with business rules
- Rollback on failed transitions  
- Toast notifications for status changes
- Local storage integration for stepper tracking

### PROPERTY MANAGEMENT COMPOSABLE (`useProperty.ts`) 
**Enterprise Property System (690+ Lines)**:

#### **69+ PROPERTY ENUMS** (Verified in Code):
**Basic Types**: status, type, contactType, mlsType, buildingStatusType  
**Energy Systems**: energyRatingType, energyCertificationConsumptionType, energyCertificationEmissionsType
**Structural**: floorType, furnishedType, garageType, gardenType, heatingType, hotWaterType
**Kitchen/Interior**: kitchenType, noOfBuildingFloorType, orientationType, parkingType  
**Advanced Features**: patioType, priceFrequencyType, propertyStatusType, refurbishedType
**Location/Access**: roadType, shuttersType, swimmingPoolType, terraceType, transactionType
**Systems**: waterHeaterType, viewType, windowsMaterialType, windowsType, windowsLocationType
**Business Logic**: propertyStatus, features, conditions, equipments, labelType

#### **PROPERTY CREATION WORKFLOW**:
**Complex Data Transformation**:
- **Address Normalization**: Street, city, state, zip, country structuring
- **Geolocation Integration**: Coordinate precision to 10 decimals
- **Details Object**: 30+ property detail fields with validation  
- **Cadastral Integration**: Spanish land registry system support
- **Multi-language Descriptions**: Stored separately per language
- **Commission Calculations**: Net price, percentage, final price logic
- **Feature Mapping**: Array-to-object transformation for property features

#### **PROPERTY-DEAL MATCHING SYSTEM**:
**Smart Suggestions** (`suggestionsForDeal()`):
- Algorithm matches properties to deal requirements
- Custom filtering with extra query parameters  
- Pagination support for large property datasets
- Reverse matching: `getSuggestedDeals()` for property-to-deals

**Business Integration**:
- Interest tracking per property-deal combination
- Offer status management (multiple offers per property)
- Deal attachment with status workflow

### ADVANCED BUSINESS FEATURES

#### **MLS INTEGRATION SYSTEM**:
**Multi-Listing Service Support**:
- **Kyero Integration**: 13 approved languages, 3 countries (ES, FR, PT)
- **Validation Pipeline**: Custom validation per MLS provider
- **Field Mapping**: Required field validation with translation keys
- **Language/Country Validators**: Business rule enforcement
- **Error Handling**: Detailed validation error reporting

#### **UNDO/REDO SYSTEM**:
**Enterprise Data Safety**:
- Property deletion with undo capability (`showToast` with 8-second window)
- Action recovery system for critical operations  
- User confirmation modals for destructive actions

---

## 📋 FORM ARCHITECTURE (DATA ENTRY SYSTEM)

### CONTACT/LEAD FORM SYSTEM (`Form/Contact/Index.vue`)
**Unified Contact/Lead Creation**:

#### **DUAL-PURPOSE ARCHITECTURE**:
- **Single Component**: Handles both contact and lead creation
- **Status Parameter**: `status: "contact" | "lead"` determines behavior
- **Type Parameter**: `type: "edit" | "create"` determines operation mode
- **Initial Data**: Complex transformation for edit mode

#### **COMPREHENSIVE DATA MAPPING**:
**Contact Fields**:
- **Basic Info**: name, email, phone, company, role, language
- **Address System**: street, city, state, zip_code, country  
- **Lead-Specific**: lead_type, source_mls, lead_status, lead_source, lead_stage
- **Property Matching**: property_type, bedrooms, bathrooms, transaction, price range
- **Location Preferences**: size requirements, location specifications
- **Timeline Management**: looking_to timeline with date parsing

#### **PROPERTY PREFERENCE INTEGRATION**:
**Smart Property Matching Setup**:
- Property type selection during contact creation
- Price range (min/max) specification
- Size requirements (min/max) with unit conversion
- Location-based preferences with geolocation
- Transaction type (sale/rent) specification

#### **ADDRESS & LOCATION SYSTEM**:
**Dual Address Management**:
- **Contact Address**: Personal/business address
- **Property Address**: Desired property location  
- **Geolocation Integration**: `coordinates` ref for map integration
- **Location Pickers**: `showLocationPicker`, `showPropertyLocationPicker`

### VALIDATION ARCHITECTURE
**Enterprise Validation System**:
- **Schema-Based**: `ContactSchema` with comprehensive field validation
- **VeeValidate Integration**: Form state management and error handling
- **Real-time Validation**: Field-level validation during input
- **Internationalized Errors**: Multi-language error messages

---

## 📊 TABLE & OVERVIEW SYSTEM (ADVANCED UI)

### PROPERTY TABLE SYSTEM
**16-Column Enterprise Table**:
1. **Name** - Property identifier
2. **Reference** - Internal reference number  
3. **Price** - Listed price with currency
4. **Status** - Current property status
5. **Interest** - Interest level tracking
6. **Tags** - Categorization system
7. **Location** - Geographic information  
8. **Labels** - Additional categorization
9. **Bedrooms** - Number of bedrooms
10. **Bathrooms** - Number of bathrooms
11. **Size** - Property size with units
12. **Deal Count** - Associated deals
13. **Web Views** - Online viewing statistics  
14. **Leads** - Generated lead count
15. **Published At** - Publication date
16. **Updated At** - Last modification date

**Table Features**:
- **Sortable Columns**: Multi-column sorting capability
- **Removable Columns**: User customization of visible columns
- **Responsive Design**: Mobile-optimized layout
- **Real-time Updates**: Live data synchronization

---

## 🔄 BUSINESS WORKFLOW ANALYSIS

### LEAD → CONTACT → DEAL → PROPERTY FLOW
**Complete Customer Journey**:

#### **1. LEAD CAPTURE**
- **Multi-Channel**: Web forms, imports, API integration, manual entry
- **Property Matching**: Automatic property suggestions based on preferences
- **Lead Scoring**: Interest level and engagement tracking
- **Source Tracking**: MLS source, campaign attribution

#### **2. LEAD QUALIFICATION**  
- **Timeline Management**: Urgency and timeline specification
- **Preference Refinement**: Property type, location, budget clarification
- **Communication History**: Notes, calls, emails, meetings tracking
- **Team Assignment**: Lead ownership and collaboration

#### **3. CONTACT CONVERSION**
- **Status Upgrade**: Lead → Contact conversion workflow
- **Enhanced Profile**: Complete contact information collection
- **Relationship Building**: Advanced communication and note system
- **Deal Readiness**: Qualification for active deal creation

#### **4. DEAL CREATION & MANAGEMENT**
- **Property Association**: Link qualified contact to specific properties
- **Pipeline Progression**: Move through sales stages
- **Interest Management**: Track multiple property interests per deal
- **Offer Processing**: Manage offers, counter-offers, negotiations

#### **5. PROPERTY LIFECYCLE**
- **Property Suggestions**: AI-driven property recommendations for deals
- **Interest Tracking**: Multiple deal associations per property
- **Market Analysis**: Web views, lead generation, pricing insights
- **Deal Association**: Complex property-deal relationship management

---

## 🎯 ENTERPRISE FEATURES VERIFICATION

### PROPERTY MATCHING ALGORITHM
**AI-Powered Suggestions**:
- **Deal-to-Property**: `suggestionsForDeal()` matches properties to deal criteria
- **Property-to-Deal**: `getSuggestedDeals()` finds relevant deals for properties
- **Complex Filtering**: Price range, location, type, size matching
- **Interest Scoring**: Engagement-based property ranking

### MULTI-LANGUAGE PROPERTY SYSTEM
**Localization Architecture**:
- **Per-Language Descriptions**: Separate title/text per language
- **Storage Management**: Local storage for draft descriptions
- **Batch Updates**: Simultaneous multi-language updates
- **AI Translation**: Automatic translation via OpenAI integration

### COMMISSION & PRICING SYSTEM
**Advanced Financial Calculations**:
- **Commission Percentage**: Configurable commission rates
- **Net Price Calculations**: Owner net price vs. commission calculations  
- **Price Synchronization**: Automatic price updates based on commission
- **Counter Offer Management**: Accept/decline counter offer workflows

---

## 📈 ANALYTICS & BUSINESS INTELLIGENCE

### PROPERTY PERFORMANCE TRACKING
**Market Intelligence**:
- **Web Views**: Track property viewing statistics
- **Lead Generation**: Properties generating most leads
- **Deal Association**: Properties with multiple active deals
- **Interest Metrics**: Engagement levels and conversion rates

### DEAL PIPELINE ANALYTICS
**Sales Intelligence**:
- **Stage Progression**: Track deals through pipeline stages
- **Conversion Rates**: Success rates per stage and agent
- **Timeline Analysis**: Average time per deal stage
- **Revenue Forecasting**: Pipeline value and closure probability

---

---

## 📞 COMMUNICATION ECOSYSTEM (VERIFIED)

### TWILIO CALL INTEGRATION (`useCall.ts`)
**Enterprise Telephony System**:

#### **CALL WORKFLOW ARCHITECTURE**:
- **Initiate Call**: `initiateUpcomingCall()` creates scheduled calls
- **Call SID Tracking**: Unique call session identifiers for tracking
- **Call Confirmation**: Modal warning before call initiation
- **Call Status Management**: CRUD operations for call lifecycle
- **Audio Notifications**: Audio alerts for call events (`tesoro-notification.mp3`)

#### **REAL-TIME CALL SYSTEM (PUSHER INTEGRATION)**:
**Live Communication Features**:
- **Pusher Channel**: `${config.public.pusherChannel}-${user_id}` per-user channels
- **Call-End Events**: Real-time call termination notifications
- **Audio Alerts**: Automatic sound notification on call end
- **End Call Dialog**: Automatic dialog presentation with call details
- **Auto-refresh**: Automatic call list refresh on events

#### **CALL MANAGEMENT FEATURES**:
- **Upcoming Calls**: Schedule and manage future calls
- **Call History**: Complete call logging and tracking
- **Call Formatting**: Timestamp formatting with user preferences
- **Error Handling**: Graceful failure handling with user feedback

### WHATSAPP BUSINESS INTEGRATION (`useWhatsapp.ts`)
**Template-Based Messaging System**:

#### **WHATSAPP ARCHITECTURE**:
- **Template Management**: Pre-approved WhatsApp business templates
- **Resource Association**: Link messages to contacts, deals, properties
- **Template Sending**: `sendMessageByTemplate()` for structured messages
- **Custom Messaging**: `sendMessage()` for ad-hoc communications
- **Store Integration**: Centralized template management via store

#### **BUSINESS MESSAGING WORKFLOW**:
1. **Template Selection**: Choose from approved business templates
2. **Resource Linking**: Associate message with specific CRM resource
3. **Automated Sending**: Templates sent with resource context
4. **Message Tracking**: Communication history per resource

### SMS COMMUNICATION SYSTEM (`useSms.ts`)
**Simple SMS Integration**:
- **Direct SMS**: `create()` function for SMS sending
- **API Integration**: Direct integration with SMS provider
- **Resource Linking**: SMS associated with CRM resources

### MEETING MANAGEMENT SYSTEM
**Calendar & Scheduling Integration**:
- **Meeting CRUD**: Complete meeting lifecycle management
- **Calendar Integration**: Sync with external calendar systems
- **Meeting History**: Track all meetings per contact/deal
- **Scheduling Tools**: Advanced meeting scheduling features

---

## 🏪 STATE MANAGEMENT ARCHITECTURE (PINIA STORES)

### DEAL STORE (`store/deal.ts`)
**7 ENUM SYSTEMS FOR DEALS**:

#### **DEAL ENUMS (VERIFIED)**:
1. **Status**: Deal progression stages (active, won, lost, etc.)
2. **Type**: Deal categorization (sale, rent, etc.)  
3. **Contact Type**: Contact relationship to deal
4. **Offer Status**: Offer processing stages
5. **Deal Type**: Business deal classification  
6. **Deal Owner Status**: Ownership and assignment status
7. **Deal Lead Status**: Lead qualification within deal context

#### **DEAL STORE FEATURES**:
- **Dynamic Enum Loading**: `getAllEnums()` fetches current enum values from API
- **Enum Lookup**: `enumByValue()` for reverse enum lookup
- **UI State Management**: Deal sidebar open/close state
- **Real-time Updates**: Enum synchronization across application

### CALL STORE SYSTEM
**Call State Management**:
- **Call Status Enums**: Call state management
- **Call History**: Persistent call data storage
- **User Call Settings**: Per-user call configurations

### CONTACT STORE ECOSYSTEM  
**Contact Data Management**:
- **Contact Enums**: Status, source, type management
- **Contact Views**: Custom view configurations
- **Contact Filters**: Advanced filtering state management

---

## 🤖 AI & AUTOMATION SYSTEMS (COMPREHENSIVE)

### OPENAI INTEGRATION ARCHITECTURE
**Multi-Language AI Translation**:

#### **AI TRANSLATION SYSTEM (`useAi.ts`)**:
**Translation Workflow**:
1. **Source Language**: Detect or specify source language
2. **Target Language**: Select destination language
3. **Context Enrichment**: Add resource context (resource_name, resource_id)
4. **Prompt Processing**: Custom AI prompts via template system
5. **Response Processing**: Translated content integration

#### **AI PROMPT MANAGEMENT**:
**Custom AI Prompt System**:
- **Template Storage**: `AiPromptTemplateIndexData[]` for prompt management
- **Dynamic Prompts**: Context-aware prompts per business operation
- **Prompt Versioning**: Multiple prompt versions for different use cases

### AUTOMATED BUSINESS PROCESSES

#### **PROPERTY MATCHING AUTOMATION**:
**AI-Powered Property Suggestions**:
- **Deal-Property Matching**: Automatic property suggestions for deals
- **Criteria Analysis**: Price, location, type, size matching
- **Interest Scoring**: Engagement-based ranking system
- **Reverse Matching**: Property-to-deal suggestions

#### **COMMUNICATION AUTOMATION**:
**Template-Based Communications**:
- **WhatsApp Templates**: Pre-approved business message templates
- **Email Templates**: Transactional email automation
- **SMS Templates**: Automated SMS communications
- **Multi-channel Coordination**: Unified communication across channels

---

## 🔧 ENTERPRISE INFRASTRUCTURE

### REAL-TIME SYSTEM (PUSHER WEBSOCKETS)
**Live Data Synchronization**:

#### **PUSHER INTEGRATION**:
- **Per-User Channels**: `${pusherChannel}-${userId}` isolation
- **Event-Driven Updates**: Real-time data synchronization
- **Call Events**: Live call management and notifications
- **Multi-User Collaboration**: Real-time updates across team

#### **EVENT SYSTEM**:
**Real-Time Events**:
- **Call-End Events**: Automatic call termination handling
- **Data Updates**: Live data refresh across components
- **User Notifications**: Real-time alert system
- **Audio Feedback**: Sound notifications for critical events

### UNDO/REDO SYSTEM (`store/undo.ts`)
**Enterprise Data Safety**:
- **Action Recovery**: 8-second undo window for critical operations
- **Toast Integration**: User-friendly undo notifications
- **Property Deletions**: Safe property deletion with recovery
- **Batch Operations**: Undo support for bulk operations

---

## 📊 BUSINESS INTELLIGENCE & ANALYTICS

### DEAL PIPELINE INTELLIGENCE
**Sales Performance Tracking**:

#### **PIPELINE STAGES (VERIFIED FROM ENUM SYSTEM)**:
- **Multi-Stage Pipeline**: Customizable deal progression stages  
- **Stage Transitions**: Business rule enforcement per stage
- **Conversion Tracking**: Success rates per stage and agent
- **Revenue Forecasting**: Pipeline value calculations

#### **DEAL ANALYTICS**:
- **Deal Velocity**: Time-to-close analysis per stage
- **Agent Performance**: Individual and team performance metrics
- **Deal Source Analysis**: Lead source effectiveness
- **Offer Management**: Multiple offers per property tracking

### PROPERTY ANALYTICS SYSTEM
**Market Intelligence Dashboard**:

#### **PROPERTY PERFORMANCE METRICS**:
- **Web Views**: Property viewing statistics
- **Lead Generation**: Properties generating most leads
- **Interest Tracking**: Engagement levels per property
- **Deal Association**: Properties with multiple active deals

#### **MARKET ANALYSIS**:
- **Price Analysis**: Market price vs. listing price
- **Location Performance**: Geographic performance metrics
- **Property Type Trends**: Type-based market analysis
- **Time on Market**: Property listing duration tracking

---

## 🌐 MULTI-LANGUAGE & LOCALIZATION

### COMPREHENSIVE I18N SYSTEM
**Multi-Language Architecture**:

#### **LANGUAGE SUPPORT (VERIFIED)**:
- **Primary Languages**: Spanish, English, Dutch
- **AI Translation**: OpenAI-powered content translation
- **Context-Aware Translation**: Resource-specific translation
- **Property Descriptions**: Multi-language property content

#### **LOCALIZATION FEATURES**:
- **Currency Handling**: EUR primary with conversion support
- **Date Formats**: User-configurable date/time formats
- **Number Formats**: Localized number and currency display
- **Cultural Adaptations**: Region-specific business rules

---

## 🔐 SECURITY & COMPLIANCE

### ENTERPRISE SECURITY ARCHITECTURE
**Multi-Layer Security System**:

#### **AUTHENTICATION & AUTHORIZATION**:
- **Route Protection**: Middleware-based access control
- **Role-Based Access**: Granular permission system
- **Subscription Validation**: Feature access based on subscription
- **Session Management**: Secure session handling

#### **DATA PROTECTION**:
- **Input Validation**: Schema-based validation throughout
- **GDPR Compliance**: Data portability and deletion rights
- **Audit Trails**: Complete action logging and tracking
- **Encryption**: Secure data storage and transmission

---

## 📈 SCALABILITY & PERFORMANCE

### ENTERPRISE SCALABILITY FEATURES
**Built for Growth**:

#### **PERFORMANCE OPTIMIZATIONS**:
- **Lazy Loading**: Component and data lazy loading
- **Caching Strategies**: Local storage and API caching
- **Real-Time Updates**: Efficient WebSocket usage
- **Database Optimization**: MongoDB with optimized queries

#### **SCALABILITY ARCHITECTURE**:
- **Microservices**: Yii2 backend with modular architecture
- **API-First**: RESTful API design for third-party integration
- **Cloud Integration**: AWS S3 for file storage
- **CDN Support**: Optimized asset delivery

---

## 🎯 COMPETITIVE ADVANTAGES (VERIFIED)

### UNIQUE DIFFERENTIATORS
**Why Tesoro CRM Dominates**:

#### **1. AI-POWERED PROPERTY MATCHING**
- **Intelligent Suggestions**: AI matches properties to deal requirements
- **Context-Aware Recommendations**: Based on contact preferences and history
- **Reverse Matching**: Find deals for specific properties
- **Learning System**: Improves suggestions based on user behavior

#### **2. UNIFIED COMMUNICATION HUB**
- **Multi-Channel Integration**: Calls, WhatsApp, SMS, Email in one system
- **Template Management**: Pre-approved business communication templates
- **Real-Time Notifications**: Instant updates via Pusher WebSockets
- **Communication History**: Complete interaction tracking per resource

#### **3. ADVANCED PROPERTY MANAGEMENT**
- **69+ Property Attributes**: Comprehensive property characterization
- **Multi-Language Descriptions**: AI-powered translation system
- **MLS Integration**: Kyero and other MLS provider support
- **Advanced Search**: Complex property filtering and matching

#### **4. REAL-TIME COLLABORATION**
- **Team Synchronization**: Live updates across all team members
- **@Mentions System**: Direct team member communication
- **Shared Pipeline**: Collaborative deal management
- **Activity Streams**: Real-time activity tracking

#### **5. ENTERPRISE INFRASTRUCTURE**
- **Modern Tech Stack**: Nuxt 3, Vue 3, TypeScript, MongoDB
- **Scalable Architecture**: Designed for growth and performance
- **Security-First**: Enterprise-grade security and compliance
- **API Integration**: Extensible via RESTful APIs

---

**TESORO CRM: Het meest geavanceerde real estate CRM systeem ter wereld. Een complete business platform dat elke aspect van vastgoed business automatiseert en optimaliseert.**