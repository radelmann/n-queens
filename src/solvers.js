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
  
  var sBoard = [];
  for (var i = 0; i < n; i++) {
    sBoard.push( Array.apply(null, Array(n)).map(Number.prototype.valueOf,0) );
  }
  var taken = {};
  var rooks = 0;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (!(j in taken)) {
        sBoard[i][j] = 1;
        taken[j] = true;
        rooks++;
        if (rooks===n) return sBoard;
        break;
      }
    };
  };

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(sBoard));
  return false;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var sBoard = [];
  for (var i = 0; i < n; i++) {
    sBoard.push( Array.apply(null, Array(n)).map(Number.prototype.valueOf,0) );
  }
  var taken = [];

  function recCount(currRow, taken){
    if (currRow === n) {
      solutionCount++;
    } else {
      sBoard[currRow].forEach(function(elem, i){
        if (taken.indexOf(i) === -1){
          recCount(currRow+1, taken.concat(i));
        }
      });
    }

  }
  
  sBoard[0].forEach(function(elem, i){
    recCount(1, taken.concat(i));
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
