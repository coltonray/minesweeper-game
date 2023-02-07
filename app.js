document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById("grid");
    const board = [];

    generateGrid(); 

    function generateGrid() {
        for (var i = 0; i < 10; i++){
            let row = [];
            for(var j = 0; j < 10; j++){
                let cell = document.createElement('div');
                cell.setAttribute('id', i + '-' + j);
                grid.appendChild(cell);
                row.push(cell);
            }
            board.push(row);
        }
    }



})