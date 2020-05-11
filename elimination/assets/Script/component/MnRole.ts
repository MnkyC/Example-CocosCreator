/**
 * 游戏角色
 * 将该脚本挂载到场景Canvas下
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class MnRole extends cc.Component {

    @property([cc.Sprite])
    ghostCanvasList: cc.Sprite[] = []; // 残影

    @property(cc.Node)
    role: cc.Node = null; // 主角

    @property(cc.Camera)
    roleCamera: cc.Camera = null; // 跟随主角移动，需要单独分组

    onLoad() {
    }

    // 残影效果
    public addGhostEffect(): void {
        const roleZindex = 10; // 管理主角和残影的层级
        this.role.zIndex = roleZindex;

        // 对场景进行截图
        const texture = new cc.RenderTexture();
        texture.initWithSize(this.node.width, this.node.height);

        // 摄像机渲染截图
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        this.roleCamera.targetTexture = texture;

        this.ghostCanvasList.forEach((ghost, idx) => {
            ghost.node.scaleY = -1;
            ghost.node.zIndex = roleZindex - idx;
            ghost.node.opacity = 100 - idx * 15;
            ghost.spriteFrame = spriteFrame;
        });

        this.schedule(this.ghostFollow, 0.1, cc.macro.REPEAT_FOREVER);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    }

    touchMoveEvent(evt: cc.Event.EventTouch) {
        this.role.x += evt.getDeltaX();
        this.role.y += evt.getDeltaY();
    }

    onDestroy() {
        this.ghostFollow && this.unschedule(this.ghostFollow);
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
