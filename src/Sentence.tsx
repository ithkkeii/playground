import React, { useEffect, useState } from "react";
import { ChoseMessage, Message } from "./App";

interface Props {
  message: Message;
  searchText: string;
  choseMessage: ChoseMessage | null;
  setHighlightMessage: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Sentence: React.FC<Props> = ({
  message,
  searchText,
  choseMessage,
  setHighlightMessage,
}) => {
  const [sentence, setSentence] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let tempSentence: JSX.Element[] = [];

    message.text.split(/(\s+)/).forEach((w, index) => {
      let Component = null;
      if ([w.toLocaleLowerCase()].includes(searchText.toLocaleLowerCase())) {
        Component = (
          <div key={index} style={{ color: "red", whiteSpace: "pre" }}>
            {w}
          </div>
        );
        tempSentence.push(Component);

        setHighlightMessage((prev) => [
          ...prev,
          { id: message.id, text: message.text },
        ]);
        return;
      }

      Component = (
        <div key={index} style={{ whiteSpace: "pre" }}>
          {w}
        </div>
      );
      tempSentence.push(Component);
    });

    setSentence(tempSentence);
  }, [message.id, message.text, searchText, setHighlightMessage]);

  return (
    <div style={{ display: "flex", flexFlow: "row wrap" }}>{sentence}</div>
  );
};

export default Sentence;
