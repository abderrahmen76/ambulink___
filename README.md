# AmbuLink Intro Website

Single-page Next.js landing website for the AmbuLink solution.

## Download buttons

Place your APK files here:

- `public/downloads/patient_app.apk`
- `public/downloads/mobile_app.apk`

The landing page buttons already point to those paths.

## Demo requests

The demo buttons open a form that submits directly to Formspree without a page reload.
The endpoint is configured in `app/demo-request.tsx`. Formspree must be configured
and activated to receive submissions; no application backend is required.

## Run locally

```bash
npm install
npm run dev
```
