export class CalculationError {
    constructor(errors = []) {
        this.errors = Array.isArray(errors) ? errors : [errors]
    }
}