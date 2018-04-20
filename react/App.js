import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

const socketServer = "https://socketio-tutorial-dgoodman.c9users.io/";
// const socket = io.connect(socketServer);
const socket  = io("https://socketio-tutorial-dgoodman.c9users.io/");

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      messages: ["hello-built-in"],
      socket: io("https://socketio-tutorial-dgoodman.c9users.io/")
    } 
  }
  
  componentDidMount(){
    
    socket.on('testEvent', data => {
      let tempMessages = [...this.state.messages];
      tempMessages.push(data);
      console.log("rendering...");
      this.setState({messages: tempMessages});
    });
  
  }
  
  sendSomething = () => {
    this.state.socket.emit('testResponse', {desc: "hello"});
    this.state.socket.emit('testResponse', {desc: "hello2"});
  };
  
  
  makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  };
  
  
  
  
  render() {
    
    let messageTime = null;
    
    
    // socket.on('testEvent', data => {
    //   let tempMessages = [...this.state.messages];
    //   tempMessages.push(data);
    //   console.log("rendering...");
    //   this.setState({messages: tempMessages});
    // });
    
    if(this.state.messages){
      messageTime = (
        <div>
          {this.state.messages.map( message => {
            return <p>{message}</p>
          })}
        </div>
        
        );
    }
    
    
    return (
      <div key={this.makeid()} className="App">
       {messageTime}
      </div>
    );
  }
}

export default App;
