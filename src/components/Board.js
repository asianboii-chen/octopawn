import { Component } from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {
  static BOARD_HEIGHT = 4;
  static BOARD_WIDTH = 4;
  static BOARD_SIZE = Board.BOARD_WIDTH * Board.BOARD_HEIGHT;

  static getSquareCoords(id) {
    const y = Math.floor(id / Board.BOARD_WIDTH);
    const x = id % Board.BOARD_WIDTH;
    return [y, x];
  }

  static isSquareLight(id) {
    const [y, x] = Board.getSquareCoords(id);
    return y % 2 === x % 2;
  }

  static getSquareName(id) {
    const [y, x] = Board.getSquareCoords(id);
    return String.fromCharCode(97 + x) + (Board.BOARD_HEIGHT - y);
  }

  constructor(props) {
    super(props);
    this.state = {
      squarePieces: props.squarePieces,
      highlightedSquares: props.highlightedSquares,
    };
  }

  render() {
    const { squarePieces, highlightedSquares } = this.state;
    let squares = [];
    for (let id = 0; id < Board.BOARD_SIZE; id++) {
      const [y, x] = Board.getSquareCoords(id);
      squares.push(
        <Square
          key={'square-' + id}
          piece={squarePieces[id]}
          isLight={Board.isSquareLight(id)}
          isHighlighted={highlightedSquares.indexOf(id) >= 0}
          handleClick={() => this.handleSquareClick_(id)}
        />
      );
      if (x === Board.BOARD_WIDTH - 1) squares.push(<br key={'rank-' + y} />);
    }
    const classes = ['Board', this.props.isLightTheme ? 'light' : 'dark'];
    return <div className={classes.join(' ')}>{squares}</div>;
  }

  handleSquareClick_ = (id) => {
    console.log('Clicked square', id, 'aka', Board.getSquareName(id));
  };
}

export default Board;
