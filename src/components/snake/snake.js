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
      return this.head
    }
    setHead(row, col) {
      this.head = {
        row,
        col,
      }
      return this
    }

    //direction attributes
    getDirection() {
      return this.direction
    }
    setDirection(x, y) {
      this.direction = {
        x,
        y,
      }
      return this
    }

    //tail attridution
    getTail() {
      return this.tail
    }
    setTail(tail) {
      if (Array.isArray(tail)) {
        this.tail = tail
        return this
      } else {
        console.error('the tail is not an array')
      }
    }
}