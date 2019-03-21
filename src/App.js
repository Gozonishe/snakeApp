import React, { Component } from 'react';
import swal from '@sweetalert/with-react';
import { Grid } from './components/grid/grid';
import { Apple, getRandomPositionApple, isApple, isCrossTheApple} from './components/apple/apple';
import PauseButton from './components/buttons/pauseButton/pauseButton';
import ScoreButton from './components/buttons/scoreButton/scoreButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.snakeSpeed = 400   // main speed parameter 
    this.timersId = []      // for Pause
    this.grid = new Grid(20, 20)
    this.apple = new Apple

    this.state = {
      apple: getRandomPositionApple(),
      snake: {
        head: { 
          row: 9,
          col: 9,
        },
        direction: {
          x: 1,
          y: 0,
        },
        tail: [],
      },
      pause: false,
      snakeBeforePause: {},
    }
  }

  componentDidMount = () => {
    document.addEventListener('keydown', (e) => {
      this.setDirection(e)
    })
    this.startGameWithSpeed(this.snakeSpeed)
  }

  //game speed option
  startGameWithSpeed(speed) {
    const timerId = setTimeout(() => {
      this.gamePlay()
    }, this.state.snake.tail.length ? (speed / this.state.snake.tail.length + 50) : speed);
    this.timersId.push(timerId)
  }

  gamePlay = () => {
    if (this.state.gameOver) return;

    this.setState(({ snake, apple }) => {
      const crossTheApple = isCrossTheApple(this.state.apple, this.state.snake)
      const nextState = {
        snake: {
          ...snake,
          head: {
            row: snake.head.row + snake.direction.y,
            col: snake.head.col + snake.direction.x
          },
          tail: [snake.head, ...snake.tail]
        },
        apple: crossTheApple ? this.getRandomApple() : apple,
        pause: false,
      };
      if (!crossTheApple) {
        nextState.snake.tail.pop()
      };
      return nextState;
      }
    );
    
    //gameOver rule
    if (this.isOffEdge() || this.isTail(this.state.snake.head)) {
      this.setState({
        gameOver: true,
      })
    }

    this.startGameWithSpeed(this.snakeSpeed)
  }

  isHead = (square) => {
    const { snake } = this.state;
    return snake.head.row === square.row
      && snake.head.col === square.col;
  }

  isTail = (square) => {
    const { snake } = this.state;
    return snake.tail.find(inTail => inTail.row === square.row && inTail.col === square.col);
  }

  getRandomApple = () => {
    const { snake } = this.state;
    const newApple = getRandomPositionApple();
    if (this.isTail(newApple) || (
      snake.head.row === newApple.row
      && snake.head.col === newApple.col)) {
      return this.getRandomApple();
    } else {
      return newApple;
    }
  }

  isOffEdge = () => {
    const { snake } = this.state;
    if (snake.head.col > 19
      || snake.head.col < 0
      || snake.head.row > 19
      || snake.head.row < 0) {
      return true;
    }
  }

  //game keycontrols
  setDirection = (event) => {
    const { snake } = this.state;
    if (event.keyCode === 38) {            //up arrow
      if (snake.direction.y === 1) return; //cannot go opposite
      this.setState(({ snake }) => ({
        snake: {
          ...snake,
          direction: {
            x: 0,
            y: -1,
          }
        }
      }))
    } else if (event.keyCode === 40) {      //down arrow
      if (snake.direction.y === -1) return; //cannot go opposite
      this.setState(({ snake }) => ({
        snake: {
          ...snake,
          direction: {
            x: 0,
            y: 1,
          }
        }
      }))
    } else if (event.keyCode === 39) {      //right arrow
      if (snake.direction.x === -1) return; //cannot go opposite
      this.setState(({ snake }) => ({
        snake: {
          ...snake,
          direction: {
            x: 1,
            y: 0,
          }
        }
      }))
    } else if (event.keyCode === 37) {      //left arrow
      if (snake.direction.x === 1) return;  //cannot go opposite
      this.setState(({ snake }) => ({
        snake: {
          ...snake,
          direction: {
            x: -1,
            y: 0,
          }
        }
      }))
    } else if (event.keyCode === 27) {  //esc for gameOver
      this.setState({
        gameOver: true,
      })
    } else if (event.keyCode === 32) {  //space for Pause
      this.onPause();
    }
  } 

  onPause = () => {
    this.setState({
      pause: true,
      snakeBeforePause: this.state.snake
    })
    console.log(this.timersId)
    this.timersId.forEach(timerId => clearTimeout(timerId))
    this.timersId = []
    swal({
      title: "Game Paused!",
      icon: "success",
      button: "Continue",
    }).then(isConfirm => {
      if (isConfirm) {
        this.setState({ snake: this.state.snakeBeforePause })
        this.startGameWithSpeed(this.snakeSpeed)
      } else {
        console.log('Oops! u leave from modal, press pause and then continue)');
      }
    })
  }

  onRestart = () => {
    this.setState({
      gameOver: !this.state.gameOver,
      snake: {
        head: {
          row: 9,
          col: 9,
        },
        direction: {
          x: 1,
          y: 0,
        },
        tail: [],
      }
    })
    document.addEventListener('keydown', (e) => {
      this.setDirection(e)
    })
    this.startGameWithSpeed(this.snakeSpeed)
  }

  render() {
    const {snake, gameOver} = this.state;
    return (
      <div className="App">
        {
          gameOver
        ?<div><h1>Game Over! Your Score is: {snake.tail.length+1}!</h1> 
          <button className='restartButton' onClick={this.onRestart} >Restart!</button></div>
        : <div className='gameTime'>
          <button className='myButton'><span>SCORE-</span><br></br><a>{snake.tail.length+1}</a></button>
          <section className="grid">
          {
            this.grid.getGrid().map(row => (
              row.map(square => (
                <div key={`${square.row} ${square.col}`} className={`square 
                  ${
                    this.isHead(square) 
                    ? 'head' : isApple(this.state.apple, square)
                    ? 'apple' : this.isTail(square)
                    ? 'tail' : ''
                    }`
                  }>
                </div>
              ))
            ))
          }
        </section> 
          <button className='myButton' onClick={this.onPause}><span>PAUSE</span></button>
        </div>
        }
        
      </div>
    );
  }
}

export default App;
