const rowBoardInput = document.querySelector('.borderHeight')
const columnBoardInput = document.querySelector('.borderWidth')
const delayTimeInput = document.querySelector('.delay_time')
const gameBoardHtml = document.querySelector(".game-border");
const buttonStart = document.querySelector('.button-start');
const buttonEnd = document.querySelector('.button-end');
const buttonClear = document.querySelector('.button-clear');

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
function playGame() {
    if (!stillPLay) {
        return;
    }
    playCellBox = [...cards]
    const cardToBeAlive = []
    const cardToBeDead = []
    let score = 0
    const newArray = [];
    let currentRow = [];
    for (let i = 0; i < playCellBox.length; i++) {
        currentRow.push([
            playCellBox[i].dataset.row,
            playCellBox[i].dataset.cell,
            playCellBox[i].classList.value
        ]);
        if (currentRow.length === parseInt(columnBoard)) {
            newArray.push(currentRow);
            currentRow = [];
        }
    }
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray[i].length; j++) {
            const status = newArray[i][j][2]
            const directions = [
                { row: i - 1, cell: j - 1 },
                { row: i - 1, cell: j },
                { row: i - 1, cell: j + 1 },
                { row: i, cell: j - 1 },
                { row: i, cell: j + 1 },
                { row: i + 1, cell: j - 1 },
                { row: i + 1, cell: j },
                { row: i + 1, cell: j + 1 }
            ];
            directions.forEach(direction => {
                const { row, cell } = direction;
                if (newArray[row] && newArray[row][cell] && newArray[row][cell][2] === "alive") {
                    console.log("zyjąca komórka",newArray[row][cell])
                    score++;
                }
                if (!(newArray[row] && newArray[row][cell])) {
                    console.log("komórka nie istnieje",row,cell)
                }
            });
            console.log("wynik:", score)
            if ((status === "alive" && score >= 2 && score <= 3) || (status === "dead" && score === 3)) {
                cardToBeAlive.push(newArray[i][j]);
            } else {
                cardToBeDead.push(newArray[i][j])
            }
            score = 0;
        }

    }

    console.log("cardtobealive",cardToBeAlive)
    console.log("cardtobeadeath",cardToBeDead)

    cardToBeAlive.forEach(card => {
        let testcard = document.querySelector(`[data-row="${card[0]}"][data-cell="${card[1]}"]`)
        // console.log("testcard:",testcard)
        testcard.classList.replace("dead", "alive")
    })
    cardToBeDead.forEach(card => {
        let testcardx = document.querySelector(`[data-row="${card[0]}"][data-cell="${card[1]}"]`)
        testcardx.classList.replace("alive", "dead")
    })
    if (cardToBeAlive.length === 0) {
        stillPLay = false;
        endGame()
    }
    setTimeout(playGame, delayTime);
}


function endGame() {
    stillPLay = false;
    console.log("end game")
    buttonStart.style.display= "block"
    buttonEnd.style.display= "none"
    playCellBox.forEach(cell =>{
        cell.classList.replace("alive", "dead");
    })
}

function clearGame(){
    cards.forEach(cell =>{
        cell.classList.replace("alive", "dead");
    })
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
buttonClear.addEventListener('click', clearGame);


