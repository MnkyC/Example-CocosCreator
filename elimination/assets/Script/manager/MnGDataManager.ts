// 公共数据管理，有些数据可落地

import PlayerData from "../model/data/PlayerData";

import { MnEventName as EventName } from "../global/MnEventName";
import MnEventManager from "../lib/support/MnEventManager";
import MnDispatcher from "../lib/support/MnDispatcher";

import { MnUtil as Util } from "../lib/util/MnUtil";

import { MnAudioSetting } from "../global/MnSettingData";

export default class MnGDataManager {

    public static selfuid: any = null; // 自己的uid
    public static curGameId: any = null; // 游戏ID
    public static curGameName: number = null; // 游戏名称
    public static dic: any = null; // 角色信息

    private _playerData: PlayerData = null; // 用户数据本地缓存

    private constructor() {
    }

    private static _instance: MnGDataManager = null;
    public static get instance(): MnGDataManager {
        if (!this._instance) {
            this._instance = new MnGDataManager();
        }

        return this._instance;
    }

    public init(): void {
        this._playerData = new PlayerData();
        this._playerData.loadData();
        this.initEvent();
    }

    /**
     * 监听服务器消息，进行数据刷新
     */
    private initEvent(): void {
        MnEventManager.instance.registerOnObject(this, server, EventName.GAME_USER_INFO_REP, this.onUserInfoRep, this);
        MnEventManager.instance.enableOnObject(this);
    }

    /**
     * 用户数据刷新回调
     * @param msg 服务器消息
     */
    private onUserInfoRep(msg: any): void {

        MnGDataManager.dic[MnGDataManager.selfuid] = MnGDataManager.dic[MnGDataManager.selfuid] || {};
        Util.injectProp(MnGDataManager.dic[MnGDataManager.selfuid], msg);

        MnDispatcher.dispatch(EventName.REFRESH_ROLE_INFO); // 分发消息
    }

    public get musicVolume(): number {
        return MnAudioSetting.instance.musicVolume;
    }

    public set musicVolume(value: number) {
        MnAudioSetting.instance.musicVolume = value;
    }

    public get effectVolume(): number {
        return MnAudioSetting.instance.effectVolume;
    }

    public set effectVolume(value: number) {
        MnAudioSetting.instance.effectVolume = value;
    }

    public get musicMute(): boolean {
        return MnAudioSetting.instance.musicMute;
    }

    public set musicMute(value: boolean) {
        MnAudioSetting.instance.musicMute = value;
    }

    public get effectMute(): boolean {
        return MnAudioSetting.instance.effectMute;
    }

    public set effectMute(value: boolean) {
        MnAudioSetting.instance.effectMute = value;
    }
}