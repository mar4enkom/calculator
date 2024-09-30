import {CalculatorPlaceholder} from "@/app/view/appViewRenderer/ui/CalculatorPlaceholder/CalculatorPlaceholder";
import spinner from "@/shared/ui/Spinner/Spinner";
import errorIndicator from "@/shared/ui/ErrorIndicator/ErrorIndicator";

export class AppUiKit {
    public loadingIndicator: HTMLElement;
    public errorIndicator: HTMLElement;
    constructor() {
        this.loadingIndicator = this.getLoadingIndicator();
        this.errorIndicator = this.getErrorIndicator();
    }

    private getLoadingIndicator() {
        const placeholder = new CalculatorPlaceholder();
        return placeholder.create({innerContent: spinner});
    }

    private getErrorIndicator() {
        const placeholder = new CalculatorPlaceholder("danger");
        return placeholder.create({innerContent: errorIndicator});
    }
}