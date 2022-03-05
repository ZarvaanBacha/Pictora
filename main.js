// Game Tile Class
class gameTile{
  constructor(startingX, startingY, colour){
    // Store the starting coordinates of the box
    this.startingX = startingX;
    this.startingY = startingY;
    this.colour = colour;

    // Store the current position of the tile
    this.currentX = startingX;
    this.currentY = startingY;
  }
    getCurrentPosition(){
        return [this.currentX, this.currentY];
      }
    
    setCurrentPosition(x,y){
      this.currentX = x;
      this.currentY = y;
      }

    
    getColour(){
        return this.colour;
      }

    move(x,y){
        // Checks if proposed tile movement is valid and sets the tile
        if ((x >= 0 && x <= 500) && (y >= 0 && y <= 500))
        {
          this.setCurrentPosition(x,y);
        }
      }
}



// Canvas Design
const BOARD_BORDER = 'black';
const BOARD_BACKGROUND = 'white';
const TILE_SIZE = 100;



// Canvas Elements
const BOARD = document.getElementById("gridCanvas");
const BOARD_CONTEXT = BOARD.getContext("2d");

let changing_direction = false;
let box1 = new gameTile(0, 0, 'lightblue'); //Test Box

function drawBox(boxCoordinates, colour){
  BOARD_CONTEXT.fillStyle = colour;
  BOARD_CONTEXT.fillRect(boxCoordinates[0], boxCoordinates[1], TILE_SIZE, TILE_SIZE);
  //BOARD_CONTEXT.strokeRect(boxCoordinates[0], boxCoordinates[1], TILE_SIZE, TILE_SIZE);
  drawGrid();
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
    moveLeft(box1);
  }
  
  if (keyPressed === RIGHT_ARROW){
    moveRight(box1);
  }

  if (keyPressed === UP_KEY){
    // Moving Up
    moveUp(box1);
  }

  if (keyPressed === DOWN_KEY){
    //Moving Down
    moveDown(box1);
  }

  console.log(box1.getCurrentPosition());
}

function moveLeft(box){

  clearGridTile(box.getCurrentPosition());
  box.move(box.getCurrentPosition()[0] - TILE_SIZE, box.getCurrentPosition()[1]);
  drawBox(box.getCurrentPosition(), box.getColour());
}

function moveRight(box){
  clearGridTile(box.getCurrentPosition());
  box.move(box.getCurrentPosition()[0] + TILE_SIZE, box.getCurrentPosition()[1]);
  drawBox(box.getCurrentPosition(), box.getColour());
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
  console.log(box1.getCurrentPosition());
  drawBox(box1.getCurrentPosition(), box1.getColour());
}

main();
document.addEventListener("keydown", movement);