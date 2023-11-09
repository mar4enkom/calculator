export class ErrorsList {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.clear();
        this.root?.forEach(errorString => {
            const errorLi = document.createElement("li");
            errorLi.textContent = errorString.message;
            this.root.appendChild(errorLi);
        });
    }

    clear() {
        const errorsLi = this.root.querySelectorAll("li");
        errorsLi?.forEach(liElement => liElement.remove());
    }
}