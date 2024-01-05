import {Drawer} from "./ui/Drawer/Drawer";
import HistoryButton from "./ui/HistoryButton/HistoryButton";

export class HistoryUICreator {
    createHistoryUI() {
        const wrapper = document.createElement("div");
        const drawer = new Drawer();

        wrapper.appendChild(HistoryButton);
        wrapper.appendChild(drawer.create());

        return wrapper;
    }
}