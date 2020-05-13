// 预制体对象池

export default class MnPrefabPool {

    private _pool: any = null; // 存储具体对象的对象池
    private _prefab: cc.Prefab = null; // 对象池引用的prefab
    private _script: any = null; // prefab对应的脚本组件

    public constructor(prefab: cc.Prefab, script: any) {
        this._pool = [];
        this._prefab = prefab;
        this._script = script;
    }

    /**
     * 获取对象，调用脚本组件中的reuse完成事件的注册(如点击事件的注册)
     */
    public get(): any {
        let last = this._pool.length - 1;
        if (last < 0) {
            return cc.instantiate(this._prefab);
        } else {
            let obj: any = this._pool[last];
            this._pool.length = last;

            // 对象复用
            var handler = this._script ? obj.getComponent(this._script) : null;
            if (handler && handler.reuse) {
                handler.reuse.apply(handler, arguments);
            }

            return obj;
        }
    }

    /**
     * 回收对象，调用脚本组件中的unuse完成事件的反注册(如点击事件的移除)
     * @param obj 
     */
    public put(obj: any): void {
        if (obj && this._pool.indexOf(obj) === -1) {
            obj.removeFromParent(false);

            // 对象回收
            var handler = this._script ? obj.getComponent(this._script) : null;
            if (handler && handler.unuse) {
                handler.unuse();
            }

            this._pool.push(obj);
        }
    }

    /**
     * 获取当前缓冲池的可用对象数量
     */
    public getPoolSize(): number {
        return this._pool.length;
    }

    /**
     * 清除对象池，销毁缓存的所有节点
     * 建议在切换场景或不再需要时手动调用，防止内存泄漏
     */
    public clear(): void {
        const count = this._pool.length;

        for (let i = 0; i < count; i++) {
            this._pool[i].destroy();
        }

        this._pool.length = 0;
    }
}