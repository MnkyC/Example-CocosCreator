/**
 * 数据存储类
 * 注意，key和value都是字符串形式
 * 对于布尔值，使用1和0进行存储
 * 对于复杂的对象数据，序列化为json进行存储
 * 
 * 根据需要进行加密 第三方库encryptjs
 * 可以替换成localStorage
 */

import encrypt = require("../lib/jslib/MnEncryptjs");

export default class MnGDataStorage {

    public name: string = "save";
    public save: any = null;
    public secretkey: string = "123456";
    public prefix: string = null;

    public constructor() {
    }

    /**
     * 加载存储数据
     */
    public loadData(): void {
        this.save = cc.sys.localStorage.getItem(this.name);

        try {
            this.save = JSON.parse(encrypt.decrypt(this.save, this.secretkey, 256));
        } catch (err) {
            cc.error(err);
        }

        if (!this.save)
            this.save = {};
    }

    /**
     * 清空存储数据
     */
    public clearData(exclude: string[] = null): void {
        if (exclude) {
            for (let key in this.save) {
                if (exclude.indexOf(key) < 0) {
                    delete this.save[key];
                }
            }
        } else {
            this.save = {};
        }

        this.saveData();
    }

    /**
     * 保存存储数据
     */
    public saveData(): void {
        try {
            let str: string = JSON.stringify(this.save);
            let data: string = encrypt.encrypt(str, this.secretkey, 256);
            cc.sys.localStorage.setItem(this.name, data);
        } catch (err) {
            cc.error(err);
        }
    }

    /**
     * 获取数据项
     * @param key 数据键值
     * @param defaultValue 默认数据 
     */
    public getItem(key: string, defaultValue: any = null): any {
        let item = this.save[key];
        if (!item) {
            item = defaultValue;
        }

        return item;
    }

    /**
     * 设置数据项
     * @param key 数据键值
     * @param value 数据
     * @param autoSave 自动保存，默认false
     */
    public setItem(key: string, value: any, autoSave: boolean = false): any {
        let oldValue = this.save[key];
        this.save[key] = value;

        if (autoSave) {
            this.saveData();
        }

        return oldValue;
    }
}