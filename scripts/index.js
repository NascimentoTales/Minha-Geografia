const question = document.querySelector("#question");
const answerBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d", "e"];

// const CORRECT = "correct-answer";
// const WRONG = "wrong-answer"

let points = 0;
let actualQuestion = 0;

function startGame() {
    console.log("start");
    createQuestion(0)
}

function createQuestion(i) {
    let allbuttons = answerBox.querySelectorAll("button");

    allbuttons.forEach( btn => {
        btn.remove()        
    });
    let questionNumber = question.querySelector("#question-number")
    questionNumber.innerHTML = i + 1

    let questionText = question.querySelector("#question-text")
    questionText.innerHTML = data[i].question

    data[i].answers.forEach( (answer, i) => {
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true)

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");        
    
        letterBtn.textContent = letters[i]
        answerText.textContent =  answer['answer']

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        answerTemplate.classList.remove("hide")
        answerTemplate.classList.remove("answer-template")

        answerBox.appendChild(answerTemplate)
        
        answerTemplate.addEventListener("click", function () {

            // console.log(this);
            checkAnswer(this);
        })
    });

    actualQuestion++;
}

function checkAnswer(btn) {
    
    const buttons = answerBox.querySelectorAll("button")
    let acertouId = document.getElementById("acertouId")

    buttons.forEach(function(button) {
        
        if (button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer")

            if (btn == button) {
                acertouId.style.display = "flex"
                setTimeout(() => {
                    acertouId.style.display = "none"
                }, 1500);
                points++
            }
            
        } else {
            button.classList.add("wrong-answer")
        }
    });

    nextQuestion()
}

function nextQuestion() {
    
    setTimeout(() => {
        
        if (actualQuestion >= data.length) {

            showSuccessMesage();
            return;
        }
        createQuestion(actualQuestion)

    }, 1500);
}

function showSuccessMesage() {
    const h2 = document.querySelector('h2')
    const score = ((points / data.length) * 100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");
    const correctAnswers = document.querySelector("#correct-answers");
    const totalQuestions = document.querySelector("#question-qty")

    displayScore.textContent = score.toString()
    correctAnswers.textContent = points;
    totalQuestions.textContent = data.length

    if (score < 50) {
        h2.innerHTML = "Estude mais!"
    }

    hideOrShowQuizz()
}

function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide")
    scoreContainer.classList.toggle("hide")
}
 
document.querySelector("#restart").addEventListener("click", () =>{

    actualQuestion = 0
    points = 0;
    hideOrShowQuizz();
    startGame();

})

startGame()