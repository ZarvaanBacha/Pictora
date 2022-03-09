// Game Tile Class
class gameTile{
  constructor(startingX, startingY, colour, text){
    // Store the starting coordinates of the box
    this._startingX = startingX;
    this._startingY = startingY;
    this._colour = colour;
    this._text = text;
    this._value = text;

    // Store the current position of the tile
    this._currentX = startingX;
    this._currentY = startingY;

    var topLeftWin = [this._startingX, this._startingY];
    var topRightWin = [this._startingX + 200, this._startingY];
    var bottomLeftWin = [this._startingX, this._startingY + 200];
    var bottomRightWin = [this._startingX + 200, this._startingX + 200];

    var winLocations = [topLeftWin, topRightWin, bottomLeftWin, bottomRightWin];
  }
    get CurrentPosition(){
        return [this._currentX, this._currentY];
      }
    
    set CurrentPosition(coordinates){
      this._currentX = coordinates[0];
      this._currentY = coordinates[1];
      }

    get Colour(){
        return this._colour;
      }
    
    get Text(){
      return this._text;
    }

    
    directionCalc(x,y, direction){
        // Calculates the coordinates of the tiles based on their proposed direction
        switch (direction)
        {
          case "up":
            y = y - 100;
            break;
          
          case "down":
            y = y + 100;
            break;

          case "left":
            x = x - 100;
            break;
          
          case "right":
            x = x + 100;
            break;
        }

        return [x,y];
    }

      checkAtWin()
      {
        if (this.winLocations.includes(this.CurrentPosition))
        {
          return true;
        }
        return false;
      }
}



// Canvas Design
const BOARD_BORDER = 'black';
const BOARD_BACKGROUND = 'white';
const TILE_SIZE = 100;



// Canvas Elements
const BOARD = document.getElementById("gridCanvas");
const BOARD_CONTEXT = BOARD.getContext("2d");

// List to store tiles
var Tiles = [];
let changing_direction = false;

// List to store colours
var colours = []
//let box1 = new gameTile(0, 0, 'lightblue'); //Test Box

function drawBox(boxCoordinates, colour, text){
  BOARD_CONTEXT.fillStyle = colour;
  BOARD_CONTEXT.fillRect(boxCoordinates[0], boxCoordinates[1], TILE_SIZE, TILE_SIZE);

  BOARD_CONTEXT.font = "15px Arial";
  BOARD_CONTEXT.fillStyle = "black";
  BOARD_CONTEXT.textAllign = "center";
  BOARD_CONTEXT.fillText(text, boxCoordinates[0] + 50, boxCoordinates[1] + 50);
  
  
  //BOARD_CONTEXT.strokeRect(boxCoordinates[0], boxCoordinates[1], TILE_SIZE, TILE_SIZE);
  drawGrid();
}

function spawnTiles(Tiles)
{
  for (let row of Tiles)
  {
    for (let tile of row)
    {
      if (tile instanceof gameTile)
      {
        drawBox(tile.CurrentPosition, tile.Colour, tile.Text);
      }
      
    }
    
  }
}

function randomizeTiles()
{
  var tileCopy = [
    ['B','B','B','B','B','B'],
    ['B','B','B','B','B','B'],
    ['B','B','B','B','B','B'],
    ['B','B','B','B','B','B'],
    ['B','B','B','B','B','B'],
    ['B','B','B','B','B','B']
  ];
  var locations = [];
  for (var row of Tiles)
  {
    for (var tile of row)
    {
      var flag = true;
      while (flag)
      {
        // Create Random set of coordinates
        var proposedSet = [];
        proposedSet = [Math.floor(Math.random()*6)*100, Math.floor(Math.random()*6)*100];
        if (!(locations.includes(proposedSet)) && !(tileCopy[proposedSet[1]/100][proposedSet[0]/100] instanceof gameTile))
        {
            tile.CurrentPosition = proposedSet;
            tileCopy[proposedSet[1]/100].splice(proposedSet[0]/100, 1, tile);
            locations.push(proposedSet);
            flag = false;
        }
      }
    }
    
  }
  Tiles = [];
  Tiles = [...tileCopy];
  //Tiles.sort((a, b) => parseFloat(a._value) - parseFloat(b._value)); // Sort list in ascending order based on it's value
  logGrid(Tiles);
  clearBoard();
  spawnTiles(Tiles);
}

function generateTiles(){
  var count = 1;
  for (let y = 0; y < 400; y += 100){
    const row = [];
    for (let x = 0; x < 400; x += 100){
      row.push(new gameTile(x,y,getRandomColor(), count.toString()));
      count += 1;
    }
    row.push("B"); // Adding two blanks per row
    row.push("B");
    Tiles.push(row);
  }
  for (let x = 0; x < 2; x++)
  {
    row = []
    for (let y = 0; y < 6; y++)
    {
      row.push("B");
    }
    Tiles.push(row);
  }
  
}

function transpose(Tiles)
{
  var output = [];
  for (let i = 0; i < Tiles.length; i++)
  {
    column = [];
    for (let j = 0; j < Tiles.length; j++)
    {
      column.push(Tiles[j][i]);
    }
    output.push(column);
  }
  return output;
}


function logGrid(Tiles)
{
  text = ""
  for (let i = 0; i < Tiles.length; i++)
  {
    var limit = Tiles[i].length;
    for (var j = 0; j < limit; j++)
    {
      if (Tiles[i][j] instanceof gameTile)
      {
        text += Tiles[i][j].Text + ' ';
      }
      else 
      {
        text += "B" + " ";
      }
      
    }
    text += "\n";
  }
  console.log(text);
}

function checkTiles(coordinates)
{
  // Checks if coordinates are equal to any other tile's current coordinates
  for (tile of Tiles)
  {
    if (arrayEquals(coordinates, tile.CurrentPosition))
    {
      return false;
    }
  }
  return true;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  if (!colours.includes(color))
  {
    colours.push(color);
  }
  return color;
}

function checkWin()
{
  for (var row of Tiles)
  {
    for (var tile of row)
    {
      if (!tile.checkAtWin())
      {
        return false
      }
    }
  }
  alert("Congratulations, you won!!!!");
  return true
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}


function clearGridTile(coordinates){
  BOARD_CONTEXT.fillStyle = BOARD_BACKGROUND;
  BOARD_CONTEXT.fillRect(coordinates[0], coordinates[1], TILE_SIZE, TILE_SIZE);
  BOARD_CONTEXT.strokeRect(0, 0, BOARD.width, BOARD.height);


}
function clearBoard(){
  BOARD_CONTEXT.fillStyle = BOARD_BACKGROUND;
  BOARD_CONTEXT.strokeStyle = BOARD_BORDER;
  
  BOARD_CONTEXT.fillRect(0, 0, BOARD.width, BOARD.height);
  BOARD_CONTEXT.strokeRect(0, 0, BOARD.width, BOARD.height);
}

function drawGrid()
{
  // Draw Vertical Lines
  for (let x = 0; x < 600; x+=100)
  {
    for (let y = 0; y < 600; y+=100)
    {
      BOARD_CONTEXT.beginPath();
      BOARD_CONTEXT.moveTo(x,y);
      BOARD_CONTEXT.lineTo(x,600);
      BOARD_CONTEXT.stroke();
    }
  }

  // Draw Horizontal Lines
  for (let y = 0; y < 600; y+=100)
  {
    for (let x = 0; x < 600; x+=100)
    {
      BOARD_CONTEXT.beginPath();
      BOARD_CONTEXT.moveTo(x,y);
      BOARD_CONTEXT.lineTo(600,y);
      BOARD_CONTEXT.stroke();
    }
  }
  
  
}

function movement(event){
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_ARROW){
    // Moving Left
    moveLeft(Tiles);
  }
  
  if (keyPressed === RIGHT_ARROW){
    // Moving Right
    moveRight(Tiles);
  }

  if (keyPressed === UP_KEY){
    // Moving Up
    moveUp(Tiles);
  }

  if (keyPressed === DOWN_KEY){
    //Moving Down
    let count = 0;
    moveDown(Tiles);
  }
  checkWin();
  //console.log(Tiles);
}

function moveLeft(box){
  /*
  Reverse the row
  Move Element left by one spot, replace it's location with a Blank (B)
  Repeat till all elements are checked
  Reverse the row again
  */
  set = [...box]; //Deep Copy of Tiles
  arranged = [];
  for (row of set)
  {
    //row.reverse();
    rowCopy = [...row];
    console.log(row);
    for (let i = 0; i < row.length; i++)
    {
      //console.log('Iteration', i, row[i]);
      // Check if value is gameTile object
      if (row[i] instanceof gameTile)
      {
        // Check if value before is free to move to
        console.log('Prev', row[i-1]);
        if (!(row[i-1] instanceof gameTile) && !(row[i-1] === undefined))
        {
          // Swap Postions
          //console.log('In If');
          row[i].CurrentPosition = row[i].directionCalc(row[i].CurrentPosition[0], row[i].CurrentPosition[1], 'left');
          rowCopy.splice(i-1, 1, row[i]);
          rowCopy.splice(i, 1, 'B');
          row = [...rowCopy];
        }
      }
      //console.log(i, 'Loop', rowCopy);
    }
    //arranged.push(rowCopy.reverse());
    arranged.push(rowCopy);
    //console.log(rowCopy.reverse());
    //console.log(' ');
    //console.log('Check', rowCopy);
    Tiles = [...arranged];
  }
  logGrid(Tiles);
  clearBoard();
  spawnTiles(Tiles);
  
}

function moveRight(box){
  /*
  Reverse the row
  Move Element left by one spot, replace it's location with a Blank (B)
  Repeat till all elements are checked
  Reverse the row again
  */
  set = [...box]; //Deep Copy of Tiles
  arranged = [];
  for (row of set)
  {
    row.reverse();
    rowCopy = [...row];
    console.log(row);
    for (let i = 0; i < row.length; i++)
    {
      //console.log('Iteration', i, row[i]);
      // Check if value is gameTile object
      if (row[i] instanceof gameTile)
      {
        // Check if value before is free to move to
        console.log('Prev', row[i-1]);
        if (!(row[i-1] instanceof gameTile) && !(row[i-1] === undefined))
        {
          // Swap Postions
          //console.log('In If');
          row[i].CurrentPosition = row[i].directionCalc(row[i].CurrentPosition[0], row[i].CurrentPosition[1], 'right');
          rowCopy.splice(i-1, 1, row[i]);
          rowCopy.splice(i, 1, 'B');
          row = [...rowCopy];
        }
      }
      //console.log(i, 'Loop', rowCopy);
    }
    arranged.push(rowCopy.reverse());
    //console.log(rowCopy.reverse());
    //console.log(' ');
    //console.log('Check', rowCopy);
    Tiles = [...arranged];
  }
  logGrid(Tiles);
  clearBoard();
  spawnTiles(Tiles);

}

function moveUp(box){
  /*
  Transpose the input 
  Move Element left by one spot, replace it's location with a Blank (B)
  Repeat till all elements are checked
  Reverse the row again
  */
  set = [...transpose(box)]; // Deep Transposed copy
  arranged = [];
  for (row of set)
  {
    //row.reverse();
    rowCopy = [...row];
    console.log(row);
    for (let i = 0; i < row.length; i++)
    {
      //console.log('Iteration', i, row[i]);
      // Check if value is gameTile object
      if (row[i] instanceof gameTile)
      {
        // Check if value before is free to move to
        console.log('Prev', row[i-1]);
        if (!(row[i-1] instanceof gameTile) && !(row[i-1] === undefined))
        {
          // Swap Postions
          //console.log('In If');
          row[i].CurrentPosition = row[i].directionCalc(row[i].CurrentPosition[0], row[i].CurrentPosition[1], 'up');
          rowCopy.splice(i-1, 1, row[i]);
          rowCopy.splice(i, 1, 'B');
          row = [...rowCopy];
        }
      }
      //console.log(i, 'Loop', rowCopy);
    }
    arranged.push(rowCopy);
    //console.log(rowCopy.reverse());
    //console.log(' ');
    //console.log('Check', rowCopy);
    Tiles = [...transpose(arranged)]; // Transposed Copy
  }
  logGrid(Tiles);
  clearBoard();
  spawnTiles(Tiles);
  
  
}

function moveDown(box){
  /*
  Transpose the input 
  Move Element left by one spot, replace it's location with a Blank (B)
  Repeat till all elements are checked
  Reverse the row again
  */
  set = [...transpose(box)]; // Deep Transposed copy
  arranged = [];
  for (row of set)
  {
    row.reverse();
    rowCopy = [...row];
    console.log(row);
    for (let i = 0; i < row.length; i++)
    {
      //console.log('Iteration', i, row[i]);
      // Check if value is gameTile object
      if (row[i] instanceof gameTile)
      {
        // Check if value before is free to move to
        console.log('Prev', row[i-1]);
        if (!(row[i-1] instanceof gameTile) && !(row[i-1] === undefined))
        {
          // Swap Postions
          //console.log('In If');
          row[i].CurrentPosition = row[i].directionCalc(row[i].CurrentPosition[0], row[i].CurrentPosition[1], 'down');
          rowCopy.splice(i-1, 1, row[i]);
          rowCopy.splice(i, 1, 'B');
          row = [...rowCopy];
        }
      }
      //console.log(i, 'Loop', rowCopy);
    }
    arranged.push(rowCopy.reverse());
    //console.log(rowCopy.reverse());
    //console.log(' ');
    //console.log('Check', rowCopy);
    Tiles = [...transpose(arranged)]; // Transposed Copy
  }
  logGrid(Tiles);
  clearBoard();
  spawnTiles(Tiles);
  
}



function main()
{
  clearBoard();
  drawGrid();
  generateTiles();
  spawnTiles(Tiles);
  setTimeout(function()
  {
    clearBoard();
    drawGrid();
    randomizeTiles();
  }, 2000); 
  
}

main();
document.addEventListener("keydown", movement);