import './grid .css'

const grid = []

for (let row = 0; row < 20; row++) {
  const colums = []
  for (let col = 0; col < 20; col++) {
    colums.push({
      row,
      col
    });
  }
  grid.push(colums);
}

export default grid;