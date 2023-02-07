import React from "react";
import "./style.css";

const Square = ({value, onSquareClick}) => {
  return (
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  )
}

const Board = ({xIsNext, squares, onPlay}) => {

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquare = squares.slice();
    if (xIsNext) nextSquare[i] = "X";
    else nextSquare[i] = "O";
    onPlay(nextSquare);
    console.log(calculateWinner(squares));
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) status = `Winner is ${winner}`;
  else status = `Next Player is ${xIsNext ? "X" : "O"}`;

  let mySquare = [
    {
      id: 1,
      index: 0
    },
    {
      id: 2,
      index: 1
    },
    {
      id: 3,
      index: 2
    },
    {
      id: 4,
      index: 3
    },
    {
      id: 5,
      index: 4
    },
    {
      id: 6,
      index: 5
    },
    {
      id: 7,
      index: 6
    },
    {
      id: 8,
      index: 7
    },
    {
      id: 9,
      index: 8
    }
  ]

  return (
    <div className='board'>
      <p>{status}</p>
      <div className="board-row">
      {mySquare.map((s) => (
        <div key={s.id}>
          <Square value={squares[s.index]} onSquareClick={() => handleClick(s.index)} />
        </div>
      ))}
      </div>
    </div>
  );
}

const Game = () => {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = React.useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  const handlePlay = (nextSquare) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}  />
      </div>
      <ul className='game-info'>
        <li>{moves}</li>
      </ul>
    </div>
  )
}

export default Game

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}