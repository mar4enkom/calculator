import {HistoryUICreator} from "../view/HistoryUICreator";

export class History {
    private uiCreator: HistoryUICreator;
    constructor(uiCreator: HistoryUICreator) {
        this.uiCreator = uiCreator
    }

    getHistoryUI() {
        return this.uiCreator.createHistoryUI();
    }
}