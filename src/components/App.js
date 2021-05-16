import { Component } from 'react';
import Background from './Background';
import Board from './Board';
import Settings from './Settings';
import './App.css';

class App extends Component {
  state = {
    isLightTheme: false,
    isShowingCoords: true,
    squarePieces: Board.INIT_SQUARE_PIECES.concat(),
    isWhiteOnMove: true,
    highlightedSquares: [],
  };

  render() {
    return (
      <div className='App'>
        <Background isLightTheme={this.state.isLightTheme} />
        <Board
          isLightTheme={this.state.isLightTheme}
          showCoords={this.state.isShowingCoords}
          squarePieces={this.state.squarePieces}
          isWhiteOnMove={this.state.isWhiteOnMove}
          highlightedSquares={this.state.highlightedSquares}
          onMove={this._handleMove}
        />
        <Settings
          isLightTheme={this.state.isLightTheme}
          isShowingCoords={this.state.isShowingCoords}
          onIsLightThemeChange={this._handleIsLightThemeChange}
          onIsShowingCoordsChange={this._handleIsShowingCoordsChange}
        />
      </div>
    );
  }

  _handleIsLightThemeChange = (value) => {
    this.setState({ isLightTheme: value });
  };

  _handleIsShowingCoordsChange = (value) => {
    this.setState({ isShowingCoords: value });
  };

  _handleMove = (sourceSquareId, targetSquareId, newSquarePieces) => {
    console.log(
      this.state.isWhiteOnMove ? 'White plays' : 'Black plays',
      `${Board.getSquareName(sourceSquareId)}-${Board.getSquareName(
        targetSquareId
      )}`
    );
    this.setState((currState) => ({
      squarePieces: newSquarePieces,
      isWhiteOnMove: !currState.isWhiteOnMove,
      highlightedSquares: [sourceSquareId, targetSquareId],
    }));
  };
}

export default App;
