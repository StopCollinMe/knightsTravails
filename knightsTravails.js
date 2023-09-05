const makeBoard = () => {
    const chessBoard = document.querySelector('.chessBoard');

    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = 'cell-' + i;
        if(i % 2 == Math.floor(i/8) % 2){
            cell.classList.add('white');
        }
        else{
            cell.classList.add('black');
        }
        chessBoard.appendChild(cell);
    }
}    

const knightMoves = (start,end) => {
    const moves = [[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[-1,-2],[1,-2]];
    const board = 8;

    //Add the horse to start, and move
    const cell = document.createElement('div');
    cell.classList.add('cell');

    const queue = [];
    queue.push([start]);

    while(queue.length > 0){
        const path = queue.shift();
        const currentSquare = path[path.length - 1];
        

        if(currentSquare[0] == end[0] && currentSquare[1] == end[1]){
            return path;
        }
        for(let i = 0; i < moves.length; i++){
            const newSquare = [currentSquare[0] + moves[i][0], currentSquare[1] + moves[i][1]];
            if(newSquare[0] >= 0 && newSquare[0] < board && newSquare[1] >= 0 && newSquare[1] < board){
                const newPath = [...path];
                newPath.push(newSquare);
                queue.push(newPath);
            }
        }
    }
    return null;
}


//This is the correct solution. Study it!!!
const moveKnight = (path) => {
    let i = 0; // Initialize an index to keep track of the current step in the path
    
    // Create the knight element once and append it to the chessboard
    let knight = document.createElement('div');
    knight.classList.add('knight');
    knight.style.backgroundImage = 'url("horse.png")'; // Replace 'horse.png' with the actual path to your knight image
    document.querySelector('.chessBoard').appendChild(knight);

    // Use setInterval to move the knight with a delay between steps
    const intervalId = setInterval(() => {
        if (i < path.length) {
            let x = path[i][0];
            let y = path[i][1];
            const cell = document.getElementById('cell-' + (y * 8 + x));

            // Remove the 'knight' class from the previous cell
            const previousKnightCell = document.querySelector('.knight');
            if (previousKnightCell) {
                previousKnightCell.classList.remove('knight');
            }

            // Add the 'knight' class to the current cell
            cell.classList.add('knight');

            i++; // Move to the next step in the path
        } else {
            clearInterval(intervalId); // Stop the animation when the path is completed
        }
    }, 1000); // Adjust the delay (in milliseconds) between steps as needed
}

const startGame = () => {
    const button = document.querySelector('.button');
    button.addEventListener('click',grabData);
}

const grabData = () =>{
    const xStart = parseInt(document.querySelector('#x-axis-start').value);
    const yStart = parseInt(document.querySelector('#y-axis-start').value);
    const xStop = parseInt(document.querySelector('#x-axis-stop').value);
    const yStop = parseInt(document.querySelector('#y-axis-stop').value);

    let path = knightMoves([xStart, yStart], [xStop, yStop]);
    moveKnight(path);
}

 // [[0, 0], [1, 2]]
// console.log(knightMoves([0, 0], [3, 3])); // [[0, 0], [1, 2], [3, 3]]
// console.log(knightMoves([3, 3], [0, 0])); // [[3, 3], [1, 2], [0, 0]]
makeBoard();

startGame();