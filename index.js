(function () {
  const gameBoard = {
    board_parent: document.querySelector(".gameboard"),
    playerDisplay: document.querySelector(".turns"),
    board_arr: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    gameover: false,
    player1: [],
    player2: [],

    init: function () {
      this.display();
      this.addEvent();
    },
    display: function () {
      for (let i = 0; i < 9; i++) {
        const newBtn = document.createElement("button");
        newBtn.classList.add(i);
        this.board_parent.appendChild(newBtn);
      }
    },
    addEvent: function () {
      const buttons = document.querySelectorAll("button");
      let isPlayer1 = false;
      buttons.forEach((element) => {
        element.addEventListener("click", () => {
          if (element.innerText != "") return;
          if (this.gameover) return;

          isPlayer1 = !isPlayer1;
          element.innerText = isPlayer1 ? "O" : "X";
          this.playerDisplay.innerText = isPlayer1 ? "Player1" : "Player2";

          const currentPlayer = this.playerDisplay.innerText;
          const buttonNumber = Number(element.className);
          this.record(currentPlayer, buttonNumber);
          isPlayer1
            ? this.checkWinner(this.player1, "Player1")
            : this.checkWinner(this.player2, "Player2");
        });
      });
    },
    record: function (player, btnNum) {
      if (player === "Player1") {
        this.player1.push(btnNum);
      } else {
        this.player2.push(btnNum);
      }
    },
    checkWinner: function (playerArr, player) {
      const win_arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      if (playerArr.length > 2) {
        win_arr.map((arr) => {
          const [a, b, c] = arr;
          if (
            playerArr.includes(a) &&
            playerArr.includes(b) &&
            playerArr.includes(c)
          ) {
            this.winnerMessage(player);
          }
        });
      }
    },
    winnerMessage: function (winner) {
      this.playerDisplay.innerText = `${winner} won!`;
      this.gameover = true;
    },
  };
  gameBoard.init();
})();
