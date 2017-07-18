import React from 'react'
import './game.css'
import View from './View'

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: {
        gameRows: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        gameWinner: '1,2,3:4,5,6:7,8,9:1,4,7:2,5,8:3,6,9:1,5,9:3,5,7',
        playerX: [],
        playerY: [],
        gameError: null,
        playerTurn: true
      },
      gameHistory: {
        history: {},
      }
    }
  }


  // componentWillUpdate(nextProps, nextState) {
  //   let playerTurn = nextState.game.playerTurn ? 'Y' : "X";
  //   let arrayData = playerTurn === 'X' ? nextState.game.playerX : nextState.game.playerY;
  //   switch (true) {
  //     case (arrayData.length === 2):
  //       break;
  //     case (arrayData.length === 3):
  //       if (nextState.game.gameWinner.indexOf(arrayData.sort().toString()) >= 0) {
  //         this.setState({ game: { ...this.state.game, gameMessage: `Win player ${playerTurn}` } })
  //         console.log('success' + '///' + playerTurn);
  //         break;
  //       }
  //       break
  //     case (arrayData.length > 3):
  //       let str = arrayData.sort().toString();
  //       for (var index = 0; index < arrayData.length; index++) {
  //         let changeStr = str.replace(arrayData[index] + ',', '');
  //         if (nextState.game.gameWinner.indexOf(changeStr)) {
  //           this.setState({ game: { ...this.state.game, gameMessage: `Win player ${playerTurn}` } })
  //           console.log('success' + ' /// ' + playerTurn);
  //           break;
  //         }
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }



  handleClick(event, index, gameMessage) {
    if (gameMessage) return false;
    if (event.target.innerHTML) {
      this.setState({
        game: {
          ...this.state.game,
          gameError: 'Error: you can not clicked this button this button have already done assigned!'
        }
      });
      return false;
    }
    event.target.innerHTML = this.state.game.playerTurn ? 'X' : 'Y';
    this.state.game.playerTurn
      ? this.setState({
        game: {
          ...this.state.game,
          playerX: [...this.state.game.playerX, index],
          playerTurn: !this.state.game.playerTurn,
          gameError: null
        }
      })
      : this.setState({
        game: {
          ...this.state.game,
          playerY: [...this.state.game.playerY, index],
          playerTurn: !this.state.game.playerTurn,
          gameError: null
        }
      })

  }

  clearState() {
    this.setState({
      game: {
        ...this.state.game,
        playerX: [],
        playerY: []
      }
    })
  }



  render() {
    console.log(this.state);
    return (
      <div>
        <View childState={this.clearState.bind(this)} child={(event, index, gameMessage) => this.handleClick(event, index, gameMessage)} gameView={this.state.game} />
      </div>
    )
  }

}