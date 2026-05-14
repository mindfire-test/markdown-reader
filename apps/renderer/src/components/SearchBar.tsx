import React, { useEffect, useRef, useState } from 'react';
import { SearchBarProps } from '../types/component-types';
import { btnClass } from '../utils/constants/style-constants';
import { Icons } from '../utils/constants/icon-contants';
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
  const [localQuery,setLocalQuery]=useState(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(()=>{
    const handler=setTimeout(()=>{
      onQueryChange(localQuery);
    },300);
    return ()=>clearTimeout(handler)
  },[localQuery,onQueryChange]);

  const prevDisable=matchCount===0 || currentMatch<=1;
  const nextDisable=matchCount===0 || currentMatch>=matchCount;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      if (!prevDisable){
        onPrev();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!nextDisable){
        onNext();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };


  const newButtonClass=(isDisable:boolean)=>`${btnClass} ${isDisable? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`;

  return (
    <div role="search" aria-label="Document Search" className="fixed top-0 right-0 z-50 flex items-center gap-2 p-2 bg-surface border border-border-theme rounded-bl-lg shadow-lg">
      <input
        ref={inputRef}
        type="text"
        value={localQuery}
        className="w-56 px-3 py-1.5 text-sm rounded border border-border-theme bg-bg text-text-base placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent transition-shadow"
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search in the document"
        aria-label="Search in document"
      />

     {query && (
        <div role="status" aria-live="polite" className="flex items-center gap-2">
          {matchCount > 0 ? (
            <span className="min-w-15 font-mono text-sm text-text-muted">
              <span className="sr-only">Match</span> {currentMatch} 
              <span aria-hidden="true"> / </span> 
              <span className="sr-only">of</span> {matchCount}
            </span>
          ) : (
            <span className="min-w-15 text-sm text-error">No results</span>
          )}
        </div>
      )}

      <div className="flex gap-1" role="group" aria-label="Search navigation">
        <button onClick={onPrev} disabled={prevDisable} aria-label="Previous match" className={newButtonClass(prevDisable)}><Icons.ArrowUp size={18} /></button>
        <button onClick={onNext} disabled={nextDisable} aria-label="Next match" className={newButtonClass(nextDisable)}><Icons.ArrowDown size={18} /></button>
        <button onClick={onClose} aria-label="Close search" className={newButtonClass(false)}><Icons.X size={18} /></button>
      </div>
    </div>
  );
}
