'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ' '

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


let gLevel = {
    size: 4,
    mines: 2,
}

let minesCount = gLevel.mines

minesCount = document.querySelector("[mines-count]")
minesCount.textContent = gLevel.mines


let gBoard
let gIsGameOver
let minesAroundCount = 0
let shownCount = 0
let markedCount = 0


// when page loads
function initGame() {
    console.log('Good Luck')

    buildBoard()
    renderBoard()
    gIsGameOver = false
}


// builds the board
function buildBoard() {
    gBoard = []
    
    for (var i = 0; i < gLevel.size; i++) {
        gBoard[i] = []
        
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j] = createCell()
        }
    }
    
    console.table(gBoard)
}


// builds each cell
function createCell(){
    return {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
}


// render the game
function renderBoard() {

        const elTable = document.getElementById("game-board")
        var strHTML = ''
    
        for (var i = 0; i < gLevel.size; i++) {
    
            strHTML += '<tr>\n'
    
            for (var j = 0; j < gLevel.size; j++) {

                let className = `cell c${i}-${j}`
                let currentCell = gBoard[i][j]           

                    // if cell is marked show flag
                    if (currentCell.isMarked) {
                        currentCell = FLAG

                    } else if (currentCell.isShown) {
                        // if cell shown, #1 check if mine and show mine
                        if (currentCell.isMine) {
                            currentCell = MINE

                        // cell is shown, #2 check if not a mine and show a number of mines around
                        } else {
                            currentCell = currentCell.minesAroundCount

                            if (!currentCell){
                            currentCell = EMPTY
                            }
                        } 

                        className += ` shown ${numberColor(currentCell)}`

                    } else {
                        currentCell = EMPTY

                    }
    
                strHTML += `\t<td class="${className}"oncontextmenu=cellMarked(event,${i},${j}) onclick="cellClick(event,${i},${j})">${currentCell}</td>\n`
            }
            strHTML += '</tr>\n'
        }
    
        elTable.innerHTML = strHTML
        console.log('gBoard',gBoard)
}
    

// left click
function cellClick(event, i, j) {

    let currentCell = gBoard[i][j]
    console.log('left cellClick()', currentCell)

    // click on a mine, reveal the mine, stop timer
    if (currentCell.isMine){
        currentCell.isShown = true
        currentCell = MINE
        gIsGameOver = true
        clearInterval(gTimerInterval)
        return

    } else {

        // first click of the game
        if (!gGame.isOn){
            console.log('Game is on')
            gGame.isOn = true
            currentCell.isShown = true
            gTimerInterval = setInterval(displayTimer, 10)
            setMinesAfterFirstClick(i,j)
            setMinesAroundCount ()
        } 

        // cant click on a currect cell
        if (currentCell.isMarked) return
        if (currentCell.isShown) return

        // click on not a mine cell and its not the first click
        if (!currentCell.isMine){
            (currentCell.minesAroundCount === 0) 
            // show cell, number with mines around it
            currentCell.isShown = true
            gGame.shownCount++
        }

    }

    // empty cell without neighbors
    
    // cell with neighbors – reveal the cell alone


    renderBoard()
}


// right click
function cellMarked(event, i,j){
    let currCell = gBoard[i][j]
    console.log('right click()', currCell)

    // cancel default menu popping on mouse right
    event.preventDefault()

    // first click of the game
    if (!gGame.isOn){
        gGame.isOn = true
        gTimerInterval = setInterval(displayTimer, 10)
        setMinesAfterFirstClick(i,j)
        setMinesAroundCount ()
    } 


    // flags/unflags cell
    if (currCell.isShown) {
        currCell.isMarked = true
        markedCount++
        return
        
    } else {
        currCell.isMarked = false
        markedCount--
        return
      }
        
    renderBoard()
}


// set mines at random locations
function setMinesAfterFirstClick(i,j){
    minesAroundCount = 0 //count 

    while(minesAroundCount < gLevel.mines) {
        const randomI = getRandomInt(0, gLevel.size)
        const randomJ = getRandomInt(0, gLevel.size)

        // first clicked cell is never a mine
        if (randomI === i && randomJ === j) continue

        // current cell is already mine
        if (gBoard[randomI][randomJ].isMine) continue 

        gBoard[randomI][randomJ].isMine = true
        minesAroundCount++
    }
}


// count mines around each cell
function setMinesAroundCount (){

    for (let i = 0; i < gLevel.size; i++) {

        for (let j = 0; j < gLevel.size; j++) {

            const currLocation = {i,j}

            const minesAroundLocation = getAllMinesAroundLocation(currLocation)
            gBoard[i][j].minesAroundCount = minesAroundLocation.length
            
        }
    }
}


function getAllMinesAroundLocation(location) {
    const minesAroundLoc = []

    // iterate from row above and row below
    for (let i = location.i - 1; i < location.i + 1; i++) {
        
        // check if is the edge of the board
        if(i < 0 || i > gLevel.size - 1) continue

        for (let j = location.j - 1; j < location.j + 1; j++) {

            if(j < 0 || j > gLevel.size - 1) continue

            // dont check the current cell 
            if(location.i === i && location.j === j) continue

            // if the cell is marked or shown
            if (gBoard[i][j].isShown || gBoard[i][j].isMarked) continue

            // check if current neighbor cell is a mine
            if(gBoard[i][j].isMine) minesAroundLoc.push({i,j})
            
        }
        
    }
    return minesAroundLoc
}


// game ends when all mines are marked, and all the other cells are shown
function checkGameOver(){
    
}


/* Lives
Add support for “LIVES” -
The user has 3 LIVES:
When a MINE is clicked, there is an indication to the user that he clicked a mine. The LIVES counter decreases. The user can continue playing
*/

/* Smiley
Add smiley (feel free to switch icons \ images):
● Normal 😃
● Sad & Dead – LOSE 🤯 (stepped on a mine)
● Sunglasses – WIN 😎
● Clicking the smiley should reset the game
*/