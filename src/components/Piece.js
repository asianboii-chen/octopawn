import { Component } from 'react';
import './Piece.css';
import whitePawn from '../data/white-pawn.svg';
import blackPawn from '../data/black-pawn.svg';
import whiteQueen from '../data/white-queen.svg';
import blackQueen from '../data/black-queen.svg';

class Piece extends Component {
  static IMAGE = {
    p: whitePawn,
    P: blackPawn,
    q: whiteQueen,
    Q: blackQueen,
  };

  render() {
    return (
      <img src={Piece.IMAGE[this.props.image]} className='Piece' alt='piece' />
    );
  }
}

export default Piece;
