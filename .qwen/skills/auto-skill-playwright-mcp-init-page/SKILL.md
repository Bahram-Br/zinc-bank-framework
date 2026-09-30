---
name: playwright-mcp-init-page
description: Fix @playwright/mcp --init-page "page.goto is not a function" — wrong export signature, and the server caches the script at startup
source: auto-skill
extracted_at: '2026-08-20T18:56:24.031Z'
---

# @playwright/mcp `--init-page` script

## The core gotcha
When you configure a Playwright MCP server with `--init-page <file.ts>`, the
module must export a function that receives an **object with a `page` property**,
NOT the page directly. Using the wrong signature produces:

```
Error: Failed to load init page "...": page.goto is not a function
```

## Correct signature (from the official README)
```ts
// init-page.ts
export default async ({ page }: { page: any }) => {
  await page.goto('https://zinctm.cydeo.io');
  // e.g. await page.context().grantPermissions([...]);
  //      await page.setViewportSize({ width: 1280, height: 720 });
};
```
The wrong form — `export default async (page) => { await page.goto(...) }` —
fails because the arg is actually `{ page, ... }`, so `page.goto` is undefined.

## Second gotcha: the server caches the init script at startup
The MCP server process reads the init-page file **once when it starts**. Editing
the file mid-session has **no effect** — you'll keep seeing the same error until
the MCP connection is restarted (restart Qwen Code, or `/mcp` → reconnect the
server). Don't waste time re-testing after an edit; restart first.

## How to apply
- When a browser MCP server errors with `page.goto is not a function` on load,
  check the init-page export signature first — destructure `{ page }`.
- After fixing the file, restart the MCP connection before re-testing.
- To confirm the expected API, read the installed package's README at
  `<npx-cache>/node_modules/@playwright/mcp/README.md` (search `init-page`).
