const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var bgImg,background;
var chef;
var burger;
var ground;
var gameState="wait";
var person2;
var score=50;

function preload(){
  bgImg=loadImage("images/background.png");
  chefStanding= loadImage("images/chef.png")
  chefKicking= loadImage("images/chef 2.png")
  person11=loadImage("images/person1.png")
  person21=loadImage("images/person2.png")
  person31=loadImage("images/person3.png")
  person41=loadImage("images/person4.png")
  crying =loadImage("sad.jpg")
  smiling =loadImage("happy.jpg")
  cake=loadImage("images/cake.png")
  cakeShop=loadImage("images/cakeshop.jpg")

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  //console.log(windowWidth);
  //console.log(windowHeight);
  engine = Engine.create();
  world = engine.world;
  ground=Bodies.rectangle(0,height-10,width*50,10,{isStatic:true});
  World.add(world,ground)
  burger=new Burger(800,200,25);


  person1=new Person(2000,500,100,100);
 
  person2=new Person(4000,400,100,100);
 //image("person21",4000,400)
  person3=new Person(6000,400,100,100);
//  image("person31",6000,400)
  person4=new Person(8000,400,100,100);
 // image("person41",8000,400)
  person5=new Person(10000,400,100,100);
  

	Engine.run(engine);
   
}

function draw() {
  drawSprites();
 
  Engine.update(engine);

  fill("red");
  //rectMode(CENTER)
  rect(ground.position.x,ground.position.y,width*50,10);

  if(gameState==="wait"){
    background("cyan")
    image(cakeShop,0,-80,1000,900);

    var button =createSprite(1000,500,500,100);
    button.shapecolor="red"
    textSize(20)
    fill("indigo")
    text(" Click here to Play",1000,500)
    
    text(" Joan has just started cake shop.\n One of her prime patrons has ordered \n a chocolate cake to be home delivered.\n\n Unfortunately, \n The deliverboys Johan and Adam are \n busy delivering on the other side \n of the city. \n She cannot go herself as there are a \n large number of customers in the shop. \n Will you help her?",1000,100);
  
    text(" Press space button to deliver \n the cake to the customer",1000,400)

    if (mousePressedOver(button)){
    gameState = "start";
    drawSprites();
    }
  }
  
  if(gameState==="start"){
   //chef = createSprite(camera.x,250,200,200);
    //chef.addImage(chefStanding);
    startGame();
    fill("darkblue")
    textSize(30)
    text("Score:"+score,camera.x+500,150) 
    image(person11,person1.body.position.x-130,person1.body.position.y-100,200,300);
    image(person21,person2.body.position.x-250,person2.body.position.y-300,);
    image(person31,person3.body.position.x-120,person3.body.position.y-100,200,200);
    image(person41,person4.body.position.x-170,person4.body.position.y-100,300,300);
    image(cake,burger.body.position.x-70,burger.body.position.y-100,200,200);
  }
  if(gameState==="end" || gameState==="end1"){
    endGame();
  }
 

}

function startGame(){
  image(bgImg,-displayWidth,0,displayWidth*10,displayHeight+100);
 
  Engine.update(engine)
 
  if (keyDown("space")){
   chef.addImage(chefKicking);
    Matter.Body.setVelocity(burger.body,{x:15,y:20})
    Matter.Body.setStatic(burger.body,false);
  }
  if (keyDown("left")){
    chef.addImage(chefKicking);
     Matter.Body.setVelocity(burger.body,{x:15,y:0})
     Matter.Body.setStatic(burger.body,false);
   }
if (isTouching(burger,person4)){
  console.log("collided")
  Matter.Body.setStatic(burger.body,true)
  gameState="end";
}
if (isTouching(burger,person1)||isTouching(burger,person2)||isTouching(burger,person3)){
  //Matter.Body.setStatic(burger.body,true);
  gameState="end1";
  score=score-5;
  gameState="start";
}
  isTouching(burger,person1);
  isTouching(burger,person2);
  isTouching(burger,person3);
  isTouching(burger,person4);
  

  burger.display();
  person1.display();
  person2.display();
  person3.display();
  person4.display();
  person5.display();
  
  camera.x=burger.body.position.x;
  camera.y= 400;

 // drawSprites();

}


function isTouching(object1,object2){
object1pos=object1.body.position;
object2pos=object2.body.position;
var distance=dist(object1pos.x,object1pos.y,object2pos.x,object2pos.y);
console.log(distance);
if (distance<=150){
 return true;
}else{
  return false;
}
}

function endGame(){
background("green")
  console.log("end");
  
  //image(crying,camera.x-800,50,windowWidth,windowHeight);
  if (gameState=== "end1"){
    image(crying,camera.x-700,100,windowWidth,windowHeight);
  }else if(gameState=== "end"){ 
    image(smiling,camera.x-700,100,windowWidth,windowHeight);
  }

}

