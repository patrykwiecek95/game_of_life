let aliveCard;
let aliveCardsBox =  [];


const createBoard = (rows, cells) => {
    const boardHtml = document.createElement("div");
    boardHtml.classList.add("board");
    let countId = 0;
    for (let i = 1; i <= rows; i++) {
        // row cells
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 1; j <= cells; j++) {
            const cell = document.createElement("div");
            countId +=1
            // cell.innerText = `${count}`
            // cell.innerText = `${i},${j}`
            cell.id = `${countId}`;
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-cell", j);
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




const cards = document.querySelectorAll('.dead');
const buttonStart = document.querySelector('.button-start');
const buttonEnd = document.querySelector('.button-end');
function clickCard(element) {
    aliveCard = this;
    const number = aliveCard.id
    if (aliveCardsBox.includes(number)) {
        return;
    }
    aliveCard.classList.replace("dead", "alive");
    aliveCardsBox.push(number)
}

function startGame() {
    buttonStart.style.display= "none"
    buttonEnd.style.display= "block"

    const newCardBox  = [...cards]
    const cardToBeAlive = []
    const cardToBeDead = []
    newCardBox.forEach(card => {
        let score = 0;
        const numberRow =parseInt(card.dataset.row);
        const numberCell = parseInt(card.dataset.cell);
        let number1 = `[data-row="${numberRow-1}"][data-cell="${numberCell-1}"]`;
        let number2 = `[data-row="${numberRow-1}"][data-cell="${numberCell}"]`;
        let number3 = `[data-row="${numberRow-1}"][data-cell="${numberCell+1}"]`;
        let number4 = `[data-row="${numberRow}"][data-cell="${numberCell-1}"]`;
        let number5 = `[data-row="${numberRow}"][data-cell="${numberCell+1}"]`;
        let number6 = `[data-row="${numberRow+1}"][data-cell="${numberCell-1}"]`
        let number7 = `[data-row="${numberRow+1}"][data-cell="${numberCell}"]`
        let number8 = `[data-row="${numberRow+1}"][data-cell="${numberCell+1}"]`


        for (let i = 1; i <= 8; i++) {
            let element = number${i}
            let checkingCard = document.querySelector(element);
            console.log("checking card:",checkingCard)
            let card1 = document.querySelector(number1);
            console.log("card1:",card1)
            if (checkingCard && checkingCard.className === "alive") {
                score += 1;
            }
        }
        if ((card.className === "alive" && score >= 2 && score <= 3) || (card.className === "dead" && score === 3)) {
            cardToBeAlive.push(card);
        } else {
            cardToBeDead.push(card);
        }

        //-------------------------------------------------------------------------
        // let card1 = document.querySelector(number1);
        // let card2 = document.querySelector(number2);
        // let card3 = document.querySelector(number3);
        // let card4 = document.querySelector(number4);
        // let card5 = document.querySelector(number5);
        // let card6 = document.querySelector(number6);
        // let card7 = document.querySelector(number7);
        // let card8 = document.querySelector(number8);
        //
        //
        // if (card1 && card1.className === "alive") {
        //     score +=1;
        // }
        // if (card2 && card2.className === "alive") {
        //     score +=1;
        // }
        // if (card3 && card3.className === "alive") {
        //     score +=1;
        // }
        // if (card4 && card4.className === "alive") {
        //     score +=1;
        // }
        // if (card5 && card5.className === "alive") {
        //     score +=1;
        // }
        // if (card6 && card6.className === "alive") {
        //     score +=1;
        // }
        // if (card7 && card7.className === "alive") {
        //     score +=1;
        // }
        // if (card8 && card8.className === "alive") {
        //     score +=1;
        // }
        // if ((card.className === "alive" && score >= 2 && score <= 3) || (card.className === "dead" && score === 3)){
        //     console.log("score: ",score)
        //     cardToBeAlive.push(card)
        // } else {
        //     cardToBeDead.push(card)
        // }

    })

    cardToBeAlive.forEach(card => {
        card.classList.replace("dead", "alive")
    })
    cardToBeDead.forEach(card => {
        card.classList.replace("alive","dead" )
    })
    // setTimeout(startGame,1000);
}

cards.forEach(card => {
    card.addEventListener('click', clickCard);
});

buttonStart.addEventListener('click', startGame);


