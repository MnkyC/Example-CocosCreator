// 圆形头像玩家

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    avatar: cc.Sprite = null;

    @property(cc.Node)
    avatarFrame: cc.Node = null;

    @property(cc.Label)
    labelNickname: cc.Label = null;

    onLoad() {
        const contentSize = this.avatarFrame.getContentSize();

        this.avatar.getMaterial(0).setProperty('wh_ratio', this.avatar.node.width / this.avatar.node.height);
        this.avatar.getMaterial(0).setProperty('blur', 0.01);

        this.avatar.node.scaleX = contentSize.height / this.avatar.node.height - 0.01;
        this.avatar.node.scaleY = contentSize.height / this.avatar.node.height - 0.01;

        this.labelNickname.string = "路飞";
    }

    start() {
    }
}
