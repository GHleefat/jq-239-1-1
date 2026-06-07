export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

export type ElementState = 'solid' | 'liquid' | 'gas' | 'unknown';

export type FilterType = 'category' | 'state' | 'metal-nonmetal';

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  chineseName: string;
  atomicMass: number;
  category: ElementCategory;
  group: number | null;
  period: number;
  block: string;
  electronConfiguration: string;
  shells: number[];
  stateAtSTP: ElementState;
  meltingPoint: number | null;
  boilingPoint: number | null;
  density: number | null;
  discoveredBy: string;
  discoveryYear: number | null;
  namedAfter: string;
  imageUrl: string;
  funFact: string;
  uses: string[];
}

export interface Compound {
  formula: string;
  name: string;
  elements: string[];
  description: string;
  commonName?: string;
}

export interface FilterOption {
  type: FilterType;
  value: string;
  label: string;
}
