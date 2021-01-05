import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import { message as data } from "./data";

export interface Message {
  id: number;
  text: string;
}

export interface ChoseMessage {
  id: number;
  times: number;
}

function App() {
  const [messages, setMessages] = useState<Message[]>(data);
  const [input, setInput] = useState<string>("");
  const [choseMessage, setChoseMessage] = useState<ChoseMessage | null>(null);
  const [highlightedMessage, setHighlightedMessage] = useState<Message[]>([]);

  useEffect(() => {
    setHighlightedMessage([]);
    // console.log("set highlighted message to empty array");
  }, [input]);

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <Chat
        messages={messages}
        searchText={input}
        choseMessage={choseMessage}
        setHighlightMessage={setHighlightedMessage}
      />
      {JSON.stringify(highlightedMessage)}
      {highlightedMessage.length !== 0 && (
        <div>
          <button>UP</button>
          <button>DOWN</button>
        </div>
      )}
    </div>
  );
}

export default App;
