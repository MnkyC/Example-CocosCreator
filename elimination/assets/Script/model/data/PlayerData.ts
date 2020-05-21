// 用户数据缓存

import MnDataStorage from "../MnDataStorage";

export default class PlayerData extends MnDataStorage {

    constructor() {
        super();
        this.name = 'mnPlayer';
    }
}