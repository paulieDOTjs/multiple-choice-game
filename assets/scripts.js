function initGame() {

    // The variables used for interaction between this script and the html page. 
    const startButtonEl = document.getElementById("startGameButton");
    const rulesButtonEl = document.getElementById("rulesButton")
    const startContainerEl = document.getElementById("startContainer");
    const questionContainerEl = document.getElementById("questionContainer");
    const finishContainerEl = document.getElementById("finishContainer");
    const rulesContainerEl = document.getElementById("rulesContainer");
    const questionNumberEl = document.getElementById("questionNumber");
    const questionPromptEl = document.getElementById("questionPrompt");
    const timerEl = document.getElementById("timer");
    const scoreEl = document.getElementById("currentScore");
    const answersEl = document.querySelectorAll(".answers-js");
    const finalScoreEl= document.getElementById("finalScore");
    const finishedEl= document.getElementById("finished");

    //The variables for when the user interacts with the page.
    let chosenAnswer = "";
    let currentQuestion = 0;
    let score = 0;

    startButtonEl.addEventListener("click", function () {
        readRules();
    })

    rulesButtonEl.addEventListener("click", function () {
        startTimer();
        startGame();
    })


    const defaultTime = questions.length * 15;
    let time = 0;

    //Hides the question, rules, and finish container
    questionContainerEl.setAttribute("style", "display: none");
    rulesContainerEl.setAttribute("style", "display: none");
    finishContainerEl.setAttribute("style", "display: none");

    //Shows rules of the game.
    function readRules() {
        rulesContainerEl.setAttribute("style", "display: block");
        startContainerEl.setAttribute("style", "display: none");
    }

    // The actual beginning of the quiz
    function startGame() {
        // hides the start button and brings up the first question. 
        rulesContainerEl.setAttribute("style", "display: none");
        questionContainerEl.setAttribute("style", "display: block");

        //Gives each of the buttons an event listener so the program knows which was clicked.
        for (let i = 0; i < answersEl.length; i++) {
            const answerEl = answersEl[i];
            answerEl.addEventListener("click", function () {
                chosenAnswer = answerEl.innerText;
                checkAnswer();
            });
        }

        //checks to see if there are more questions, if so it will run the function to display the next function, if not will bring to end screen.
        function checkGameProgress() {
            if (currentQuestion < questions.length) {
                renderQuestion();
            } else {
                finishGame();
            }
        }

        //brings up the next question to ask.
        function renderQuestion() {

            //Sets to display the correct question number and associating question.
            questionNumberEl.innerHTML = questions[currentQuestion].number;
            questionPromptEl.innerHTML = questions[currentQuestion].title;

            // Puts the correct answer option in the answerEl variable based on where it is in the array.
            for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
                answersEl[i].innerHTML = questions[currentQuestion].choices[i];
            }
        }

        //Checks to see if the answer to the question is right.
        function checkAnswer() {
            if (chosenAnswer === questions[currentQuestion].answer) {
                score = score+time;
                scoreEl.innerHTML = score;
            } else {
               time = time-10;
            }
            currentQuestion = currentQuestion + 1;
            checkGameProgress();
        }
        renderQuestion();
    }
    //The timer function
    function startTimer() {
        time = defaultTime;
        let myInterval = setInterval(function () {
            time = time - 1;

            let minutes = Math.floor(time / 60) % 60;
            let seconds = time % 60;

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            timerEl.innerHTML = minutes + ":" + seconds;

            if (time <= 0) {
                clearInterval(myInterval);
                finishGame();
            }
        }, 1000)
    }

    function finishGame() {
        time = 1;
        finishContainerEl.setAttribute("style", "display: block");
        questionContainerEl.setAttribute("style", "display: none");
        finalScoreEl.innerHTML = "Great Game! You scored " + score + " points!";
        finishedEl.innerHTML = "FINISHED!";
    }

} initGame();




// Done
// bootstrap that guy
// make a start button (jumbotron maybe?? make an on click)
// make questions ()
// designate which answer is correct
// make thing that will show next question
// make answer to questions
// designate which answer is correct
// check for right/wrong
// give reward for right
// give prompt that user got it right/wrong
// make reward change based on how much time is left
// make a score keeper
// give punishment for wrong 
// make a timer (not sure yet) 15 seconds * number of questions
// make a time over screen





// To Do:
// make a high score keeper
// give link at the beginning to see high scores.





// would be nice:
// sounds effects
// customizeable theme
// multiple quizzes
// add to portfolio 