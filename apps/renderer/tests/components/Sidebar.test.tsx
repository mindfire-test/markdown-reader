import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {Sidebar} from "../../src/components/Sidebar"
import { TOCType } from '../../src/types/component-types';

//fake TOC
const mockTOC: TOCType[] = [
  { id: 'my', text: 'My', level: 1 },
  { id: 'sidebar', text: 'Sidebar', level: 2 },
  { id: 'component', text: 'Component', level: 2 },
  { id: 'news', text: 'News', level: 3 },
];

describe('Sidebar', () => {


  //test 1
  it('renders nothing when toc is empty', () => {
    const { container } = render(
      <Sidebar tocItems={[]} activeId="" onSelect={() => {}} isVisible={true} />
    );
    expect(container.firstChild).toBeNull();
  });


  // test 2
  it('calls onSelect with correct id when clicked', () => {
    const handleSelect = vi.fn();
    render(
      <Sidebar tocItems={mockTOC} activeId="" onSelect={handleSelect} isVisible={true} />
    );
    fireEvent.click(screen.getByText('Component'));
    expect(handleSelect).toHaveBeenCalledWith('component');
  });

  

});