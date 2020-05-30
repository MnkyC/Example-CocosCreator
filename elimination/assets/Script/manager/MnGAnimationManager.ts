/**
 * 全局动画管理器
 * 顺序栈实现
 * 
 * example:
        MnGAnimationManager.instance.addAnimation(() => {
            MnGAnimationManager.instance.animationOver();
        }, null);

        // 回调形式(推荐)
        MnGAnimationManager.instance.addAnimation(() => {
            method(()=> {
                MnGAnimationManager.instance.animationOver();
            });
        }, null);

        // 定时形式
        MnGAnimationManager.instance.addAnimation(() => {
            // code here

            this.scheduleOnce(() => { MnGAnimationManager.instance.animationOver() }, 2);
        }, null);
 */

export default class MnGAnimationManager {

    private static STATE_IDLE: number = 1;
    private static STATE_BUSY: number = 2;
    private _state: number = null;
    private _animation_queue: Array<any> = null;

    private constructor() {
        this._animation_queue = [];
        this._state = MnGAnimationManager.STATE_IDLE;
    }

    private static _instance: MnGAnimationManager = null;
    public static get instance(): MnGAnimationManager {
        if (!this._instance) {
            this._instance = new MnGAnimationManager();
        }

        return this._instance;
    }

    /**
     * 动画结束必须调用
     */
    public animationOver(): void {
        const animation = this._animation_queue[0];
        if (!animation) {
            this._state = MnGAnimationManager.STATE_IDLE;
            return;
        }

        this._animation_queue.shift();
        this.checkQueue();
    }

    /**
     * 清空动画
     */
    public endAnimations(): void {
        if (this._state == MnGAnimationManager.STATE_IDLE) {
            return;
        }

        const animation = this._animation_queue[0];
        if (!animation) {
            this._state = MnGAnimationManager.STATE_IDLE;
            return;
        }

        if (animation.clearFunc) {
            animation.clearFunc();
        }

        this.clearQueue();
        this._state = MnGAnimationManager.STATE_IDLE;
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

        if (this._state == MnGAnimationManager.STATE_BUSY) {
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
            this._state = MnGAnimationManager.STATE_IDLE;
            return;
        }

        this._state = MnGAnimationManager.STATE_BUSY;

        animation.animFunc();
    }
}
