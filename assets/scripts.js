
function initGame() {

    // The interaction between this script and the html page. 
    const startButtonEl = document.getElementById("startGameButton");
    const startContainerEl = document.getElementById("startContainer");
    const cardContainerEl = document.getElementById("questionContainer");
    const questionNumberEl = document.getElementById("questionNumber");
    const questionPromptEl = document.getElementById("questionPrompt");

    // my array of the questions and their answers 
    questions = [
        ["Question 1:", "In a 4/4 time signature what note gets one beat?", "eighth note", "quarter note", "whole note", "half note", 1],
        ["Question 2:", "How many notes are in a major scale?", "5", "12", "7", "9", 2],
        ["Question 3:", "What is the relative minor of C major?", "Eb minor", "E minor", "Ab minor", "A minor", 3],
        ["Question 4:", "What is the chord progression used in a plagal cadence?", "V-I", "IV-I", "vi-I", "V-vi", 1],
        ["Question 5:", "When in the key of C major what chord will be played to execute a tritone substitution and cadence on a I chord?", "C#7", "F#add9", "G Maj7", "B dim", 0],

    ]
    console.log(questions[0][0])
    console.log(questions[1][0])
    console.log(questions[2][0])
    console.log(questions[3][0])
    console.log(questions[4][0])
    // hides the start button and brings up the questions 
    function startGame() {
        startContainerEl.setAttribute("style", "display: none");
        cardContainerEl.setAttribute("style", "display: inline");
        let currentQuestion = 0;

        //checks to see if there are more questions, if so it will run the function to display the next function, if not will bring to end screen.
        function checkGameProgress() {
            if (currentQuestion < questions.length) {
                prepareQuestion();
            } else {
                console.log("You win!");
            }

        }


        //brings up the next question to ask.
        function prepareQuestion() {


            questionNumberEl.innerHTML = questions[currentQuestion][0];
            questionPromptEl.innerHTML = questions[currentQuestion][1];

            const answersEl = document.querySelectorAll(".answers-js");

            for (let i = 0; i < answersEl.length; i++) {
                const answerEl = answersEl[i];
                answerEl.innerHTML = questions[currentQuestion][i + 2]

                answerEl.addEventListener("click", function () {
                    const chosenAnswer = i;
                    if (chosenAnswer === questions[currentQuestion][6]) {
                        console.log("winner");
                    } else {
                        console.log("loser");
                    }
                    currentQuestion = currentQuestion + 1;
                    checkGameProgress();
                })
            }
        }













        checkGameProgress();
    }





    //the function to begin the game.
    startButtonEl.addEventListener("click", function () {
        startGame();
    })

} initGame();































/* multiple choice game pseudo code

DONE!
bootstrap that guy
make a start button (jumbotron maybe?? make an on click)
make questions ()
designate which answer is correct
check for right/wrong
make thing that will show next question
make answer to questions



To Do:
give prompt that user got it right/wrong
give reward for right
make reward change based on how much time is left
give punishment for wrong
make a score keeper
make a high score keeper
make a thing where they can enter their high score


Put at the end
make a timer (not sure yet) 15 seconds * number of questions
make a time over screen



would be nice:

sounds effects
customizeable theme
multiple quizzes
add to portfolio */