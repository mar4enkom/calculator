import {AppElement} from "../../../../shared/ui/types";
import historyIcon from "./history.png";
import "./historyButton.css";

class HistoryButton implements AppElement {
    create(): HTMLElement {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-light");
        button.classList.add("history-btn");
        button.innerHTML = `
            <img src="${historyIcon}" alt="History" />
        `;
        return button;
    }
}

export default (new HistoryButton()).create();