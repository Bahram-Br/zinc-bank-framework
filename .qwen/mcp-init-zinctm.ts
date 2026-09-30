// Initial page for the zincTM Playwright MCP server.
// Evaluated on the Playwright page object at startup.
export default async function init({ page }: { page: any }): Promise<void> {
  await page.goto('https://zinctm.cydeo.io');
}
