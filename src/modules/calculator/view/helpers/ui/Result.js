export class Result {
    constructor(root) {
        this.root = root;
    }

    render(result) {
        this.root.textContent = `= ${result}`;
    }

    clear() {
        this.root.textContent = "";
    }
}