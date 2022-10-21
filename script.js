class Snake {
  constructor(pos,scale) {
    this.prePos = pos;
    this.pos = pos;
    this.vel = { x: 0, y: 0 };
    this.scale = scale;
    this.tail = [];
  }
  getPos() {
    return this.pos;
  }
  update() {
    this.tail.unshift(Object.assign({}, this.prePos))
    this.tail.pop()
  }
  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.pos.x, this.pos.y, this.scale*1, this.scale*1);
    ctx.fillStyle = "blue";
    this.tail.forEach((t,index) => {
      ctx.fillRect(t.x, t.y, this.scale*1, this.scale*1);
      console.log('tail #',index,'pos ',t)
    });
  }
  changeDirection(direction) {
    let prevVel = Object.assign({}, this.vel);
    switch (direction) {
      case "W":
        if(prevVel.y !== 0) return;
        this.vel = { x: 0, y: -this.scale*1 };
        break;
      case "S":
        if(prevVel.y !== 0) return;
        this.vel = { x: 0, y: this.scale*1 };
        break;
      case "A":
        if(prevVel.x !== 0) return;
        this.vel = { x: -this.scale*1, y: 0 };
        break;
      case "D":
        if(prevVel.x !== 0) return;
        this.vel = { x: this.scale*1, y: 0 };
        break;
    }
  }
  isAvailable(position) {
    if (JSON.stringify(this.pos) === JSON.stringify(position))
      return true
    let condition = this.tail.some((tailPos) => {
      return JSON.stringify(tailPos) === JSON.stringify(position)
    })
    return condition;
  }
  move() {
    this.prePos = Object.assign({}, this.pos);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  addTail() {
    this.tail.push(Object.assign({}, this.prePos));
    console.log('tail',this.tail)
  }
  gameOver() {
    if (this.pos.x > canvas.width - this.scale || this.pos.x < 0 || this.pos.y > canvas.height - this.scale || this.pos.y < 0) {
      return true;
    }
    let condition = this.tail.some((tailPos) => {
      return JSON.stringify(tailPos) === JSON.stringify(this.pos)
    })
    return condition;
  }
}

class Food {
  constructor(pos,scale) {
    this.pos = pos;
    this.scale = scale;
    this.img = new Image()
    this.img.src = 'assets/River_Plate_1998.svg'
  }
  getPos() {
    return this.pos;
  }
  setPos(pos) {
    this.pos = pos;
  }
  draw() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, 10, 10);

  }

}

class Score {
  constructor() {
    this.score = 0;
  }
  getScore() {
    return this.score;
  }
  setScore(score) {
    this.score = score;
  }
  increaseScore() {
    this.score++;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + this.score, 10, 20);
  }
}

const snake = new Snake({ x: randomNum(1, 35), y: randomNum(1, 35) },10);

const onKey = document.addEventListener("keydown", (e) => {
  setTimeout(() => {
    snake.changeDirection(e.key.toUpperCase());
  }, 100 - 2*score.getScore())
});

const canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");

function randomNum(min,max) {
  return Math.floor(Math.random() * (max - min) + min)*10;
}

const food = new Food({ x: randomNum(1, 35), y: randomNum(1, 35) });
const score = new Score();
function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  snake.update();
  food.draw();
  snake.draw();
  score.draw();
  if (snake.isAvailable(food.getPos())) {
    food.setPos({ x: randomNum(1,35), y: randomNum(1,35)})
    snake.addTail()
    food.draw()
    score.increaseScore()
  }
  if (snake.gameOver()) {
    document.getElementById("game-over").style.display = "flex";
    const button = document.getElementById("btn")
    button.addEventListener('click', () => {
      window.location.reload();
    }) 
  } else {
    setTimeout(() => {
      requestAnimationFrame(main);
    },100 - 2*score.getScore())
  }
}

main()