"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GameBoard = () => {
    const [board, setBoard] = useState([
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
    ]);

    const [playerTurn, setPlayerTurn] = useState(true);
    const [turnsCounter, setTurnsCounter] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [totalGames, setTotalGames] = useState(0);

    const resetBoard = () => {
        setBoard([
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
        ]);
        if (gameEnded) {
            setGameEnded(false);
            setPlayerTurn(true); // Player starts after reset
            setTurnsCounter(0);
        }
    };

    const handleCellClick = (rowNumber, cellNumber) => {
        const winningSymbol = board[rowNumber][cellNumber];
        if (gameEnded) {
            alert("The Game is Ended, restarting Board...");
            resetBoard();
            return;
        }
        if (winningSymbol === "X" || winningSymbol === "O") {
            alert("This cell is already taken. Please select another cell.");
            return;
        }

        // Player move
        updateBoard(rowNumber, cellNumber, "X");
    };

    const computerMove = () => {
        // List available cells
        // If the game has ended, don't proceed with the computer's move
        if (gameEnded) return;

        const availableCells = [];
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell !== "X" && cell !== "O") {
                    availableCells.push({ rowIndex, cellIndex });
                }
            });
        });

        // Randomly select an available cell
        if (availableCells.length > 0 && !gameEnded) {
            const randomCell =
                availableCells[Math.floor(Math.random() * availableCells.length)];
            updateBoard(randomCell.rowIndex, randomCell.cellIndex, "O");
        }
    };

    const updateBoard = (rowNumber, cellNumber, symbol) => {
        // Create the new board state first
        const newBoard = board.map((row, i) =>
            row.map((cell, j) =>
                i === rowNumber && j === cellNumber ? symbol : cell
            )
        );

        // Update the board state
        setBoard(newBoard);
        setPlayerTurn(!playerTurn);
        setTurnsCounter((prev) => prev + 1);

        // Check for a win with the new board state after state has been updated
        checkForWin(newBoard, symbol);
    };

    const checkForWin = (currentBoard, symbol) => {
        const lines = [
            [
                [0, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [2, 0],
                [2, 1],
                [2, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 2],
                [1, 2],
                [2, 2],
            ],
            [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            [
                [0, 2],
                [1, 1],
                [2, 0],
            ],
        ];

        let winnerDetected = false;

        for (let line of lines) {
            const [[a, b], [c, d], [e, f]] = line;
            if (
                currentBoard[a][b] === currentBoard[c][d] &&
                currentBoard[a][b] === currentBoard[e][f]
            ) {
                const winner = currentBoard[a][b];
                if (winner === symbol) {
                    // Compare with 'symbol' passed into the function
                    winnerDetected = true;
                    if (winner === "X") {
                        setPlayerScore((score) => score + 1);
                    } else {
                        setComputerScore((score) => score + 1);
                    }
                    alert(winner === "X" ? "You Win!" : "Computer Wins!");
                    setTotalGames((games) => games + 1);
                    setGameEnded(true); // Move this line here to prevent multiple alerts
                    return;
                }
            }
        }

        if (!winnerDetected) {
            // Check for a tie only if all cells are filled and no winner is found
            const allCellsFilled = currentBoard.every((row) =>
                row.every((cell) => cell === "X" || cell === "O")
            );
            if (allCellsFilled) {
                alert("It's a tie!");
                setTotalGames((games) => games + 1);
                setGameEnded(true); // This was missing in your previous logic
            }
        }
    };

    // Trigger computer's move when it's its turn
    useEffect(() => {
        let timeoutId;
        if (!playerTurn && !gameEnded) {
            timeoutId = setTimeout(computerMove, 300);
        }
        // Cleanup function to clear timeout if the game ends or component unmounts
        return () => clearTimeout(timeoutId);
    }, [playerTurn, gameEnded]);

    return (
        <div
            className="flex flex-col items-center justify-center w-[50%] h-fit bg-white p-5 rounded-2xl relative"
            style={{ boxShadow: "0 0 40px #00000030" }}
        >
            <button className="absolute bg-red-300 left-0 top-0 p-3 hover:bg-black hover:text-white rounded-ss-2xl">
                <Link href="/">Back</Link>
            </button>
            <h1 className="text-4xl font-thin">Game Board</h1>
            <div className="text-center my-4">
                <p>Player Score: {playerScore}</p>
                <p>Computer Score: {computerScore}</p>
                <p>Total Games: {totalGames}</p>
            </div>
            <div className="flex flex-col items-center justify-center w-[60vh] h-[60vh] text-3xl">
                {board.map((row, rowIdx) => (
                    <div
                        className="flex justify-center w-full bg-slate-800 border-t-2 border-b-2 border-r-2 border-l-2 border-indigo-600"
                        key={rowIdx}
                    >
                        {row.map((cell, cellIdx) => (
                            <div
                                onClick={() =>
                                    ((playerTurn && !gameEnded) || (!playerTurn && gameEnded)) &&
                                    handleCellClick(rowIdx, cellIdx)
                                }
                                className={`p-10 cursor-pointer center hover:bg-slate-200 w-full h-full flex justify-center items-center border-solid border-t-2 border-b-2 border-r-2 border-l-2 border-indigo-600
                                            ${cell === "X"
                                        ? "bg-green-400 text-white"
                                        : cell === "O"
                                            ? "bg-red-400 text-black"
                                            : "text-white"
                                    } ${rowIdx === 1 && "border-t-0 border-b-0"
                                    } ${rowIdx === 0 && "border-b-0"} ${rowIdx === 2 && "border-t-0"
                                    }`}
                                key={cellIdx}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {gameEnded && (
                <button
                    className="bg-green-400 text-white p-3 rounded-2xl hover:bg-green-800"
                    onClick={resetBoard}
                >
                    Reset Board
                </button>
            )}
        </div>
    );
};

export default GameBoard;
