import { Component } from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {
  static BOARD_HEIGHT = 4;
  static BOARD_WIDTH = 4;
  static BOARD_SIZE = Board.BOARD_WIDTH * Board.BOARD_HEIGHT;
  static INIT_SQUARE_PIECES = [
    'P',
    'P',
    'P',
    'P',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'p',
    'p',
    'p',
    'p',
  ];

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

  static isPieceWhite(piece) {
    return piece.toLowerCase() === piece;
  }

  static isMoveLegal(squarePieces, sourceId, targetId) {
    if (
      sourceId < 0 ||
      sourceId >= Board.BOARD_SIZE ||
      !squarePieces[sourceId] ||
      targetId < 0 ||
      targetId >= Board.BOARD_SIZE
    )
      return false;
    const [sourceY, sourceX] = Board.getSquareCoords(sourceId);
    const [targetY, targetX] = Board.getSquareCoords(targetId);
    const source = squarePieces[sourceId];
    const target = squarePieces[targetId];
    if (targetY !== sourceY + Math.pow(-1, Board.isPieceWhite(source)))
      // pawns move one rank only
      return false;
    if (Math.abs(sourceX - targetX) === 1)
      // capture
      return (
        !!target && Board.isPieceWhite(source) !== Board.isPieceWhite(target)
      );
    // normal advance
    return sourceX === targetX && !target;
  }

  static getNewSquarePieces(squarePieces, sourceId, targetId) {
    let res = squarePieces.concat();
    const targetY = Board.getSquareCoords(targetId)[0];
    if (targetY === 0) res[targetId] = 'q';
    else if (targetY === Board.BOARD_HEIGHT - 1) res[targetId] = 'Q';
    else res[targetId] = res[sourceId];
    res[sourceId] = null;
    return res;
  }

  static getDerivedStateFromProps(nextProps, currState) {
    if (nextProps.squarePieces === currState.squarePieces) return null;
    // new move; clear selections
    return {
      squarePieces: nextProps.squarePieces,
      isWhiteOnMove: nextProps.isWhiteOnMove,
      selectedSquareId: -1,
    };
  }

  state = {
    squarePieces: new Array(Board.BOARD_SIZE).fill(null),
    isWhiteOnMove: true,
    selectedSquareId: -1,
  };

  onMove = this.props.onMove;

  render() {
    let squares = [];
    for (let id = 0; id < Board.BOARD_SIZE; id++) {
      const [y, x] = Board.getSquareCoords(id);
      const name = Board.getSquareName(id);
      squares.push(
        <Square
          key={'square-' + id}
          piece={this.state.squarePieces[id]}
          isLight={Board.isSquareLight(id)}
          isHighlighted={
            id === this.state.selectedSquareId ||
            this.props.highlightedSquares.indexOf(id) >= 0
          }
          isLegal={
            (this.state.selectedSquareId >= 0 &&
              Board.isMoveLegal(
                this.state.squarePieces,
                this.state.selectedSquareId,
                id
              )) ||
            (!!this.state.squarePieces[id] &&
              Board.isPieceWhite(this.state.squarePieces[id]) ===
                this.state.isWhiteOnMove)
          }
          yText={this.props.showCoords && x === 0 && name[1]}
          xText={
            this.props.showCoords && y === Board.BOARD_WIDTH - 1 && name[0]
          }
          handleClick={() => this._handleSquareClick(id)}
        />
      );
      if (x === Board.BOARD_WIDTH - 1) squares.push(<br key={'rank-' + y} />);
    }
    const classes = ['Board', this.props.isLightTheme ? 'light' : 'dark'];
    return <div className={classes.join(' ')}>{squares}</div>;
  }

  _handleSquareClick = (id) => {
    if (this.state.selectedSquareId === -1) this.setSource(id);
    else this.setTarget(id);
  };

  setSource(id) {
    if (
      !this.state.squarePieces[id] ||
      Board.isPieceWhite(this.state.squarePieces[id]) !==
        this.state.isWhiteOnMove
    )
      return;
    this.setState({ selectedSquareId: id });
  }

  setTarget(id) {
    const sourceId = this.state.selectedSquareId;
    if (id === sourceId) {
      this.setState({ selectedSquareId: -1 });
      return;
    }
    if (
      this.state.squarePieces[id] &&
      Board.isPieceWhite(this.state.squarePieces[id]) ===
        this.state.isWhiteOnMove
    ) {
      this.setState({ selectedSquareId: id });
      return;
    }
    if (!Board.isMoveLegal(this.state.squarePieces, sourceId, id)) {
      this.setState({ selectedSquareId: -1 });
      return;
    }
    this.onMove(
      sourceId,
      id,
      Board.getNewSquarePieces(this.state.squarePieces, sourceId, id)
    );
  }
}

export default Board;
