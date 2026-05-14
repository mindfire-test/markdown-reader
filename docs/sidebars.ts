import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['introduction', 'installation'],
    },
    {
      type: 'category',
      label: 'Product Guide',
      items: [
        'product/features',
        'product/markdown-support',
        'product/keyboard-shortcuts',
        'product/export',
        'product/privacy',
      ],
    },
    {
      type: 'category',
      label: 'Contribution Guide',
      items: ['contribution-guide/how-to-contribute', 'contribution-guide/code-of-conduct'],
    },
  ],
};

export default sidebars;
