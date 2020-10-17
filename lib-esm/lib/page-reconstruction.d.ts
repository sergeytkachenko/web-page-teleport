interface ElBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface ViewEl {
    tag: string;
    box: ElBox;
    zIndex: number;
}
export declare function documentPack(): ViewEl[];
interface DocumentInfo {
    toElement: HTMLElement;
    viewElements: ViewEl[];
    screenshotSrc: string;
    width: number;
    height: number;
}
export declare function documentUnpack(config: DocumentInfo): Promise<void>;
export {};
