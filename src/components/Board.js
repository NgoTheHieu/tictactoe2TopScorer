import React, { Component } from 'react'
import Square from "./Square"
export default class Board extends React.Component{

    renderSquare = (id)=>{
      return(
        <Square id={id} value={this.props.squares[id]} boxClick={(id)=>this.props.onClick(id)}/>
      )
    }
    render(){
      return(
        <div>
          <div className="row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      )
        
    }
  }
  