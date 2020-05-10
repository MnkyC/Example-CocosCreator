// 用户管理

interface IPlayerInfo {
    ID: string;
    pwd: string;
    md5Encrypt: boolean;
    uid: string;

    token: string;
    mobile: string;
    avatar: string;
    nickname: string;
}

export default class MnGPlayerManager {
    private playerMap: Map<string, IPlayerInfo> = new Map();

    private constructor() {
    }

    private static _instance: MnGPlayerManager = null;
    public static get instance(): MnGPlayerManager {
        if (!this._instance) {
            this._instance = new MnGPlayerManager();
        }

        return this._instance;
    }

}