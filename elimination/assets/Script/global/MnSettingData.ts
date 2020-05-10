// 音频配置

export class MnAudioSetting {

    private constructor() {
    }

    private static _instance: MnAudioSetting = null;
    public static get instance(): MnAudioSetting {
        if (!this._instance) {
            this._instance = new MnAudioSetting();
        }

        return this._instance;
    }

    public musicVolume: number = 1;   //背景音乐
    public effectVolume: number = 1;  //音效
    public musicMute: boolean = false;   //音乐开关, true表示关
    public effectMute: boolean = false;  //音效开关, true表示关
}