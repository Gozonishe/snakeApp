import './grid.css'

export class Grid {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.grid = []
    this.create(height, width)
  }

  setGrid(grid) {
    this.grid = []
    this.grid = grid
  }

  getGrid() {
    return this.grid
  }

  create(height, width) {
    const grid = []
    for (let row = 0; row < height; row++) {
      const colums = []
      for (let col = 0; col < width; col++) {
        colums.push({
          row,
          col
        });
      }
      grid.push(colums);
    }
    this.setGrid(grid)
    return grid
  }
}