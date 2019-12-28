/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {

    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay(){
        const phraseElement =  document.querySelector('#phrase ul')
        for(let i=0; i<this.phrase.length; i++ ){
            const letter = this.phrase[i]
            const element  =  document.createElement('li')
            if(letter !== ' '){
                element.classList.add("hide", "letter", letter);
                element.textContent = letter 
            }else{
                element.classList.add("space");
            }
            phraseElement.appendChild(element)
        }
            
        
    }

    checkLetter(letter){
       if(this.phrase.includes(letter)){
        this.showMatchedLetter(letter)
       }
       return this.phrase.includes(letter)
    }

    showMatchedLetter(letter){
        const matchedElements = document.querySelectorAll(`.${letter}`)
        matchedElements.forEach(element=>{
            element.classList.remove('hide')
            element.classList.add('show')
        })
    }

 }