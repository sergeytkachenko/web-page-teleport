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
export declare class PageReconstruction {
    packPage(document: Document): Promise<ViewEl[]>;
    unpackPage(toElement: Element, elements: ViewEl[]): Promise<void>;
}
export {};
