# Forms & Spam Protection Setup

## Overview

All forms on the website are protected by Cloudflare Turnstile and send notifications via Mailgun.

## Environment Variables

Add these to your .env file locally and Cloudflare Pages environment variables in production.

## Mailgun Setup

1. Go to Mailgun Dashboard
2. Navigate to Sending > Domain Settings
3. Copy your API Key from API Keys section
4. Copy your Domain (e.g., mg.tesoro.estate)
5. Note your Region (EU or US)

## Configure Email Recipient

Edit the email recipient in functions/api/demo.ts and functions/api/contact.ts

Change sales@tesoro.estate to your actual email address.

## Deployment

Add environment variables in Cloudflare Pages Settings > Environment Variables

Deploy your site and test the forms.
