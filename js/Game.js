/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game{
     constructor(){
        // lets keep track of how many musses a player makes
        this.missed = 0
        // amount of trys a player has
        this.totalMisses = 5
        // the phrases used for game content
        this.phrases =[
         new Phrase("It is a scientific fact that gratitude reciprocates"),
         new Phrase("Life is barely long enough to get good at one thing"),
         new Phrase("Life is a series of commas"),
         new Phrase("So be careful what you get good at"),
         new Phrase("just fine with me because that keeps me with somebody to keep on chasing")
        ]
        // this holds a phrase object
        this.activePhrase = null
     }
     // create a variable to store reference to the start screen
     startScreen = document.querySelector('#overlay')

     startGame(){
        // get game back to start state
        this.resetGame();

        // kick the game off
        //animate header
        document.querySelector('.header').classList.add('animated','pop','tada')
        // set an active phrase
        this.activePhrase = this.getRandomPhrase()
        // render that phrase on screen
        this.activePhrase.addPhraseToDisplay()
        // hide start screen
        this.startScreen.style.display = 'none';
        // cheat sheet for dev.
        console.log('activePhrase = '+this.activePhrase.phrase)
     }

     resetGame(){
        /// a couple of items to reset the game
        // remove old phrase
        document.querySelector('#phrase ul').innerHTML = ''
        // reset keyboard
        document.querySelectorAll('.key').forEach(key => {
            key.removeAttribute('disabled')
            key.classList.remove('chosen','wrong','animated', 'quick-pop', 'heartBeat')
        })
        
        // reset score
        document.querySelectorAll('img[src="images/lostHeart.png"]')
        .forEach(image=>image.setAttribute('src','images/liveHeart.png'))
     }

      /**
      * Selects random phrase from phrases property
      * @return {Object} Phrase object chosen to be used
      */
     getRandomPhrase(){
        // generate random number 0-4
        const randomId = Math.round(Math.random() * (this.phrases.length-1))
        // return a new phrase selected with random number from phrases property
        return this.phrases[randomId]
     }

      /**
      * Handles onscreen keyboard button clicks
      * @param (event object) from clicked button element
      */
     handleInteraction(letter){
        // get keyboard target from letter
        const keyboardTarget = document.querySelector(`#qwerty .${letter}`)
        // disable button
        keyboardTarget.setAttribute('disabled', true)
        keyboardTarget.classList.add('animated','quick-pop','heartBeat')
        // check to see if letter is in phrase
        if(this.activePhrase.checkLetter(letter)){
         // if it is show the letter and update keyboard
         this.activePhrase.showMatchedLetter(letter)
         keyboardTarget.classList.add('chosen')
        }else{
         //if not adjust life update keyboard  
         this.removeLife()
         keyboardTarget.classList.add('wrong')
        }

        // if we have a win fire a gameover
        if(this.checkForWin()) this.gameOver() 
     }

     /**
      * Increases the value of the missed property
      * Removes a life from the scoreboard
      * Checks if player has remaining lives and ends game if player is out
      */
     removeLife(){
        // if its not game over
        if(this.missed < this.totalMisses){
           // select first liveheart, change to lost heart
            const lifeElement = document.querySelector('img[src="images/liveHeart.png"]') 
            lifeElement.src = 'images/lostHeart.png'
            // increment missed property
            this.missed++;
        }
        
        if(this.missed === this.totalMisses){
            this.gameOver();
        }// check to see if gameover
     }

     /**
      * Checks for winning move
      * @return {boolean} True if game has been won, false if game wasn't
      won
      */ 
     checkForWin(){
        // get all letters that have been shown
        const shownLetters = document.querySelectorAll('.show');
        // get all spaces
        const spaces =  document.querySelectorAll('.space')
        // add spaces and lettes and see if it matches phrase length
        return (shownLetters.length+spaces.length) === this.activePhrase.phrase.length
     }

     /**
      * Displays game over message
      */
     gameOver(){
        // get reference to message element
        const messageElement = document.querySelector('#game-over-message')
        // change text for game state
        messageElement.textContent = this.checkForWin() ? 'You Win!' : 'You lose!'
        // add class based on state
        this.startScreen.className = this.checkForWin() ? 'win' : 'lose'
        //remove some old css classes
        document.querySelector('.header').classList.remove('animated','pop','tada')
        // display start screen
        this.startScreen.style.zIndex = 1000
        this.startScreen.style.display = 'flex'

     }
 }