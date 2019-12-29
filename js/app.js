/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
// create empty var for game
let game = null

// store a couple of references
const startButton = document.querySelector('#btn__reset')
const keys = document.querySelector('#qwerty')

//event listener for keyboard
document.addEventListener('keyup',e => {
    game.handleInteraction(String.fromCharCode(e.keyCode).toLowerCase())
})

// add event listener for the onscreen keyboard
keys.addEventListener('click',e => {
    // make sure its a button if it is lets handle business
   if(e.target.tagName === 'BUTTON') game.handleInteraction(e.target.textContent)
})

// click handler for start button 
startButton.addEventListener('click', e =>{
    game = new Game();
    game.startGame();
})
