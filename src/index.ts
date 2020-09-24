import { allCards } from "./the-crew/cards";
import { shuffle } from "./utils";

document.body.innerText = JSON.stringify(shuffle(allCards), null, 2);
