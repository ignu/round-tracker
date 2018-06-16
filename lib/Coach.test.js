import Coach from "./Coach";
import R from "ramda";

describe("Coach.startWorkout", () => {
  it("should create a workout with a goal", () => {
    const workout = Coach.startWorkout({ goal: 5, minutes: 10 });
    expect(workout).toBeTruthy();
    expect(workout.goal).toEqual(5);
    expect(workout.minutes).toEqual(10);
    expect(workout.rounds).toEqual([]);
    expect(workout.startTime > 1).toBeTruthy();
    expect(workout.roundGoal).toEqual(600 / 5);
  });

  it("should create a workout with no goal", () => {
    const workout = Coach.startWorkout({ minutes: 10 });
    expect(workout.goal).toBeFalsy();
  });

  it("should use the supplied getStartTimeFunc", () => {
    Coach.setTimeFunc(R.always(5));
    const workout = Coach.startWorkout({ minutes: 10 });
    expect(workout.startTime).toEqual(5);
  });
});

describe("Coach.addRound", () => {
  it("should append a round to the list of rounds", () => {
    const oldWorkout = { minutes: 10, rounds: [10] };
    Coach.setTimeFunc(R.always(15));
    const workout = Coach.addRound(oldWorkout);

    expect(workout.rounds).toEqual([10, 15]);
  });
});
