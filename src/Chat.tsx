import React, { useEffect } from "react";
import { ChoseMessage, Message } from "./App";
import Sentence from "./Sentence";

interface Props {
  messages: Message[];
  searchText: string;
  choseMessage: ChoseMessage | null;
  setHighlightMessage: React.Dispatch<React.SetStateAction<ChoseMessage[]>>;
}

const Chat: React.FC<Props> = ({
  messages,
  searchText,
  choseMessage,
  setHighlightMessage,
}) => {
  return (
    <div>
      {messages.map((m) => (
        <Sentence
          key={m.id}
          message={m}
          searchText={searchText}
          choseMessage={choseMessage}
          setHighlightMessage={setHighlightMessage}
        />
      ))}
    </div>
  );
};

export default Chat;
