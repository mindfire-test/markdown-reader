import React, { useEffect, useRef, useState } from 'react';
import { SearchBarProps } from '../types/component-types';

// search bar component
export function SearchBar({
  query,
  matchCount,
  currentMatch,
  onQueryChange,
  onNext,
  onPrev,
  onClose,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localQuery,setLoacalQuery]=useState(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(()=>{
    const handler=setTimeout(()=>{
      onQueryChange(localQuery);
    },300);
    return ()=>clearTimeout(handler)
  },[localQuery,onQueryChange])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      onPrev();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 flex items-center gap-2.5 bg-sidebar p-2 border border-b border-border-theme rounded-bl-lg shadow-xl" role="search">
      <input
        ref={inputRef}
        type="text"
        value={localQuery}
        className="w-45 rounded border border-border-theme bg-bg-primary px-2.5 py-1 text-xs text-text-primary outline-none focus:border-link-theme"
        onChange={(e) => setLoacalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search in the document"
        aria-label="Search in document"
      />

      {query && (
        <div className="flex items-center gap-2">
          {matchCount > 0 ? (
            <span className="min-w-[45px] font-mono text-[12px] text-text-secondary">
              {currentMatch} / {matchCount}
            </span>
          ) : (
            <span className="text-[12px] text-red-400">No results</span>
          )}
        </div>
      )}

      <div className="flex gap-1">
        <button onClick={onPrev} aria-label="Previous match">
          Prev
        </button>
        <button onClick={onNext} aria-label="Next match">
          Next
        </button>
        <button onClick={onClose} aria-label="Close search">
          Close
        </button>
      </div>
    </div>
  );
}
