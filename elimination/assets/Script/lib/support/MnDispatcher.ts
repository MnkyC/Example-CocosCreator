// 事件抛出器

export default class MnDispatcher {
    public static eventDispatcher: cc.EventTarget;

    public static init(): void {
        MnDispatcher.eventDispatcher = new cc.EventTarget();
    }

    //args 上限5个
    public static dispatch(eventName: string, ...args: any[]): void {
        MnDispatcher.eventDispatcher.emit(eventName, args);
    }

    public static on(eventName: string, callback: Function, target: any): void {
        MnDispatcher.eventDispatcher.on(eventName, callback, target);
    }

    public static off(eventName: string, callback: Function, target: any): void {
        MnDispatcher.eventDispatcher.off(eventName, callback, target);
    }

    public static once(eventName: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target: any): void {
        MnDispatcher.eventDispatcher.once(eventName, callback, target);
    }

    public static hasListener(eventName: string): boolean {
        return MnDispatcher.eventDispatcher.hasEventListener(eventName);
    }

    public static offAll(keyOrTarget: string | any): void {
        MnDispatcher.eventDispatcher.removeAll(keyOrTarget);
    }

    public static targetOff(target: any) {
        MnDispatcher.eventDispatcher.targetOff(target);
    }
}
