import {AppElement} from "../../../../shared/ui/types";
import {generateRandomId} from "../../../../shared/utils/generateRandomId";
import "./drawer.css";

export class Drawer implements AppElement {
    private drawerElement: HTMLDivElement;
    private renderId: string;

    constructor() {
        this.renderId = generateRandomId();
        this.drawerElement = this.create();
    }

    create() {
        if(this.drawerElement) return this.drawerElement;

        const drawer = document.createElement("div");
        drawer.classList.add("drawer-wrapper");
        if(!this.renderId) throw new Error("Render id is not defined");
        drawer.setAttribute("id", this.renderId)
        return drawer;
    }
}