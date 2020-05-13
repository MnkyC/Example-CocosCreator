// 对象池

export default class ObjectPool {

    private static _pool: any = []; // 存储具体对象的对象池

    private _template: any; // 对象
    private _list: Array<any>; // 存储对象

    private _maxSize: number = 100; // 容量上限

    private constructor(value: any) {
        this._template = value;
        this._list = new Array();
    }

    /**
     * 根据类名获得该类的对象池
     * @param name 类名
     * @param value 类
     */
    public static getInstance(name: string, value: any): ObjectPool {
        if (!value)
            value = name;

        if (!ObjectPool._pool[name])
            ObjectPool._pool[name] = new ObjectPool(value);
        return ObjectPool._pool[name];
    }

    /**
     * 获取对象
     */
    public get(): Object {
        let obj: Object;

        while (this._list.length > 0 && !obj) {
            obj = this._list.shift();
        }

        if (!obj) {
            obj = new this._template();
        }

        if (!obj) {
            return this.get();
        }

        return obj;
    }

    /**
     * 回收对象
     * @param value 
     */
    public put(value: Object): boolean {
        if (value && this._list.length < this._maxSize) {
            if (value instanceof this._template && this._list.indexOf(value) == -1) {
                this._list.push(value);
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    /**
     * 获取对象池内对象的数目
     */
    public getPoolSize(): number {
        return this._list.length;
    }

    /**
     * 获取对象池容量
     */
    public get size(): number {
        return this._maxSize;
    }

    /**
     * 设置对象池容量
     */
    public set size(value: number) {
        if (this._maxSize != value) {
            this._maxSize = value;

            while (this._list.length > value) {
                this._list.shift();
            }
        }
    }

}
