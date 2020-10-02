var monkey, monkey_run;
var bananaImg, foodGroup;
var obstacleImg, obstacleGroup;

var score = 0;

var back, bg;
var ground;

function preload() {
  monkey_run =
    loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("banana.png");

  bg = loadImage("jungle.jpg");

  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);

  back = createSprite(200, 200, 400, 400);
  back.addImage("background", bg);
  back.velocityX = -5;

  monkey = createSprite(50, 350, 20, 50);
  monkey.scale = 0.1;
  monkey.addAnimation("monkey", monkey_run);

  ground = createSprite(200, 390, 400, 20);
  ground.visible = false;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {

  background(220);

  drawSprites();

  text("Score:" + score, 300, 50);

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default: break;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  if (back.x < 0) {
    back.x = back.width / 2;
  }

  if (foodGroup.isTouching(monkey)) {
    score = score + 2
    foodGroup.destroyEach();
  }

  if (obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.2;
  }

  monkey.collide(ground);

  banana();

  spawnObstacle();
}

function banana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(390, 290, 20, 20);
    banana.y = Math.round(random(80, 120));
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 80;
    foodGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(390, 365, 10, 40);
    obstacle.velocityX = -8;
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.lifetime = 50;
    obstacleGroup.add(obstacle);
  }
}