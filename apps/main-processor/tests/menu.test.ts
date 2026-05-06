import { describe, it, expect } from 'vitest';
import { buildMenuTemplate } from '../src/menu';

describe('build menu template', () => {
  it('includes a file top level menu', () => {
    expect(buildMenuTemplate().find((m) => m.label === 'File')).toBeDefined();
  });

  it('should open file with Cmd or ctrl+O', () => {
    const tmpl = buildMenuTemplate();
    const file = tmpl.find((m) => m.label === 'File');
    const open = (file?.submenu as { label?: string; accelerator?: string }[])?.find(
      (i) => i.label === 'Open File'
    );
    expect(open?.accelerator).toBe('CmdOrCtrl+O');
  });

  it('should include a view top level menu', () => {
    expect(buildMenuTemplate().find((m) => m.label === 'View')).toBeDefined();
  });

  it('should include a navigate top level menu', () => {
    expect(buildMenuTemplate().find((m) => m.label === 'Navigate')).toBeDefined();
  });

  it('should view a cycle theme item with CmdOrCtrl+T', () => {
    const tmpl = buildMenuTemplate();
    const view = tmpl.find((m) => m.label === 'View');
    const theme = (view?.submenu as { label?: string; accelerator?: string }[])?.find(
      (i) => i.label === 'Cycle Theme'
    );
    expect(theme?.accelerator).toBe('CmdOrCtrl+T');
  });
});
