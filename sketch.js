var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState === "play"){

    if(keyDown("RIGHT")) {
      ghost.x=ghost.x+3;
    }

    if(keyDown("LEFT")) {
      ghost.x=ghost.x-3;
    }

    if(keyDown("space")) {
      ghost.velocityY = ghost.velocityY-10;
    }
    //ghost.velocityY= ghost.velocityY+0.3; 

    if(tower.y > 400){
        tower.y = 300
      }
      spawnDoor();
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }

      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
        ghost.destroy();
        gameState = "end"
      }
    }
    drawSprites();
}
    if(gameState === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("game over", 230, 250);

    }
  function spawnDoor(){
    if(frameCount % 240 === 0){
      var door = createSprite(200,-50);
      door.addImage(doorImg);
      door.x = Math.round(random(120,400));
      door.velocityY = 1;
      door.lifetime = 800;

      var climber = createSprite(200,10);
      climber.addImage(climberImg);
      climber.x = door.x
      climber.velocityY = 1;
      climber.lifetime = 800;

      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      invisibleBlock.velocityY = 1;
      invisibleBlock.lifetime = 800;

      ghost.depth = door.depth
      ghost.depth+=1;

      doorsGroup.add(door);
      climbersGroup.add(climber);
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);

    }
  }