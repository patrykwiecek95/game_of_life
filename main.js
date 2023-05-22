
// const test = () => {
//     const wrapper = document.createElement("div");
//     wrapper.classList.add("character-card");
//     const arrayDataHtml = `
//                 <div class='hp'>Hit points: <h4>test</h4></div>
//                 <div class='agility'>Agility: <h4>test</h4></div>
//         `;
//
//     wrapper.innerHTML = arrayDataHtml;
//     return wrapper;
//
// }
// test()

const square =  document.querySelector(".dead")
const buttonStart = document.querySelector('.button-start');


let aliveCard;
let aliveCardsBox =  [];

let table = document.querySelector("table"), xIndex, yIndex;
// table rows
for(let i = 1; i < table.rows.length; i++)
{
    // row cells
    for(let j = 0; j < table.rows[i].cells.length; j++)
    {
        table.rows[i].cells[j].onclick = function()
        {
            xIndex = this.parentElement.rowIndex;
            yIndex = this.cellIndex+1;
            console.log("x : "+xIndex+" , y : "+yIndex);
            aliveCard = this;
            console.log(aliveCard)
            // check if the card is already in CardsBox
            if (aliveCardsBox.some(card => card[0] === xIndex && card[1] === yIndex)) {
                return;
            }
            aliveCard.classList.add('alive'); //alive card/ add class
            aliveCardsBox.push([xIndex,yIndex])
            // console.log(aliveCardsBox)
            // console.log(aliveCardsBox.length)
        };
    }
}

function startGame() {
    aliveCardsBox.forEach(card => {
        // console.log(card[0],card[1]);
        if ()
    })
}





buttonStart.addEventListener('click', startGame);