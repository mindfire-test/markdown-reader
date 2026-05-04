import mermaid from 'mermaid';
import { initMermaid } from '../config/mermaid';
import { decodeHtml } from '../utils/helpers/heading-helper';
import { escapeHtml } from '../utils/helpers/heading-helper';
import { BLOCK_MERMAID_REGEX } from '../utils/constants/regex-constants';

let diagramCounter = 0;

//converts text into svg diagram
export async function renderMermaid(code: string): Promise<string> {
  const cleanCode = code.trim();
  if (!cleanCode) return '';
  initMermaid();
  const diagramId = `mermaid-diagram-${++diagramCounter}`;
  try {
    await mermaid.parse(code);
    const { svg } = await mermaid.render(diagramId, cleanCode);
    return svg;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return `
      <div class="mermaid-error">
        <strong>Diagram error:</strong> ${escapeHtml(message)}
      </div>
    `;
  }
}

//scans whole HTML string to replace with actual visual diagram images
export async function processMermaid(html: string): Promise<string> {
  const matches = [...html.matchAll(BLOCK_MERMAID_REGEX)];
  for (const match of matches) {
    const fullBlock = match[0];
    const encodedCode = match[1] ?? '';
    const mermaidCode = decodeHtml(encodedCode).trim();
    const svg = await renderMermaid(mermaidCode);
    html = html.replace(fullBlock, `<div class="mermaid-diagram">${svg}</div>`);
  }
  return html;
}
