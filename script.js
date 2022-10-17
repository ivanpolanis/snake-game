class Snake {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.size = 1;
    this.tail = [];
  }
  getPos() {
    return this.pos;
  }
  update() {
    this.tail.unshift(this.pos)
    this.tail.pop()
  }
}