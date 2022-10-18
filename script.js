class Snake {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.size = 25;
    this.tail = [];
  }
  getPos() {
    return this.pos;
  }
  update() {
    this.tail.unshift(this.pos)
    this.tail.pop()
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    this.tail.forEach((t,index) => {
      ctx.fillRect(t.x, t.y, 10, 10);
      console.log('tail #',index,'pos ',t)
    });
  }
  changeDirection(direction) {
    switch (direction) {
      case "W":
        this.vel = { x: 0, y: -10 };
        break;
      case "S":
        this.vel = { x: 0, y: 10 };
        break;
      case "A":
        this.vel = { x: -10, y: 0 };
        break;
      case "D":
        this.vel = { x: 10, y: 0 };
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
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  addTail() {
    this.tail.push(this.pos)
  }
}

class Food {
  constructor(pos) {
    this.pos = pos;
  }
  getPos() {
    return this.pos;
  }
  setPos(pos) {
    this.pos = pos;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
  }

}

const snake = new Snake();

const onKey = document.addEventListener("keydown", (e) => {
  snake.changeDirection(e.key.toUpperCase());
});

const canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");

function randomNum(min,max) {
  return Math.floor(Math.random() * (max - min) + min)*10;
}

const food = new Food({ x: 10, y: 10 });
function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  snake.update();
  snake.draw();
  food.draw();
  if (snake.isAvailable(food.getPos())) {
    food.setPos({ x: randomNum(1,25), y: randomNum(1,25)})
    snake.addTail()
    food.draw()
  }
  setTimeout(() => {
    requestAnimationFrame(main);
  },250)
}

main()