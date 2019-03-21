import './apple.css'

export class Apple {
  constructor() {
    this.create()
  }

//   setApple(grid) {
//     this.grid = []
//     this.grid = grid
//   }

  getApple() {
    return this.create()
  }

  create() {
    return {
        row: Math.round(Math.random() * 19),
        col: Math.round(Math.random() * 19),
      }
  }
}




export function getRandomPositionApple() {
    return {
        row: Math.round(Math.random() * 19),
        col: Math.round(Math.random() * 19),
      }
}

export function isApple(apple, square) {
    return apple.row === square.row && apple.col === square.col;
}

export function isCrossTheApple(apple, snake) {
    return apple.row === snake.head.row && apple.col === snake.head.col;
}

