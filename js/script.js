const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext('2d')

const logo = document.getElementById("logo")

const bgImage = new Image()
bgImage.src = "../images/bg.png"

const fabyImage = new Image()
fabyImage.src = "../images/flappy.png"

const topPipeImage = new Image()
topPipeImage.src = "../images/obstacle_top.png"

const bottomPipeImage = new Image() 
bottomPipeImage.src = "../images/obstacle_bottom.png"

let pipesIntervalId 
let animationLoopId
let gravityLoopId



const faby = {
  x: 400, 
  y: 200,
  width: 0, 
  height: 0, 
  speedX: 0,
  speedY: 0,
  gravity: 0.1, 
  gravitySpeed: 0, 
  update: function () {
    console.log("Gravity speed", this.gravitySpeed)
    this.gravitySpeed = this.gravitySpeed + this.gravity

  }, 
  newPosition: function () {
    this.y = this.y + this.gravitySpeed
  }

}

class Pipe {
  constructor () {
    
    this.sharedX = 1200 

    this.spaceBetween = 200
    
    this.bottomPipeX = this.sharedX
    this.bottomPipeY = this.spaceBetween + (Math.round(Math.random() * 400))
    
    this.topPipeX = 0
    this.topPipeY = this.bottomPipeY - this.spaceBetween - 793
    



  }
  
  update() {
    this.sharedX = this.sharedX - 2
    
  }
  
  draw() {
    ctx.drawImage(bottomPipeImage, this.sharedX, this.bottomPipeY)
    ctx.drawImage(topPipeImage, this.sharedX, this.topPipeY)
  }

}

let pipesArray = []

function generatePipes () {
  pipesIntervalId = setInterval(() => {
    pipesArray.push(new Pipe ())
    console.log("Pipes:", pipesArray)
  }, 3750)
}

function animationLoop () {
  animationLoopId = setInterval(() => {

   
    faby.newPosition()

  ctx.clearRect(0, 0, 1200, 600)

  ctx.drawImage(bgImage, 0, 0, 1200, 600)

  ctx.drawImage(fabyImage, faby.x, faby.y, 75, 50)

  for (let i = 0; i < pipesArray.length; i++) {
    if (pipesArray[i].sharedX < -138) {
      pipesArray.splice(i, 1)
    }
    pipesArray[i].update()
    pipesArray[i].draw()
    
  }
}, 16)
}

function gravityLoop () {
gravityLoopId = setInterval(() => {
  faby.update ()
}, 50)
}

function startGame() {
  console.log("Top Pipe:", topPipeImage.height, topPipeImage.width)

  logo.style.visibility = "hidden"
  logo.style.height = "0px"
  canvas.width = "1200"
  canvas.height = "600"
  canvas.style.visibility = "visible"

  animationLoop()
  generatePipes()
  gravityLoop() 
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: 
    faby.gravitySpeed = faby.gravitySpeed - 0.2;
    break; 
  }
})

};
