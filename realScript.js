

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = 800;
let height = 500;

// main character, bear image
let img1 = new Image();
img1.src = "images/bear.png";

// obstacles, coffee bean image
let img2 = new Image();
img2.src = "images/Coffeebean.png";

let score = 0;
let gameFrame = 0;


// default mouse location and property
let mouse = {
    x: width/2, 
    y: height/2,
}

// This game is mouse moving based, so setting a function for a mouse-down movement is a crucial key to make the main character move
canvas.addEventListener("mousedown", function(event){
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
})


// function Bear is a constructor 
function Bear(){
    this.x = width;
    this.y = height;
    this.radius = 40; 
    this.img1Width = 177;
    this.img1Height = 156;
    this.update = function(){
        let xDistance = this.x - mouse.x; 
        let yDistance = this.y - mouse.y;
        if (mouse.x != this.x){
            this.x -= xDistance/40;
        }

        if (mouse.y != this.y){
            this.y -= yDistance/40;
        }
    }

    this.draw = function(){
        ctx.fillStyle = "rgb(196, 172, 159)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.drawImage(img1, this.img1Width, this.img1Height, this.img1Width, this.img1Height, this.x - 100, this.y - 100, this.img1Width, this.img1Height); //check if it doesn't work
    }
}

let bear = new Bear();


// a constructor for coffee beans
function CoffeeBean(){
    this.x = (Math.random() * width);
    this.y = (Math.random() * height) + height;
    this.radius = 38;
    this.speed = Math.random() * 6 + 1 ;
    this.distance;
    this.counted = false; // to prevent duplicated counts
    this.update = function(){
        this.y -= this.speed;
        // hypotenuse of a virtual triangle for two objects, the bear and a coffeebean
        const xD = this.x - bear.x; // this.x is a random width coordinate and bear.x is just width
        const yD = this.y - bear.y; 
        this.distance = Math.sqrt(xD * xD + yD * yD);
    }

    this.draw = function(){
        ctx.fillStyle = "rgb(196, 172, 159)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI);
        ctx.fill();
        ctx.drawImage(img2, this.x - 70, this.y - 50, 140, 100);
        
    }
}

// this array will be a tray for random coffee beans
let coffeeArray = []  

function handleCoffee(){
    if (gameFrame % 50 == 0){
        coffeeArray.push(new CoffeeBean());
    }

    for (let i = 0; i < coffeeArray.length; i++){
        coffeeArray[i].update();
        coffeeArray[i].draw();

        if (coffeeArray[i].distance < coffeeArray[i].radius + bear.radius){
            if(!coffeeArray[i].counted){
                score ++;
                coffeeArray[i].counted = true;
                coffeeArray.splice(i, 1); // after collision, the coffeebean disappears
            }
        }
    }
}



function tada(){
    ctx.clearRect(0,0, width, height);
    handleCoffee();
    bear.update();
    bear.draw();
    ctx.fillStyle = "rgb(84, 71, 70)";
    ctx.font = "40px righteous";
    ctx.fillText("Picked Beans: " + score, 20 , 50);
    gameFrame++;
    requestAnimationFrame(tada);
}

tada();  