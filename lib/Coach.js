// @flow
import R from "ramda";
import type { Workout, WorkoutDefinition } from "../types";
const Coach = {};

let getTime = () => Math.round(new Date().getTime() / 1000);

Coach.setTimeFunc = (f: Function) => (getTime = f);

const elapsedTime = (startTime: number) => getTime() - startTime;

Coach.startWorkout = (definition: WorkoutDefinition): Workout => {
  const startTime = getTime();
  return { definition, rounds: [], startTime };
};

Coach.addRound = (workout: Workout) => {
  const rounds = R.append(getTime())(workout.rounds);
  return { ...workout, rounds };
};

Coach.averageRound = (workout: Workout) => {
  const lastRound = R.last(workout.rounds);
  if (!lastRound) return null;
  return (lastRound - workout.startTime) / workout.rounds.length;
};

Coach.remainingRounds = (workout: Workout) => {
  if (!workout.definition.goal) {
    return 0;
  }
  return workout.definition.goal - workout.rounds.length;
};

Coach.roundGoal = (workout: Workout) => {
  if (!workout.definition.goal) {
    return Coach.averageRound(workout);
  }

  const roundsRemaining = Coach.remainingRounds(workout);

  if (roundsRemaining <= 0) {
    return Coach.averageRound(workout);
  }

  const endTime = workout.startTime + workout.definition.minutes * 60;
  const remainingTime = endTime - getTime();
  if (remainingTime < 0) {
    return null;
  }
  return Math.round(remainingTime / roundsRemaining);
};

export default Coach;
