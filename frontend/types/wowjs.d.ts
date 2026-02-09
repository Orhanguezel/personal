declare module "wowjs" {
    interface WOWOptions {
        boxClass?: string;
        animateClass?: string;
        offset?: number;
        mobile?: boolean;
        live?: boolean;
        callback?: (box: HTMLElement) => void;
        scrollContainer?: HTMLElement | null;
    }

    class WOW {
        constructor(options?: WOWOptions);
        init(): void;
        sync(element?: HTMLElement): void;
    }

    export = WOW;
    export { WOW };
}
