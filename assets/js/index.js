var startBtn = document.getElementById('startBtn');
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var initialsEl = document.getElementById('initials');
var questionResultEl = document.getElementById('questionResult');

var time = questions.length * 15;
var timeID;
var questionIndex = 0; 

function startQuiz() {
    console.log("hi");
    var titleScreenEl = document.getElementById('titleScreen');
    titleScreenEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
  
    timeID = setInterval(countdown, 1000);
    timerEl.textContent = time;
    getQuestion();
}

function countdown() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
      quizEnd();
    }
}

function getQuestion() {
    var currentQuestion = questions[questionIndex];
  
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
  
    choicesEl.innerHTML = '';
  
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice');
        choiceBtn.setAttribute('value', choice);
        choiceBtn.textContent = choice;
        choicesEl.appendChild(choiceBtn);
    }
}

function questionClick(event) {
    var buttonEl = event.target;

    if (!buttonEl.matches('.choice')) {
      return;
    }
    if (buttonEl.value !== questions[questionIndex].answer) {
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        questionResultEl.textContent = 'Incorrect!';
    } else {
        questionResultEl.textContent = 'Correct!';
    }
  
    questionResultEl.setAttribute('class', 'questionResult');
    setTimeout(function () {
        questionResultEl.setAttribute('class', 'questionResult hide');
    }, 1000);
    questionIndex++;
  
    if (time <= 0 || questionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

function quizEnd() {
    clearInterval(timeID);
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
    questionsEl.setAttribute('class', 'hide');
}

function saveHighscore() {
    var initials = initialsEl.value.trim();
  
    if (initials !== '') {
      var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
      var newScore = {
        score: time,
        initials: initials,
      };
      highscores.push(newScore);
      localStorage.setItem('highscores', JSON.stringify(highscores));
      window.location.href = 'highscores.html';
    }
}

startBtn.onclick = startQuiz;
choicesEl.onclick = questionClick;
submitBtn.onclick = saveHighscore;