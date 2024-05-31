let choices = ['rock', 'paper', 'scissors'];
let userChoiceButtons = document.querySelectorAll('button');
let scoreElement = document.querySelector('#score');
let score = parseInt(scoreElement.textContent);

for (let i = 0; i < userChoiceButtons.length; i++) {
  userChoiceButtons[i].addEventListener('click', function () {
    let userChoice;
    if (this.id === 'paperChoice') {
      userChoice = 'paper';
    } else if (this.id === 'scissorsChoice') {
      userChoice = 'scissors';
    } else if (this.id === 'rockChoice') {
      userChoice = 'rock';
    }

    let computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = handleClickChoice(userChoice, computerChoice);


    setTimeout(function () {
      handleSetTimeout(userChoice, computerChoice, result);
    }, 1000);
  });
};

function handleClickChoice(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    score++;
    return "You win!";
  } else {
    return "You lose!";
  }
}

function handleClickPicked(userChoice) {
  let gameArea = document.querySelector('#game-area');
  gameArea.innerHTML = `
    <div class="picked">
      <div class="picked-you">
        <button><img src="/rockPaperScissors/assets/img/${userChoice}.png" alt="${userChoice}" class="${userChoice}"></button>
        <p>YOU PICKED</p>
      </div>
      <div class="picked-home">
        <button><img src="/rockPaperScissors/assets/img/nothing.png" alt="nothing" class="nothing"></button>
        <p>THE HOUSE PICKED</p>
      </div>
    </div>
  `;
}

function handleSetTimeout(userChoice, computerChoice, result) {
  scoreElement.textContent = score;
  let gameArea = document.querySelector('#game-area');
  gameArea.innerHTML = `
    <div class="resultPage-gameArea">
      <div class="picked resultPage-picked">
        <div class="picked-you">
          <button><img src="/rockPaperScissors/assets/img/${userChoice}.png" alt="${userChoice}" class="rock-display rock-selected"></button>
          <p>YOU PICKED</p>
        </div>
        <div class="result-desktop">
          <h1>${result === "You win!" ? "YOU WIN" : result === "You lose!" ? "YOU LOSE" : "IT'S A TIE"}</h1>
          <a class="again-btn" href="/rockPaperScissors/index.html">PLAY AGAIN</a>
        </div>
        <div class="picked-home">
          <button><img src="/rockPaperScissors/assets/img/${computerChoice}.png" alt="${computerChoice}" class="nothing"></button>
          <p>THE HOUSE PICKED</p>
        </div>
      </div>
      <div class="result result-mobile">
        <h1>${result === "You win!" ? "YOU WIN" : result === "You lose!" ? "YOU LOSE" : "IT'S A TIE"}</h1>
        <a class="again-btn" href="/rockPaperScissors/index.html">PLAY AGAIN</a>
      </div>
    </div>
  `;

  document.querySelector('.again-btn').addEventListener('click', function () {
    location.reload();
  });
}