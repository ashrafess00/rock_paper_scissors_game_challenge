import React, { useEffect } from "react";
import playStyle from "../styles/Play.module.css";
import Image from "next/image";
import PropTypes from "../Interfaces/PropTypes";

const Play = (props: PropTypes) => {
  const cardName = props.choice.cardName;
  function tryAgain() {
    props.setChoice(null!);
    props.setComputerChoice("");
  }

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

  return (
    <>
      <div className={`${playStyle.flex} ${playStyle.container}`}>
        <div className={playStyle.handCon}>
          <div
            className={playStyle.circle}
            style={{ borderColor: `${props.choice.strokeColor}` }}
          >
            <Image src={props.choice.getImage(cardName)} alt="my hand" />
          </div>
          <p>YOU PICKED</p>
        </div>

        <div className={playStyle.handCon}>
          <div className={playStyle.circle}>
            {props.computerChoice && (
              <Image
                src={props.choice.getImage(props.computerChoice)}
                alt="computer hand"
              />
            )}
          </div>
          <p>THE HOUSE PICKED</p>
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
