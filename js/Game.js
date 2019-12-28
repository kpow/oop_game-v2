/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game{
     constructor(){
        this.missed = 0
        this.phrases =[
            "It is a scientific fact that gratitude reciprocates",
            "Life is barely long enough to get good at one thing",
            "Life is a series of commas",
            "So be careful what you get good at",
            "just fine with me because that keeps me with somebody to keep on chasing"
        ]
        this.activePhrase = null
     }

     startScreen = document.querySelector('#overlay')

     startGame(){
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
        this.startScreen.style.display = 'none';
        console.log('activePhrase = '+this.activePhrase.phrase)
     }

     getRandomPhrase(){
        const randomId = Math.round(Math.random() * (this.phrases.length-1))
        return new Phrase(this.phrases[randomId])
     }

     handleInteraction(letter){
        this.activePhrase.checkLetter(letter);
        if(!this.activePhrase.checkLetter(letter)){
            this.removeLife()
        }
        if(this.checkForWin()){
            this.gameOver()
        }
     }

     removeLife(){
        if(this.missed < 5){
            const lifeElement = document.querySelector('img[src="images/liveHeart.png"]') 
            lifeElement.src = 'images/lostHeart.png'
            this.missed++;
        }

        if(this.missed === 5){
            this.gameOver();
        }
        
        console.log(this.missed)
     }

     checkForWin(){
        const shownLetters = document.querySelectorAll('.show');
        const spaces =  document.querySelectorAll('.space')
        return (shownLetters.length+spaces.length) === this.activePhrase.phrase.length
     }

     gameOver(){
        const messageElement = document.querySelector('#game-over-message')
        messageElement.textContent = this.checkForWin() ? 'win' : 'lose'
        messageElement.className = this.checkForWin() ? 'win' : 'lose'
        this.startScreen.style.display = 'block';
     }
 }