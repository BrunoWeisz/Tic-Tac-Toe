let DisplayController = (function(document, console){
    const boardContainer = document.querySelector("#board-container");
    let gameboardElements = Array.from(document.querySelectorAll(".game-square"));
    let _turnDisplay = document.querySelector("#player");

    function renderGameboard(board){
        gameboardElements.forEach((square, index) => {
            square.innerHTML = board[index];
        })
    };

    function setMessage(aMessageToShow){
        _turnDisplay.textContent = aMessageToShow;
    }

    function alertInvalidMove(){
        alert("That square is already occupied! Try again");
    }

    function offerNewGame(){
        const newGameButton = document.createElement("button");
        newGameButton.id = "restart";
        newGameButton.textContent = "Restart Game";
        newGameButton.classList = "restart-button";
        newGameButton.addEventListener("click", (ev) => Round.restartGame());
        document.body.insertBefore(newGameButton, boardContainer);
    }

    function clearBoard(){
        gameboardElements.forEach(square => {
            square.innerHTML = "";
        })
        document.body.removeChild(document.querySelector("#restart"));
    }

    

    return {
        renderGameboard,
        setMessage,
        alertInvalidMove,
        gameboardElements,
        offerNewGame,
        clearBoard
    }

})(document, console);

let Round = (function(){
    let _gameEnded = false;
    let gameboard = ["", "", "", "", "", "", "", "", ""];;
    const _validWins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let _turn = "Player 1";

    function _renderGameboard(){
        DisplayController.renderGameboard(gameboard);
    }

    function _setMessage(aMessage){
        DisplayController.setMessage(aMessage)
    }

    function _alertInvalidMove(){
        DisplayController.alertInvalidMove();
    }

    function _checkForWin(){
        
        let result;
        let gameEnded = _validWins.find(pattern => {
            return  gameboard[pattern[0]] == gameboard[pattern[1]] &&
                    gameboard[pattern[0]] == gameboard[pattern[2]] &&
                    gameboard[pattern[0]] != "";
        });

        if (!gameEnded){
            gameEnded = gameboard.every((e)=> e != "");
            result = "it\'s a tie";
        } else {
            result = (_turn == "Player 1" ? "Player 2" : "Player 1") + " won.";
        }

        return [gameEnded, result];
    }

    function startGame(){
        console.log("game started");
        _setMessage("Player 1");
        DisplayController.gameboardElements.forEach((square, index) => {
            square.addEventListener("click", (ev) => {
                if (_gameEnded) {
                    alert("Game Already ended");
                    return;
                }
                if (gameboard[index] == ""){
                    gameboard[index] = _turn == "Player 1" ? "X" : "O";
                    _turn = _turn == "Player 1" ? "Player 2" : "Player 1";

                    let [ended, winner] = _checkForWin();
                    if (!ended){
                        _setMessage(_turn);
                    } else {
                        _setMessage("The game has ended, " + winner );
                        _gameOver();
                    }
                    console.log(gameboard);
                    _renderGameboard();
                } else {
                    _alertInvalidMove();
                }
            })
        })
    }

    function _gameOver(){
        _gameEnded = true;
        DisplayController.offerNewGame();
    }

    function _clearBoard(){
        DisplayController.clearBoard();
    }

    function restartGame(){
        _clearBoard();
        gameboard = ["", "", "", "", "", "", "", "", ""];
        _gameEnded = false;
        _turn = "Player 1";
        _renderGameboard();
        _setMessage(_turn);
        console.log("game restarted")
    }

    return {
        startGame,
        //gameboard,
        restartGame
    }

})();

Round.startGame();