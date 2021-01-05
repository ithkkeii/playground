import React, { useEffect, useState } from "react";
import { ChoseMessage, Message } from "./App";

interface Props {
  message: Message;
  searchText: string;
  choseMessage: ChoseMessage | null;
  setHighlightMessage: React.Dispatch<React.SetStateAction<ChoseMessage[]>>;
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
      let times = 0;
      if ([w.toLocaleLowerCase()].includes(searchText.toLocaleLowerCase())) {
        times += 1;

        let color = null;

        if (choseMessage) {
          color =
            choseMessage.id === message.id && choseMessage.times === times
              ? "red"
              : "yellow";
        } else {
          color = "yellow";
        }

        Component = (
          <div key={index} style={{ color, whiteSpace: "pre" }}>
            {w}
          </div>
        );
        tempSentence.push(Component);

        // setHighlightMessage((prev) => [
        //   ...prev,
        //   { id: message.id, text: message.text },
        // ]);
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
  }, [choseMessage, message.id, message.text, searchText]);

  return (
    <div style={{ display: "flex", flexFlow: "row wrap" }}>{sentence}</div>
  );
};

export default Sentence;
