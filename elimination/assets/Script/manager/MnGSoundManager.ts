/**
 * 声音管理
 * 注意保持音乐名唯一，即使是不同文件夹也不行
 */

import ResConfig from "../game/config/MnResConfig";
import MnGDataManager from "./MnGDataManager";

export default class MnGSoundMnager {

    private _audioClipMap: Map<string, cc.AudioClip> = new Map();
    private _audioID: Map<string, number> = new Map();

    private _musicName: string = null;
    private _musicPlaying: boolean = null;

    private constructor() {
    }

    private static _instance: MnGSoundMnager;
    public static get instance(): MnGSoundMnager {
        if (!this._instance) {
            this._instance = new MnGSoundMnager();
        }

        return this._instance;
    }

    // 批量加载，缓存所有音频资源，如公共音频
    public preloadCommonAudioClips(callback: (progress: number, isCompleted: boolean) => void): void {
        cc.loader.loadResDir(ResConfig.SOUND_COMMON_URL, cc.AudioClip, (completedCount, totalCount, item) => {
            let progress = Math.floor(completedCount / totalCount * 100);
            callback(progress, false);
        }, (err, audioClips, urls) => {
            if (err) {
                cc.error(err);
                return;
            }

            audioClips.forEach(element => {
                this._audioClipMap.set(element.name, element);
            });

            callback(100, true);
        });
    }

    // 缓存一部分音频资源
    public preloadAudioClipsByArray(clipNames: string[], callback: (progress: number, isCompleted: boolean) => void): void {
        const urls = clipNames.map(clipName => {
            return `${ResConfig.SOUND_URL}/${clipName}`;
        });

        cc.loader.loadResArray(urls, cc.AudioClip, (completedCount, totalCount, item) => {
            let progress = Math.floor(completedCount / totalCount * 100);
            callback(progress, false);
        }, (err, audioClips) => {
            if (err) {
                cc.error(err);
                return;
            }

            audioClips.forEach(element => {
                this._audioClipMap.set(element.name, element);
            });

            callback(100, true);
        });
    }

    // 缓存单个音频资源
    public preloadAudioClip(clipName: string, isPlay: Boolean = false, isBgAudio: boolean = false, isLoop: boolean = false): void {
        const url = `${ResConfig.SOUND_URL}/${clipName}`;

        cc.loader.loadRes(url, cc.AudioClip, (err, audioClip) => {
            if (err) {
                cc.error(err);
                return;
            }

            this._audioClipMap.set(audioClip.name, audioClip);

            isPlay && this.playAudio(clipName, isBgAudio, isLoop);
        });
    }

    // 远程加载
    public preloadAudioClipByURL(url: string, callback: (progress: number, isCompleted: boolean) => void): void {
        cc.loader.load(url, (completedCount, totalCount, item) => {
            let progress = Math.floor(completedCount / totalCount * 100);
            callback(progress, false);
        }, (err, audioClip) => {
            if (err) {
                cc.error(err);
                return;
            }

            this._audioClipMap.set(audioClip.name, audioClip);

            callback(100, true);
        });
    }

    // 释放所有音频资源，注意，加载的部分资源手动释放后再调用该接口
    public releaseAllAudioClips(): void {
        this.stopAllAudio();
        this.releaseCommonAudioClips();

        this._audioClipMap.clear();
        this._audioID.clear();
    }

    /**
     * 停止所有音频
     */
    public stopAllAudio(): void {
        cc.audioEngine.stopAll();
    }

    // 释放公共音频资源
    public releaseCommonAudioClips(): void {
        cc.loader.releaseResDir(ResConfig.SOUND_COMMON_URL, cc.AudioClip);
    }

    // 释放部分音频资源
    public releaseAudioClipsByArray(clipNames: string[]): void {
        clipNames.forEach(clipName => {
            if (this._audioClipMap.has(clipName)) {
                cc.loader.releaseRes(clipName, cc.AudioClip);
                this._audioClipMap.delete(clipName);
            }
        })
    }

    // 获取音频资源
    public getAudioClip(clipName: string): cc.AudioClip {
        if (!this._audioClipMap.has(clipName)) {
            cc.warn(`未加载的音频资源: ${clipName}`);
            return;
        }

        return this._audioClipMap.get(clipName);
    }

    // 获取部分音频资源
    public getAudioClipsByArray(clipNames: string[]): cc.AudioClip[] {
        const audioClips: cc.AudioClip[] = [];
        clipNames.forEach(clipName => {
            if (this._audioClipMap.has(clipName)) {
                audioClips.push(this._audioClipMap.get(clipName));
            } else {
                cc.warn(`未加载的音频资源: ${clipName}`);
            }
        });

        return audioClips;
    }

    /**
     * 播放音频
     * @param clipName 音乐名
     * @param isBgAudio 是否背景音
     * @param isLoop 是否循环
     * @param playTime 播放时间
     */
    public playAudio(clipName: string, isBgAudio: boolean = false, isLoop: boolean = false, playTime: number = null) {
        if (!clipName) return;

        if (this._audioClipMap.has(clipName)) {
            let volume = 1;

            if (isBgAudio) {
                if (MnGDataManager.instance.musicMute) {
                    return;
                }

                this._musicName = clipName;
                this._musicPlaying = true;

                isLoop = true;
                volume = MnGDataManager.instance.musicVolume;
            } else {
                if (MnGDataManager.instance.effectMute) {
                    return;
                }

                volume = MnGDataManager.instance.effectVolume;
            }

            this._audioID.set(clipName, cc.audioEngine.play(this._audioClipMap.get(clipName), isLoop, volume));

            if (playTime && playTime > 0) {
                setTimeout(() => {
                    this.stopAudio(clipName);
                }, playTime);
            }
        } else {
            this.preloadAudioClip(clipName, true, isBgAudio, isLoop);
        }
    }

    /**
     * 停止音频
     * @param clipName 音乐名
     */
    public stopAudio(clipName: string): void {
        if (this._audioID.has(clipName)) {
            cc.audioEngine.stop(this._audioID.get(clipName));
            this._audioClipMap.delete(clipName);
            this._audioID.delete(clipName);
        }
    }

    /**
     * 暂停音频
     * @param clipName 音乐名
     */
    public pauseAudio(clipName: string): void {
        if (this._audioID.has(clipName)) {
            cc.audioEngine.pause(this._audioID.get(clipName));
        }
    }

    /**
     * 恢复音频
     * @param clipName 音乐名
     */
    public resumeAudio(clipName: string): void {
        if (this._audioID.has(clipName)) {
            cc.audioEngine.resume(this._audioID.get(clipName));
        }
    }

    /**
    * 播放背景音乐
    */
    private playMusic(): void {
        if (this._musicPlaying) {
            this.resumeAudio(this._musicName);
        } else {
            this.playAudio(this._musicName);
        }
    }

    /**
     * 暂停背景音乐
     */
    private pauseMusic(): void {
        this.pauseAudio(this._musicName);
    }

    /**
     * 停止所有音效
     */
    private stopAllEffects(): void {
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 音乐开关切换
     */
    public switchMusic(): void {
        MnGDataManager.instance.musicMute = !MnGDataManager.instance.musicMute;
        if (MnGDataManager.instance.musicMute) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }

    /**
     * 音效开关切换
     */
    public switchEffect(): void {
        MnGDataManager.instance.effectMute = !MnGDataManager.instance.effectMute;
        if (MnGDataManager.instance.musicMute) {
            this.stopAllEffects();
        }
    }

    /**
     * 获取背景音乐的音量
     */
    public get musicVolume(): number {
        return MnGDataManager.instance.musicVolume;
    }

    /**
     * 设置背景音乐的音量
     */
    public set musicVolume(value: number) {
        if (value <= 0) {
            MnGDataManager.instance.musicMute = true;
            this.pauseMusic();
        } else {
            MnGDataManager.instance.musicMute = false;
            this.playMusic();
        }

        MnGDataManager.instance.musicVolume = value;
        cc.audioEngine.setMusicVolume(value);
    }

    /**
     * 获取音效的音量
     */
    public get effectVolume(): number {
        return MnGDataManager.instance.effectVolume;
    }

    /**
     * 设置音效的音量
     */
    public set effectVolume(value: number) {
        if (value <= 0) {
            MnGDataManager.instance.effectMute = true;
            this.stopAllEffects();
        } else {
            MnGDataManager.instance.effectMute = false;
        }

        MnGDataManager.instance.effectVolume = value;
        cc.audioEngine.setEffectsVolume(value);
    }

}
