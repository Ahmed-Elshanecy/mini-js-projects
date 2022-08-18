// custom letters

let letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theletter = document.createTextNode(letter);

    span.appendChild(theletter);


    span.className = 'letter-box';

    lettersContainer.appendChild(span);

});

// random word for game

let words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

let allKeys = Object.keys(words);

let randomNum = Math.floor(Math.random() * allKeys.length);
let randomName = allKeys[randomNum];
let values = words[randomName];

let randomNum2 = Math.floor(Math.random() * values.length);
let randomWord = values[randomNum2];

// add name to html 
document.querySelector(".category span").innerHTML = randomName;

// word area
let letterGuess = document.querySelector(".letters-guess");

let wordAsArray = [...randomWord];

wordAsArray.forEach(letter => {
    let emptyspan = document.createElement("span");


    if (letter === " ") {
        emptyspan.className = "with-space";
    }
    letterGuess.appendChild(emptyspan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");


let wrongTries = 0;

let theDraw = document.querySelector(".hangman-draw");

// clicking on letters
document.addEventListener("click", (e) => {
    // set the status
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        let choosenLetter = e.target.textContent.toLowerCase();

        let theChosenWord = Array.from(randomWord.toLowerCase());


        theChosenWord.forEach((wordLetter, wordIndex) => {


            if (choosenLetter == wordLetter) {

                theStatus = true;

                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex == spanIndex) {
                        span.innerHTML = choosenLetter;


                    }

                });
            }
        });

        //    if the letter is wrong
        if (theStatus !== true) {
            wrongTries++;
            theDraw.classList.add(`wrong-${wrongTries}`);
            if (wrongTries === 8) {
                endGame();

                lettersContainer.classList.add("finished");
            }
        }
    }
});

// when lose
function endGame() {


    let div = document.createElement("div");


    let divText = document.createTextNode(`Game Over, The Word Is ${randomWord}`);


    div.appendChild(divText);


    div.className = 'popup';


    document.body.appendChild(div);

}