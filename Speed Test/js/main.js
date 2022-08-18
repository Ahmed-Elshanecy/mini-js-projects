// Words In The Game by default
let words = [
    "Country",
    "Testing",
    "Styling",
    "Youtube",
    "Coding",
    "Twitter",
    "Working",
    "Playing",
    "Runner",
    "Github",
];

// var to add 2s for first word
let number = words.length - 1;

// Setting lvls
let lvls = {
    "Easy": 4,
    "Normal": 3,
    "Hard": 3
};

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

// Html Element
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

let select = document.querySelector(".container .select");
let easySpan = document.querySelector(".buttons .Easy");
let normalSpan = document.querySelector(".buttons .Normal");
let hardSpan = document.querySelector(".buttons .Hard");


let level = defaultLevelName;


lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

easySpan.onclick = function () {
    level = easySpan.classList.value;
    lvlNameSpan.innerHTML = level;
    secondsSpan.innerHTML = lvls[level];
    timeLeftSpan.innerHTML = lvls[level];
    words = [
        "Hello",
        "Code",
        "Scala",
        "Town",
        "Python",
        "Funny",
        "Task",
        "Test",
        "Rust",
        "Roles",

    ];
    scoreTotal.innerHTML = words.length;
};

normalSpan.onclick = function () {
    level = normalSpan.classList.value;
    lvlNameSpan.innerHTML = level;
    secondsSpan.innerHTML = lvls[level];
    timeLeftSpan.innerHTML = lvls[level];
    words = [

        "Country",
        "Testing",
        "Styling",
        "Youtube",
        "Coding",
        "Twitter",
        "Working",
        "Playing",
        "Runner",
        "Github",

    ];
    scoreTotal.innerHTML = words.length;
};

hardSpan.onclick = function () {
    level = hardSpan.classList.value;
    lvlNameSpan.innerHTML = level;
    secondsSpan.innerHTML = lvls[level];
    timeLeftSpan.innerHTML = lvls[level];
    words = [
        "Programming",
        "Javascript",
        "Leetcode",
        "Internet",
        "Destructuring",
        "Paradigm",
        "Documentation",
        "Dependencies",
        "Cascade",
        "Linkedin"
    ];
    scoreTotal.innerHTML = words.length;
};
// Setting Elements



// disable paste in the input
input.onpaste = function () {
    return false;
};


// Start Game
startButton.onclick = function () {

    select.remove();
    this.remove();
    input.focus();

    getWords();
};

// Random Word
function getWords() {

    let randomWord = words[Math.floor(Math.random() * words.length)];

    // get index to remove it from array
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex, 1);

    theWord.innerHTML = randomWord;

    upcomingWords.innerHTML = "";
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(words[i]));
        upcomingWords.appendChild(div);
    }

    // start play function
    startPlay();
}
function startPlay() {
    if (words.length === number) {
        timeLeftSpan.innerHTML = lvls[level] + 2;
    } else {
        timeLeftSpan.innerHTML = lvls[level];
    }
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start);
            input.submit;
            if (theWord.innerHTML.toLocaleLowerCase() === input.value) {
                input.value = "";
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    getWords();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    span.appendChild(document.createTextNode("congrats"));
                    finishMessage.appendChild(span);
                }
            }
            else {
                let span = document.createElement("span");
                span.className = "bad";
                span.appendChild(document.createTextNode("Game Over"));
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}