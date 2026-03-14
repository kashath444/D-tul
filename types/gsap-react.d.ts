declare module '@gsap/react' {
    export function useGSAP(
        callback: (context: any) => void | (() => void),
        options?: { scope?: React.RefObject<any>; dependencies?: any[] }
    ): void;
}
