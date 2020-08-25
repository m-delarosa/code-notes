integer = 4

//Doesn't work
function doWhileLoop(integer) {
    let i = 0
    function incrementVariable() {
        i++
        return i
    }
    do {
        console.log(`I run once regardless.`)
    }
    while (incrementVariable() < integer)
}

//Works
// function doWhileLoop(integer) {
//     let i = 0
//     function incrementVariable() {
//         i = i + 1
//         return i
//     }
//     do {
//         console.log(`I run once regardless.`)
//     }
//     while (incrementVariable() < integer)
// }

doWhileLoop(integer)