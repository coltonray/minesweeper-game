document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const board = [];
  const rows = 10;
  const columns = 10;
  const numOfMines = 12;
  var flaggedMines = 0;
  const mineLocations = generateMines();

  generateGrid();

  /**
   * Generates a list of mine locations based on given rows and columns and numOfMines
   * @returns an array of mineLocations
   */
  function generateMines() {
    let numOfPlaceableMines = numOfMines;
    const m = [];

    while (numOfPlaceableMines > 0) {
      //We're making a valid ID, valid via our Grid, to place our mines
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * columns);

      let id = r.toString() + "" + c.toString();

      //checking for duplicate IDs
      if (!m.includes(id)) {
        m.push(id);
        numOfPlaceableMines -= 1;
      }
    }
    return m;
  }

  //create and populate grid
  function generateGrid() {
    for (var i = 0; i < rows; i++) {
      let row = [];
      for (var j = 0; j < columns; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("id", i + "" + j); // sets each cell's ID to a two digit ID. (Ex. 00, 07, 11, 56, 79, 98, etc)
        grid.appendChild(cell);
        let cellId = cell.getAttribute("id");
        if (mineLocations.includes(cellId)) {
          cell.classList.add("mine");
        } else {
          cell.classList.add("clear");
        }
        cell.addEventListener("click", function (e) {
          clickCell(cell);
        });
        cell.addEventListener("auxclick", function (e) {
          flagCell(cell);
        });
      }
    }
  }

  /**
   * reveals given cell, for mines, free cells, or adjacent # of mines
   * @param {*} cell reference to the cell clicked
   */
  function clickCell(cell) {
    if (cell.classList.contains("mine")) {
      //You can never win on a left click
      revealMines();
      alert("Game Over");
    } else {
      cell.classList.add("clicked");

      let minesFound = 0;

      var cellId = cell.getAttribute("id");
      var r = parseInt(cellId[0]);
      var c = parseInt(cellId[1]);

      //this checks the eight surrounding cells from clickedCell for mines
      for (var i = Math.max(r - 1, 0); i <= Math.min(r + 1, 9); i++) {
        for (var j = Math.max(c - 1, 0); j <= Math.min(c + 1, 9); j++) {
          if (mineLocations.includes(i + "" + j)) {
            minesFound++;
          }
        }
      }

      //write the amount of adjacent mines to the current clickedCell
      cell.innerHTML = minesFound;

      //When we don't have mines, we want to recursively click and reveal
      if (minesFound == 0) {
        for (var i = Math.max(r - 1, 0); i <= Math.min(r + 1, 9); i++) {
          for (var j = Math.max(c - 1, 0); j <= Math.min(c + 1, 9); j++) {
            if (document.getElementById(i + "" + j).innerHTML != "0") {
              clickCell(document.getElementById(i + "" + j));
            }
          }
        }
      }
    }
  }

  /**
   * flags given cell and checks for win condition
   * @param {*} cell reference to the cell that has been auxClicked
   */
  function flagCell(cell) {
    if (!cell.classList.contains("clicked") && !(cell.innerText == "💣")) {
      cell.innerText = "🚩";
      cell.classList.add("flagged");
      if (
        cell.classList.contains("flagged") &&
        cell.classList.contains("mine")
      ) {
        flaggedMines++;
        checkWin();
      }
    }
  }

  /**
   * reveals all mines during a loss/Adds mine emojis
   */
  function revealMines() {
    for (var i = 0; i < mineLocations.length; i++) {
      let mine = document.getElementById(mineLocations[i]);
      mine.innerText = "💣";
    }
  }

  /**
   * simple check against correct matches and # of mines.__
   */
  function checkWin() {
    if (flaggedMines == numOfMines) {
      alert("You Win!");
    }
  }
});
