// 顺序执行

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

        this._functionArray[this._index](this.callback.bind(this));
    }

    public callback(): void {
        this._index++;

        if (this._index + 1 > this._functionArray.length) {
            this.clearAll();
            return;
        }

        this._functionArray[this._index](this.callback.bind(this));
    }

    public clearAll() {
        this._functionArray = [];
        this._index = 0;
    }
}