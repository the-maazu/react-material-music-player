import shuffle from "./shuffle";
import { expect, test } from "@jest/globals";

test("shuffle array", () => {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let shuffled = shuffle<number>(array);

  // check shuffled contains array values
  expect(shuffled).toEqual(expect.arrayContaining(array));

  // check array same length
  expect(shuffled.length).toEqual(array.length);

  // confirm complete shuffle
  // @ts-ignore
  for (let i; i < shuffled.length; i++) {
    // @ts-ignore
    expect(shuffled[i]).not.toEqual(array[i]);
  }
});
