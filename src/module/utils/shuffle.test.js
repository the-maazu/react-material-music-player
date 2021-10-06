import shuffle from "./shuffle.js";

test("shuffle array", () => {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let shuffled = shuffle(array);

  // check shuffled contains array values
  expect(shuffled).toEqual(expect.arrayContaining(array));

  // check array same length
  expect(shuffled.length).toEqual(array.length);

  // confirm complete shuffle
  for (let i; i < shuffled.length; i++) {
    expect(shuffled[i]).not.toEqual(array[i]);
  }
});
