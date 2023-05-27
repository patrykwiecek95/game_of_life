const rowBoardInput = document.querySelector('.borderHeight')
const columnBoardInput = document.querySelector('.borderWidth')
const delayTimeInput = document.querySelector('.delay_time')
const gameBoardHtml = document.querySelector(".game-border");
const buttonStart = document.querySelector('.button-start');
const buttonEnd = document.querySelector('.button-end');

let aliveCell;
let rowBoard = rowBoardInput.value;
let columnBoard = columnBoardInput.value;
let board;
let delayTime =delayTimeInput.value;
let playCellBox;
let stillPLay;


const createBoard = (rows, columns) => {
    const boardHtml = document.createElement("div");
    boardHtml.classList.add("board");
    for (let i = 1; i <= rows; i++) {
        // row columns
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 1; j <= columns; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-cell", j);
            cell.classList.add("dead");
            row.appendChild(cell);
        }
        boardHtml.appendChild(row);
    }
    return boardHtml;
};

board = createBoard(rowBoard, columnBoard);
gameBoardHtml.appendChild(board);
function setSizeBorder(){
    const element = document.querySelector(".board");
    element.remove()
    rowBoard = rowBoardInput.value
    columnBoard = columnBoardInput.value
    console.log("height: ",rowBoard, "width: ", columnBoard)
    board = createBoard(rowBoard, columnBoard);
    gameBoardHtml.appendChild(board);
    console.log("cards!!!!!!!!!!!!",cards)
    // endGame();

}
function setDelay(){
    delayTime = delayTimeInput.value
}



function clickCard(element) {
    aliveCell = this;
    if(aliveCell.className === "alive"){
        aliveCell.classList.replace("alive", "dead");
        return;
    }
    if (aliveCell.className === "dead") {
        aliveCell.classList.replace("dead", "alive");
    }
}

const cards = document.querySelectorAll('.dead');
function startGame() {
        stillPLay =true;
        buttonStart.style.display = "none"
        buttonEnd.style.display = "block"
        playGame()
}

function playGame(){
    if(stillPLay) {
        playCellBox = [...cards]
        const cardToBeAlive = []
        const cardToBeDead = []
        playCellBox.forEach(card => {
            let score = 0;
            const numberRow = parseInt(card.dataset.row);
            const numberCell = parseInt(card.dataset.cell);
            let number1 = `[data-row="${numberRow - 1}"][data-cell="${numberCell - 1}"]`;
            let number2 = `[data-row="${numberRow - 1}"][data-cell="${numberCell}"]`;
            let number3 = `[data-row="${numberRow - 1}"][data-cell="${numberCell + 1}"]`;
            let number4 = `[data-row="${numberRow}"][data-cell="${numberCell - 1}"]`;
            let number5 = `[data-row="${numberRow}"][data-cell="${numberCell + 1}"]`;
            let number6 = `[data-row="${numberRow + 1}"][data-cell="${numberCell - 1}"]`
            let number7 = `[data-row="${numberRow + 1}"][data-cell="${numberCell}"]`
            let number8 = `[data-row="${numberRow + 1}"][data-cell="${numberCell + 1}"]`

            //-------------------------------------------------------------------------
            // make it simpler
            // for (let i = 1; i <= 8; i++) {
            //     let element = number${i}
            //     let checkingCard = document.querySelector(element);
            //     console.log("checking card:",checkingCard)
            //     let card1 = document.querySelector(number1);
            //     console.log("card1:",card1)
            //     if (checkingCard && checkingCard.className === "alive") {
            //         score += 1;
            //     }
            // }
            // if ((card.className === "alive" && score >= 2 && score <= 3) || (card.className === "dead" && score === 3)) {
            //     cardToBeAlive.push(card);
            // } else {
            //     cardToBeDead.push(card);
            // }
            //-------------------------------------------------------------------------

            let card1 = document.querySelector(number1);
            let card2 = document.querySelector(number2);
            let card3 = document.querySelector(number3);
            let card4 = document.querySelector(number4);
            let card5 = document.querySelector(number5);
            let card6 = document.querySelector(number6);
            let card7 = document.querySelector(number7);
            let card8 = document.querySelector(number8);

            if (card1 && card1.className === "alive") {
                score += 1;
            }
            if (card2 && card2.className === "alive") {
                score += 1;
            }
            if (card3 && card3.className === "alive") {
                score += 1;
            }
            if (card4 && card4.className === "alive") {
                score += 1;
            }
            if (card5 && card5.className === "alive") {
                score += 1;
            }
            if (card6 && card6.className === "alive") {
                score += 1;
            }
            if (card7 && card7.className === "alive") {
                score += 1;
            }
            if (card8 && card8.className === "alive") {
                score += 1;
            }
            if ((card.className === "alive" && score >= 2 && score <= 3) || (card.className === "dead" && score === 3)) {
                cardToBeAlive.push(card)
            } else {
                cardToBeDead.push(card)
            }
        })
        cardToBeAlive.forEach(card => {
            card.classList.replace("dead", "alive")
        })
        cardToBeDead.forEach(card => {
            card.classList.replace("alive", "dead")
        })
        if (cardToBeAlive.length === 0){
            stillPLay =false;
            endGame()
        }
        setTimeout(playGame, delayTime);
    }
}
function endGame() {
    stillPLay = false;
    console.log("end game")
    // playCellBox = [...cards]
    buttonStart.style.display= "block"
    buttonEnd.style.display= "none"
    console.log(playCellBox)
    playCellBox.forEach(cell =>{
        cell.classList.replace("alive", "dead");
    })
    console.log(playCellBox)
}

delayTimeInput.addEventListener("change", setDelay);
cards.forEach(card => {
    card.addEventListener('click', clickCard);
});
rowBoardInput.addEventListener("change", setSizeBorder);
columnBoardInput.addEventListener("change", setSizeBorder)
buttonStart.addEventListener('click', startGame);
buttonEnd.addEventListener('click', endGame);


