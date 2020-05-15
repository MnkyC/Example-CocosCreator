// 开发环境

export default class MnSDKDesktop {

    public static getUUID(): string {
        return 'phoneid' + new Date().getTime() + Math.floor(Math.random() * 10000000);
    }

    public static getChannelId(): string {
        return "0";
    }

    /**
     * 获取设备型号
     */
    public static getSystemModel(): string {
        return "0";
    }

    /**
     * 获取设备版本
     */
    public static getSystemVersion(): string {
        return "0";
    }

    /**
     * 设备的网络类型
     * 0 无 1 WIFI或电缆 2 无线广域网
     */
    public static getNetworkType(): number {
        return cc.sys.getNetworkType();
    }

    /**
     * 微信是否已安装
     */
    public static isWxInstalled(): boolean {
        return false;
    }

    // 复制
    public static getCopyText(text): void {
    }

}