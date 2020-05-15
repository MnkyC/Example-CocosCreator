// sdk管理

import MnSDKDesktop from "./MnSDKDesktop";
import MnSDKAndroid from "./MnSDKAndroid";
import MnSDKiOS from "./MnSDKiOS";

export default class MnSDKEntry {

    public sdk: any = null;

    private constructor() {
        this.plaform();
    }

    private static _instance: MnSDKEntry = null;
    public static get instance(): MnSDKEntry {
        if (!this._instance) {
            this._instance = new MnSDKEntry();
        }

        return this._instance;
    }

    private plaform(): any {
        const os = cc.sys.os;

        if (cc.sys.platform == cc.sys.MOBILE_BROWSER || cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
            this.sdk = MnSDKDesktop;
            return;
        }

        switch (os) {
            case cc.sys.OS_WINDOWS:
                this.sdk = MnSDKDesktop;
                break;
            case cc.sys.OS_IOS:
                this.sdk = MnSDKiOS;
                break;
            case cc.sys.OS_ANDROID:
                this.sdk = MnSDKAndroid;
                break;
            default:
                this.sdk = MnSDKDesktop;
                break;
        }
    }
}