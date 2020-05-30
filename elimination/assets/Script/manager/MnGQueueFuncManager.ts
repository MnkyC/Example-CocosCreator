/**
 * 方法管理器
 * 保证方法顺序执行
 * 常用于初始化界面，在资源都加载完毕后再发起登录
 * 
 * example:
         MnGQueueFuncManager.instance.functionArray = [
            this.initData,
            this.loadRes,
            this.loadProto,
            this.enterToLogion
        ]
        MnGQueueFuncManager.instance.start();

        private initData(caller:any, callback: Function): void {
            ...
            callback.call(caller, 0);
        }
        ...
        private enterToLogion(caller:any, callback: Function): void {
            callback.call(caller, 0);
            ...
        }
 */

export default class MnGQueueFuncManager {

    private _functionArray: Function[] = null;
    private _index: number = null;

    private constructor() {
        this._functionArray = [];
        this._index = 0;
    }

    private static _instance: MnGQueueFuncManager = null;
    public static get instance(): MnGQueueFuncManager {
        if (!this._instance) {
            this._instance = new MnGQueueFuncManager();
        }

        return this._instance;
    }

    set functionArray(functionArray) {
        this._functionArray = functionArray;
    }

    public start(): void {
        if (this._functionArray.length == 0) {
            return;
        }

        // this._functionArray[this._index](this.callback.bind(this));
        this._functionArray[this._index](this, this.callback);
    }

    public callback(code: number): void {
        this._index++;

        if (this._index + 1 > this._functionArray.length) {
            this.clearAll();
            return;
        }

        // this._functionArray[this._index](this.callback.bind(this));
        this._functionArray[this._index](this, this.callback);
    }

    public clearAll() {
        this._functionArray = [];
        this._index = 0;
    }
}