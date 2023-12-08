export class ResultBox {
    constructor(root) {
        this.root = root;

        this.render = this.render.bind(this);
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