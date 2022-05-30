var rocket, asteroid, bullet;
var rocketImg, asteroidImg, backgroundImg, bulletImg;
var asteroidGroup, bulletGroup;
var score;
var vel;
var gameState = "PLAY";

function preload(){
  rocketImg = loadImage('./images/spaceship.png');
  asteroidImg = loadImage('./images/asteroid.png');
  backgroundImg = loadImage('./images/space background.jpg');
  bulletImg = loadImage('./images/bullet.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  rocket = createSprite(200, 200, 50, 50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.5
  rocket.debug = true;

  asteroidGroup = new Group();
  bulletGroup = new Group();

  score = 0;
}

function draw() {
  background(backgroundImg);

  fill("white");
  textSize(25);
  text("Score: "+score,width-200,50);
  
  if(gameState === "PLAY") {
    if(keyDown("UP_ARROW")&& rocket.y>=50){
      rocket.y -= 5
    }

    if(keyDown("DOWN_ARROW")&& rocket.y <= height-50){
      rocket.y += 5
    }
    
    for(var i = 0;i<asteroidGroup.length;i++){
        if(asteroidGroup.get(i).isTouching(bulletGroup)){
          bulletGroup.destroyEach();
          asteroidGroup.get(i).destroy();
          score +=5;
        }  
    }

    if(keyWentDown("space")){
      spawnBullet();
    }

    if(asteroidGroup.isTouching(rocket)) {
      asteroidGroup.destroyEach();
      rocket.destroy();
      gameState = "END";
    }

    spawnAsteroid();

  }

  if(gameState === "END") {
    fill("white");
    textSize(90);
    text("GAME OVER", width/3,height/1.8);
    asteroidGroup.setVelocityXEach(0);
    asteroidGroup.setLifetimeEach(-1);
  }

  drawSprites();

}

function spawnBullet(){
  bullet = createSprite(rocket.x,rocket.y,10,5);
  bullet.addImage(bulletImg);
  bullet.debug = true;
  bullet.setCollider("rectangle",0,0,350,130);
  bullet.scale = 0.2;
  bullet.velocityX = 5 + (score/20);
  bullet.lifetime = 270;
  bulletGroup.add(bullet);
}

function spawnAsteroid(){
  if(frameCount%60===0){
    asteroid = createSprite(width,height/2,20,100);
    asteroid.addImage(asteroidImg);
    asteroid.debug = true;
    asteroid.setCollider("rectangle",0,0,350,130);
    asteroid.scale = 0.5;
    asteroid.y = Math.round(random(100,height-100));
    asteroid.velocityX = -(5 + score/10) ;
    vel = asteroid.velocityX
    asteroid.lifetime = 300;
    asteroidGroup.add(asteroid);
  }
}


