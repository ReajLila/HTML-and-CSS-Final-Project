
const words4 = [
    "bake", "clay", "drip", "fizz", "grip", "haze", "jolt", "keen", "lump", "mend",
    "navy", "ogle", "palm", "quip", "rust", "sift", "twig", "urge", "vent", "wisp",
    "axis", "belt", "calm", "dune", "earn", "flaw", "gain", "halo", "idol", "jazz",
    "knot", "leaf", "moss", "numb", "omen", "plot", "quip", "rude", "soar", "trap",
    "unit", "vain", "warp", "yarn", "zinc", "yeti", "wolf", "vote", "toil", "sour"
];  
const words6 = [
"absorb", "bright", "custom", "dazzle", "effort", "flinch", "glance", "hunger", "insect", "juggle",
"kernel", "luster", "mingle", "napkin", "object", "plunge", "quartz", "rocket", "sprint", "thrive",
"advice", "battle", "clutch", "danger", "empire", "fumble", "gather", "hammer", "injury", "jargon",
"keeper", "luxury", "moment", "nibble", "option", "puzzle", "quiver", "ribbon", "spirit", "ticket",
"unfold", "vacuum", "wealth", "yonder", "zenith", "winter", "violet", "turkey", "temper", "submit"
];
const words8 = [
"absolute", "backpack", "cylinder", "delusion", "elephant", "fidelity", "generate", "hilarity", "identify", "junction",
"keyboard", "language", "marathon", "narrator", "occasion", "passport", "quantity", "reaction", "sapphire", "template",
"umbrella", "vacation", "wildlife", "yardwork", "zeppelin", "abridged", "birthday", "classroom", "dominion", "elevator",
"furnace", "guardian", "hospital", "illusion", "junction", "keychain", "lightbulb", "migration", "narrative", "operator",
"platform", "question", "railroad", "sculptor", "treatment", "undertake", "vibration", "waterfall", "yearlong", "zeppelin"
];
const words10 = [
"abandoning", "basketball", "chivalrous", "dependable", "earthquake", "friendship", "generation", "heirlooms", "impression", "journalism",
"kaleidoses", "lumberjack", "mastermind", "navigators", "obligation", "penetrable", "quicksands", "reflection", "stargazing", "tremendous",
"adulterate", "background", "celebration", "devastator", "encouraged", "formidable", "grandparent", "headphones", "illustrate", "juxtaposed",
"knowledge", "legislation", "magnificent", "negotiator", "opposition", "particular", "questioning", "remarkable", "settlements", "traumatized",
"understand", "vulnerability", "withdrawing", "youngsters", "zigzagging", "workmanship", "ventilation", "transformed", "superficial", "sportswear"
];
const wordLists = [words4, words6, words8, words10];
  

const blank = '_';
const maxLives = 6;

var currentDifficulty = 1;
var wordToGuess = '';
var lives = maxLives;



function pickLetter(){
    this.removeEventListener('click', pickLetter);
    this.classList.add('disabled');
    console.log("lives: " + lives);
    let filled = fillBlanks(this.textContent);
    if(!filled){
        lives--;
    }
    
    _checkWin();
    _updateHangmanDisplay()
}
function fillBlanks(letter){
    const blanks = document.querySelectorAll('#blank-board .key');
    var filled = false;
    blanks.forEach(blank => {
        if (letter.toLowerCase() == blank.letter)
        {
            blank.textContent = letter.toUpperCase();
            filled = true;
        }
    })

    return filled;
}
function changeDifficulty(difficulty){
    if(difficulty == currentDifficulty){
        return;
    }
    currentDifficulty = difficulty;
    console.log("changed difficulty");
    resetGame();
}

function resetGame(){
    lives = maxLives;
    _resetLetterBoard();
    _resetBlankBoard();
    _closeResult();
    _updateHangmanDisplay(true);
    console.log(wordToGuess);
}
document.addEventListener('DOMContentLoaded', resetGame);

function _updateHangmanDisplay(reset = false){
    const bodyParts = ['right-leg', 'left-leg', 'right-arm', 'left-arm', 'torso', 'head'];

    if(reset)
    {
        bodyParts.forEach(part => {
            const element = document.querySelector('#hangman-display .' + part);
            element.style.visibility = 'hidden';
        })
        return;
    }
    const element = document.querySelector('#hangman-display .' + bodyParts[lives]);
    element.style.visibility = 'visible';
}
function _checkWin(){
    const blanks = document.querySelectorAll('#blank-board .key');
    var hasBlank = false;
    blanks.forEach(blankElement => {
        if(blankElement.textContent == blank){
            hasBlank = true;
        }
    })
    if(!hasBlank)
    {
        _displayResult(true, "You win!");
    }
    else if(lives <= 0)
    {
        _displayResult(false, "You lost.");
    }
}
function _displayResult(win, msg)
{
    const resultOverlay = document.getElementById('result-overlay');
    document.querySelector('#result-overlay h3').textContent = msg;
    document.querySelector('#result-overlay p').textContent = "The word was " + wordToGuess.toUpperCase(); 
    resultOverlay.classList.remove('hidden');

    const image = resultOverlay.querySelector('img');
    image.src = win ? 'media/alive.png' : 'media/dead.png';
    image.alt = win ? 'celebrating hangman stickman' : 'dead hangman stickman';
    console.log(image.src  + " " + image.alt);
}
function _closeResult()
{
    const resultOverlay = document.getElementById('result-overlay');
    resultOverlay.classList.add('hidden');
}



function _resetLetterBoard(){
    const letterBoard = document.getElementById('letters-board');
    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
      
    while (letterBoard.firstChild) {
        letterBoard.removeChild(letterBoard.firstChild);
      }
    alphabet.forEach((letter, index) => {
        const button = document.createElement('button');
        button.classList.add('key');
        button.textContent = letter;
        button.addEventListener("click", pickLetter);
        letterBoard.appendChild(button) 
    })
}

function _resetBlankBoard(){
    const blankBoard = document.getElementById('blank-board');
    wordToGuess = _getWord();
    wordGuessing = new Array(wordToGuess.length).fill(blank);
    
    while (blankBoard.firstChild) {
        blankBoard.removeChild(blankBoard.firstChild);
    }
    
    wordToGuess.split('').forEach(letter => {
        const span = document.createElement('span');
        span.letter = letter;
        span.classList.add('key', letter);
        span.textContent = blank;
        blankBoard.appendChild(span);
        console.log(span.classList);
    }) 
    console.log(wordToGuess);
}


function _getWord(){
    const wordList = wordLists[currentDifficulty];
    return wordList[Math.floor(Math.random() * wordList.length)];
}
