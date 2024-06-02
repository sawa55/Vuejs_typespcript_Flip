// gsap.d.ts
declare module 'gsap/ScrollTrigger' {
    import GSAP from 'gsap'; // GSAPStatic を GSAP に変更し、デフォルトインポートを使用

    export class ScrollTrigger {
        constructor(vars: any);
        static register(plugin: any): void;
        static create(vars: any): ScrollTrigger;
        static kill(): void;
        static getScrollFunc(element: any): Function;
        static matchMedia(vars: any): void;
    }

    export interface ScrollTriggerInstanceVars {
        trigger?: HTMLElement | string;
        start?: string | number | Function;
        end?: string | number | Function;
        scrub?: boolean | number;
        pin?: boolean | string | HTMLElement;
        pinSpacing?: boolean | string;
        invalidateOnRefresh?: boolean;
        anticipatePin?: number;
    }

    export interface ScrollTriggerStatic {
        register(gsap: GSAP): void;
    }
}
