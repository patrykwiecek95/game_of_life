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
let delayTime =1000/delayTimeInput.value;
let playCellBox;
let stillPLay;
let cards;

const createBoard = (rows, columns) => {
    const boardHtml = document.createElement("div");
    gameBoardHtml.innerHTML = ""
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
    gameBoardHtml.appendChild(boardHtml);
};

function setSizeBorder(){
    rowBoard = rowBoardInput.value
    columnBoard = columnBoardInput.value
    createBoard(rowBoard, columnBoard);
    cards = document.querySelectorAll('.dead');
    cards.forEach(card => {
        card.addEventListener('click', clickCard);
    });
}


function setDelay(){
    delayTime = 1000/delayTimeInput.value
}
function clickCard(element) {
    console.log("clickCard")
    aliveCell = this;
    if(aliveCell.className === "alive"){
        aliveCell.classList.replace("alive", "dead");
        return;
    }
    if (aliveCell.className === "dead") {
        aliveCell.classList.replace("dead", "alive");
    }
}
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
            const directions = [
                { row: numberRow - 1, cell: numberCell - 1 },
                { row: numberRow - 1, cell: numberCell },
                { row: numberRow - 1, cell: numberCell + 1 },
                { row: numberRow, cell: numberCell - 1 },
                { row: numberRow, cell: numberCell + 1 },
                { row: numberRow + 1, cell: numberCell - 1 },
                { row: numberRow + 1, cell: numberCell },
                { row: numberRow + 1, cell: numberCell + 1 }
            ];
            directions.forEach(direction => {
                const { row, cell } = direction;
                const neighbor = document.querySelector(`[data-row="${row}"][data-cell="${cell}"]`);
                if (neighbor && neighbor.classList.contains("alive")) {
                    score++;
                }
            });

            if ((card.classList.contains("alive") && score >= 2 && score <= 3) || (card.classList.contains("dead") && score === 3)) {
                cardToBeAlive.push(card);
            } else {
                cardToBeDead.push(card)}

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
    buttonStart.style.display= "block"
    buttonEnd.style.display= "none"
    console.log(playCellBox)
    playCellBox.forEach(cell =>{
        cell.classList.replace("alive", "dead");
    })
    console.log(playCellBox)
}


createBoard(rowBoard, columnBoard)
cards = document.querySelectorAll('.dead');




delayTimeInput.addEventListener("change", setDelay);
cards.forEach(card => {
    card.addEventListener('click', clickCard);
});
rowBoardInput.addEventListener("change", setSizeBorder);
columnBoardInput.addEventListener("change", setSizeBorder)
buttonStart.addEventListener('click', startGame);
buttonEnd.addEventListener('click', endGame);


