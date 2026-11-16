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

## Internship CV uploads

The internship form submits application details to Formspree and saves an optional
CV (PDF, DOC, or DOCX, up to 4 MiB) in a private Vercel Blob store. The Formspree
submission includes the Blob pathname so the CV can be found in the Vercel Storage
dashboard. CVs are not publicly accessible.

In the Vercel project's Storage section, create a **private** Blob store and connect
it to the project for Production (and Preview/Development if needed), then redeploy.
Vercel supplies the Blob authentication configuration to the deployment. For local
development, connect the Development environment. Back up any existing `.env.local`
first, then run `npx vercel link` followed by `npx vercel env pull .env.local` and
restore any other needed settings from your backup. Restart the development server.
If no Blob credentials are available locally, add a read-write token environment
variable to the Development connection in the Vercel dashboard and pull again.
Keep those variables and any backup secret.

The internship Formspree form must also be activated and its validation rules must
match the submitted fields. The form displays Formspree's error message if a
submission is rejected; check the form's Workflow settings for validation errors.

If the CV upload succeeds but the Formspree submission fails, the CV remains in
Blob storage; retrying can create another file.

## Run locally

```bash
npm install
npm run dev
```
