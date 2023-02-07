document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById("grid");
    const board = [];
    const rows = 10;
    const columns = 10;
    const mines = 12;
    const mineLocations = generateMines();

    generateGrid(); 

    //return an array of mineLocations
    function generateMines() {
        let placeableMines = mines;
        const m = [];
        
        while (placeableMines > 0) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random()*columns);

            let id = r.toString() + "" + c.toString();

            if(!m.includes(id)) {
                m.push(id)
                placeableMines -= 1;
            }
        }
        return m;
    }
    
    //create and populate grid
    function generateGrid() {
        for (var i = 0; i < rows; i++){
            let row = [];
            for(var j = 0; j < columns; j++){
                let cell = document.createElement('div');
                cell.setAttribute('id', i + "" + j);
                grid.appendChild(cell);
                row.push(cell);
                if(mineLocations.includes(cell.getAttribute('id'))){
                    cell.classList.add('mine');
                }
                else {
                    cell.classList.add('clear');
                }
                cell.addEventListener("click", function(e) {
                    clickCell(cell);
                })
            }
            board.push(row);
        }

        
    }

    function clickCell(cell) {
        if (cell.classList.contains('mine')) {
            alert("Game Over");
        }
    }



})