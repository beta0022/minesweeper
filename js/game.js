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

const gBoard = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true
}

let shownCount = 0
let markedCount = 0

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

let board = []

let gBoardSize = gLevel.begginer.SIZE

let minesCount = gLevel.begginer.MINES

minesCount = document.querySelector("[mines-count]")
minesCount.textContent = gLevel.begginer.MINES


function initGame() {
    console.log('Good Luck')

    board = buildBoard()
    renderBoard()
}


function buildBoard() {
    let board = []

    for (var i = 0; i < gBoardSize; i++) {
        board.push([])

        for (var j = 0; j < gBoardSize; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    console.table(board)
    return board
}


function renderBoard() {

        const elTable = document.getElementById("game-board")
        var strHTML = ''
    
        for (var i = 0; i < gBoardSize; i++) {
    
            strHTML += '<tr>\n'
    
            for (var j = 0; j < gBoardSize; j++) {
    
                  strHTML += `\t<td class="cell c${i}-${j}" onmousedown="click(event, ${i}, ${j})"></td>\n`
            }
            strHTML += '</tr>\n'
        }
    
        elTable.innerHTML = strHTML
}


function randomLocations(gBoard) {
    
    for (var i = 0; i < gLevel.begginer.MINES ; i++) {

        let i = getRandomInt(0, gBoardSize)
        let j = getRandomInt(0, gBoardSize)
    
        gBoard[i][j] = MINE
    }
    return
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}


function click(event, elCell, i, j) {

    if (event.button === 0) cellClicked(elCell, i, j)
    else if (event.button === 2) cellMarked(elCell)
    //secsPassed() on

}


function cellMarked(elCell){

    gBoard[i][j].isMarked = true

    if (gBoard[i][j].isMine = true) gGame.markedCount++
    checkGameOver()
}


// function cellClicked(elCell, i, j){
//     if (gBoard.isMine = true) {
//         checkGameOver() && //revealing all MINES cells
//     }

//     if (gBoard[i][j].minesAroundCount > 0) {
//         gBoard[i][j].isShown = true
//     } else {
//         expandShown (i,j)
//     }

// }

function neighbor () {
   // when click on empty cell
}

// setMinesNegsCount(board){

//     //Count mines around each cell and set the cell's minesAroundCount.
// }

function expandShown (){
    //When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors. NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors.
}

function checkGameOver(){

    gGame.isOn = false
    console.log('Game Over')
    //stop secsPassed()

    //lose if gBoard[i][j].isMarked = true and revealing all MINES cells

    //win if gGame.markedCount===gLevel.begginer.mines && all the cell revealed 
}


function secsPassed(){

}