//---------------------------------------------
// CONFIGURACIÓN DEL JUEGO
//---------------------------------------------
const DICTIONARY = window.WORDS;

// y luego validar:
const SOLUTION_WORD = "pinta";  // palabra correcta en minúsculas
const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

//---------------------------------------------
// ELEMENTOS DEL DOM
//---------------------------------------------
const board = document.getElementById("board");

//---------------------------------------------
// LOCAL STORAGE
//---------------------------------------------
function loadGame() {
    const saved = localStorage.getItem("wordle_pilarvida");
    if (saved) return JSON.parse(saved);

    return {
        solution: SOLUTION_WORD,
        attempts: [],
        row: 0,
        finished: false
    };
}

let game = loadGame();

function saveGame() {
    localStorage.setItem("wordle_pilarvida", JSON.stringify(game));
}

function resetGame() {
    localStorage.removeItem("wordle_pilarvida");
    location.reload();
}

//---------------------------------------------
// CREAR TABLERO
//---------------------------------------------
function createBoard() {
    board.innerHTML = "";

    for (let r = 0; r < MAX_ATTEMPTS; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.id = "row-" + r;

        for (let c = 0; c < WORD_LENGTH; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }

        board.appendChild(row);
    }
}

createBoard();

//---------------------------------------------
// DIBUJAR LETRAS
//---------------------------------------------
function drawWordOnBoard(word, rowIndex) {
    const row = document.getElementById("row-" + rowIndex);
    const cells = row.querySelectorAll(".cell");

    word.split("").forEach((letter, i) => {
        cells[i].textContent = letter.toUpperCase();
    });
}

//---------------------------------------------
// COLORACIÓN ESTILO WORDLE (gestiona letras repetidas)
//---------------------------------------------
function evaluateWord(guess, solution) {
    const result = Array(WORD_LENGTH).fill("absent");
    const solutionLetters = solution.split("");

    // Primero: marcar verdes
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === solution[i]) {
            result[i] = "correct";
            solutionLetters[i] = null; 
        }
    }

    // Segundo: marcar amarillos
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (result[i] === "correct") continue;

        const idx = solutionLetters.indexOf(guess[i]);
        if (idx !== -1) {
            result[i] = "present";
            solutionLetters[idx] = null; 
        }
    }

    return result;
}

function colorizeRow(word, solution, rowIndex) {
    const row = document.getElementById("row-" + rowIndex);
    const cells = row.querySelectorAll(".cell");

    const evalResult = evaluateWord(word, solution);

    evalResult.forEach((status, i) => {
        cells[i].classList.add(status);
    });

    updateKeyboard(word.toUpperCase(), evalResult);
}

//---------------------------------------------
// RECONSTRUIR PARTIDA
//---------------------------------------------
function rebuildBoard() {
    game.attempts.forEach((word, i) => {
        drawWordOnBoard(word, i);
        colorizeRow(word, game.solution, i);
    });

    if (game.finished) {
        if (game.attempts.includes(game.solution)) showWin();
        else showLose();
    }
}

rebuildBoard();

//---------------------------------------------
// TECLADO FÍSICO
//---------------------------------------------
let currentWord = "";

document.addEventListener("keydown", (e) => {
    if (game.finished) return;

    if (/^[a-zA-Z]$/.test(e.key) && currentWord.length < WORD_LENGTH) {
        currentWord += e.key.toLowerCase();
        updateCurrentRow();
    }

    if (e.key === "Backspace") {
        currentWord = currentWord.slice(0, -1);
        updateCurrentRow();
    }

    if (e.key === "Enter" && currentWord.length === WORD_LENGTH) {
        submitWord(currentWord);
        currentWord = "";
    }
});

//---------------------------------------------
// TECLADO VIRTUAL
//---------------------------------------------
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", () => {
        const letter = key.textContent;

        if (letter === "ENTER") {
            if (currentWord.length === WORD_LENGTH) {
                submitWord(currentWord);
                currentWord = "";
            }
            return;
        }

        if (letter === "⌫") {
            currentWord = currentWord.slice(0, -1);
            updateCurrentRow();
            return;
        }

        if (/^[A-Z]$/.test(letter) && currentWord.length < WORD_LENGTH) {
            currentWord += letter.toLowerCase();
            updateCurrentRow();
        }
    });
});

//---------------------------------------------
// ACTUALIZAR TECLADO
//---------------------------------------------
function updateKeyboard(guess, evalResult) {
    guess.split("").forEach((letter, i) => {
        const keyBtn = [...document.querySelectorAll(".key")]
            .find(k => k.textContent === letter);

        if (!keyBtn) return;

        if (evalResult[i] === "correct") {
            keyBtn.classList.remove("present", "absent");
            keyBtn.classList.add("correct");
        }
        else if (evalResult[i] === "present" && !keyBtn.classList.contains("correct")) {
            keyBtn.classList.add("present");
        }
        else if (!keyBtn.classList.contains("correct") && !keyBtn.classList.contains("present")) {
            keyBtn.classList.add("absent");
        }
    });
}

//---------------------------------------------
// ACTUALIZAR FILA ACTUAL
//---------------------------------------------
function updateCurrentRow() {
    const row = document.getElementById("row-" + game.row);
    const cells = row.querySelectorAll(".cell");

    cells.forEach((cell, i) => {
        cell.textContent = currentWord[i] ? currentWord[i].toUpperCase() : "";
    });
}

//---------------------------------------------
// ENVIAR PALABRA
//---------------------------------------------
function submitWord(word) {
    if (game.finished) return;

    const guess = word.toUpperCase();
    
    if (!DICTIONARY.includes(guess.toUpperCase())) {
    alert('La palabra no existe');
    return;
}

    drawWordOnBoard(word, game.row);
    colorizeRow(word, game.solution, game.row);

    game.attempts.push(word);
    game.row++;

    saveGame();

    if (word === game.solution) {
        game.finished = true;
        saveGame();
        showWin();
        return;
    }

    if (game.row === MAX_ATTEMPTS) {
        game.finished = true;
        saveGame();
        showLose();
    }
}

//---------------------------------------------
// MENSAJES
//---------------------------------------------
function showWin() {
    setTimeout(() => alert("🎉 ¡Has acertado la palabra!"), 200);
}

function showLose() {
    setTimeout(() => alert("💀 Se acabaron los intentos. La palabra era: " + game.solution.toUpperCase()), 200);
}

//---------------------------------------------
// BOTÓN VOLVER
//---------------------------------------------
document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
});
