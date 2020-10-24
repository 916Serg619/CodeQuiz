const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

/*Variables for timer*/
const timerCount = document.querySelector('#timer');
let timerSecond = 60;

/*Display time function*/
displayTime(timerSecond);

const countDown = setInterval(() => {
        timerSecond--;
        displayTime(timerSecond);
        if (timerSecond <= 0 || timerSecond < 1) {
            endTime();
            clearInterval(countDown);
        }

    }, 1000)
    /*Ensures that time will display in whole numbers*/
function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timerCount.innerHTML = `${min<10 ? '0' : ''}${min}:${sec<10?'0':''}${sec}`
}



/* Displays message when time is finished, redirects user to finish.html*/
function endTime() {
    timerCount.innerHTML = 'TIME!'
    location.replace('finish.html')
}


let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [

    {
        question: "Commonly used data types DO NOT include:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: 3,
    },
    {
        question: "The condition in an if/else statement is enclosed within ___.",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parantheses",
        choice4: "square brackets",
        answer: 3,
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4,
    },
    {
        question: "String values must be enclosed within ___ whenbeing assigned to variables.",
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parantheses",
        answer: 3,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2: "Terminal/Bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score)

            return window.location.assign('finish.html')
        }

        questionCounter++
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

        const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true
    }
    /*Function for user choices.  Dicates outputs on both correct and incorrect choices*/
choices.forEach(choice => {
    choice.addEventListener('click', c => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = c.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        /*Else statment that removes time off time if user chooses incorrect choice*/
        else {
            timerSecond = timerSecond - 5;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})






incrementScore = num => {
    score += num
    scoreText.innerText = score
}




startGame()