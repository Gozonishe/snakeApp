import './snake.css'

export class Snake {
    constructor(){
      this.head = { 
        row: 0,
        col: 0
      }
      this.direction = {
        x: 0,
        y: 0
      }
      this.tail = []
    }

    //head attributes
    getHead() {
      return {
          row: this.head.row,
          col: this.head.col 
      }
    }
    setHead(xRow, yCol) {
      this.head.row = xRow
      this.head.col = yCol
    }

    //direction attributes
    getDirection() {
      return {
        x: this.direction.x,
        y: this.direction.y
      }
    }
    setDirection(xDir, yDir) {
      this.direction.x = xDir
      this.direction.y = yDir
    }

    //tail attridution
    getTail() {
      return {
        tail: []
      }
    }
}