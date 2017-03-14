import React, { Component } from 'react';
import logo from './logo.svg';
import moment from 'moment';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import {ask} from './lib/request';
import './App.css';

const messages=[
  {
    author:'Bot',
    text:'hello, iam bot',
    createdAt: moment().format(),
  }
];

class App extends Component {
  constructor(){
    super();
    this.state={
      messages:messages,
    }
  }
  
  onMessageSubmit(messageText){
    const message = {
      author : "Me",
      text: messageText,
      createdAt:moment().format(),
    }

    this.setState(prevState => ({
      messages: prevState.messages.concat(message),
    }))
    
    ask(messageText).then(botMessageReply => {
      this.setState(prevState => ({
        messages:prevState.messages.concat(botMessageReply),
      }));
    });
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom(){
    const chatWindow=document.querySelector('.message-list');
    const to = chatWindow.scrollHeight;
    chatWindow.scrollTop=to;
  }

  render() {
    const messages = this.state.messages;
    return (
      <div className="App">
        <Navbar name="iqbal"/>
          <div className="page page--gray">
            <div className="container">
                <ChatWindow 
                  messages={messages} 
                  onMessageSubmit={(message) => this.onMessageSubmit(message)}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
