/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase){
        //make sure the phrase is all lowercase
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay(){
        // get root element to build in
        const phraseElement =  document.querySelector('#phrase ul')
        // loop through phrase and build an populate element
        for(let i=0; i<this.phrase.length; i++ ){
            const letter = this.phrase[i]
            const element  =  document.createElement('li')
            if(letter !== ' '){
                // if its text build a text element
                element.classList.add("hide", "letter", letter, 'tada');
                element.textContent = letter 
            }else{
                // if its a space a space element
                element.classList.add("space");
            }
            // add the element to the root element
            phraseElement.appendChild(element)
        } 
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    * @returns (boolean)
    */
    checkLetter(letter){
       return this.phrase.includes(letter)
    }

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter){
        // grab all elements with that letter the the letter class
        const matchedElements = document.querySelectorAll(`#phrase .${letter}`)
        // loop through them and se the classes
        matchedElements.forEach(element=>{
            element.classList.remove('hide')
            element.classList.add('show','animated','quick-pop','heartBeat')
        })
    }

 }