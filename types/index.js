export type WorkoutDefinition = {
  minutes: number,
  goal: number
};

export type EpochArray = Array<number>;

export type Workout = {
  definition: WorkoutDefinition,
  startTime: number,
  rounds: EpochArray
};
