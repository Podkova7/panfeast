# Panfest Image Worker (Cloudflare Workers AI)

Generates dynamic, AI-powered featured images on demand for all 20 Panfest iOS and Apple articles using Cloudflare Workers AI free tier models.

## Models Used
- **Primary:** `@cf/bytedance/stable-diffusion-xl-lightning` (high-speed generation)
- **Fallback:** `@cf/stabilityai/stable-diffusion-xl-base-1.0`

## Deployment

To deploy this worker to your Cloudflare account:

```bash
cd image-worker
npx wrangler deploy
```

Once deployed, your worker will be available at:
`https://[YOUR-WORKER-SUBDOMAIN].workers.dev/[article-slug]`

For example:
- `https://[YOUR-WORKER-SUBDOMAIN].workers.dev/advanced-apple-shortcuts-automations`
- `https://[YOUR-WORKER-SUBDOMAIN].workers.dev/iphone-camera-masterclass-proraw-photonic-engine`
- `https://[YOUR-WORKER-SUBDOMAIN].workers.dev/health` (API status and list of all 20 slugs)
