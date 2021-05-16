import Piece from './Piece.js';
import './Square.css';

function Square(props) {
  const classes = [
    'Square',
    props.isLight ? 'light' : 'dark',
    props.isHighlighted ? 'highlighted' : 'normal',
    props.isLegal ? 'legal' : 'illegal',
  ];
  return (
    <div className={classes.join(' ')} onClick={props.handleClick}>
      {props.piece && (
        <div className='Square-piece'>
          <Piece image={props.piece} />
        </div>
      )}
      {props.yText && <div className='Square-y-label'>{props.yText}</div>}
      {props.xText && <div className='Square-x-label'>{props.xText}</div>}
    </div>
  );
}

export default Square;
