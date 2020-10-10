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
export declare function documentPack(document: Document): Promise<ViewEl[]>;
export declare function documentUnpack(toElement: Element, elements: ViewEl[]): Promise<void>;
export {};
