const container = document.querySelector(".container")
function createInputs() {
  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      let input = document.createElement("input");
      input.min = "1";
      input.max = "9";
      input.type = "number"
      container.append(input)
    }    
  }
}
createInputs()
const inputs = document.querySelectorAll("input");
const solve = document.querySelector(".solve");
const restart = document.querySelector(".restart");

let board = generate()
function solveSudoku(board) {
  // check empty square
  const [row, col] = checkEmpty(board)
  
  // base case
  if(row === -1 && col === -1) {
    return true
  }
  
  for(let num = 1; num <= 9; num++) {
    //3 function
      if(checkRow(board, row, num) &&
       checkCol(board, col, num) &&
       checkGrid(board, row, col, num)
      ) {
      board[row][col] = num
        if(solveSudoku(board)) {
        return true
      }
      board[row][col] = 0;
    }
  }  
  return false
}

function checkRow(board, row, num) {
  for(let col = 0; col < 9; col++) {
    if(board[row][col] === num) {
      return false
    }
  }
  return true
}

function checkCol(board, col, num) {
  for(let row = 0; row < 9; row++) {
    if(board[row][col] === num) {
      return false
    }
  }
  return true
}

function checkGrid(board, row, col, num) {
  let startRow = Math.floor(row / 3) * 3
  let startCol = Math.floor(col / 3) * 3
  
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(board[i + startRow][j + startCol] == num) {
        return false
      }   
    }
  }
  return true
} 

function checkEmpty(board) {
  for(let row = 0; row < 9; row++) {
    for(let col = 0; col < 9; col++) {
      if(board[row][col] === 0) {
        return [row, col]
      }
    }
  }
  return [-1, -1]
}

function generate() {
  return [0,0,0,0,0,0,0,0,0]
    .map(item => {
    return [0,0,0,0,0,0,0,0,0]
  })
}

inputs.forEach((input, i) => {
  input.addEventListener("input", () => {
    let row = Math.floor(i / 9);
    let col = i % 9
    board[row][col] = parseInt(input.value) || 0
  })
})

solve.addEventListener("click", () => {
  if(solveSudoku(board)) {
    inputs.forEach((input, i) => {
      let row = Math.floor(i / 9);
      let col = i % 9
      input.value = board[row][col]
    })
  } else {
    alert("no solution for this puzzle")
  }
})

restart.addEventListener("click", () => {
  inputs.forEach(input => {
      input.value = ""
      board = generate()
    })
})