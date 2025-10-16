function parseMatrix(text) {
  return text.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
}

function displayResult(matrix) {
  if (typeof matrix === 'number') {
    document.getElementById('result').innerHTML = `Result: ${matrix}`;
  } else {
    document.getElementById('result').innerHTML = `<pre>${matrix.map(r => r.join(' ')).join('\n')}</pre>`;
  }
}

function addMatrix() {
  const A = parseMatrix(document.getElementById('matrixA').value);
  const B = parseMatrix(document.getElementById('matrixB').value);
  const result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
  displayResult(result);
}

function subtractMatrix() {
  const A = parseMatrix(document.getElementById('matrixA').value);
  const B = parseMatrix(document.getElementById('matrixB').value);
  const result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
  displayResult(result);
}

function multiplyMatrix() {
  const A = parseMatrix(document.getElementById('matrixA').value);
  const B = parseMatrix(document.getElementById('matrixB').value);
  const result = Array.from({ length: A.length }, () => Array(B[0].length).fill(0));
  
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < B.length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  displayResult(result);
}

function determinant(matrix) {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];
  
  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
    det += ((i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix));
  }
  return det;
}

function determinantMatrix(matrixName) {
  const matrix = parseMatrix(document.getElementById(`matrix${matrixName}`).value);
  const det = determinant(matrix);
  displayResult(det);
}

function transposeMatrix(matrixName) {
  const matrix = parseMatrix(document.getElementById(`matrix${matrixName}`).value);
  const result = matrix[0].map((_, i) => matrix.map(row => row[i]));
  displayResult(result);
}
