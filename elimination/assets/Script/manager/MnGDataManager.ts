// 公共数据管理，有些数据可落地

import { MnAudioSetting } from "../global/MnSettingData";

export default class MnGDataManager {

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