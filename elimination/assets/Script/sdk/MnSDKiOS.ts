// jsb调OC

export default class MnSDKiOS {

    private static _className = "DeviceHelper";

    public static getUUID(): string {
        return jsb.reflection.callStaticMethod(this._className, "getDeviceID");
    }

    public static getChannelId(): string {
        return jsb.reflection.callStaticMethod(this._className, "getChannelCode");
    }

    public static getSystemModel(): string {
        return jsb.reflection.callStaticMethod(this._className, "getSystemModel");
    }

    public static getSystemVersion(): string {
        return jsb.reflection.callStaticMethod(this._className, "getSystemVersion");
    }

    public static getNetworkType(): number {
        return jsb.reflection.callStaticMethod(this._className, "getNetworkType");
    }

    public static isWxInstalled(): boolean {
        return jsb.reflection.callStaticMethod(this._className, "isWxInstalled");
    }

    public static getCopyText(text): void {
        jsb.reflection.callStaticMethod(this._className, "copyTextToClipboard:", text);
    }

}