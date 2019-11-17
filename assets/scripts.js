
function initGame() {


    const startButtonEl = document.getElementById("startGameButton");
    const startContainerEl = document.getElementById("startContainer");
    const cardContainerEl = document.getElementById("questionContainer");
    const questionNumberEl = document.getElementById("questionNumber");
    const questionPromptEl = document.getElementById("questionPrompt");
    questions = [
        ["Question 5:", "In a 4/4 time signature what note gets one beat?", "eighth note", "quarter note", "whole note", "half note", 1],
        ["Question 5:", "When in the key of C major what chord will be played to execute a tritone substitution and cadence on a I chord?", "C#7", "F#add9", "G Maj7", "B dim", 0],

    ]



    function startGame() {
        startContainerEl.setAttribute("style", "display: none");
        cardContainerEl.setAttribute("style", "display: inline");
        let currentQuestion = 0;

        function checkGameProgress(){
            if (currentQuestion<questions.length){
                prepareQuestion();
            } else{
                console.log("You win!")
            }

        }

        function prepareQuestion() {

            questionNumberEl.innerHTML = questions[currentQuestion][0];
            questionPromptEl.innerHTML = questions[currentQuestion][1];
    
            const answersEl = document.querySelectorAll(".answers-js");
            console.log(answersEl);
    
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
                    currentQuestion++;
                    checkGameProgress();
                })
            }
        } checkGameProgress();













    }






    startButtonEl.addEventListener("click", function () {
        startGame();
    })

} initGame();































/* multiple choice game pseudo code

DONE!
bootstrap that guy
make a start button (jumbotron maybe?? make an on click)
make questions ()




make answer to questions
designate which answer is correct
check for right/wrong
give prompt that user got it right/wrong
give reward for right
make reward change based on how much time is left
give punishment for wrong
make thing that will show next question
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