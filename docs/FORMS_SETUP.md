# Forms & Spam Protection Setup

## Overview

All forms use **Cloudflare Secret Store** for secure credential management, Turnstile for spam protection, and Mailgun for email notifications.

## Cloudflare Secret Store Setup

The project uses Secret Store ID: `f232fb5497684c778c9082dab1308c64`

### Add Secrets via Wrangler CLI:

```bash
# Add Turnstile Secret
wrangler secret:bulk put --secret-store f232fb5497684c778c9082dab1308c64 <<EOF
TURNSTILE_SECRET_KEY=0x4AAAAAAB543YohbkgJerNoWvs4uo22olE
EOF

# Add Mailgun Secrets
wrangler secret:bulk put --secret-store f232fb5497684c778c9082dab1308c64 <<EOF
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=mg.tesoro.estate
MAILGUN_REGION=eu
NOTIFICATION_EMAIL=sales@tesoro.estate
EOF
```

### Or via Cloudflare Dashboard:

1. Go to: https://dash.cloudflare.com → Workers & Pages → Secret Store
2. Find store ID: `f232fb5497684c778c9082dab1308c64`
3. Add these secrets:
   - `TURNSTILE_SECRET_KEY`: `0x4AAAAAAB543YohbkgJerNoWvs4uo22olE`
   - `MAILGUN_API_KEY`: Your Mailgun API key
   - `MAILGUN_DOMAIN`: `mg.tesoro.estate`
   - `MAILGUN_REGION`: `eu`
   - `NOTIFICATION_EMAIL`: `sales@tesoro.estate`

## Email Functionality

The forms send **two emails**:

1. **Notification email** (to Tesoro team)
   - Recipient: Value from `NOTIFICATION_EMAIL` secret
   - Contains all form data + metadata (IP, referrer)
   - Professional HTML design with gradient header

2. **Confirmation email** (to customer)
   - Recipient: Customer's email address
   - Confirms their request was received
   - Professional HTML design matching brand
   - Includes their submitted information

Both emails use beautiful HTML templates with inline CSS for maximum compatibility.

## Deployment

Secrets are automatically available to all deployments (production & preview) via the binding in `wrangler.toml`.
