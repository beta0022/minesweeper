// set 3 levels game
function setLevel(size, mines) {
    gLevel.size = size
    gLevel.mines = mines

    initGame()
}


// timer
let gTimerInterval
let gMilliseconds = 0
let gSeconds = 0

function displayTimer() {

    gMilliseconds += 10
    if (gMilliseconds === 1000) {
        gMilliseconds = 0
        gSeconds++
    }

    let seconds
    if(gSeconds < 10){
        seconds = '00' + gSeconds
    }else{
        if(gSeconds < 100){
            seconds = '0' + gSeconds
        }else{
            seconds = gSeconds
        }
    }
    
    let elTimer = document.querySelector('.timer')
    elTimer.innerText = `${seconds}`

}


// reset the game
function resetGame() {

    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.isOn = false

    if (gTimerInterval) clearInterval(gTimerInterval)

    initGame()
}


// clicking a cell with “number” reveals the number of this cell
function numberColor(num) {
    switch (num) {
          case 1:
            return 'one';
          case 2:
            return 'two';
          case 3:
            return 'three';
          case 4:
            return 'four';
          case 5:
            return 'five';
          case 6:
            return 'six';
          case 7:
            return 'seven';
          case 8:
            return 'eight';
          default:
            return null;
    }
}


//random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}