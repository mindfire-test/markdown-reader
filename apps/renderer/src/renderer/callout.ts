import { CALLOUT_REGEX } from '../utils/constants/regex-constants';
import { CALLOUT_MAP } from '../utils/constants/style-constants';

//modify blockquotes into  callout boxes.
export function parseCallouts(html: string): string {
  const calloutText = html.replace(CALLOUT_REGEX.BLOCKQUOTE, (originalMatch, innerContent) => {
    const typeMatch = innerContent.match(CALLOUT_REGEX.CALLOUT_TYPE);
    if (!typeMatch) return originalMatch;
    const typeKey = typeMatch[1].toUpperCase();
    const config = CALLOUT_MAP[typeKey];
    if (!config) return originalMatch;
    const bodyContent = innerContent.replace(CALLOUT_REGEX.CALLOUT_TYPE, '').trim();
    return `
      <div class="callout callout-${typeKey.toLowerCase()}">
      <div class="callout-title">
          ${config.icon} ${config.label}
      </div>
      <div class="callout-body">
          ${bodyContent}
      </div>
      </div>`.trim();
  });
  return calloutText;
}
