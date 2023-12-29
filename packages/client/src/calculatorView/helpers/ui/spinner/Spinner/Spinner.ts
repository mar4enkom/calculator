import "./spinner.css";

export class Spinner implements SpinnerInterface {
    create(): HTMLDivElement {
        const spinner = document.createElement("div");
        spinner.classList.add("loadingio-spinner-rolling-jhhu9dpfpb7");
        const spinnerContent = document.createElement("div");
        spinnerContent.classList.add("ldio-kwvjcl2d92");
        spinner.appendChild(spinnerContent);
        const div = document.createElement("div");
        spinnerContent.appendChild(div);

        return spinner;
    }
}