const storePos = new Map<string, number>();

//save scroll postion
export function saveScrollPos(filePath: string, scrollTop: number): void {
  storePos.set(filePath, scrollTop);
}

//get scroll position
export function getScrollPos(filePath: string): number {
  return storePos.get(filePath) ?? 0;
}

//clear scroll position
export function clearScrollPos(): void {
  storePos.clear();
}
