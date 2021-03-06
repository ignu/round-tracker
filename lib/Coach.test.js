import Coach from "./Coach";
import R from "ramda";

describe("Coach.startWorkout", () => {
  it("should create a workout with a goal", () => {
    const workout = Coach.startWorkout({ goal: 5, minutes: 10 });
    expect(workout).toBeTruthy();
    expect(workout.definition.goal).toEqual(5);
    expect(workout.definition.minutes).toEqual(10);
    expect(workout.rounds).toEqual([]);
    expect(workout.startTime > 1).toBeTruthy();
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

describe("Coach.getAverage", () => {
  it("returns the average round time", () => {
    const workout = { startTime: 10, minutes: 10, rounds: [20, 30, 40] };
    expect(Coach.averageRound(workout)).toEqual(10);
  });

  it("returns null if there are no rounds", () => {
    const workout = { startTime: 10, minutes: 10, rounds: [] };
    expect(Coach.averageRound(workout)).toBeFalsy();
  });
});

describe("Coach.roundGoal", () => {
  it("returns average when no goal is set", () => {
    const workout = {
      startTime: 10,
      definition: { minutes: 10 },
      rounds: [20, 30, 40]
    };

    expect(Coach.roundGoal(workout)).toEqual(10);
  });

  it("returns remaining rounds/time remaining when goal is set", () => {
    const workout = {
      startTime: 25253,
      definition: { minutes: 2, goal: 6 },
      rounds: [1, 2, 3]
    };

    Coach.setTimeFunc(R.always(workout.startTime + 60));

    expect(Coach.roundGoal(workout)).toEqual(60 / 3);
  });

  it("returns null if the time has passed", () => {
    const workout = {
      startTime: 100,
      definition: { minutes: 20, goal: 10 },
      rounds: [200]
    };

    Coach.setTimeFunc(R.always(1000000));

    expect(Coach.roundGoal(workout)).toEqual(null);
  });

  it("can return time when no goal is set", () => {
    const workout = {
      startTime: 9,
      definition: { minutes: 20, goal: 10 },
      rounds: []
    };

    Coach.setTimeFunc(R.always(9));

    expect(Coach.roundGoal(workout)).toEqual(120);
  });

  it("return round average when we've passed the goal", () => {
    const workout = {
      startTime: 100,
      definition: { minutes: 11, goal: 2 },
      rounds: [100 + 60 * 4, 100 + 60 * 8]
    };

    Coach.setTimeFunc(R.always(workout.startTime + 60 * 10));

    expect(Coach.roundGoal(workout)).toEqual(60 * 4);
  });

  it("returns remaining rounds/time remaining when goal is set", () => {
    const workout = {
      startTime: 100,
      definition: { minutes: 10, goal: 6 },
      rounds: []
    };

    Coach.setTimeFunc(R.always(100));

    expect(Coach.roundGoal(workout)).toEqual(600 / 6);
  });
});
