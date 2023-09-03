
let Score=document.getElementById('score')
var c=document.querySelector('canvas').getContext('2d')
c.canvas.width=window.innerWidth
c.canvas.height=window.innerHeight

function scoreUpdate(){
    Score.textContent='Score '+score
}
//Creating obstacle object
class obj{
    constructor(h,w,x,y,x_vel,y_vel){
        this.h=h
        this.w=w
        this.x=x
        this.y=y
        this.x_vel=x_vel
        this.y_vel=y_vel
    }
}
//Creating player character
let char,control
char={
    jump:false,
    height:50,
    width:50,
    x:0,
    y:window.innerHeight/3,
    x_velocity:0,
    y_velocity:0,
};
console.log(c.canvas)
//Creating Character controller
control={
    left:false,
    right:false,
    up:false,
    keyListener:function(event){
        let state=(event.type=="keydown")?true:false
        if(event.key=="a" ){
            control.left=state
        }
        else if(event.key=="d"){
            control.right=state
        }
        else if(event.key=="w"){
            control.up=state
        }
        else if(event.key=="x"){
            char.jump=false
        }
        else if(collide==true && event.key=="r"){
            start=false
            collide=false
        }
        else if(event.key=="r"){
            score=0
            scoreUpdate()
            start=true
        }
    }
};
let collide=false
let start=false
let score=0
//Setting up canvas
c.fillStyle = "#380923";
c.fillRect(0, 0, window.innerWidth, window.innerHeight);// x, y, width, height
//Updating canvas frames for animation 
function update(){
    //Checking State of controller
    //Jump
    if(control.up && char.jump==false){
        char.y_velocity-=30
        char.jump=true
    }
    //move left
    if(control.left){
        char.x_velocity-=2
    }
    //move right
    if(control.right){
        char.x_velocity+=2
    }
    //Checking of collison has occured
    if(colision()){
        Score.textContent="Score "+score+" "+"Press r to restart"
        collide=true
        c.fillStyle = "#ffffff";// hex for red
        c.beginPath();
        c.rect(char.x,char.y, char.height, char.width);
        c.fill();
        o.x=window.innerWidth
    }
    //Setting values of character according to controller
    char.y_velocity+=1.5
    char.x+=char.x_velocity
    char.y+=char.y_velocity
    char.x_velocity*=0.9
    char.y_velocity*=0.9
    //checking if character hit the ground
    if(char.y>500){
        char.jump=false
        char.y=500
        char.y_velocity=0
    }
    if(char.x>window.innerWidth){
        char.x=-char.width
    }
    if(char.x<-50){
        char.x=window.innerWidth
    }
    //background
    c.fillStyle = "#380923";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);// x, y, width, height

    //Updating positons of chracter 
    if(start){
    c.fillStyle = "#ff0000";// hex for red
    c.beginPath();
    c.rect(char.x,char.y, char.height, char.width);
    c.fill();
    }
    //platform
    c.fillStyle = "#ff00ff";
    c.beginPath();
    c.rect(0,500+50, window.innerWidth, 10);
    c.fill();
    //Start sending object if start flag is true
    if(start){
        obstacle()
    }
    //Recursively updating the frame
    window.requestAnimationFrame(update)
}
document.addEventListener('keydown',control.keyListener,false)
document.addEventListener('keyup',control.keyListener,false)
window.requestAnimationFrame(update)
const o=new obj(75,75,window.innerWidth,550-75,15,15)
function obstacle(){
    c.fillStyle = "#f000f";
    c.beginPath();
    c.rect(o.x,550-o.h,o.w,o.h);
    c.fill();
    //setting velocity of obstacle
    if(!collide){
            o.x-=o.x_vel
    }
    if(o.x<-o.w){
        if(!collide){
            score+=1
            scoreUpdate()
            o.x=window.innerWidth
        //Randomizing each object
        o.x_vel=Math.random()*15+15
        o.h=Math.random()*75+50
        o.w=Math.random()*75+25
        //updating obstacle position    
        c.fillStyle = "#f000f";
        c.beginPath();
        c.rect(o.x,o.y,o.w,o.h);
        c.fill();
        o.x-=o.x_vel
        }
    }
}
function colision(){
    //checking if bounds of obstacle and character are not in a common region
    let x=(char.x+char.width)>o.x && char.x<(o.x+o.w)
    let y=(char.y)<(o.y+o.height)
    return x&&y
}
