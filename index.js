"use strict";

const scoreField = document.getElementById("score");

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const lizard = document.getElementById("lizard");
const spock = document.getElementById("spock");
const validMoves = [rock, paper, scissors, lizard, spock];

const homePage = document.getElementById("page-1");
const movePage = document.getElementById("page-2");
const playerMoveContainer = document.getElementById("playerMoveContainer");
const computerMoveContainer = document.getElementById("computerMoveContainer");

window.addEventListener("load", () => {
  if (localStorage.score) {
    scoreField.innerHTML = JSON.parse(localStorage.score);
  }
});

openModal.addEventListener("click", () => {
  modal.showModal();
});
closeModal.addEventListener("click", () => {
  modal.close();
});

for (let i = 0; i < validMoves.length; i++) {
  validMoves[i].addEventListener("click", () => {
    const playerMove = validMoves[i];
    homePage.style.display = "none";
    playerMoveContainer.appendChild(validMoves[i].cloneNode(true));

    const playerMoveComment = document.createElement("p");
    playerMoveComment.className = "comment";
    playerMoveComment.innerHTML = "you picked";

    playerMoveContainer.insertBefore(
      playerMoveComment,
      playerMoveContainer.lastElementChild
    );

    const computerMove = validMoves[Math.floor(Math.random() * 5)];
    computerMoveContainer.appendChild(computerMove.cloneNode(true));

    const computerMoveComment = document.createElement("p");
    computerMoveComment.className = "comment";
    computerMoveComment.innerHTML = "the house picked";
    computerMoveContainer.insertBefore(
      computerMoveComment,
      computerMoveContainer.lastElementChild
    );

    gameResults(decideResult(playerMove, computerMove));
  });
}

function decideResult(player, computer) {
  // KEY
  // pWins is set to true if the player wins the computer
  // pWins is set to false the computer wins the player
  // pWins is set to null if it is a tie

  let pWins = null;
  let action = null;

  if (player == rock) {
    switch (computer) {
      case scissors:
        pWins = true;
        break;
      case lizard:
        pWins = true;
        break;
      case rock:
        pWins = null;
        break;
      default:
        pWins = false;
    }
  }

  if (player == paper) {
    switch (computer) {
      case rock:
        pWins = true;
        break;
      case spock:
        pWins = true;
        break;
      case paper:
        pWins = null;
        break;
      default:
        pWins = false;
    }
  }
  if (player == scissors) {
    switch (computer) {
      case paper:
        pWins = true;
        break;
      case lizard:
        pWins = true;
        break;
      case scissors:
        pWins = null;
        break;
      default:
        pWins = false;
    }
  }

  if (player == lizard) {
    switch (computer) {
      case paper:
        pWins = true;
        break;
      case spock:
        pWins = true;
        break;
      case lizard:
        pWins = null;
        break;
      default:
        pWins = false;
    }
  }

  if (player == spock) {
    switch (computer) {
      case scissors:
        pWins = true;
        break;
      case rock:
        pWins = true;
        break;
      case spock:
        pWins = null;
        break;
      default:
        pWins = false;
    }
  }

  const contenders = [player, computer];

  let resultComment = null;
  if (pWins) {
    resultComment = `${player.id} ${computeWinAction(contenders).activeVoice} ${
      computer.id
    }`;
  } else if (pWins == null) {
    resultComment = null;
  } else {
    resultComment = `${player.id} ${
      computeWinAction(contenders).passiveVoice
    } ${computer.id}`;
  }

  const result = { isPlayerWinner: pWins, comment: resultComment };
  console.log(result);

  return result;
}

function gameResults(result) {
  if (result.isPlayerWinner === true) {
    toggleResultContainer("you win", result.comment);
    updateScore();
  } else if (result.isPlayerWinner === null) {
    toggleResultContainer("its a tie", result.comment);
  } else {
    toggleResultContainer("you loose", result.comment);
  }
}
function toggleResultContainer(result, comment) {
  const resultsContainer = document.createElement("div");
  resultsContainer.className = "game-results";

  const resultTextContainer = document.createElement("p");
  resultTextContainer.innerHTML = result;

  const resultCommentContainer = document.createElement("p");
  resultCommentContainer.className = "comment";
  resultCommentContainer.innerHTML = comment;

  const playAgainBtn = document.createElement("button");
  playAgainBtn.setAttribute("onclick", "location.reload()");
  playAgainBtn.innerHTML = "play again";

  resultsContainer.appendChild(resultTextContainer);
  resultsContainer.appendChild(resultCommentContainer);
  resultsContainer.appendChild(playAgainBtn);

  if (matchMedia("(max-width: 768px)").matches) {
    document
      .getElementsByTagName("main")[0]
      .insertBefore(
        resultsContainer,
        document.getElementsByTagName("main")[0].lastElementChild
      );
  } else {
    movePage.insertBefore(resultsContainer, movePage.lastElementChild);
  }
}

function updateScore() {
  let score = 0;
  if (localStorage.score) {
    score = JSON.parse(localStorage.score);
  }
  score++;
  localStorage.score = JSON.stringify(score);

  scoreField.innerHTML = score;
}

function computeWinAction(contenders) {
  let winAction = {};
  if (
    contenders.includes(rock) &&
    (contenders.includes(scissors) || contenders.includes(lizard))
  ) {
    winAction.activeVoice = "crushes";
    winAction.passiveVoice = "is crushed by";
  }
  if (contenders.includes(paper) && contenders.includes(rock)) {
    winAction.activeVoice = "covers";
    winAction.passiveVoice = "is covered by";
  }
  if (contenders.includes(paper) && contenders.includes(spock)) {
    winAction.activeVoice = "disproves";
    winAction.passiveVoice = "is disproved by";
  }
  if (contenders.includes(scissors) && contenders.includes(paper)) {
    winAction.activeVoice = "cuts";
    winAction.passiveVoice = "is cut by";
  }
  if (contenders.includes(scissors) && contenders.includes(lizard)) {
    winAction.activeVoice = "decapitates";
    winAction.passiveVoice = "is decapitated by";
  }
  if (contenders.includes(lizard) && contenders.includes(paper)) {
    winAction.activeVoice = "eats";
    winAction.passiveVoice = "is eaten by";
  }
  if (contenders.includes(lizard) && contenders.includes(spock)) {
    winAction.activeVoice = "poisons";
    winAction.passiveVoice = "is poisoned by";
  }
  if (contenders.includes(spock) && contenders.includes(scissors)) {
    winAction.activeVoice = "smashes";
    winAction.passiveVoice = "is smashed by";
  }
  if (contenders.includes(spock) && contenders.includes(rock)) {
    winAction.activeVoice = "disintegrates";
    winAction.passiveVoice = "is disintegrated by";
  }

  return winAction;
}

//   ||TODO:
// 1. get valid moves with an array instead , store each item in this array with a variable  (hint:array mapping method):
//
// const movesId = ["rock", "paper", "scissors", "lizard", "spock"];
// movesId.forEach(function (id) {
//   movesId[id] = document.getElementById[id];
// });
// const validMoves = movesId;
//            OR
// const validMoves = document.getElementsByClassName("move-container");
//  then map each item in the array to a variable

// 2. write a function to handle all comments:
//
// function comment(type, container, recipient) {
//   switch (type) {
//     case "player":
//       const playerMoveComment = document.createElement("p");
//       playerMoveComment.className = "comment";
//       playerMoveComment.innerHTML = `you picked ${recipient}`;
//       container.insertBefore(playerMoveComment, container.lastElementChild);
//       break;
//     case "computer":
//       const computerMoveComment = document.createElement("p");
//       computerMoveComment.className = "comment";
//       computerMoveComment.innerHTML = `the house picked ${recipient}`;
//       container.insertBefore(computerMoveComment, container.lastElementChild);
//       break;
//   }
// }

// 3. improve the comment message:
//
// computerMoveComment.innerHTML = `the house picked ${computerMove.id}`;
// // playerMoveComment.innerHTML = `you picked ${playerMove.id}`;

// 4. wavy glow to move button, enlarge move button, reposition the move page

// 5. ensure each element has a unique id (issue arose as a result of cloning)

// 6. add animation to the computer move selection process

// 7. optimize code to eliminate unnecessary if else and switches

// 8. add disable tie function

// 9. add reset score function

// 10. rewrite the play again function to avoid reloading the page

// 11.make every function proceed in an async other to make the program more suspenseful

// 12. add offline web application storage

// 13. add animation or images for win action

// 14. ensure backwards compatibility for older browsers {dialog element,local storage --> cookies}

//
//
//
//
//  || KEY LESSONS LEARNT:
// 1. JSON makes a convenient encoding for any primitive or data structure:
//
// score = parseInt(localStorage.score);
//      vs
// localStorage.score = JSON.stringify(score);
// score = JSON.parse(localStorage.score);

// 2. the computerMove node is cloned before appending because cloning the node leaves out all event listeners
