import React from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: 'action' | 'arcade' | 'puzzle' | 'racing' | 'shooter';
  tags: string[];
  plays: number;
  rating: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export type SectionType = 'most-played' | 'new-games' | 'trending';

export interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layout?: string;
  layoutKey?: string;
  style?: React.CSSProperties;
}