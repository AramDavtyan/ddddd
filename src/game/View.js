import React from 'react'

export default class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameMessage: null,
      gameMessageTurn: null
    }
  }

  componentWillReceiveProps(nextProps) {
    let playerTurn = nextProps.gameView.playerTurn ? 'Y' : "X";
    let arrayData = playerTurn === 'X' ? nextProps.gameView.playerX : nextProps.gameView.playerY;
    switch (true) {
      case (arrayData.length === 2):
        break;
      case (arrayData.length === 3):
        if (nextProps.gameView.gameWinner.indexOf(arrayData.sort().toString()) >= 0) {
          this.setState({ gameMessage: `Win player ${playerTurn}` })
          break;
        }
        break
      case (arrayData.length > 3):
        let str = arrayData.sort().toString();
        for (var index = 0; index < arrayData.length; index++) {
          let changeStr = str.replace(arrayData[index] + ',', '');
          if (nextProps.gameView.gameWinner.indexOf(changeStr) >= 0) {
            console.log(changeStr);
            this.setState({ gameMessage: `Win player ${playerTurn}` })
            break;
          }
        }
        break;
      default:
        break;
    }
  }

  hadleClear() {
    this.props.gameView.playerTurn = null;
    this.setState({ gameMessage: null })
    var sectionGame = document.getElementsByClassName('game');
    var elem = sectionGame[0].getElementsByTagName('div');
    for (let elemChildren of elem) {
      elemChildren.innerHTML = ''
    }
    this.props.childState();
  }

  render() {
    return (
      <div>
        <section className='game'>
          {
            this.props.gameView.gameRows.map((index, value) => {
              return <div onClick={(event) => this.props.child(event, index, this.state.gameMessage)} key={index}>{this.props.gameView.playerTurn}</div>
            })
          }
        </section>
        <section>
          {this.props.gameView.gameError ? <section className='error'>{this.props.gameView.gameError}</section> : null}
          {this.state.gameMessage ? <div><section className='playerTurn'>{this.state.gameMessage}</section> <button onClick={this.hadleClear.bind(this)} className='newGame'>New Game</button></div> : null}
        </section>
      </div>
    )
  }

}