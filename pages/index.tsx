import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Coordinates } from "../Components/Coordinates";
import { useEffect, useRef, useState } from "react";
import Play from "../Components/Play";
import { json } from "stream/consumers";

import rulesImg from "../public/images/image-rules-bonus.svg";

const Home: NextPage = () => {
  const [choice, setChoice] = useState<Coordinates>(null!);
  const [showRule, setShowRule] = useState(false);
  const overlay = useRef(null!);

  const showRules = () => {
    setShowRule(!showRule);
    // if (showRule) {
    //   document.getElementById("overlay")!.style.display = "block";
    // } else {
    //   document.getElementById("overlay")!.style.display = "none";
    // }
  };

  const [score, setScore] = useState<number>(() => {
    try {
      const data: string | null = localStorage.getItem("myScore");
      return data ? JSON.parse(data!) : 0;
    } catch (e) {
      return 0;
    }
  });
  const [computerChoice, setComputerChoice] = useState<string>("");

  useEffect(() => {
    console.log(localStorage.getItem("jj"));
    const card: string[] = [
      "scissor",
      "paper",
      "rock",
      "lizard",
      "spock",
      "scissor",
    ];

    setComputerChoice(card[Math.floor(Math.random() * 5)]);
    if (!localStorage.getItem("myScore")) {
      localStorage.setItem("myScore", JSON.stringify(0));
    }
  }, [computerChoice]);

  const svgWidth = 320;
  const svgHeight = 350;
  const circleRadius = 40;

  const scissor = new Coordinates(
    "scissor",
    svgWidth / 2,
    50,
    "hsl(40, 84%, 53%)",
    ["paper", "lizard"]
  );
  const spock = new Coordinates(
    "spock",
    50,
    svgHeight / 2 - 30,
    "hsl(189, 58%, 57%)",
    ["scissor", "rock"]
  );
  const paper = new Coordinates(
    "paper",
    svgWidth - 50,
    svgHeight / 2 - 30,
    "hsl(230, 89%, 65%)",
    ["rock", "spock"]
  );
  const lizard = new Coordinates(
    "lizard",
    80,
    svgHeight - 80,
    "hsl(261, 72%, 63%)",
    ["spock", "paper"]
  );
  const rock = new Coordinates(
    "rock",
    svgWidth - 80,
    svgHeight - 80,
    "hsl(349, 70%, 56%)",
    ["lizard", "scissor"]
  );

  function select(cardName: Coordinates) {
    setChoice(cardName);
  }

  return (
    <>
      <div
        className={styles.overlay}
        id="overlay"
        ref={overlay}
        style={{ display: `${showRule ? "block" : "none"}` }}
        onClick={() => setShowRule(!showRule)}
      ></div>
      <div className={styles.score}>
        <div className={styles.rock}>
          <p>ROCK PAPER SCISSORS LIZARD SPOCK</p>
        </div>
        <div className={styles.scoreCon}>
          <p>score</p>
          <p>{score}</p>
        </div>
      </div>

      {choice && (
        <Play
          choice={choice}
          score={score}
          setChoice={setChoice}
          setScore={setScore}
          computerChoice={computerChoice}
          setComputerChoice={setComputerChoice}
        />
      )}
      <svg
        className={styles.mySvg}
        width={svgWidth}
        height={svgHeight}
        style={{
          display: `${!choice ? "block" : "none"}`,
        }}
      >
        {/* line from scissor to paper  */}
        <line x1={scissor.x} y1={scissor.y} x2={paper.x} y2={paper.y}></line>
        {/* line from paper to rock */}
        <line x1={paper.x} y1={paper.y} x2={rock.x} y2={rock.y}></line>
        {/* line from rock to lizard  */}
        <line x1={rock.x} y1={rock.y} x2={lizard.x} y2={lizard.y}></line>

        {/* line from lizard to spock  */}
        <line x1={lizard.x} y1={lizard.y} x2={spock.x} y2={spock.y}></line>
        {/* line from spock to scissor  */}
        <line x1={spock.x} y1={spock.y} x2={scissor.x} y2={scissor.y}></line>

        {/* scissor  */}
        <g onClick={() => select(scissor)}>
          <circle
            r={circleRadius}
            cx={scissor.x}
            cy={scissor.y}
            stroke={scissor.strokeColor}
          ></circle>
          <image
            href="images/icon-scissors.svg"
            x={scissor.imageX}
            y={scissor.imageY}
          />
        </g>

        {/* spock  */}
        <g onClick={() => select(spock)}>
          <circle
            r={circleRadius}
            cx={spock.x}
            cy={spock.y}
            stroke={spock.strokeColor}
          ></circle>
          <image
            href="images/icon-spock.svg"
            x={spock.imageX}
            y={spock.imageY}
          />
        </g>

        {/* paper  */}
        <g onClick={() => select(paper)}>
          <circle
            r={circleRadius}
            cx={paper.x}
            cy={paper.y}
            stroke={paper.strokeColor}
          ></circle>
          <image
            href="images/icon-paper.svg"
            x={paper.imageX}
            y={paper.imageY}
          />
        </g>

        {/* lizard  */}

        <g onClick={() => select(lizard)}>
          <circle
            r={circleRadius}
            cx={lizard.x}
            cy={lizard.y}
            stroke={lizard.strokeColor}
          ></circle>
          <image
            href="images/icon-lizard.svg"
            x={lizard.imageX}
            y={lizard.imageY}
          />
        </g>

        {/* rock  */}
        <g onClick={() => select(rock)}>
          <circle
            r={circleRadius}
            cx={rock.x}
            cy={rock.y}
            stroke={rock.strokeColor}
          ></circle>
          <image href="images/icon-rock.svg" x={rock.imageX} y={rock.imageY} />
        </g>
      </svg>

      <div className={styles.rulesCon} onClick={() => showRules()}>
        RULES
      </div>
      <div
        style={{ display: `${showRule ? "block" : "none"}` }}
        className={styles.rulesImg}
      >
        <Image src={rulesImg} />
      </div>
    </>
  );
};

export default Home;
