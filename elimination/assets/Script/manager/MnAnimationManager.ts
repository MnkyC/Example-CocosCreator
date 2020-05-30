/**
 * 动画管理器
 * 顺序栈实现
 * 
 * example:
        MnAnimationManager.getInstance('').addAnimation(() => {
            // code here

            MnAnimationManager.getInstance('').animationOver();
        }, null);

        // 回调形式(推荐)
        MnAnimationManager.getInstance('').addAnimation(() => {
            method(()=> {
                MnAnimationManager.getInstance('').animationOver();
            });
        }, null);

        // 定时形式
        MnAnimationManager.getInstance('').addAnimation(() => {
            // code here

            this.scheduleOnce(() => { MnAnimationManager.getInstance('').animationOver() }, 2);
        }, null);
 */

export default class MnAnimationManager {

    private static _pool: any = [];

    private static STATE_IDLE: number = 1;
    private static STATE_BUSY: number = 2;

    private _state: number = null;
    private _animation_queue: Array<any> = null;

    private constructor() {
        this._animation_queue = [];
        this._state = MnAnimationManager.STATE_IDLE;
    }

    public static getInstance(name: string): MnAnimationManager {
        if (!name) {
            name = 'MnAnimationManager';
        }

        if (!MnAnimationManager._pool[name]) {
            MnAnimationManager._pool[name] = new MnAnimationManager();
        }

        return MnAnimationManager._pool[name];
    }

    /**
     * 动画结束必须调用
     */
    public animationOver(): void {
        const animation = this._animation_queue[0];
        if (!animation) {
            this._state = MnAnimationManager.STATE_IDLE;
            return;
        }

        this._animation_queue.shift();
        this.checkQueue();
    }

    /**
     * 清空动画
     */
    public endAnimations(): void {
        if (this._state == MnAnimationManager.STATE_IDLE) {
            return;
        }

        const animation = this._animation_queue[0];
        if (!animation) {
            this._state = MnAnimationManager.STATE_IDLE;
            return;
        }

        animation.clearFunc && animation.clearFunc();

        this.clearQueue();
        this._state = MnAnimationManager.STATE_IDLE;
    }

    /**
     * 清空队列
     */
    private clearQueue(): void {
        for (let k in this._animation_queue) {
            this._animation_queue[k] = null;
        }

        this._animation_queue = [];
    }

    /**
     * 增加动画
     * @param animFunc 动画具体逻辑
     * @param clearFunc 动画清理逻辑
     */
    public addAnimation(animFunc, clearFunc) {
        let animation = { animFunc: animFunc, clearFunc: clearFunc };
        this._animation_queue.push(animation);

        if (this._state == MnAnimationManager.STATE_BUSY) {
            return;
        }

        this.checkQueue();
    }

    /**
     * 执行动画
     */
    private checkQueue(): void {
        const animation = this._animation_queue[0];
        if (!animation) {
            this._state = MnAnimationManager.STATE_IDLE;
            return;
        }

        this._state = MnAnimationManager.STATE_BUSY;

        animation.animFunc();
    }
}
