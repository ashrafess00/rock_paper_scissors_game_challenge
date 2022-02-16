import rock from "../public/images/icon-rock.svg";
import paper from "../public/images/icon-paper.svg";
import scissor from "../public/images/icon-scissors.svg";
import lizard from "../public/images/icon-lizard.svg";
import spock from "../public/images/icon-spock.svg";

export class Coordinates {
  cardName: string;
  x: number;
  y: number;
  strokeColor: string;

  imageX: number;
  imageY: number;

  defeat: string[];

  constructor(
    name: string,
    x: number,
    y: number,
    strokeColor: string,
    defeat: string[]
  ) {
    this.x = x;
    this.y = y;
    this.imageX = x - 16;
    this.imageY = y - 19;
    this.strokeColor = strokeColor;
    this.cardName = name;
    this.defeat = defeat;
  }
  getDefeat(): string[] {
    return this.defeat;
  }

  getImage(cardName: string): string {
    switch (cardName) {
      case "paper":
        return paper;
        break;
      case "spock":
        return spock;
        break;
      case "scissor":
        return scissor;
        break;
      case "rock":
        return rock;
        break;
      case "lizard":
        return lizard;
        break;
      default:
        return "kjlk";
        break;
    }
  }
}
