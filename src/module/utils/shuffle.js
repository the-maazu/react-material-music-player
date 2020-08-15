export default function shuffle(array){

    if(array.length === 1)
    return array

    let randomIndex = Math.floor(Math.random() * (array.length-1))
    let [picked , remaining] = pick(randomIndex, array);

    return picked.concat(shuffle(remaining))
}

// returns picked value and remaining array
export function pick(index , array){
    
    let remaining = Array.from(array);
    let picked = remaining.splice(index, 1)

    return [picked, remaining]
}