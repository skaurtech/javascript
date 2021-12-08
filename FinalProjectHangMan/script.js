'use strict';
/*
    WEB230 Final Project Winter 2020
    {Simranjeet Kaur}
	{0746380}		
*/


/* Step: 1*/
let names = ["India", "Pakistan", "England", "NewZealand", "SouthAfrica", "Australia", "UAE", "Ireland"];	

/* To display the random word to be guess */
function randomName(){
    return Math.floor(Math.random()*8);
}
/* starting Screen */
function reset(){
    section2[0].removeEventListener('click', eventHandler);
    window.removeEventListener('keydown',eventHandler2);
    document.getElementsByTagName('p')[0].style.display = 'block';  
    picture.onclick = function(){
        picture.src = 'images/hang0.png';
		
		/* Scenario 1* /
		/* Gueesing the Word */
        let letters = Array.from(document.querySelectorAll('span'));
        letters.forEach(x => {x.classList.remove('used'); })
        emptyArray();
       
        word = names[randomName()];
        word = word.toUpperCase();
        blankWord.textContent = underscore(word);
        guesses = 6; /* player has 6 chances to guess the word */
        document.getElementsByTagName('p')[0].style.display = 'none';
        section2[0].addEventListener('click',eventHandler);
        window.addEventListener('keydown',eventHandler2);
    }
}
 /* Scenario 2 and 3 to display image  */
function checkLetter(l){
    let char = l.which;
    if(char >31 && char !=32 && (char<65 || char>90) && (char <97 || char >122)){
        alert("Only use alphabet key!! ")
    }
   else if(wordArray.includes(l)){
        while (wordArray.includes(l)){
            let a = wordArray.findIndex(j => j === l);
            let z = blankWord.textContent.charAt(a).replace('_',l);
            wordArray.splice(a,1,'_');
            blankWordArray.splice(a,1,z);
        }
        let guessWord = blankWordArray.join('');
        blankWord.textContent = guessWord;
        if(win(guessWord)){ /* for right one */
            switch(win(guessWord)){
                case 1: picture.src='images/hang5.png';
                    break;
                case 2: picture.src='images/hang4.png';
                    break;
                case 3: picture.src='images/hang3.png';
                    break;
                case 4: picture.src='images/hang2.png';
                    break;
                case 5: picture.src='images/hang1.png';
                    break;
            }
			 picture.src = 'images/win.png';
   
            reset();
        }
    }else{ 
	
        guesses--;
		/* for no one */
        if(guesses == 0){
                    
          picture.src='images/hang6.png';
            reset();
        }else{
			/* for wrong one */
            switch(guesses){
                case 1: picture.src='images/hang5.png';
                    break;
                case 2: picture.src='images/hang4.png';
                    break;
                case 3: picture.src='images/hang3.png';
                    break;
                case 4: picture.src='images/hang2.png';
                    break;
                case 5: picture.src='images/hang1.png';
                    break;
            }
        
    }
}
}
function emptyArray(){
     wordArray =	 [];
     blankWordArray = [];
}
let section = document.getElementsByClassName('word');
let word = names[randomName()];
word = word.toUpperCase();
let wordArray = [];
let blankWord = document.createElement('article');
let blankWordArray = [];
let guesses = 6;
let picture = document.getElementById('hangman');
function underscore(word){
    let space = '';
    for(let i = 0; i < word.length; i++){
        space += '_';
        wordArray.push(word.charAt(i));
        blankWordArray.push('_');
    }
    return space;
}
blankWord.classList.add('wordLength');
blankWord.textContent = underscore(word);
section[0].appendChild(blankWord);
let section2 = document.getElementsByClassName('letters');
section2[0].addEventListener('click',eventHandler);
window.addEventListener('keydown',eventHandler2);

function eventHandler(e){
    let target = ('SPAN' && !e.target.classList.contains('used'))
    {
        e.target.classList.add('used');
        let letter = e.target.childNodes.item(0).textContent;
        checkLetter(letter);
    }
}
function eventHandler2(e){
    let keyEntered = String.fromCharCode(e.keyCode);
    let target = document.getElementById(keyEntered);
    if(!target.classList.contains('used')){
        target.classList.add('used');
        checkLetter(keyEntered)
    }
	
}

function win(guess){
    if(guess == word){
        return true;
    }
    return false;
}