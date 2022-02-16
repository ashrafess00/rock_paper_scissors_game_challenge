import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import playStyle from "../styles/Play.module.css";
import Image from "next/image";

import { Coordinates } from "./Coordinates";

interface PropsTypes {
  choice: Coordinates;
  setChoice: Dispatch<SetStateAction<Coordinates>>;
  setScore: Dispatch<SetStateAction<number>>;
  computerChoice: string;
  setComputerChoice: Dispatch<SetStateAction<string>>;
  score: number;
}

const Play = (props: PropsTypes) => {
  // const [myChoice, setMyChoice] = useState("");
  // const [computerChoice, setComputerChoice] = useState("");
  const [winner, setWinner] = useState("");

  const cardName = props.choice.cardName;
  function tryAgain() {
    props.setChoice(null!);
    props.setComputerChoice("");
  }
  let defeat: string[] = [];

  useEffect(() => {
    if (props.choice.getDefeat().includes(props.computerChoice)) {
      props.setScore(props.score + 1);
      localStorage.setItem(
        "myScore",
        JSON.stringify(JSON.parse(localStorage.getItem("myScore")!) + 1)
      );
    } else if (props.computerChoice == props.choice.cardName) {
      props.setScore(props.score + 0);
      localStorage.setItem(
        "myScore",
        JSON.stringify(JSON.parse(localStorage.getItem("myScore")!) + 0)
      );
    } else {
      props.setScore(props.score - 1);
      localStorage.setItem(
        "myScore",
        JSON.stringify(JSON.parse(localStorage.getItem("myScore")!) - 1)
      );
    }
  }, []);

  // useEffect(() => {
  //   props.setComputerChoice("");
  // }, [props.choice]);

  // if (props.choice.getDefeat().includes(computerChoice)) {
  //   props.setScore(10);
  // }

  return (
    <>
      <div className={`${playStyle.flex} ${playStyle.container}`}>
        <div
          className={playStyle.circle}
          style={{ borderColor: `${props.choice.strokeColor}` }}
        >
          <Image src={props.choice.getImage(cardName)} alt="jkjk" />
        </div>

        <div className={playStyle.circle}>
          {props.computerChoice && (
            <Image src={props.choice.getImage(props.computerChoice)} />
          )}
        </div>
      </div>
      <div className={playStyle.winner}>
        <h3>
          {props.choice.getDefeat().includes(props.computerChoice)
            ? "YOU WIN"
            : props.computerChoice == props.choice.cardName
            ? "draw"
            : "YOU LOSE"}
        </h3>
        <div className={playStyle.tryAgain} onClick={() => tryAgain()}>
          TRY AGAIN
        </div>
      </div>
    </>
  );
};

export default Play;
