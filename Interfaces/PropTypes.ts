import { HandsClass } from "../Classes/HandsClass";
import { Dispatch, SetStateAction } from "react";

export default interface PropTypes {
  choice: HandsClass;
  setChoice: Dispatch<SetStateAction<HandsClass>>;
  setScore: Dispatch<SetStateAction<number>>;
  computerChoice: string;
  setComputerChoice: Dispatch<SetStateAction<string>>;
  score: number;
}
