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
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);

}

function draw() {
  background(200);

  /*estado de juego, modo play y end, pon la instruccion que se necesita para decirle
  a la computadora que se encuentra en modo play y end, asignale el comportamiento a nuestros objetos 
  dependiendo del estado que corresponda*/
if(gameState=="play"){
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3  
    
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3
    
  }
  if(keyDown("space")){
    ghost.velocityY = -4
    
  }
  
  ghost.velocityY += 0.8;

  if(tower.y > 400){
    tower.y = 300
  }
  spawnDoors();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  
    
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
   ghost.destroy()
   gameState = "end"

   
  
  }




  drawSprites();

}
if(gameState== "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30)
  text("GAMEOVER",230,250)
}
  
  





}

function spawnDoors(){

  
if(frameCount%240 == 0){

  //Puertas, crear una variable local para door
  var door = createSprite(200, -50);
  door.addImage("door",doorImg);

  //Barandillas, crear una variable local para climber
  var climber = createSprite (200,10);
  climber.addImage("climber",climberImg);

  //invisibleBlock, crear una variable local para los bloques invisibles
  var invisibleBlock = createSprite(200,15) 
  

  // se le manda el valor del ancho de climber a invisibleBlock
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;

  //posicion en x de manera aleatoria 
  door.x = Math.round(random(120,400));
  door.velocityY = 3;

  //climber toma la posicion de x de door
  climber.x = door.x;
  climber.velocityY = 3;

  //invisibleBlock en su posicion x toma el valor de x de door
  invisibleBlock.x = door.x;

  //asignale una velocidad a invisibleBlock en Y
  invisibleBlock.velocityY = 3;

  //profundidad a los objetos
  ghost.depth = door.depth;
  ghost.depth +=1;

  //asignar tiempo de vida a la variable
  door.lifetime= 610;
  climber.lifetime= 610;
  //asignar tiempo de vida a invisibleBlock
  invisibleBlock.lifetime= 610;


  //agregar cada puerta al grupo
  doorsGroup.add(door);
  climbersGroup.add(climber);


  //Ayuda extra
  //invisibleBlock.debug = true;
  invisibleBlockGroup.add(invisibleBlock);
 

 
 
 
 
}

}

