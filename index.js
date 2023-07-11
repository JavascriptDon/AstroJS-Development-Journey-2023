let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")
const resetGameBtn = document.getElementById("reset-game");

async function handleClick() {
    const response = await fetch ("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
    const data = await response.json()
    remainingText.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
    console.log(deckId)
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", async () => {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await response.json()
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScore > myScore) {
                    // display "The computer won the game!"
                    header.textContent = "The computer won the game!"
                } else if (myScore > computerScore) {
                    // display "You won the game!"
                    header.textContent = "You won the game!"
                } else {
                    // display "It's a tie game!"
                    header.textContent = "It's a tie game!"
                }
            }
})



function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}


resetGameBtn.addEventListener("click", ()=> {
    //reset game state
    deckId= null;
    computerScore = 0;
    myScore= 0;
    cardsContainer.children[0].innerHTML = "";
    cardsContainer.children[1].innerHTML = "";
    remainingText.textContent = "Remaining Cards:";
    header.textContent = "";
    computerScoreEl.textContent = "Computer Score: 0";
    myScoreEl.textContent = "My Score: 0";
    drawCardBtn.disabled = false;

    if(document.getElementById("final-winner")){
        document.getElementById("final-winner").textContent = "";
    }
})