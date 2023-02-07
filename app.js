document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById("grid");
    const board = [];
    const rows = 10;
    const columns = 10;
    const mines = 12;
    const mineLocations = generateMines();

    var gameOver = false;

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
        console.log(cell);
        if (cell.classList.contains('mine')) {
            //reveal mines
            alert("Game Over");
        }
        else {
            cell.classList.add('clicked');

            let minesFound = 0;

            var s = cell.getAttribute('id');
            var r = parseInt(s[0]);
            var c = parseInt(s[1]);

            //alert(r + " " + c);
            for (var i=Math.max(r-1, 0); i<=Math.min(r+1,9); i++){
                for(var j=Math.max(c-1,0); j<=Math.min(c+1,9); j++) {
                    console.log(i+""+j);
                    if(mineLocations.includes(i+""+j)){
                        minesFound++;
                        console.log(minesFound);
                    }
                }
            }
            cell.innerHTML=minesFound;
           /**  if (minesFound == 0)
            {
                for (var i=Math.max(r-1,0); i<=Math.min(r+1,9); i++) {
                    for(var j=Math.max(c-1,0); j<=Math.min(c+1,9); j++) {
                        console.log(i + " " + j);
                        //if(board[i,j].innerHTML=="0"){
                            console.log(i + " " + j);
                            clickCell(document.getElementById(i+""+j));
                        //}
                    }
                }
            }*/
        }
    }


})