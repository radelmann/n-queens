/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var board = new Board({
    n: n
  });

  var solutionCount = 0;

  var validBoard;

  var findSolution = function(rowIndex) {
    rowIndex = (rowIndex === undefined) ? 0 : rowIndex;

    if (rowIndex === n) {
      solutionCount++;
      validBoard = _.map(board.rows(), function(row) {
        return row.slice();
      });
      return;
    }

    //traverse cols for this row
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasAnyRooksConflicts()) {
        findSolution(rowIndex + 1);
        if (solutionCount > 0) return;
      }
      board.togglePiece(rowIndex, colIndex);
    };
  }

  findSolution();

   if (validBoard === undefined) {
    validBoard = _.map(new Board({
      n: n
    }).rows(), function(row) {
      return row.slice();
    });
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(validBoard));
  return validBoard;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({
    n: n
  });

  var solutionCount = 0;

  var findSolution = function(rowIndex) {
    rowIndex = (rowIndex === undefined) ? 0 : rowIndex;
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    //traverse cols for this row
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasAnyRooksConflicts()) {
        findSolution(rowIndex + 1);
      }
      board.togglePiece(rowIndex, colIndex);
    };
  }

  findSolution();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({
    n: n
  });

  var solutionCount = 0;

  var validBoard;

  var findSolution = function(rowIndex) {
    rowIndex = (rowIndex === undefined) ? 0 : rowIndex;

    if (rowIndex === n) {
      solutionCount++;
      validBoard = _.map(board.rows(), function(row) {
        return row.slice();
      });
      return;
    }

    //traverse cols for this row
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasAnyQueensConflicts()) {
        findSolution(rowIndex + 1);
        if (solutionCount > 0) return;
      }
      board.togglePiece(rowIndex, colIndex);
    };
  }

  findSolution();

  if (validBoard === undefined) {
    validBoard = _.map(new Board({
      n: n
    }).rows(), function(row) {
      return row.slice();
    });
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(validBoard));
  return validBoard;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({
    n: n
  });

  var solutionCount = 0;

  var findSolution = function(rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    //traverse cols for this row
    var row = board.rows()[rowIndex];
    for (var colIndex = 0; colIndex < row.length; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasAnyQueensConflicts()) {
        findSolution(rowIndex + 1);
      }
      board.togglePiece(rowIndex, colIndex);
    };
  }

  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
