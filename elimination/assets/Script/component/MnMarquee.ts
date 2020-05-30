//跑马灯

const { ccclass, property } = cc._decorator;

@ccclass
export default class MnMarquee extends cc.Component {

    @property(cc.Node)
    nodeRoot: cc.Node = null;

    @property(cc.Layout)
    layout: cc.Layout = null;

    @property(cc.Label)
    labelName: cc.Label = null;

    @property(cc.Label)
    labelMsg: cc.Label = null;

    private _posX: number = null;
    private _endX: number = null;

    private _callback: Function = null;

    start() {
        if (this.nodeRoot.active) return;

        this.nodeRoot.active = false;
    }

    public marquee(name: string, msg: string, callback: Function): void {
        this._callback = callback;

        this._posX = cc.winSize.width >> 1;

        this.nodeRoot.active = true;

        this.labelName.string = name;
        this.labelMsg.string = msg;
        this.labelName._forceUpdateRenderData();
        this.labelMsg._forceUpdateRenderData();
        this.layout.updateLayout();
        this.layout.node.x = this._posX;

        this._endX = -this._posX - this.layout.node.getContentSize().width;

        this.schedule(this.updatePosition, 0.02);
    }

    private updatePosition(): void {
        if (this.layout.node.x <= this._endX) {
            this.unschedule(this.updatePosition);
            this.nodeRoot.active = false;

            this._callback && this._callback();
        } else {
            this.layout.node.x = this.layout.node.x - 2;
        }
    }
}
