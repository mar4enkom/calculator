export class ErrorsList {
    constructor(root) {
        this.root = root;
    }

    render(errorsList) {
        this.clear();
        errorsList?.forEach(error => {
            const errorLi = document.createElement("li");
            errorLi.textContent = error.message;
            this.root.appendChild(errorLi);
        });
    }

    clear() {
        const errorsLi = this.root.querySelectorAll("li");
        errorsLi?.forEach(liElement => liElement.remove());
    }
}