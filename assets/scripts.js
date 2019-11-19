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
    const highScoresEl = document.getElementById("highScores");
    const usernameEl = document.getElementById("username");
    const highScoresJumpEl = document.getElementById("jumpToHighScores");

    //The variables for when the user interacts with the page.
    let chosenAnswer = "";
    let currentQuestion = 0;
    let score = {
        value: 0,
        name: "",
    }
    let highScores = [];
    let savedValue = JSON.parse(localStorage.getItem("highScores"));
    let username;

    if (savedValue) {
        highScores = savedValue;
    }

    console.log(highScores);

    startButtonEl.addEventListener("click", function () {
        readRules();
    })

    rulesButtonEl.addEventListener("click", function () {
        username = usernameEl.value;
        console.log(username);
        if (username === "") {
            alert("Pick a username")
        } else {
            startTimer();
            startGame();
        }
    })

    highScoresJumpEl.addEventListener("click", function () {
        handleHighScores();
    })

    const defaultTime = questions.length * 15;
    let time = 0;
    let myInterval;

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
        for (let i = 0; i <answersEl.length; i++) {
            const answerEl = answersEl[i];
            answerEl.addEventListener("click", function () {
                chosenAnswer = answerEl.innerText;
                checkAnswer();
            });
        }

        //checks to see if there are more questions, if so it will run the function to display the next function, if not will bring to end screen.
        function checkGameProgress() {
            if (currentQuestion <questions.length) {
                renderQuestion();
            } else {
                handleHighScores();
            }
        }

        //brings up the next question to ask.
        function renderQuestion() {

            //Sets to display the correct question number and associating question.
            questionNumberEl.innerHTML = questions[currentQuestion].number;
            questionPromptEl.innerHTML = questions[currentQuestion].title;

            // Puts the correct answer option in the answerEl variable based on where it is in the array.
            for (let i = 0; i <questions[currentQuestion].choices.length; i++) {
                answersEl[i].innerHTML = questions[currentQuestion].choices[i];
            }
        }

        //Checks to see if the answer to the question is right.
        function checkAnswer() {
            if (chosenAnswer === questions[currentQuestion].answer) {
                score.value = score.value + time;
                scoreEl.innerHTML = score.value;
            } else {
                time = time - 10;
            }
            currentQuestion = currentQuestion + 1;
            checkGameProgress();
        }
        renderQuestion();
    }
    //The timer function
    function startTimer() {
        time = defaultTime;
        myInterval = setInterval(function () {
            time = time - 1;

            let minutes = Math.floor(time / 60) % 60;
            let seconds = time % 60;

            if (minutes <10) {
                minutes = "0" + minutes;
            }
            if (seconds <10) {
                seconds = "0" + seconds;
            }

            timerEl.innerHTML = minutes + ":" + seconds;

            if (time <= 0) {
                clearInterval(myInterval);
                handleHighScores();
            }
        }, 1000)
    }

    //Adds the high score
    function handleHighScores() {
        if (score.value !== 0) {
            score.name = username;
            clearInterval(myInterval);
            time = 0;
            highScores.push(score);

        }
        // found this here https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
        const sortedHighScores = highScores.slice(0);
        sortedHighScores.sort(function (a, b) {
            return b.value - a.value;
        });



        for (let i = 0; i <highScores.length; i++) {
            const highScoreEl = document.createElement("li");
            highScoreEl.setAttribute("class", "high-score-li d-flex justify-content-center");
            highScoreEl.innerText = sortedHighScores[i].name + " " + sortedHighScores[i].value;
            highScoresEl.append(highScoreEl);
        }
        finishGame();
    }

    function finishGame() {
        rulesContainerEl.setAttribute("style", "display: none");
        finishContainerEl.setAttribute("style", "display: block");
        questionContainerEl.setAttribute("style", "display: none");
        timerEl.innerHTML = "00:00";
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }


} initGame();


