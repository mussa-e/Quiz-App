let questions = [
    {
        "question" : "Wer hat HTML erfunden?", 
        "answer_1" : "Robbie Williams", 
        "answer_2" : "Lady Gaga", 
        "answer_3" : "Tim Berners-Lee", 
        "answer_4" : "Justin Bieber", 
        "right_answer" : 3
    },
    {
        "question" : "Wofür steht HTML?", 
        "answer_1" : "Hypertext Markup Language", 
        "answer_2" : "Hypertext Markup Link", 
        "answer_3" : "Hypertext Manual Line", 
        "answer_4" : "Hydrotext Mesure Link", 
        "right_answer" : 1
    },
    {
        "question" : "Wofür steht JSON?", 
        "answer_1" : "Javascript ocure notation", 
        "answer_2" : "Javascript online number", 
        "answer_3" : "Javascript object notation", 
        "answer_4" : "Justify sentence object number", 
        "right_answer" : 3
    },
    {
        "question" : "Wofür steht CSS?", 
        "answer_1" : "Cascading stylesheet", 
        "answer_2" : "cursor style system", 
        "answer_3" : "cascading style system", 
        "answer_4" : "census system style", 
        "right_answer" : 1
    },
    {
        "question" : "welches Tag ist für Überschriften?", 
        "answer_1" : "div-tag", 
        "answer_2" : "h-tag", 
        "answer_3" : "p-tag", 
        "answer_4" : "button-tag", 
        "right_answer" : 2
    },
    {
        "question" : "Mit welchem Befehl werden Funtionen auf buttons ausgeführt?", 
        "answer_1" : "onload", 
        "answer_2" : "onclick", 
        "answer_3" : "onchange", 
        "answer_4" : "ondrag", 
        "right_answer" : 2
    },
    {
        "question" : "Wie lautet die richtige Notation für Funktionen?", 
        "answer_1" : "function beispiel();", 
        "answer_2" : "function beispiel[];", 
        "answer_3" : "function beispiel{};", 
        "answer_4" : "function beispiel=;", 
        "right_answer" : 1
    },
    {
        "question" : "Was ist eine globale Variable?", 
        "answer_1" : "Eine Variable innerhalb einer Funktion", 
        "answer_2" : "Eine Varibale außerhalb einer Funktion", 
        "answer_3" : "Eine unbestimmte Variable", 
        "answer_4" : "Eine unbenannte Variable", 
        "right_answer" : 2
    }

];


let currentQuestion = 0;
let rightQuestions = 0;
let audio_success = new Audio("assets/success.mp3");
let audio_fail = new Audio("assets/wrong.mp3");


function init(){
    document.getElementById("all-questions").innerHTML = questions.length;
    showQuestion();
}


function showQuestion(){
    if(gameIsOver()){
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver(){
    return currentQuestion >= questions.length;
}


function answer(selection){
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber)){
        document.getElementById(selection).parentNode.classList.add("bg-success");
        rightQuestions++;
        audio_success.play();
    } else {
        document.getElementById(selection).parentNode.classList.add("bg-danger");
        document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
        audio_fail.play();
    }

    document.getElementById("next-button").disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber){
    let question = questions[currentQuestion];
    return selectedQuestionNumber == question["right_answer"];
}


function nextQuestion(){
    currentQuestion++;
    document.getElementById("next-button").disabled = true;

    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons(){
    document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_1").parentNode.classList.remove("bg-success");
    document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_2").parentNode.classList.remove("bg-success");
    document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_3").parentNode.classList.remove("bg-success");
    document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}


function restartGame(){
    document.getElementById("header-image").src = "img/pencil.jpg";
    document.getElementById("endScreen").style = "display:none";
    document.getElementById("questionBody").style = "";
    currentQuestion = 0;
    rightQuestions = 0;
    init();
}


function showEndScreen(){
        document.getElementById("endScreen").style = "";
        document.getElementById("questionBody").style = "display:none";
        document.getElementById("amount-of-right-questions").innerHTML = rightQuestions;
        document.getElementById("amount-of-questions").innerHTML = questions.length;
        document.getElementById("header-image").src = "img/win.png";
}


function updateToNextQuestion(){
    let question = questions[currentQuestion];

    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("questiontext").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}


function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById("progress-bar").innerHTML = `${percent}%`;
    document.getElementById("progress-bar").style.width = `${percent}%`;
}



