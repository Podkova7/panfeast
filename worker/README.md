# Panfeast edge routing

GitHub Pages serves the static site but cannot return real `301` or `410` responses.
This Worker runs in front of the proxied `panfeast.com` DNS record and:

- returns one-hop `301` responses for verified legacy equivalents;
- returns `410 Gone` for withdrawn articles and retired URLs;
- removes obsolete tracking query parameters;
- canonicalizes requests to `https://panfeast.com`;
- applies security headers.

## Validate

```bash
npm install
npm run check:worker
```

## Deploy

The `panfeast.com` DNS record must be proxied through Cloudflare. Then authenticate Wrangler
with the Cloudflare account that owns the zone and run:

```bash
npm run deploy:worker
```

The route in `wrangler.jsonc` attaches the Worker to `panfeast.com/*`. Normal requests stream
through to the origin.
