// @flow
import R from "ramda";
type workoutDefinition = {
  minutes: number,
  goal: number
};

type workout = {
  minutes: number,
  startTime: number,
  rounds: Array<number>
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

Coach.startWorkout = (definition: workoutDefinition): workout => {
  const startTime = getTime();
  const roundGoal = getRoundGoal(
    startTime,
    0,
    definition.minutes,
    definition.goal
  );
  return { ...definition, rounds: [], roundGoal, startTime };
};

Coach.addRound = (workout: workout) => {
  const rounds = R.append(getTime())(workout.rounds);
  return { ...workout, rounds };
};

export default Coach;
