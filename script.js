const gameboard = (() => {
    const firstRow = ['', '', ''];
    const secondRow = ['', '', ''];
    const thirdRow = ['', '', ''];
    return [firstRow, secondRow, thirdRow];
})();

const player = (name, mark, score) => {
    return {
        name,
        mark,
        score
    };
}

const playerOne = player('', '', 0);
const playerTwo = player('', '', 0);
const instruction = document.querySelector("#instruction");
const message = document.querySelector(".message");

buildPlayerInputs();
listenSubmitPlayers()

function listenSubmitPlayers() {
    let submitPlayersBtn = document.querySelector("#submitPlayers");
    submitPlayersBtn.addEventListener('click', (e) => {
        let nameP1 = document.querySelector("#nameP1").value;
        let markP1 = document.querySelector("#markP1").value;
        let nameP2 = document.querySelector("#nameP2").value;
        let markP2 = document.querySelector("#markP2").value;

        if (
            nameP1 === '' || nameP1 === null ||
            markP1 === '' || markP1 === null ||
            nameP2 === '' || nameP2 === null ||
            markP2 === '' || markP2 === null
        ) {
            instruction.textContent = "Please enter all inputs."
        } else if (nameP1 === nameP2) {
            instruction.textContent = "Players cannot have the same name."
        } else if (markP1 === markP2) {
            instruction.textContent = "Players cannot have the same mark."
        } else {
            playerOne.name = nameP1;
            playerOne.mark = markP1;
            playerTwo.name = nameP2;
            playerTwo.mark = markP2;

            const gamestarterDiv = document.querySelector(".gamestarter");
            while (gamestarterDiv.firstChild) {
                gamestarterDiv.removeChild(gamestarterDiv.lastChild);
            }

            buildGameboard();
            instruction.textContent = `${playerOne.name} goes first!`;
            instruction.classList = playerOne.mark;
        }
    })
}

function buildPlayerInputs() {
    const gamestarterDiv = document.querySelector(".gamestarter");

    let nameP1Label = document.createElement('label');
    nameP1Label.setAttribute("for", "nameP1");
    nameP1Label.textContent = "Player 1 Name: ";

    let nameP1Input = document.createElement('input');
    nameP1Input.setAttribute("name", "nameP1");
    nameP1Input.setAttribute("id", "nameP1");
    nameP1Input.required = true;
    nameP1Input.setAttribute("placeholder", "Enter P1's name here");

    let markP1Label = document.createElement('label');
    markP1Label.setAttribute("for", "markP1");
    markP1Label.textContent = "Player 1 Mark: ";

    let markP1Input = document.createElement('input');
    markP1Input.setAttribute("mark", "markP1");
    markP1Input.setAttribute("id", "markP1");
    markP1Input.setAttribute("maxlength", "1");
    markP1Input.required = true;
    markP1Input.setAttribute("placeholder", "Enter one letter or number");

    let nameP2Label = document.createElement('label');
    nameP2Label.setAttribute("for", "nameP2");
    nameP2Label.textContent = "Player 2 Name: ";

    let nameP2Input = document.createElement('input');
    nameP2Input.setAttribute("name", "nameP2");
    nameP2Input.setAttribute("id", "nameP2");
    nameP2Input.required = true;
    nameP2Input.setAttribute("placeholder", "Enter P2's name here");

    let markP2Label = document.createElement('label');
    markP2Label.setAttribute("for", "markP2");
    markP2Label.textContent = "Player 2 Mark: ";

    let markP2Input = document.createElement('input');
    markP2Input.setAttribute("mark", "markP2");
    markP2Input.setAttribute("id", "markP2");
    markP2Input.setAttribute("maxlength", "1");
    markP2Input.required = true;
    markP2Input.setAttribute("placeholder", "Enter one letter or number");

    let submitPlayersBtn = document.createElement('button');
    submitPlayersBtn.type = "button";
    submitPlayersBtn.setAttribute("id", "submitPlayers");
    submitPlayersBtn.textContent = "START GAME";

    gamestarterDiv.appendChild(nameP1Label).appendChild(nameP1Input);
    gamestarterDiv.appendChild(markP1Label).appendChild(markP1Input);
    gamestarterDiv.appendChild(nameP2Label).appendChild(nameP2Input);
    gamestarterDiv.appendChild(markP2Label).appendChild(markP2Input);
    gamestarterDiv.appendChild(submitPlayersBtn);

}

function buildGameboard() {
    const gameboardDiv = document.querySelector('.gameboard');
    
    gameboard.forEach((row, rowIndex) => {
        let newRow = document.createElement('div');
        newRow.classList = "row";
        newRow.setAttribute("id", rowIndex);

        row.forEach((column, colIndex) => {
            let newColumn = document.createElement('div');
            newColumn.classList = "column";
            newColumn.setAttribute("id", colIndex);
            newColumn.textContent = column;

            newColumn.addEventListener('click', (e) => {
                playerMove(newColumn);
            })

            newRow.appendChild(newColumn);
        })

        gameboardDiv.appendChild(newRow);
    })

}

function playerMove(space) {
    message.textContent = ""; // Reset message on each click

    let row = space.parentElement.id;
    let column = space.id;

    if (gameboard[row][column] === '') {

        if (instruction.classList.value === playerOne.mark) {

            gameboard[row][column] = playerOne.mark;

            instruction.classList = playerTwo.mark;
            instruction.textContent = `${playerTwo.name} goes next!`;

        } else if (instruction.classList.value === playerTwo.mark) {

            gameboard[row][column] = playerTwo.mark;

            instruction.classList = playerOne.mark;
            instruction.textContent = `${playerOne.name} goes next!`;

        }
        space.textContent = gameboard[row][column];
        message.textContent = checkRows();
    } else {
        message.textContent = "Hey! That space is already taken.";
    }
}

function checkRows() {
    let winnerMessage;
    gameboard.forEach((row) => {
        if (row[0] === '' && row[1] === '' && row[2] === '') {
            // Do nothing
            console.log("do nothing because row[all] === ''");
        } else if (row[0] !== row[1] || row[0] !== row[2] || row[1] !== row[2]) {
            // Do nothing
            console.log("do nothing because row[i] !== row[i]");
        } else {
            console.log("someone wins");
            if (row[0] === playerOne.mark) {
                playerOne.score += 1;
                winnerMessage = `${playerOne.name} wins this round!`;
            } else if (row[0] === playerTwo.mark) {
                playerTwo.score += 1;
                winnerMessage = `${playerTwo.name} wins this round!`;
            }
            clearGameboard();
            buildGameboard();
        }
    })
    return winnerMessage;
}

function clearGameboard() {
    const gameboardDiv = document.querySelector('.gameboard');
    while (gameboardDiv.firstChild) {
        gameboard[gameboardDiv.lastChild.id] = ['','',''];
        gameboardDiv.removeChild(gameboardDiv.lastChild);
    }
}