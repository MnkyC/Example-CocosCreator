// 事件管理器

import { MnUtil as Util } from "../util/MnUtil";

// 订阅接口
interface IEventData {
    target: any;
    eventName: string;
    callback: Function;
    thisObj: any;
}

// interface IEvent {
//     readonly [eventName: string]: IEventData[];
// }

export default class MnEventManager {

    private static _instance: MnEventManager;
    public static get instance(): MnEventManager {
        if (!this._instance) {
            this._instance = new MnEventManager();
        }

        return this._instance;
    }

    private _groups: any = {};

    register(groupName: string, target: any, eventName: string, callback: Function, thisObj: any): void {
        const data: IEventData = { target, eventName, callback, thisObj };

        let item: any = {};
        Util.injectProp(item, data, null, false);

        let group: any = this._groups[groupName];
        if (!group) {
            group = this._groups[groupName] = { enable: false, items: [] };
        }
        group.items.push(item);
    }

    registerOnObject(obj: any, target: any, eventName: string, callback: Function, thisObj: any): void {
        this.register(obj.name, target, eventName, callback, thisObj);
    }

    enable(groupName: string): void {
        let group: any = this._groups[groupName];
        if (group && !group.enable) {
            group.enable = true;
            group.items.forEach((item: any) => {
                item.target.on(item.eventName, item.callback, item.thisObj);
            });
        }
    }

    enableOnObject(obj: any): void {
        this.enable(obj.name);
    }

    disable(groupName: string): void {
        let group: any = this._groups[groupName];
        if (group && group.enable) {
            group.enable = false;
            group.items.forEach((item: any) => {
                item.target.off(item.eventName, item.callback, item.thisObj);
            });
        }
    }

    disableOnObject(obj: any): void {
        this.disable(obj.name);
    }

    clearEvents(obj: any) {
        let group: any = this._groups[obj.name];
        if (group && group.enable) {
            group.enable = false;
            group.items.forEach((item: any) => {
                item.target.off(item.eventName, item.callback, item.thisObj);
            });
            group.items = [];
        }
    }

}
