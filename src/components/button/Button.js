import React, { Component } from 'react'
import './Button.css';

export default class Button extends Component {
  constructor() {
    super()
  }

  render() {
    return(
        <button
          className={this.props.classNameValue ? this.props.classNameValue : 'myButton'}
          onClick={this.onClickHandler}
        >
          <span>{this.props.text}</span>
        </button>
    )
  }
  
  onClickHandler = (e) => {
    // onClickCallback property is not necessary
    if (this.props.onClickCallback) {
      this.props.onClickCallback(e)
    } else {
      return
    }
  }
}