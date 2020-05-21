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
    private _secretkey: string = "123456";
    private _save: any = null;
    private _prefix: string = null;

    public constructor() {
    }

    /**
     * 加载存储数据
     */
    public loadData(): void {
        this._save = cc.sys.localStorage.getItem(this.name);

        try {
            this._save = JSON.parse(encrypt.decrypt(this._save, this._secretkey, 256));
        } catch (err) {
            cc.error(err);
        }

        if (!this._save)
            this._save = {};
    }

    /**
     * 清空存储数据
     */
    public clearData(exclude: string[] = null): void {
        if (exclude) {
            for (let key in this._save) {
                if (exclude.indexOf(key) < 0) {
                    delete this._save[key];
                }
            }
        } else {
            this._save = {};
        }

        this.saveData();
    }

    /**
     * 保存存储数据
     */
    public saveData(): void {
        try {
            let str: string = JSON.stringify(this._save);
            let data: string = encrypt.encrypt(str, this._secretkey, 256);
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
        let item = this._save[key];
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
        let oldValue = this._save[key];
        this._save[key] = value;

        if (autoSave) {
            this.saveData();
        }

        return oldValue;
    }
}