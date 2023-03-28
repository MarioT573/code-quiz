function printHighscores() {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  
    for (var i = 0; i < highscores.length; i += 1) {
      var liScore = document.createElement('li');
      liScore.textContent = highscores[i].initials + ' - ' + highscores[i].score;
      var olEl = document.getElementById('highscores');
      olEl.appendChild(liScore);
    }
}
  
function clearHighscores() {
    localStorage.removeItem('highscores');
    location.reload();
}
  
  document.getElementById('clear').onclick = clearHighscores;
  
  printHighscores();