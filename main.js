let  idFactor = 0
const createBoard = (rows, cells) => {
    idFactor = cells
    console.log(idFactor)
    const boardHtml = document.createElement("div");
    boardHtml.classList.add("board");
    let count = 0;
    for (let i = 1; i <= rows; i++) {
        // row cells
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 1; j <= cells; j++) {
            const cell = document.createElement("div");
            count +=1
            cell.innerText = `${count}`
            cell.id = `${count}`;
            cell.setAttribute("data-row", j);
            cell.classList.add("dead");
            row.appendChild(cell);
        }
        boardHtml.appendChild(row);
    }
    return boardHtml;
};

const gameBoardHtml = document.querySelector(".game-border");
const board = createBoard(10, 10);
gameBoardHtml.appendChild(board);


let aliveCard;
let aliveCardsBox =  [];

const cards = document.querySelectorAll('.dead');
const buttonStart = document.querySelector('.button-start');
function clickCard(element) {
    aliveCard = this;
    const number = aliveCard.id
    if (aliveCardsBox.includes(number)) {
        return;
    }
    // aliveCard.className.add('alive');
    aliveCard.classList.replace("dead", "alive");
    aliveCardsBox.push(number)

}

function startGame() {
    const newCardBox  = [...cards]
    newCardBox.forEach(card => {
        const numberRow = card.dataset.row;

        let idCard = parseInt(card.id);
        let number1 = (idCard - idFactor - 1).toString();
        let number2 = (idCard - idFactor).toString();
        let number3 = (idCard - idFactor + 1).toString();
        let number4 = (idCard - 1).toString();
        let number5 = (idCard + 1).toString();
        let number6 = (idCard + idFactor - 1).toString();
        let number7 = (idCard + idFactor).toString();
        let number8 = (idCard + idFactor + 1).toString();

        if (card.className === "alive") {
            console.log(numberRow)
            console.log(document.getElementById(number1))
            console.log(document.getElementById(number2))
            console.log(document.getElementById(number3))
            console.log(document.getElementById(number4))
            console.log(document.getElementById(number5))
            console.log(document.getElementById(number6))
            console.log(document.getElementById(number7))
            console.log(document.getElementById(number8))
        }
    })
}




cards.forEach(card => {
    card.addEventListener('click', clickCard);
});

buttonStart.addEventListener('click', startGame);


