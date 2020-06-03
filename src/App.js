import React, { Component,useState,useEFfect } from 'react'
import Board from "./components/Board"
import FacebookLogin from 'react-facebook-login';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
//This Function alert the winner if they had won the match
const winning = (squares) => {
  let winningArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],

  ]
  for(let i=0;i<winningArray.length;i++){
    const [a,b,c] = winningArray[i]
    if(squares[a] && squares[a]===squares[b] &&squares[a]===squares[c]){
      return squares[a]
    }
  }
}
//End of winning function
// -- Begin of Board Component
//End of Game
//Apps Component
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: [],
      stepNumber: 0,
      xIsNext: true,
      score:0,
      userName: "",
      highScore:[],
      squares:Array(9).fill(null),
      score:[],
      isLogin:false,
      topScorer:[],
    }
  }
  
componentDidMount(){
  this.getTopScorer() // this will load the leaderboard into the first page 
}
 getTopScorer = async()=>{
  const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev?reverse=true`
  const result = await fetch(url)
  const result2 = await result.json()
  this.setState(
    {
      topScorer:result2.items
    }
  )
}
boxClick =(id) => {
   let array = this.state.squares
  // const taken = this.state.history.slice(0,this.state.stepNumber+1)
  // const current = taken[taken.length - 1];
  // const square = current.squares.slice();
  if(this.state.xIsNext){
    array[id]="O"
    
  } else if(!this.state.xIsNext){
    array[id]="X"
  }
  if(winning(array)){
    alert(`${array[id]} have won!`)
  }
  this.setState({ 
      xIsNext:!this.state.xIsNext,
      squares:array
    }
  )
}


/*this.setState({
  history: history.concat(
    {
      squares:squares
    }
  ),
  stepNumber:history.length,
  xIsNext:!this.state.xIsNext,
  })*/
  //This function will async data from Facebbook login to this application
   getFacebookData = async() => {
      let data = new URLSearchParams();
  data.append("Player:", this.state.userName);
  data.append("Score:", this.state.score);
  const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString(),
    json: true
  });
  }
  //End of asyncing function data
  //This function takes data from async API
  responseFacebook = (resp) => {
    this.setState({
      isLogin:true,
      userName: resp.name,
    })
  }
  //End of fetching --- 
  render() {
    if(!this.state.isLogin){
      return <div className="App"><FacebookLogin
      autoLoad={true}
      appId="671839706705875"
      fields="name,email,picture"
      callback={this.responseFacebook}
    /></div>
    }
    
    return (
      <div class="row">
      <div class="col-6 col-md-4">
        <h1>Scoreboard:</h1>
        <p>Player: {this.state.userName}</p>
        <p>Score: {this.state.score}</p>
        <h1>Top scorer:</h1>
        <div>
          
        <ul>{
            this.state.topScorer.map(item=>{
            return <li key={item.key}>{item.player} scored {item.score}</li>
            })
          }
        </ul>
        </div>
      </div>
      <div class="col-6 col-md-4">
        
      <h3 class="h3 m-5">TicTacToe</h3>
        <Board {...this.state} onClick={(id)=>this.boxClick(id)}/>
      
    </div>
    <div class="col-6 col-md-4">History</div>
    </div>
        
    )
  }
}
