import './Background.css';

function Background(props) {
  let squares = [];
  for (let y = 0; y < 48; y++) {
    for (let x = 0; x < 48; x++) {
      const classes = ['Background-square', y % 2 === x % 2 ? 'light' : 'dark'];
      squares.push(
        <rect
          key={`square-${y}-${x}`}
          className={classes.join(' ')}
          x={12.5 * x + 'vmin'}
          y={12.5 * y + 'vmin'}
        ></rect>
      );
    }
  }
  const classes = ['Background', props.isLightTheme ? 'light' : 'dark'];
  return <svg className={classes.join(' ')}>{squares}</svg>;
}

export default Background;
