import { Component } from 'react';
import Piece from './Piece.js';
import './Square.css';

class Square extends Component {
  render() {
    const { piece, isLight, isHighlighted, handleClick } = this.props;
    const classes = [
      'Square',
      piece ? 'nonempty' : 'empty',
      isLight ? 'light' : 'dark',
      isHighlighted ? 'highlighted' : 'normal',
    ];
    return (
      <div className={classes.join(' ')} onClick={handleClick}>
        {piece && <Piece image={piece} />}
      </div>
    );
  }
}

export default Square;
