// select Elements
let count = document.querySelector(".count span");
let mainSpan = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-app .quiz-area");
let mainH2 = document.querySelector(".quiz-app .quiz-area h2");
let labels = document.getElementsByTagName("label");
let answer1 = labels[0];
let answer2 = labels[1];
let answer3 = labels[2];
let answer4 = labels[3];
let submitButton = document.querySelector(".submit-button");
let answerArea = document.querySelector(".quiz-app .answer-area");
let countDown = document.querySelector(".quiz-app .countdown");

// Set Options
let currentIndex = 0;
let RightAnswer = 0;
let countDownInterval;

// functions
function getQuestions() {
    let request = new XMLHttpRequest();
    request.open("Get", "main.json", true);
    request.send();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObj = JSON.parse(this.responseText);
            let quCounts = questionsObj.length;


            // createBullets + countSpan
            createBullets(quCounts);


            // Add Questions From Json
            setData(questionsObj[currentIndex], quCounts);

            // countDown for first question
            countDownFunction(130, quCounts);


            // Check True Answer
            submitButton.onclick = () => {
                if (currentIndex < quCounts) {
                    var RightAnswer = questionsObj[currentIndex].theRightAnswer;
                }
                currentIndex++;

                checkAnswer(RightAnswer, quCounts);
                //    Get Next Question

                mainH2.innerHTML = "";
                answer1.innerHTML = "";
                answer2.innerHTML = "";
                answer3.innerHTML = "";
                answer4.innerHTML = "";

                if (currentIndex < quCounts) {
                    setData(questionsObj[currentIndex], quCounts);
                } else {
                    answerArea.innerHTML = "";
                }
                // handle bullets class
                handleBullets();

                // Stop Counting
                clearInterval(countDownInterval);

                // show results 
                showResults(quCounts);

                // countDown For Other Questions
                countDownFunction(130, quCounts);
            };
        }
    };
}
getQuestions();

function createBullets(num) {
    count.innerHTML = num;

    for (let i = 0; i < num; i++) {
        let newSpan = document.createElement("span");
        newSpan.setAttribute("number", i);
        if (i === 0) {
            newSpan.className = "on";
        }
        mainSpan.appendChild(newSpan);
    }

}


function setData(text, numOfText) {
    if (currentIndex < numOfText) {
        mainH2.innerHTML = text.title;
        answer1.innerHTML = text.answer1;
        answer2.innerHTML = text.answer2;
        answer3.innerHTML = text.answer3;
        answer4.innerHTML = text.answer4;
    }
}

function checkAnswer(Ranswer, count) {
    let answers = document.getElementsByName("question");

    let theChoosenAnswer;
    for (let i = 0; i < answers.length; i++) {

        if (answers[i].checked) {
            theChoosenAnswer = labels[i].textContent;
        }
    }

    if (Ranswer === theChoosenAnswer) {
        RightAnswer++;
    }
}
function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

function showResults(count) {

    if (currentIndex === count) {
        mainH2.innerHTML = `your result is ${RightAnswer} from ${count}`;
        mainH2.classList.add("style");
        submitButton.remove();
        answerArea.remove();
        countDown.remove();

    }

}
function countDownFunction(duration, count) {
    if (currentIndex < count) {
        var minutes, seconds;
        countDownInterval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countDown.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {
                clearInterval(countDownInterval);
                submitButton.click();
            }


        }, 1000);
    }
}