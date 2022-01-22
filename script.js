let DisplayController = (function(){
    
})();

let Round = (function(document, console){
    let _gameboard = ["", "", "", "", "", "", "", "", ""];
    let _gameboardElements = Array.from(document.querySelectorAll(".game-square"));
    let _turnDisplay = document.querySelector("#player");
    let _turn = "Player 1";

    function _renderGameboard(){
        _gameboardElements.forEach((square, index) => {
            square.textContent = _gameboard[index];
        })
    };

    function startGame(){
        console.log("game started");
        _turnDisplay.textContent = "Player 1";
        _gameboardElements.forEach((square, index) => {
            square.addEventListener("click", (ev) => {
                if (_gameboard[index] == ""){
                    _gameboard[index] = _turn == "Player 1" ? "X" : "O";
                    _turn = _turn == "Player 1" ? "Player 2" : "Player 1";
                    _turnDisplay.textContent = _turn;
                    _renderGameboard();
                } else {
                    alert("That square is already occupied! Try again");
                }
                
            })
        })
    }

    return {
        startGame
    }

})(document, console);

Round.startGame();