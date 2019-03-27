export class Apple {
  constructor() {
    this.x = 0
    this.y = 0
  }

  getApple() {
    return {
      x: this.x,
      y: this.y      
    }
  }

  setApple(posX, posY) {
    this.x = posX
    this.y = posY
  }

  setRandomApple(from, to) {
    const x = Math.floor(Math.random() * (to - from + 1) + from)
    const y = Math.floor(Math.random() * (to - from + 1) + from)
    this.setApple(x, y)
    return this
  }

  isApple (row, col) {
    return this.x === row && this.y === col;
  }

  isCrossTheApple(snake) {
    return this.x === snake.head.row && this.y === snake.head.col;
  }

  getRandomApple = () => {
    const { snake } = this.state;
    const newApple = this.apple.setRandomApple(0,19);
    if (this.isTail(newApple) || (
      snake.head.row === newApple.row
      && snake.head.col === newApple.col)) {
      return this.apple.getRandomApple();
    } else {
      return newApple;
    }
  }
}