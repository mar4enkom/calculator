export interface CreateElementArgs {
    innerContent?: HTMLElement;
}

export interface AppElement {
    create(args?: CreateElementArgs): HTMLElement;
}