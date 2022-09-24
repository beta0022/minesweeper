'use strict'

const MINE = '💣'
const CELL = ' '
const FLAG = '🚩'

const gLevel = {
    begginer: {
        SIZE: 4,
        MINES: 2
    },
    medium: {
        SIZE: 8,
        MINES: 16
    },
    expert: {
        SIZE: 12,
        MINES: 32
    }
}

let minesAroundCount = 0

let shownCount = 0
let markedCount = 0

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

let gTimerInterval
let gMilliseconds = 0
let gSeconds = 0

let gBoard;

let gBoardSize = gLevel.begginer.SIZE

let minesCount = gLevel.begginer.MINES

minesCount = document.querySelector("[mines-count]")
minesCount.textContent = gLevel.begginer.MINES


function initGame() {
    console.log('Good Luck')

    buildBoard()
    renderBoard()
}

function createCell(){
    return {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
}


function buildBoard() {
    gBoard = []

    for (var i = 0; i < gBoardSize; i++) {
        gBoard[i] = []

        for (var j = 0; j < gBoardSize; j++) {
            gBoard[i][j] = createCell()
        }
    }

    console.table(gBoard)
}


function renderBoard() {

        const elTable = document.getElementById("game-board")
        var strHTML = ''
    
        for (var i = 0; i < gBoardSize; i++) {
    
            strHTML += '<tr>\n'
    
            for (var j = 0; j < gBoardSize; j++) {
    
                  strHTML += `\t<td class="cell c${i}-${j}" oncontextmenu=cellMarked(event,${i}-${j}) onclick="cellClick( ${i}, ${j})"></td>\n`
            }
            strHTML += '</tr>\n'
        }
    
        elTable.innerHTML = strHTML
}
    



function cellClick(event, elCell, i, j) {
    console.log('cellClicked () called' )
    
    if (!gGame.isOn){
        console.log('Game Starting!');
        gGame.isOn = true
        gTimerInterval = setInterval(displayTimer, 10)
        setMinesAfterFirstClick(i,j)
        setMinesAroundCount ()
        console.log(gBoard);
    } 
    
}

function setMinesAfterFirstClick(i,j){
    let counter = 0;
    while(counter < gLevel.begginer.MINES) {
        const randomI = getRandomInt(0, gLevel.begginer.SIZE)
        const randomJ = getRandomInt(0, gLevel.begginer.SIZE)

        if (randomI === i && randomJ === j) {
            console.log('HERE');
            continue
        }

        if (gBoard[randomI][randomJ].isMine) continue 

        gBoard[randomI][randomJ].isMine = true
        counter++
    }
}

function displayTimer() {
    gMilliseconds += 10
    if (gMilliseconds === 1000) {
        gMilliseconds = 0
        gSeconds++
    }
    let seconds;

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


function cellMarked(event, i,j){
    console.log('right click ()');
    event.preventDefault()

    if (!gGame.isOn){
        gGame.isOn = true
        gTimerInterval = setInterval(displayTimer, 10)
        setMinesAfterFirstClick(i,j)
        setMinesAroundCount ()
        console.log(gBoard);
    } 
}

function setMinesAroundCount (){
    for (let i = 0; i < gLevel.begginer.SIZE; i++) {

        for (let j = 0; j < gLevel.begginer.SIZE; j++) {

            const currLocation = {i,j}

            const minesAroundLocation = getAllMinesAroundLocation(currLocation) // [{0,0},{4,5}]
            console.log(minesAroundLocation);
            gBoard[i][j].minesAroundCount = minesAroundLocation.length
            
        }
        
    }
}



function getAllMinesAroundLocation(location) {
    const minesAroundLoc = [] 

    for (let i = location.i - 1; i < location.i + 1; i++) {
        
        if(i < 0 || i > gLevel.begginer.SIZE - 1) continue

        for (let j = location.j - 1; j < location.j + 1; j++) {

            if(j < 0 || j > gLevel.begginer.SIZE - 1) continue

            if(location.i === i && location.j === j) continue

            if (gBoard[i][j].isShown || gBoard[i][j].isMarked) continue

            if(gBoard[i][j].isMine) minesAroundLoc.push({i,j})
            
        }
        
    }
    return minesAroundLoc
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}