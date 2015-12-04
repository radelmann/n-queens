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

  var finalBoard;
  var sBoard = [];
  for (var i = 0; i < n; i++) {
    sBoard.push(Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0));
  }
  var taken = [];

  function recCount(currRow, taken) {
    if (currRow === n) {
      // transofrom taken array into board
      finalBoard = _.map(taken, function(colIndex) {
        var newRow = [];
        for (var j = 0; j < n; j++) {
          if (j === colIndex) newRow.push(1);
          else newRow.push(0);
        }
        return newRow;
      });

    } else {
      sBoard[currRow].forEach(function(elem, i) {
        if (taken.indexOf(i) === -1) {
          recCount(currRow + 1, taken.concat(i));
        }
      });
    }

  }

  sBoard[0].forEach(function(elem, i) {
    recCount(1, taken.concat(i));
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(finalBoard));
  return finalBoard;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var sBoard = [];
  for (var i = 0; i < n; i++) {
    sBoard.push(Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0));
  }
  var taken = [];

  function recCount(currRow, taken) {
    if (currRow === n) {
      solutionCount++;
    } else {
      sBoard[currRow].forEach(function(elem, i) {
        if (taken.indexOf(i) === -1) {
          recCount(currRow + 1, taken.concat(i));
        }
      });
    }

  }

  sBoard[0].forEach(function(elem, i) {
    recCount(1, taken.concat(i));
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) return [];
  //if (n === 1) return [[1]];

  var myBoard = new Board({
    'n': n
  });

  var results = [];

  var recCall = function(rowIndex) {
    // base case 
    if (rowIndex === n) {
      results = [];
      myBoard.rows().forEach(function(row) {
        results.push(row.slice());
      });
    } else {
      // recursive case
      var nthRow = myBoard.rows()[rowIndex];

      nthRow.forEach(function(v, colIndex) {
        myBoard.togglePiece(rowIndex, colIndex);
        if (!(myBoard.hasAnyQueenConflictsOn(rowIndex, colIndex))) {
          recCall(rowIndex + 1);
        }
        myBoard.togglePiece(rowIndex, colIndex);
      });
    }
  };

  // recurse over first row.
  _.range(n).forEach(function(v, colIndex) {
    myBoard.togglePiece(0, colIndex);
    recCall(0 + 1);
    myBoard.togglePiece(0, colIndex);
  });

  if (results.length === 0) {
    var board = new Board({'n':n});
    myBoard.rows().forEach(function(row) {
        results.push(row.slice());
      });
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(results));

  return results;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) return 1;

  var myBoard = new Board({
    'n': n
  });

  var solutionCount = 0;

  var recCall = function(rowIndex) {
    // base case 
    if (rowIndex === n) {
      solutionCount++;
    } else {
      // recursive case
      var nthRow = myBoard.rows()[rowIndex];

      nthRow.forEach(function(v, colIndex) {
        myBoard.togglePiece(rowIndex, colIndex);
        if (!(myBoard.hasAnyQueenConflictsOn(rowIndex, colIndex))) {
          recCall(rowIndex + 1);
        }
        myBoard.togglePiece(rowIndex, colIndex);
      });
    }
  };

  var firstRow = myBoard.rows()[0];

  firstRow.forEach(function(v, colIndex) {
    myBoard.togglePiece(0, colIndex);
    recCall(0 + 1);
    myBoard.togglePiece(0, colIndex);
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};