import assert from 'node:assert/strict';
import test from 'node:test';
import { handleRequest } from '../src/index.mjs';

const unreachableOrigin = async () => {
  throw new Error('origin should not be called');
};

test('normalizes HTTP and www to canonical HTTPS panfeast.com', async () => {
  const request = new Request('http://www.panfeast.com/category/ios-guides/?swcfpc=1&utm_source=test');
  const response = await handleRequest(request, unreachableOrigin);
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get('location'),
    'https://panfeast.com/category/ios-guides/?utm_source=test',
  );
});

test('preserves author profile request', async () => {
  let originCalls = 0;
  const response = await handleRequest(
    new Request('https://panfeast.com/author/sylvie-fox/'),
    async () => {
      originCalls += 1;
      return new Response('author profile');
    },
  );
  assert.equal(response.status, 200);
  assert.equal(originCalls, 1);
});

test('proxies ordinary requests and applies security headers without buffering the body', async () => {
  let originCalls = 0;
  const response = await handleRequest(
    new Request('https://panfeast.com/about/'),
    async () => {
      originCalls += 1;
      return new Response('origin response', {
        status: 200,
        headers: { 'cache-control': 'public, max-age=60' },
      });
    },
  );
  assert.equal(originCalls, 1);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'origin response');
  assert.equal(response.headers.get('cache-control'), 'public, max-age=60');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('strict-transport-security'), 'max-age=31536000; includeSubDomains; preload');
});

test('returns a controlled noindex response when the origin fails', async () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    const response = await handleRequest(
      new Request('https://panfeast.com/'),
      async () => { throw new Error('origin unavailable'); },
    );
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex');
  } finally {
    console.error = originalError;
  }
});

test('proxies sitemaps and robots.txt cleanly without redirect loops', async () => {
  const paths = ['/sitemap.xml', '/sitemap-index.xml', '/sitemap-0.xml', '/robots.txt'];
  for (const path of paths) {
    let originCalls = 0;
    const response = await handleRequest(
      new Request(`https://panfeast.com${path}`),
      async (req) => {
        originCalls += 1;
        assert.equal(new URL(req.url).pathname, path);
        return new Response('valid content', { status: 200 });
      },
    );
    assert.equal(originCalls, 1, `Failed for ${path}`);
    assert.equal(response.status, 200, `Failed for ${path}`);
    assert.equal(await response.text(), 'valid content');
  }
});

