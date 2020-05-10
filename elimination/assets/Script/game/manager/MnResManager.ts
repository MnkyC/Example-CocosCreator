// 游戏特有资源管理，种类少可以直接挂载到组件

import { TileTypeEnum as TileType } from "../config/MnEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResManager extends cc.Component {

    @property(cc.SpriteFrame)
    private apple: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private berry: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private grape: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private peach: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private strawberry: cc.SpriteFrame = null;

    private static instance: ResManager = null;

    protected onLoad() {
        ResManager.instance = this;
    }

    /**
     * 获取方块图片资源
     * @param tileType 方块类型
     */
    public static getTileSpriteFrame(tileType: TileType): cc.SpriteFrame {
        switch (tileType) {
            case TileType.APPLE:
                return this.instance.apple;
            case TileType.BERRY:
                return this.instance.berry;
            case TileType.GRAPE:
                return this.instance.grape;
            case TileType.PEACH:
                return this.instance.peach;
            case TileType.STRAWBERRY:
                return this.instance.strawberry;
        }
    }
}
