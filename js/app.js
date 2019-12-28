/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = null

const startButton = document.querySelector('#btn__reset')
const keys = document.querySelectorAll('#qwerty button')

keys.forEach((key)=>{

    key.addEventListener('click',e => {
        console.log('letter = '+e.target.textContent)
        game.handleInteraction(e.target.textContent)
    })

})

startButton.addEventListener('click', e =>{
    game = new Game();
    game.startGame();
})
