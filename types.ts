export enum MemoryType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export interface MemoryItem {
  id: string;
  type: MemoryType;
  content: string; // Text string or Image URL
  initialPosition: [number, number, number];
  speed: number;
  scale: number;
}