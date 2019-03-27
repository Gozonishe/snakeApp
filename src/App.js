import React, { Component } from 'react';
import swal from '@sweetalert/with-react';
import { Grid } from './components/grid/Grid';
import { Apple } from './components/apple/Apple';
import { Snake } from './components/snake/Snake';
import Button from './components/button/Button';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.snakeSpeed = 400   // main speed parameter 
    this.timersId = []      // for Pause
    this.grid = new Grid(20, 20)
    this.apple = new Apple().setRandomApple(0,19)
    this.snake = new Snake()
      .setHead(9, 9)
      .setDirection(1, 0)
      .setTail([])

    this.state = {
      snake: {
        head: this.snake.getHead(),
        direction: this.snake.getDirection(),
        tail: this.snake.getTail(),
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

    const crossTheApple = this.apple.isCrossTheApple(this.state.snake)
    crossTheApple ? this.apple.setRandomApple(0,19) : this.apple.getApple()

    this.setState(({ snake }) => {
      const nextState = {
        snake: {
          ...snake,
          head: {
            row: snake.head.row + snake.direction.y,
            col: snake.head.col + snake.direction.x
          },
          tail: [snake.head, ...snake.tail]
        },
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
        ?<div id='gameOverZone'><h1>Game Over! Your Score is: {snake.tail.length+1}!</h1>
        <Button onClickCallback={this.onRestart} classNameValue='restartButton' text='RESTART!'/>
          </div>
        : <div className='gameTime'>
          <Button text={`SCORE - ${snake.tail.length+1}`}/>
          <section className="grid">
          
          {
            this.grid.getGrid().map(row => (
              row.map(square => (
                <div key={`${square.row} ${square.col}`} className={`square 
                  ${
                    this.isHead(square)
                    ? 'head' : this.apple.isApple(square.row, square.col)
                    ? 'apple' : this.isTail(square)
                    ? 'tail' : ''
                    }`
                  }>
                </div>
              ))
            ))
          }
        </section> 
          <Button id='pauseButton' onClickCallback={this.onPause} text='PAUSE' />
        </div>
        }
        
      </div>
    );
  }
}

export default App;