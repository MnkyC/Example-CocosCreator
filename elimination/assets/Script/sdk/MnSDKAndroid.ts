/**
 * js调Java
 * I    整数
 * F    浮点数
 * Ljava/lang/String;   字符串
 * Z    布尔
 * V    无参
 * 编写格式，(argType)returnType，argType为参数类型，returnType为返回类型
 */

export default class MnSDKAndroid {

    private static _className = "org/mnkyc/game/cocos/AppActivity";

    public static getUUID(): string {
        return "phoneid" + jsb.reflection.callStaticMethod(this._className, "getDeviceID", "()Ljava/lang/String;");
    }

    public static getChannelId(): string {
        return jsb.reflection.callStaticMethod(this._className, "getChannelCode", "()Ljava/lang/String;");
    }

    public static getSystemModel(): string {
        return jsb.reflection.callStaticMethod(this._className, "getSystemModel", "()Ljava/lang/String;");
    }

    public static getSystemVersion(): string {
        return jsb.reflection.callStaticMethod(this._className, "getSystemVersion", "()Ljava/lang/String;");
    }

    public static getNetworkType(): number {
        return jsb.reflection.callStaticMethod(this._className, "getNetworkType", "()I");
    }

    public static isWxInstalled(): boolean {
        return jsb.reflection.callStaticMethod(this._className, "isWxInstalled", "()Z");
    }

    public static getCopyText(text): void {
        jsb.reflection.callStaticMethod(this._className, "copyTextToClipboard", "(Ljava/lang/String;)V", text);
    }

}