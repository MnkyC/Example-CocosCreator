/**
 * 游戏角色
 * 需将该脚本挂载到场景Canvas下
 */

import MnEventManager from "../lib/support/MnEventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MnRole extends cc.Component {

    @property(cc.Node)
    role: cc.Node = null; // 主角

    @property(cc.Camera)
    roleCamera: cc.Camera = null; // 主角摄像机，跟随主角移动，需要单独分组

    @property([cc.Sprite])
    ghostCanvasList: cc.Sprite[] = []; // 残影

    private _ghostEffect: boolean = null; // 是否开启残影
    private _ghostTexture: cc.RenderTexture = null; // 摄像机渲染目标

    onLoad() {
        this.name = "MnRole";

        MnEventManager.instance.registerOnObject(this, this.node, cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    }

    // 增加残影效果
    public addGhostEffect(): void {
        if (this._ghostEffect) return;

        this.role.group = "role";

        const roleZindex = 10; // 管理主角和残影的层级
        this.role.zIndex = roleZindex;

        // 对场景进行截图
        this._ghostTexture = new cc.RenderTexture();
        this._ghostTexture.initWithSize(this.node.width, this.node.height);

        // 摄像机渲染截图
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(this._ghostTexture);
        this.roleCamera.targetTexture = this._ghostTexture;

        this.ghostCanvasList.forEach((ghost, idx) => {
            ghost.node.scaleY = -1;
            ghost.node.zIndex = roleZindex - idx;
            ghost.node.opacity = 100 - idx * 15;
            ghost.spriteFrame = spriteFrame;
            ghost.node.active = true;
        });

        this.schedule(this.ghostFollow, 0.1, cc.macro.REPEAT_FOREVER);

        MnEventManager.instance.enableOnObject(this);

        this._ghostEffect = true;
    }

    // 移除残影效果
    public removeGhostEffect(): void {
        if (!this._ghostEffect) return;

        MnEventManager.instance.disableOnObject(this);

        this._ghostTexture.destroy();
        this.roleCamera.targetTexture = null;

        this._ghostEffect = false;

        this.ghostFollow && this.unschedule(this.ghostFollow);

        this.ghostCanvasList.forEach(ghost => {
            ghost.node.active = false;
            ghost.node.stopAllActions();
            ghost.spriteFrame.destroy();
        });

        let out = this.role.convertToWorldSpaceAR(cc.v2(this.role.x, this.role.y));
        this.role.group = "default";
        this.role.setPosition(this.role.convertToNodeSpaceAR(out));
    }

    touchMoveEvent(evt: cc.Event.EventTouch) {
        this.role.x += evt.getDeltaX();
        this.role.y += evt.getDeltaY();
    }

    onDestroy() {
        this.ghostFollow && this.unschedule(this.ghostFollow);
        MnEventManager.instance.clearEvents(this);
    }

    ghostFollow() {
        this.ghostCanvasList.forEach((ghost, i) => {
            const dis = (ghost.node.position as any).sub(this.role.position).mag();
            if (dis < 0.5) return; // 涉及到浮点数，设置一个误差范围，dis的计算不可能精准，小于0.5就认为是静止

            ghost.node.stopAllActions();
            ghost.node.runAction(cc.moveTo(i * 0.04 + 0.02, this.role.x, this.role.y));
        });
    }

    start() {

    }

}
