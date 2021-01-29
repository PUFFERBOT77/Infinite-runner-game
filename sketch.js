var score;

var rail,rail2,rail3;
var railImg;
var dirt,dirtImg;

var obstacle,obstacleImage,obstacleGroup;
var coin,coinImage,coinGroup;

var player,playerImg;

var overImg,over;

var bag,bagImg,bagGroup;

var play=1;
var end = 0;
var gameState=play;
function preload(){
  railImg=loadImage("rail2.png");
  dirtImg=loadImage("dirt.png");
  
  obstacleImage = loadImage("obstacle.png");
  coinImage = loadImage("coin.gif");
  
  playerImg=loadAnimation("player.gif");
  
  bagImg=loadImage("bag.png");
  
  overImg=loadImage("over.png");
}

function setup() {
 
  createCanvas(400,400);
  
  score=0;
  
  dirt=createSprite(200,200);
  dirt.addImage(dirtImg);
  
  rail=createSprite(70,100);
  rail.addImage(railImg);
  rail.scale=5;
  
  rail1=createSprite(200,100);
  rail1.addImage(railImg);
  rail1.scale=5;
  
  rail2=createSprite(330,100);
  rail2.addImage(railImg);
  rail2.scale=5;
  
  rail.velocityY=2; 
  rail1.velocityY=2;
  rail2.velocityY=2;
  
  player=createSprite(200,350,50,50);
  player.addAnimation("p",playerImg);
  
  over=createSprite(210,200);
  over.addImage(overImg);
  over.visible=false;
  over.scale=3;
  
  obstacleGroup=new Group();
  coinGroup=new Group();
  bagGroup=new Group();
}

function draw() {
  background("white");

  if (gameState===play){
    if(rail.y>325){
    rail.y=150;
    }
  
    if(rail1.y>325){
    rail1.y=150;
    }
  
    if(rail2.y>325){
    rail2.y=150;
    }
  
    if(mousePressedOver(rail2) && player.x===200){
       player.x=330;
    }
    
    if(mousePressedOver(rail) && player.x===200){
       player.x=70;
    }
    
    if(mousePressedOver(rail1) && player.x===70){
       player.x=200;
    }
    
    if(mousePressedOver(rail1) && player.x===330){
       player.x=200;
    }
    
    if(coinGroup.isTouching(player)){
      score=score+1;
      coinGroup.destroyEach();
    }
        
    if(bagGroup.isTouching(player)){
      score=score+5;
      bagGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(player)){
      gameState=end;
      obstacleGroup.destroyEach();
    }
    
    
    rock();
    reward();
    money();
  } 
  else if(gameState===end){
    rail1.velocityY=0;
    rail2.velocityY=0;
    rail.velocityY=0;
    
    obstacleGroup.velocityY=0;
    bagGroup.velocityY=0;
    coinGroup.velocityY=0;
    
    coinGroup.destroyEach();
    bagGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    player.x=100000;
    
    score=0;
    
    over.visible=true;
    
    if(mousePressedOver(over)){
      gameState=play;
      over.visible=false;
      player.x=200;
      rail1.velocityY=2;
      rail2.velocityY=2;
      rail.velocityY=2;
    }
  }
  
  drawSprites();
    
  textSize(20);
  fill("red");
  text("Score: "+ score, 50,30);
  
}

function rock(){
  
  if(frameCount % 300 === 0){
    obstacle = createSprite(200,-50,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityY=6;
    obstacle.lifeTime=100;
    obstacleGroup.add(obstacle);
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.x=200;
              break;
      case 2: obstacle.x=330;
              break;
      case 3: obstacle.x=70;
              break;
      default: break;
  }
}
}

function reward(){
  
  if(frameCount % 200 === 0){
    coin = createSprite(200,-50,20,20);
    coin.addImage(coinImage);
    coin.scale=0.5;
    coin.velocityY=6;
    coin.lifeTime=100;
    coinGroup.add(coin);
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: coin.x=200;
              break;
      case 2: coin.x=330;
              break;
      case 3: coin.x=70;
              break;
      default: break;
  }
}
}
function money(){
  
  if(frameCount % 500 === 0){
    bag = createSprite(200,-50,20,20);
    bag.addImage(bagImg);
    bag.scale=1;
    bag.velocityY=6;
    bag.lifeTime=100;
    bagGroup.add(bag);
    bag.setCollider("point",0,0);
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: bag.x=200;
              break;
      case 2: bag.x=330;
              break;
      case 3: bag.x=70;
              break;
      default: break;
  }
}
}
