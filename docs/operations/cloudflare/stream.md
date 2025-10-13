# Cloudflare Stream Video Setup

## Overview

The website uses Cloudflare Stream to host and deliver demo videos. The video modal is configured to play videos directly from your Cloudflare Stream account.

## Setup Instructions

### 1. Upload Video to Cloudflare Stream

1. Go to your Cloudflare Stream dashboard:
   ```
   https://dash.cloudflare.com/565f7b099257d757fdc9732c9190e345/stream/videos
   ```

2. Click **Upload Video** or use the API to upload your demo video

3. After upload, you'll get:
   - **Video ID** (UID): A unique identifier for your video
   - **Customer Code**: Your unique customer subdomain code

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Cloudflare Stream credentials to `.env`:
   ```env
   PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE=your-customer-code
   PUBLIC_CLOUDFLARE_STREAM_VIDEO_ID=your-video-id
   ```

### 3. Get Your Credentials

#### Option A: From Dashboard

1. Go to Stream dashboard and select your video
2. Click on **Embed** tab
3. You'll see an iframe URL like:
   ```
   https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/iframe
   ```
4. Extract:
   - `<CODE>` = Your customer code
   - `<VIDEO_UID>` = Your video ID

#### Option B: Using API

```bash
# Get your account ID and API token from Cloudflare dashboard
curl -X GET \
  -H "Authorization: Bearer <API_TOKEN>" \
  https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream
```

## Upload Video via API

```bash
# Upload a video file
curl -X POST \
  -H "Authorization: Bearer <API_TOKEN>" \
  -F file=@/path/to/video.mp4 \
  https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream
```

## Supported Video Formats

- MP4, MKV, MOV, AVI, FLV
- MPEG-2 TS, MPEG-2 PS, MXF, LXF, GXF
- 3GP, WebM, MPG, QuickTime

## Video Recommendations

- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **Frame Rate**: 30 FPS or 60 FPS
- **Bitrate**: 5-10 Mbps for HD content
- **Duration**: Keep demo videos under 5 minutes for best engagement

## Testing

After configuring the environment variables:

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to the homepage
3. Click "See How It Works" button
4. The video modal should open with your Cloudflare Stream video

## Troubleshooting

### Video doesn't load
- Check that environment variables are set correctly
- Verify video ID and customer code in Cloudflare dashboard
- Ensure video has finished processing in Cloudflare Stream

### Video is private/restricted
- Check video privacy settings in Cloudflare Stream dashboard
- For public videos, ensure "Require signed URLs" is disabled

## Additional Resources

- [Cloudflare Stream Documentation](https://developers.cloudflare.com/stream/)
- [Stream Player Customization](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/)
- [Stream API Reference](https://developers.cloudflare.com/api/operations/stream-videos-list-videos)
