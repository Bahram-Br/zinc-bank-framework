---
name: qwen-mcp-config
description: Configure MCP servers for Cydeo CLI / Qwen Code — where the config lives and how to add zincTM
source: auto-skill
extracted_at: '2026-08-20T18:39:44.315Z'
---

# Configuring MCP servers (Cydeo CLI / Qwen Code)

## Where config lives
Cydeo CLI / Qwen Code loads MCP from `mcpServers` in `settings.json`:
- **Project scope**: `<project>/.qwen/settings.json`
- **User scope**: `~/.qwen/settings.json` (on this machine: `C:\Users\DELL\.cydeo\qwen-home\.qwen\settings.json`)

A root `.mcp.json` is ignored here.

## Keep these two MCP servers
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "env": {}
    },
    "zinctm": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@latest",
        "--init-page",
        ".qwen/mcp-init-zinctm.ts"
      ],
      "env": {}
    }
  }
}
```

- `playwright` — generic browser MCP
- `zinctm` — opens `https://zinctm.cydeo.io` via `--init-page`

## Cydeo CLI route
- Binary is **`cydeo`** (e.g. `cydeo mcp add ...`)
- `cydeo mcp add <name> -s project <command> [args...]` writes project scope
- Requires `cydeo login` first; editing `.qwen/settings.json` directly also works

## After changing MCP config
Restart Qwen / reconnect MCP so tools like `mcp__zinctm__*` appear.
