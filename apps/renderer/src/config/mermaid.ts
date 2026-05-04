import mermaid from 'mermaid';

// initilize mermaid
export function initMermaid(): void {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    flowchart: {
      htmlLabels: false,
    },
    themeVariables: {
      background: 'transparent',
      primaryColor: '#161b22',
      primaryTextColor: '#e6edf3',
      primaryBorderColor: '#30363d',
      lineColor: '#58a6ff',
      textColor: '#e6edf3',
    },
  });
}
