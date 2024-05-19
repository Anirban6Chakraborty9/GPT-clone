import './App.css';
import gptLogo from './assets/chatgptLogo.png';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import upgrade from './assets/rocket.svg';
import gpticon from './assets/chatgptIcon.svg';
import usericon from './assets/user-icon.png';
import send from './assets/send.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {

    const msgEnd = useRef(null);

    const [input,setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            text: "I'm Travis, a ChatGPT clone (an AI developed by OpenAI). I'm designed to understand and generate human-like text based on the input I receive. My purpose is to assist and provide information to the best of my abilities. How can I help you today?",
            isBot: true,
        }
    ]);

    useEffect(()=>{
        msgEnd.current.scrollIntoView();
    },[messages])

    const handleSend = async () => {
        const text = input;
        setInput('');
        setMessages([
            ...messages,
            { text, isBot: false },
        ])
        const res = await sendMsgToOpenAI(text);
        setMessages([
            ...messages,
            { text, isBot: false },
            { text: res, isBot: true}
        ])
    };

    const handleEnter = async (e) => {
        if(e.key==="Enter") await handleSend();
    }

    const handleQuery =  async (e) => {
        const text = e.target.value;
        setMessages([
            ...messages,
            { text, isBot: false },
        ])
        const res = await sendMsgToOpenAI(text);
        setMessages([
            ...messages,
            { text, isBot: false },
            { text: res, isBot: true}
        ])
    };

  return (
    <div className="App">
        <div className="sidebar">
            <div className="sidetop">
                <div className="gptname">
                    <img src={gptLogo} height="50px" alt="" className="logo" />
                    <span className="brand">Travis</span>
                </div>
                <button className="midbtn" onClick={ () => {window.location.reload()} }><img src={addBtn} alt="new chat" className="addbtn" />New Chat</button>
                <div className="previouschats">

                    <p className='popular'>Popular searches</p>

                    <button className="query" onClick={handleQuery} value={'Who is a Front-End Developer ?'}><img src={msgIcon} alt="query" className='queryimg'/>Who is a Front-End Developer ?</button>

                    <button className="query" onClick={handleQuery} value={'What is React JS ?'}><img src={msgIcon} alt="query" className='queryimg'/> What is React JS ?</button>

                    <button className="query" onClick={handleQuery} value={'How to use API ?'}><img src={msgIcon} alt="query" className='queryimg'/>How to use API ?</button>
                </div>
            </div>
            <div className="sidebottom">
                <div className="items"><img src={home} height="16px" alt="homeimg" className="itemimg" />Home</div>
                <div className="items"><img src={saved} height="16px" alt="savedimg" className="itemimg" /> Saved</div>
                <div className="items"><img src={upgrade} height="16px" alt="upgradeimg" className="itemimg" />Upgrade to Pro</div>
            </div>
        </div>
        <div className="main">
            <div className="chats">

                {messages.map((message,i) => { 
                   return <div key={i} className={message.isBot?"msg bot":"msg"}>
                    <img className='chaticon' src={message.isBot?gpticon:usericon} alt="" /><p className="txt">{message.text}</p>
                </div>
                })}

                <div ref={msgEnd}/>

            </div>
            <div className="chatInput">
                <div className="inp">
                    <input type="text" placeholder='Send your message...' value={input}
                    onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} /><button className="sendbtn" onClick={handleSend} ><img src={send} alt="send" className="send" /></button>
                </div>
                <p>Travis can make mistakes. Consider checking important information.</p>
            </div>
        </div>
    </div>
  );
}

export default App;
