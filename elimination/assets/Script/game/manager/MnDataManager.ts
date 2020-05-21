/**
 * 游戏数据管理组件
 */

import { MnEventName as EventName } from "../../global/MnEventName";
import MnEventManager from "../../lib/support/MnEventManager";
import MnDispatcher from "../../lib/support/MnDispatcher";

import MnGDataManager from "../../manager/MnGDataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MnDataManager extends cc.Component {

    @property(cc.Sprite)
    avatar: cc.Sprite = null;

    @property(cc.Label)
    labelNickname: cc.Label = null;

    public name: string = null;

    onLoad() {
        this.name = "MnDataManager";
        this.initEvent();
    }

    onDestroy() {
        this.clearEvent();
    }

    private clearEvent(): void {
        MnEventManager.instance.clearEvents(this);
    }

    /**
     * 监听消息，进行数据刷新
     */
    private initEvent(): void {
        MnEventManager.instance.registerOnObject(this, MnDispatcher.eventDispatcher, EventName.REFRESH_ROLE_INFO, this.onRefreshRoleInfo, this);
        MnEventManager.instance.enableOnObject(this);
    }

    /**
     * 用户数据刷新
     */
    private onRefreshRoleInfo(): void {
        // 通过MnGDataManager.instance获取数据并刷新界面
    }

}