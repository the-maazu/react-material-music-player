export default function shuffle(array){

    for(let i = 0; i<Math.ceil(array.length/2); i++){

        let randIndex1 = Math.random() * array.length
        let randIndex2 = randIndex1 + Math.random() * array.length

        let temp = array[randIndex1]
        array[randIndex1] = array[randIndex2]
        array[randIndex2] = temp
    }

    return array
}