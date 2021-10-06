export default function shuffle(array) {
  let newArray = array.slice();

  for (let i = 0; i < Math.ceil(array.length / 2); i++) {
    let randIndex1 = Math.round(Math.random() * (array.length - 1));
    let randIndex2 = Math.round(Math.random() * (array.length - 1));

    let temp = newArray[randIndex1];
    newArray[randIndex1] = newArray[randIndex2];
    newArray[randIndex2] = temp;
  }

  return newArray;
}
