const knightMoves = (start,end) => {
    const moves = [[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[-1,-2],[1,-2]];
    const board = 8;

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

console.log(knightMoves([0, 0], [1, 2])); // [[0, 0], [1, 2]]
console.log(knightMoves([0, 0], [3, 3])); // [[0, 0], [1, 2], [3, 3]]
console.log(knightMoves([3, 3], [0, 0])); // [[3, 3], [1, 2], [0, 0]]