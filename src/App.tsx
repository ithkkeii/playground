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
  const [highlightedMessage, setHighlightedMessage] = useState<ChoseMessage[]>(
    []
  );

  useEffect(() => {
    // setHighlightedMessage([]);
    // console.log("set highlighted message to empty array");

    setHighlightedMessage([]);
    messages.forEach((m) => {
      let times = 0;
      m.text.split(/(\s+)/).forEach((w) => {
        if ([w.toLocaleLowerCase()].includes(input.toLocaleLowerCase())) {
          times += 1;
          setHighlightedMessage((prev) => [...prev, { id: m.id, times }]);
        }
      });
    });
  }, [input]);

  useEffect(() => {
    if (highlightedMessage.length > 0) {
      setChoseMessage({
        id: highlightedMessage[0].id,
        times: highlightedMessage[0].times,
      });
    } else {
      setChoseMessage(null);
    }
  }, [highlightedMessage]);

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
      {highlightedMessage.length > 0 && choseMessage !== null && (
        <div>
          <button
            onClick={() => {
              const index = highlightedMessage.findIndex(
                (m) => m.id === choseMessage.id
              );

              // End of array so do nothing
              if (index === highlightedMessage.length - 1) return;

              setChoseMessage(highlightedMessage[index + 1]);
            }}
          >
            UP
          </button>
          <button>DOWN</button>
        </div>
      )}
      {JSON.stringify(choseMessage)}
    </div>
  );
}

export default App;
