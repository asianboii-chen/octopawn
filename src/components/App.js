import { Component } from 'react';
import Background from './Background';
import Board from './Board';
import Settings from './Settings';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLightTheme: true,
      isShowingCoords: true,
    };
  }

  render() {
    const { isLightTheme, isShowingCoords } = this.state;
    const state = new Array(Board.BOARD_SIZE).fill(null);
    state[2] = 'q';
    state[4] = 'P';
    state[11] = 'Q';
    state[13] = 'p';
    return (
      <div className='App'>
        <Background isLightTheme={isLightTheme} />
        <Board
          isLightTheme={isLightTheme}
          squarePieces={state}
          highlightedSquares={[0, 4]}
        />
        <Settings
          isLightTheme={isLightTheme}
          isShowingCoords={isShowingCoords}
          onIsLightThemeChange={this.handleIsLightThemeChange_}
          onIsShowingCoordsChange={this.handleIsShowingCoords_}
        />
      </div>
    );
  }

  handleIsLightThemeChange_ = (value) => {
    this.setState({ isLightTheme: value });
  };

  handleIsShowingCoords_ = (value) => {
    this.setState({ isShowingCoords: value });
  };
}

export default App;
