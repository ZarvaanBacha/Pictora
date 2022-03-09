// Game Tile Class
class gameTile{
  constructor(startingX, startingY, colour, text){
    // Store the starting coordinates of the box
    this._startingX = startingX;
    this._startingY = startingY;
    this._colour = colour;
    this._text = text;

    // Store the current position of the tile
    this._currentX = startingX;
    this._currentY = startingY;
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
          
          case "right":
            x = x + 100;
        }

        return [x,y];
    }
      isValid(x,y){
        // Checks if proposed tile movement is valid 
        if ((x >= 0 && x <= 500) && (y >= 0 && y <= 500))
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
  for (tile of Tiles)
  {
    drawBox(tile.CurrentPosition, tile.Colour, tile.Text);
  }
}


function generateTiles(){
  count = 01;
  for (let y = 0; y < 400; y += 100){
    for (let x = 0; x < 400; x += 100){
      Tiles.push(new gameTile(x,y,getRandomColor(), count.toString()));
      count += 1;
    }
  }/*
  Tiles.push(new gameTile(0,0,getRandomColor()));
  Tiles.push(new gameTile(100,0,getRandomColor()));
  Tiles.push(new gameTile(200,0,getRandomColor()));
  Tiles.push(new gameTile(300,0,getRandomColor()));*/
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
    moveRight(Tiles);
  }

  if (keyPressed === UP_KEY){
    // Moving Up
    moveUp(Tiles);
  }

  if (keyPressed === DOWN_KEY){
    //Moving Down
    moveDown(Tiles);
  }

  //console.log(box1.getCurrentPosition());
}

function moveLeft(box){
}

function moveRight(box){
/*  
    To move right, split the list of tiles into 4 rows
    After the list is split, goto the last object in the splitted list and check if proposed move would be valid
    Perform the move and then move backwards in the split list to perfrom moves on other tiles */
  SplitTiles = [];
  for (let i = 0; i < Tiles.length; i+=4)
  {
    Chunk = [];
    for (let j = i; j < i+4; j++)
    {
      Chunk.push(Tiles[j]);
    }
    SplitTiles.push(Chunk);

  }

  /*
    Iterate through the divided lists
    Starting with the last object, loop till the last possible valid location
    Once the location has been determined, draw the tile in that spot

  */
  storeTiles = []
  for (split of SplitTiles)
  {
    // Store copy of row 
    var row = [...split];
    // Reverse row for convinence
    row.reverse();

    for (let tile = 0; tile < row.length; tile+=1)
    {
      var currentCoordinates = [...row[tile].CurrentPosition]; // Copy tile's current postion
      
      var proposedCoordinates = [currentCoordinates[0], currentCoordinates[1]]; //Proposed coordinates, which will iterate from there on
      flag = true;
      while (flag)
      { 
        // Calculate tile coordinates and set to proposed coordinates
        x = row[tile].directionCalc(proposedCoordinates[0], proposedCoordinates[1], 'right')[0];
        y = row[tile].directionCalc(proposedCoordinates[0], proposedCoordinates[1], 'right')[1];
        proposedCoordinates = [x,y];

        // Check if propsed coordinates fails any of the two conditions
        // If it does break out of the while loop

        if (!checkTiles(proposedCoordinates) || !row[tile].isValid(proposedCoordinates[0], proposedCoordinates[1]))
        {
          // Tile is in an invalid location, set the coordinates to one previous iteration
          // Set Tile Location 
          x = proposedCoordinates[0] - 100;
          y = proposedCoordinates[1];
          newCoorinates = [x,y];
          row[tile].CurrentPosition = newCoorinates;
          storeTiles.push(row[tile]);
          flag = false;
        }
      }
    }
    
  }
  Tiles = [...storeTiles.sort((a,b)=> (a.Text > b.Text ? 1 : -1))];
  console.log(Tiles);
  clearBoard();
  spawnTiles(Tiles);

}

function moveUp(box){
  clearGridTile(box.getCurrentPosition());
  box.move(box.getCurrentPosition()[0], box.getCurrentPosition()[1]- TILE_SIZE);
  drawBox(box.getCurrentPosition(), box.getColour());
}

function moveDown(box){
  clearGridTile(box.getCurrentPosition());
  box.move(box.getCurrentPosition()[0], box.getCurrentPosition()[1]+ TILE_SIZE);
  drawBox(box.getCurrentPosition(), box.getColour());
}



function main()
{
  clearBoard();
  drawGrid();
  generateTiles();
  spawnTiles(Tiles);
  console.log(Tiles);
  //console.log(box1.getCurrentPosition());
  //drawBox(box1.getCurrentPosition(), box1.getColour());
}

main();
document.addEventListener("keydown", movement);