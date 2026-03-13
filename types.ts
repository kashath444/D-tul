
export enum AnimationState {
  LOOPING = 'LOOPING',
  SHATTERING = 'SHATTERING',
  ACCELERATING = 'ACCELERATING',
  REVEALED = 'REVEALED'
}

export interface AppState {
  animationPhase: AnimationState;
  setAnimationPhase: (phase: AnimationState) => void;
}

// Migrated from dtul---technical-engineering-void
export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  type: 'handbook' | 'workflow' | 'ui';
}

export enum AnimationPhase {
  VOID = 'VOID',
  SPARK = 'SPARK',
  VERTICAL = 'VERTICAL',
  GRID = 'GRID',
  REVEAL = 'REVEAL',
  ACTIVE = 'ACTIVE'
}
