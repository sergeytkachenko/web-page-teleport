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
    fakeId: string;
}
interface DocumentInfo {
    toElement: HTMLElement;
    viewElements: ViewEl[];
    screenshotSrc: string;
    width: number;
    height: number;
}
export interface TeleportCanvasEvent {
    fakeId?: string;
    originEvent: MouseEvent;
}
declare type Handler = (e: TeleportCanvasEvent) => void;
export declare class CanvasEvents {
    readonly leftClickFns: Handler[];
    readonly rightClickFns: Handler[];
    onLeftClick(fn: Handler): CanvasEvents;
    onRightClick(fn: Handler): CanvasEvents;
}
export declare function documentPack(): ViewEl[];
export declare function documentUnpack(config: DocumentInfo): Promise<CanvasEvents>;
export {};
