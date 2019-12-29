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
            "It is a scientific fact that gratitude reciprocates",
            "Life is barely long enough to get good at one thing",
            "Life is a series of commas",
            "So be careful what you get good at",
            "just fine with me because that keeps me with somebody to keep on chasing"
        ]
        // this holds a phrase object
        this.activePhrase = null
     }
     // create a variable to store reference to the start screen
     startScreen = document.querySelector('#overlay')

     startGame(){
        /// a couple of items to reset the game
        // remove old phrase
        document.querySelector('#phrase ul').innerHTML = ''
        // reset keyboard
        document.querySelectorAll('.key').forEach(key => {
            key.removeAttribute('disabled')
            key.classList.remove('chosen','wrong')
        })
        // reset score
        document.querySelectorAll('img[src="images/lostHeart.png"]')
        .forEach(image=>image.setAttribute('src','images/liveHeart.png')) 
        // set an active phrase
        this.activePhrase = this.getRandomPhrase()
        // render that phrase on screen
        this.activePhrase.addPhraseToDisplay()
        // hide start screen
        this.startScreen.style.display = 'none';
        // cheat sheet for dev.
        console.log('activePhrase = '+this.activePhrase.phrase)
     }

      /**
      * Selects random phrase from phrases property
      * @return {Object} Phrase object chosen to be used
      */
     getRandomPhrase(){
        // generate random number 0-4
        const randomId = Math.round(Math.random() * (this.phrases.length-1))
        // return a new phrase selected with random number from phrases property
        return new Phrase(this.phrases[randomId])
     }

      /**
      * Handles onscreen keyboard button clicks
      * @param (event object) from clicked button element
      */

     handleInteraction(e){
        // get letter from event object
        const letter = e.target.textContent
        // disable button
        e.target.setAttribute('disabled', true)
        // check to see if letter is in phrase
        if(this.activePhrase.checkLetter(letter)){
         // if it is show the letter and update keyboard
         this.activePhrase.showMatchedLetter(letter)
         e.target.classList.add('chosen')
        }else{
         //if not adjust life update keyboard  
         this.removeLife()
         e.target.classList.add('wrong')
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
           // adjusatr scoreboard
            const lifeElement = document.querySelector('img[src="images/liveHeart.png"]') 
            lifeElement.src = 'images/lostHeart.png'
            // increment missed property
            this.missed++;
        }

        // check to see if gameover
        if(this.missed === this.totalMisses){
            this.gameOver();
        }
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
        messageElement.textContent = this.checkForWin() ? 'win' : 'lose'
        // add class based on state
        this.startScreen.className = this.checkForWin() ? 'win' : 'lose'
        // display start screen
        this.startScreen.style.display = 'block';
     }
 }