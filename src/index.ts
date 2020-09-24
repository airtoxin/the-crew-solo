import { allCards } from "./the-crew/card";
import { shuffle } from "./utils";

document.body.innerText = JSON.stringify(shuffle(allCards), null, 2);
