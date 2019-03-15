import React, { Component } from 'react';
import './pauseButton.css';
import swal from '@sweetalert/with-react';

export default class PauseButton extends Component{
    render() {
        return(
            <button className='myButton' onClick={this.onPause}><span>PAUSE</span></button>
        )
    }
}