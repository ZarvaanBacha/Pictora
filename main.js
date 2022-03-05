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
  BOARD_CONTEXT.strokeRect(boxCoordinates[0], boxCoordinates[1], TILE_SIZE, TILE_SIZE);
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
}

function moveLeft(box){

  clearGridTile(box.getCurrentPosition());
  box.setCurrentPosition(box.getCurrentPosition()[0] - TILE_SIZE, box.getCurrentPosition()[1]);
  drawBox(box.getCurrentPosition(), box.getColour());
}

function moveRight(box){
  clearGridTile(box.getCurrentPosition());
  box.setCurrentPosition(box.getCurrentPosition()[0] + TILE_SIZE, box.getCurrentPosition()[1]);
  drawBox(box.getCurrentPosition(), box.getColour());
}

function moveUp(box){
  clearGridTile(box.getCurrentPosition());
  box.setCurrentPosition(box.getCurrentPosition()[0], box.getCurrentPosition()[1]- TILE_SIZE);
  drawBox(box.getCurrentPosition(), box.getColour());
}

function moveDown(box){
  clearGridTile(box.getCurrentPosition());
  box.setCurrentPosition(box.getCurrentPosition()[0], box.getCurrentPosition()[1]+ TILE_SIZE);
  drawBox(box.getCurrentPosition(), box.getColour());
}



function main()
{
  clearBoard();
  console.log(box1.getCurrentPosition());
  drawBox(box1.getCurrentPosition(), box1.getColour());
}

main();
document.addEventListener("keydown", movement);