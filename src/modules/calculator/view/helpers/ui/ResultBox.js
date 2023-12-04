export class ResultBox {
    constructor(root) {
        this.root = root;
    }

    render(result) {
        if(result == null) {
            this.root.textContent = ``;
        } else {
            this.root.textContent = `= ${result}`;
        }
    }

    clear() {
        this.root.textContent = "";
    }
}