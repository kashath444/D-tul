
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
