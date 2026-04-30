import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Welcome } from '../../src/components/Welcome';

describe('Welcome', () => {

  it('renders the app title', () => {
    render(<Welcome onOpen={() => {}} recentFiles={[]} />);
    expect(screen.getByRole('heading', { name: /markdown reader/i })).toBeInTheDocument();
  });

  it('renders the Open File button', () => {
    render(<Welcome onOpen={() => {}} recentFiles={[]} />);
    expect(screen.getByRole('button', { name: /open file/i })).toBeInTheDocument();
  });

  it('calls onOpen when the Open File button is clicked', () => {
    const handleOpen = vi.fn();
    render(<Welcome onOpen={handleOpen} recentFiles={[]} />);
    fireEvent.click(screen.getByRole('button', { name: /open file/i }));
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it('shows a list of recent files when provided', () => {
    const recent = [
      { path: '/docs/README.md', name: 'README.md', openedAt: Date.now() },
      { path: '/notes/todo.md',  name: 'todo.md',   openedAt: Date.now() },
    ];
    render(<Welcome onOpen={() => {}} recentFiles={recent} />);
    expect(screen.getByText('README.md')).toBeInTheDocument();
    expect(screen.getByText('todo.md')).toBeInTheDocument();
  });

});