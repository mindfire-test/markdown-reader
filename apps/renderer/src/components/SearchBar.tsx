import React, { useEffect, useRef, useState } from 'react';
import { SearchBarProps } from '../types/component-types';
import { btnClass } from '../utils/constants/style-constants';
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
    <div className="fixed top-0 right-0 z-50 flex items-center gap-2 p-2 bg-surface border border-border-theme rounded-bl-lg shadow-lg">
      <input
        ref={inputRef}
        type="text"
        value={localQuery}
        className="w-44 px-2.5 py-1 text-xs rounded border border-border-theme bg-bg text-text-base placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent transition-shadow"
        onChange={(e) => setLoacalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search in the document"
        aria-label="Search in document"
      />

     {query && (
        <div className="flex items-center gap-2">
          {matchCount > 0 ? (
            <span className="min-w-11.25 font-mono text-xs text-text-muted">
              {currentMatch} / {matchCount}
            </span>
          ) : (
            <span className="text-xs text-error">No results</span>
          )}
        </div>
      )}

      <div className="flex gap-1">
        <button onClick={onPrev} aria-label="Previous match" className={btnClass}>prev</button>
        <button onClick={onNext} aria-label="Next match" className={btnClass}>next</button>
        <button onClick={onClose} aria-label="Close search" className={btnClass}>close</button>
      </div>
    </div>
  );
}
