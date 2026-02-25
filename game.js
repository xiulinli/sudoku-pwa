class SudokuGame {
    constructor() {
        this.board = [];
        this.solution = [];
        this.initialBoard = [];
        this.selectedCell = null;
        this.noteMode = false;
        this.timer = null;
        this.seconds = 0;
        this.difficulty = 'easy';
        this.level = 1;
        this.difficultySettings = {
            easy: { holes: 35, time: 600 },
            medium: { holes: 45, time: 900 },
            expert: { holes: 55, time: 1200 }
        };
        this.notes = Array(81).fill(null).map(() => new Set());
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateLevelSelector();
        this.startNewGame();
    }

    setupEventListeners() {
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            this.populateLevelSelector();
            this.startNewGame();
        });

        document.getElementById('level').addEventListener('change', (e) => {
            this.level = parseInt(e.target.value);
            this.startNewGame();
        });

        document.getElementById('newGameBtn').addEventListener('click', () => this.startNewGame());
        document.getElementById('hintBtn').addEventListener('click', () => this.provideHint());
        document.getElementById('noteModeBtn').addEventListener('click', () => this.toggleNoteMode());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());

        document.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const num = parseInt(e.target.dataset.num);
                this.handleNumberInput(num);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9') {
                this.handleNumberInput(parseInt(e.key));
            } else if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') {
                this.handleNumberInput(0);
            } else if (e.key === 'n' || e.key === 'N') {
                this.toggleNoteMode();
            } else if (e.key === 'h' || e.key === 'H') {
                this.provideHint();
            }
        });
    }

    populateLevelSelector() {
        const levelSelect = document.getElementById('level');
        levelSelect.innerHTML = '';
        for (let i = 1; i <= 30; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `第 ${i} 关`;
            levelSelect.appendChild(option);
        }
        levelSelect.value = 1;
    }

    startNewGame() {
        this.stopTimer();
        this.seconds = 0;
        this.updateTimerDisplay();
        this.generatePuzzle();
        this.renderBoard();
        this.startTimer();
        this.hideMessage();
    }

    generatePuzzle() {
        this.solution = this.generateSolution();
        this.initialBoard = this.createPuzzle(this.solution, this.difficultySettings[this.difficulty].holes);
        this.board = this.initialBoard.map(row => [...row]);
        this.notes = Array(81).fill(null).map(() => new Set());
    }

    generateSolution() {
        const board = Array(9).fill(null).map(() => Array(9).fill(0));
        this.fillBoard(board);
        return board;
    }

    fillBoard(board) {
        const emptyCell = this.findEmptyCell(board);
        if (!emptyCell) return true;

        const [row, col] = emptyCell;
        const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (const num of numbers) {
            if (this.isValidMove(board, row, col, num)) {
                board[row][col] = num;
                if (this.fillBoard(board)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }

    findEmptyCell(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) return [i, j];
            }
        }
        return null;
    }

    isValidMove(board, row, col, num, checkInitialBoard = false) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
            if (board[i][col] === num) return false;
            if (checkInitialBoard) {
                if (this.initialBoard[row][i] === num) return false;
                if (this.initialBoard[i][col] === num) return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
                if (checkInitialBoard) {
                    if (this.initialBoard[startRow + i][startCol + j] === num) return false;
                }
            }
        }
        return true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createPuzzle(solution, holes) {
        const puzzle = solution.map(row => [...row]);
        let holesCreated = 0;
        const positions = this.shuffleArray([...Array(81).keys()]);

        for (const pos of positions) {
            if (holesCreated >= holes) break;
            const row = Math.floor(pos / 9);
            const col = pos % 9;
            puzzle[row][col] = 0;
            holesCreated++;
        }
        return puzzle;
    }

    renderBoard() {
        const boardElement = document.getElementById('sudokuBoard');
        boardElement.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;

                if (this.initialBoard[i][j] !== 0) {
                    cell.classList.add('fixed');
                    cell.textContent = this.initialBoard[i][j];
                } else if (this.board[i][j] !== 0) {
                    cell.textContent = this.board[i][j];
                } else {
                    this.renderNotes(cell, i, j);
                }

                cell.addEventListener('click', () => this.selectCell(i, j));
                boardElement.appendChild(cell);
            }
        }
    }

    renderNotes(cell, row, col) {
        cell.innerHTML = '';
        cell.classList.add('notes');
        const cellNotes = this.notes[row * 9 + col];
        for (let num = 1; num <= 9; num++) {
            const note = document.createElement('div');
            note.className = 'note';
            if (cellNotes.has(num)) {
                note.textContent = num;
            }
            cell.appendChild(note);
        }
    }

    selectCell(row, col) {
        this.selectedCell = { row, col };
        this.highlightCells();
    }

    highlightCells() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('selected', 'highlighted', 'same-number');
        });

        if (!this.selectedCell) return;

        const { row, col } = this.selectedCell;
        const selectedCellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        selectedCellElement.classList.add('selected');

        const selectedValue = this.board[row][col] || this.initialBoard[row][col];

        cells.forEach(cell => {
            const cellRow = parseInt(cell.dataset.row);
            const cellCol = parseInt(cell.dataset.col);

            if (cellRow === row || cellCol === col || 
                (Math.floor(cellRow / 3) === Math.floor(row / 3) && 
                 Math.floor(cellCol / 3) === Math.floor(col / 3))) {
                cell.classList.add('highlighted');
            }

            if (selectedValue !== 0) {
                const cellValue = this.board[cellRow][cellCol] || this.initialBoard[cellRow][cellCol];
                if (cellValue === selectedValue) {
                    cell.classList.add('same-number');
                }
            }
        });
    }

    handleNumberInput(num) {
        if (!this.selectedCell) return;

        const { row, col } = this.selectedCell;
        if (this.initialBoard[row][col] !== 0) return;

        if (this.noteMode && num !== 0) {
            const noteIndex = row * 9 + col;
            if (this.notes[noteIndex].has(num)) {
                this.notes[noteIndex].delete(num);
            } else {
                this.notes[noteIndex].add(num);
            }
            this.board[row][col] = 0;
        } else {
            this.board[row][col] = num;
            this.notes[row * 9 + col].clear();
        }

        this.renderBoard();
        this.highlightCells();
        this.checkWin();
    }

    toggleNoteMode() {
        this.noteMode = !this.noteMode;
        const btn = document.getElementById('noteModeBtn');
        btn.classList.toggle('active', this.noteMode);
    }

    provideHint() {
        if (!this.selectedCell) {
            this.showMessage('请先选择一个格子', 'error');
            return;
        }

        const { row, col } = this.selectedCell;
        if (this.board[row][col] === this.solution[row][col]) {
            this.showMessage('这个格子已经是正确的了', 'error');
            return;
        }

        this.board[row][col] = this.solution[row][col];
        this.notes[row * 9 + col].clear();
        this.renderBoard();
        this.highlightCells();
        this.checkWin();
    }

    resetGame() {
        this.board = this.initialBoard.map(row => [...row]);
        this.notes = Array(81).fill(null).map(() => new Set());
        this.renderBoard();
        this.hideMessage();
    }

    checkWin() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] !== this.solution[i][j]) {
                    return false;
                }
            }
        }
        this.stopTimer();
        this.showMessage('恭喜！你成功完成了数独！', 'success');
        return true;
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            this.updateTimerDisplay();
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.seconds / 60);
        const seconds = this.seconds % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    showMessage(text, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
    }

    hideMessage() {
        const messageElement = document.getElementById('message');
        messageElement.className = 'message';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});