# Newsletter Language Segmentation

## Overview

The newsletter subscription system automatically captures the user's language preference based on the page they sign up from. This allows you to send targeted newsletters in Spanish, English, or Dutch.

## How It Works

### 1. Automatic Language Detection

When a user subscribes to the newsletter:
- **Spanish page** (`/` or `/es/...`) → `language = "es"`
- **English page** (`/en/...`) → `language = "en"`
- **Dutch page** (`/nl/...`) → `language = "nl"`

### 2. Stored Metadata

Each subscriber in Mailgun gets these metadata fields (`vars`):
```json
{
  "language": "es",           // User's preferred language
  "signup_date": "2025-10-29T...",  // When they subscribed
  "source": "website_footer"   // Where they signed up
}
```

## Using Language Segmentation in Mailgun

### Method 1: Filter Recipients When Sending

When creating a campaign in Mailgun, use recipient variables to filter:

**Spanish Newsletter:**
```
Filter: vars.language = "es"
Subject: [Your Spanish subject]
```

**English Newsletter:**
```
Filter: vars.language = "en"
Subject: [Your English subject]
```

**Dutch Newsletter:**
```
Filter: vars.language = "nl"
Subject: [Your Dutch subject]
```

### Method 2: Use Mailgun API

```bash
# Send to Spanish subscribers only
curl -s --user 'api:YOUR_API_KEY' \
  https://api.mailgun.net/v3/YOUR_DOMAIN/messages \
  -F from='Tesoro CRM <newsletter@tesoro.estate>' \
  -F to='newsletter@mg.tesoro.estate' \
  -F subject='Your Spanish Newsletter' \
  -F html='<html>...</html>' \
  -F o:tag='spanish-newsletter' \
  -F recipient-variables='{"filter": {"vars.language": "es"}}'
```

### Method 3: Create Segments (Recommended)

In Mailgun dashboard, you can create segments:

1. Go to **Mailing Lists** → `newsletter@mg.tesoro.estate`
2. Click **Segments** → **Create Segment**
3. Create three segments:

**Spanish Segment:**
- Name: `Spanish Subscribers`
- Filter: `vars.language = "es"`

**English Segment:**
- Name: `English Subscribers`
- Filter: `vars.language = "en"`

**Dutch Segment:**
- Name: `Dutch Subscribers`
- Filter: `vars.language = "nl"`

## Content Strategy Recommendations

### Spanish (Primary Market)
- **Frequency**: Monthly
- **Content Focus**:
  - Spanish real estate market trends
  - Local captatie tips and strategies
  - Success stories from Spanish agents
  - Platform updates and new features
- **Tone**: Professional but approachable

### English (International)
- **Frequency**: Quarterly
- **Content Focus**:
  - International investment opportunities in Spain
  - Market insights for expats
  - Cross-border transaction tips
  - Platform features for international users
- **Tone**: Professional, globally oriented

### Dutch (Expats/Investors)
- **Frequency**: Quarterly (or use same content as English)
- **Content Focus**:
  - Spanish market for Dutch investors
  - Expat community insights
  - Platform features
- **Tone**: Friendly, community-focused

## Viewing Subscriber Data

### In Mailgun Dashboard

1. Go to **Mailing Lists**
2. Click `newsletter@mg.tesoro.estate`
3. Click on any subscriber
4. View their `vars` section to see language preference

### Via API

```bash
# Get all subscribers with language metadata
curl -s --user 'api:YOUR_API_KEY' \
  https://api.mailgun.net/v3/lists/newsletter@mg.tesoro.estate/members/pages \
  -G
```

## Analytics and Reporting

You can track performance by language:

1. **Tag your campaigns** by language:
   - `spanish-newsletter-2024-11`
   - `english-newsletter-2024-q4`
   - `dutch-newsletter-2024-q4`

2. **Monitor metrics per language**:
   - Open rates by language
   - Click-through rates
   - Unsubscribe rates
   - Conversion rates

This helps you understand which language segments are most engaged.

## Testing the System

### Test Signup from Different Languages

1. **Spanish**: Go to `https://new.tesorohq.io/` → Subscribe
   - Check Mailgun: subscriber should have `language: "es"`

2. **English**: Go to `https://new.tesorohq.io/en/` → Subscribe
   - Check Mailgun: subscriber should have `language: "en"`

3. **Dutch**: Go to `https://new.tesorohq.io/nl/` → Subscribe
   - Check Mailgun: subscriber should have `language: "nl"`

### Test Sending Segmented Newsletter

```bash
# Send test to only Spanish subscribers
curl -s --user 'api:YOUR_API_KEY' \
  https://api.mailgun.net/v3/YOUR_DOMAIN/messages \
  -F from='Test <test@tesoro.estate>' \
  -F to='your-test-email@example.com' \
  -F subject='Test: Spanish Newsletter' \
  -F text='This is a test of the Spanish newsletter' \
  -F o:testmode=yes
```

## Migration: Existing Subscribers

If you have existing subscribers without language metadata:

1. **Default to Spanish**: Existing subscribers without `vars.language` are likely Spanish
2. **Update via API**:

```bash
# Update existing subscriber
curl -s --user 'api:YOUR_API_KEY' \
  https://api.mailgun.net/v3/lists/newsletter@mg.tesoro.estate/members/email@example.com \
  -X PUT \
  -F vars='{"language":"es","source":"pre-existing"}'
```

## Future Enhancements

Potential improvements:
- Preference center where users can change their language
- A/B testing different content per language
- Automated welcome series in user's language
- Unsubscribe page in user's language

## Support

For questions about the newsletter system:
- Technical issues: Check server logs at `/api/newsletter`
- Mailgun issues: Contact Mailgun support
- Feature requests: Document in GitHub issues
