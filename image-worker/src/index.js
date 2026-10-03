/**
 * Cloudflare Workers AI - Dynamic Featured Image Generator for Panfeast.com
 * Model: @cf/bytedance/stable-diffusion-xl-lightning (Free Tier)
 * Fallback: @cf/stabilityai/stable-diffusion-xl-base-1.0
 */

export const ARTICLE_IMAGE_PROMPTS = {
  'advanced-apple-shortcuts-automations':
    'A sleek iPhone Pro resting on a minimalist walnut studio desk next to an elegant metallic NFC disc, soft glowing ambient rim light, screen displaying colorful modular automation workflow tiles with rounded corners, clean architectural lighting, sharp focus, 8k resolution, premium industrial design photography.',

  'airdrop-continuity-universal-clipboard-guide':
    'A cohesive Apple ecosystem arrangement with a Space Gray MacBook Pro, iPad Pro with Apple Pencil, and iPhone seamlessly aligned on a clean white oak desk, soft subtle glowing light connecting the devices, top-down isometric angle, natural daylight from a side window, studio lighting, hyper-realistic, 8k commercial tech photography.',

  'airtag-find-my-network-security-privacy':
    'Macro studio photograph of an Apple AirTag encased in a saddle brown leather key ring, resting on a matte dark slate surface, precise stainless steel reflections, clean softbox studio lighting, shallow depth of field, elegant product photography, 8k resolution, photorealistic.',

  'apple-arcade-subscription-value-analysis':
    'A modern wireless gaming controller resting next to an iPad Pro displaying a vibrant artistic indie adventure game, clean aesthetic room with soft pastel neon backlight, minimalist birch wood desk, sharp focus, cinematic depth of field, 8k tech editorial photography.',

  'apple-family-sharing-screen-time-guide':
    'A warm, bright Scandinavian living room workspace with an iPad displaying clean digital wellness charts and weekly Screen Time graph, paired with an iPhone, soft morning sunlight, small potted succulent, warm wooden table, clean composition, 8k resolution, editorial lifestyle photography.',

  'apple-passkeys-setup-security-guide':
    'Minimalist technological concept art of an iPhone with Face ID sensor illuminated by a gentle beam of pure light, abstract clean translucent cryptographic glass shield floating subtly above the display, sleek titanium finish, soft blue and silver studio illumination, 8k render, elegant cybersecurity aesthetic.',

  'apple-silicon-unified-memory-architecture':
    'Photorealistic macro close-up of a sleek Apple Silicon computer processor chip set on an ultra-clean matte black circuit board, etched metallic topography, shimmering copper and silver microscopic interconnects, dramatic angled studio rim lighting, 8k resolution, premium hardware engineering aesthetic.',

  'apple-watch-vitals-heart-rate-variability-guide':
    'Close-up product shot of an Apple Watch Ultra with an ocean band resting on a polished granite surface, the underside ceramic crystal and green optical bio-sensors subtly illuminated with a soft bioluminescent glow, precise detail, dramatic studio lighting, 8k commercial photography.',

  'best-proraw-video-editing-apps-ios':
    'A professional mobile creator desk with an iPhone mounted on a sleek aluminum camera cage with an external SSD attached via USB-C, beside an iPad Pro showing a color grading color wheel interface, warm cinematic studio rim light, 8k resolution, professional cinematography gear photography.',

  'icloud-advanced-data-protection-encryption':
    'A minimalist architectural composition of an iPhone in natural titanium lying on a clean frosted glass pedestal, surrounded by elegant geometric translucent quartz crystal structures symbolizing end-to-end data encryption, soft diffused studio lighting, pristine Apple design language, 8k render.',

  'ios-audio-spatial-lossless-headphone-safety':
    'A pair of Apple AirPods Max in silver aluminum resting alongside an audiophile braided audio cable and compact brushed aluminum DAC dongle on a dark walnut headphone stand, warm acoustic studio ambient lighting, shallow depth of field, 8k audiophile photography.',

  'ios-privacy-settings-hardening':
    'An iPhone standing upright on a minimalist brushed aluminum stand, the OLED screen displaying crisp iOS Privacy & Security toggle switches, clean directional softbox illumination, modern Scandinavian architectural background, 8k resolution, premium tech blog banner.',

  'ipados-stage-manager-workstation-setup':
    'A clean desktop workstation featuring an iPad Pro on an elevated magnetic floating stand connected via a single braided cable to an ultra-thin 4K monitor displaying multi-window Stage Manager, Magic Keyboard and trackpad on a felt desk mat, 8k resolution, modern minimalist office.',

  'iphone-battery-health-preservation-guide':
    'An iPhone floating effortlessly on an elevated aluminum MagSafe charging stand on a clean nightstand, soft glowing 80% battery widget icon on the standby display, subtle warm ambient evening illumination, cozy minimalist aesthetic, 8k editorial photography.',

  'iphone-camera-masterclass-proraw-photonic-engine':
    'Extreme macro shot of an iPhone Pro camera module, showing the triple sapphire crystal lenses, textured matte glass back, and metallic lens rings, captivating reflections and optical glass flare, high-end commercial product photography, 8k resolution.',

  'mac-menubar-utilities-productivity':
    'A perspective shot of an Apple Studio Display with a MacBook Pro, showing a hyper-clean macOS desktop with custom productivity menu bar icons along the top, natural sunlight pouring across a minimalist oak desk with a ceramic coffee mug, 8k resolution.',

  'macos-terminal-developer-productivity':
    'A sleek MacBook Pro open in a dimly lit designer studio, the Liquid Retina display showing a clean dark-mode terminal window with elegant syntax highlighting and a customized Zsh prompt, soft keyboard backlight, warm ambient desk lamp, 8k tech photography.',

  'mastering-ios-focus-filters-automation':
    'A tranquil and distraction-free workspace with an iPhone resting face up on a linen desk pad, displaying an elegant minimalist \'Deep Work\' Focus lockscreen widget, a potted bonsai tree nearby, soft morning golden hour light, peaceful productivity aesthetic, 8k.',

  'optimizing-external-displays-apple-silicon':
    'An ultra-wide curved 5K monitor paired with a MacBook Pro on a premium wooden monitor riser, displaying razor-sharp typography and calibrated color palettes, clean desk setup with wireless peripherals, soft bias lighting behind the display, 8k tech workspace.',

  'safari-ios-privacy-security-features':
    'An iPhone held in a relaxed hand over a bright modern office desk, screen showing the clean Safari start page with Privacy Report visualization shields, soft daylight illumination, crisp high-end commercial lifestyle tech photography, 8k resolution.',
};

export default {
  /**
   * @param {Request} request
   * @param {{ AI: any }} env
   * @param {{ waitUntil: (promise: Promise<any>) => void }} ctx
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Extract slug from path (strip leading/trailing slashes and common image extensions)
    let slug = url.pathname.replace(/^\/+|\/+$/g, '');
    slug = slug.replace(/\.(png|jpe?g|webp)$/i, '');

    // Health check / API catalog
    if (!slug || slug === 'health' || slug === 'api') {
      return new Response(
        JSON.stringify(
          {
            service: 'Panfest Featured Image Generator',
            engine: 'Cloudflare Workers AI',
            models: [
              '@cf/bytedance/stable-diffusion-xl-lightning',
              '@cf/stabilityai/stable-diffusion-xl-base-1.0',
            ],
            totalArticles: Object.keys(ARTICLE_IMAGE_PROMPTS).length,
            availableSlugs: Object.keys(ARTICLE_IMAGE_PROMPTS),
          },
          null,
          2,
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
    }

    const prompt = ARTICLE_IMAGE_PROMPTS[slug];
    if (!prompt) {
      return new Response(
        JSON.stringify(
          {
            error: 'Slug not found',
            requestedSlug: slug,
            availableSlugs: Object.keys(ARTICLE_IMAGE_PROMPTS),
          },
          null,
          2,
        ),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
    }

    // Edge cache lookup
    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;
    let cached = await cache.match(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Primary: Stable Diffusion XL Lightning (Ultra-fast inference on Workers AI free tier)
      const imageBytes = await env.AI.run(
        '@cf/bytedance/stable-diffusion-xl-lightning',
        {
          prompt,
        },
      );

      const response = new Response(imageBytes, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
          'Access-Control-Allow-Origin': '*',
          'X-Article-Slug': slug,
          'X-Generated-By': 'Cloudflare-Workers-AI',
        },
      });

      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (primaryError) {
      // Secondary: Fallback to Stable Diffusion XL Base 1.0
      try {
        const fallbackBytes = await env.AI.run(
          '@cf/stabilityai/stable-diffusion-xl-base-1.0',
          {
            prompt,
          },
        );

        const fallbackResponse = new Response(fallbackBytes, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
            'Access-Control-Allow-Origin': '*',
            'X-Article-Slug': slug,
            'X-Generated-By': 'Cloudflare-Workers-AI-Fallback',
          },
        });

        ctx.waitUntil(cache.put(cacheKey, fallbackResponse.clone()));
        return fallbackResponse;
      } catch (fallbackError) {
        return new Response(
          JSON.stringify(
            {
              error: 'Image generation failed',
              slug,
              primaryError: primaryError?.message || String(primaryError),
              fallbackError: fallbackError?.message || String(fallbackError),
            },
            null,
            2,
          ),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );
      }
    }
  },
};
