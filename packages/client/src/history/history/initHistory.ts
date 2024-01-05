import {HistoryUICreator} from "../view/HistoryUICreator";
import {History} from "./History";

export function initHistory(): History {
    const uiCreator = new HistoryUICreator();

    return new History(uiCreator);
}