// @flow
import R from "ramda";
type WorkoutDefinition = {
  minutes: number,
  goal: number
};

type EpochArray = Array<number>;

type Workout = {
  definition: WorkoutDefinition,
  startTime: number,
  rounds: EpochArray
};

const Coach = {};

let getTime = () => new Date().getTime();

Coach.setTimeFunc = (f: Function) => (getTime = f);

// Coach.elapsedTime = workout => {};

const elapsedTime = (startTime: number) => getTime() - startTime;

const getRoundGoal = (
  startTime: number,
  round: number,
  minutes: number,
  goal: number
) => {
  if (!round && !goal) return null;

  const remainingTime = minutes * 60 - elapsedTime(startTime);

  return remainingTime / goal;
};

Coach.startWorkout = (definition: WorkoutDefinition): Workout => {
  const startTime = getTime();
  const roundGoal = getRoundGoal(
    startTime,
    0,
    definition.minutes,
    definition.goal
  );
  return { definition, rounds: [], roundGoal, startTime };
};

Coach.addRound = (workout: Workout) => {
  const rounds = R.append(getTime())(workout.rounds);
  return { ...workout, rounds };
};

// const getRoundDurations = (startTime: number) => R.map(s => s - startTime);

Coach.averageRound = (workout: Workout) => {
  const lastRound = R.last(workout.rounds);
  if (!lastRound) return null;
  return (lastRound - workout.startTime) / workout.rounds.length;
};

Coach.roundGoal = (workout: Workout) => {
  if (!workout.definition.goal) {
    return Coach.averageRound(workout);
  }
  const roundsRemaining = workout.definition.goal - workout.rounds.length;
  const endTime = workout.startTime + workout.definition.minutes * 60;
  return (endTime - getTime()) / roundsRemaining;
};

export default Coach;
