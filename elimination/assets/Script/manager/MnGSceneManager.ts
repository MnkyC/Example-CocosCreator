// 场景管理

export default class MnGSceneManager {

    private _preSceneName: string = null;
    private _curSceneName: string = null;

    private constructor() {
    }

    private static _instance: MnGSceneManager = null;
    public static get instance(): MnGSceneManager {
        if (!this._instance) {
            this._instance = new MnGSceneManager();
        }

        return this._instance;
    }

    /**
     * 加载场景
     * @param sceneName 场景名
     * @param preload 是否预加载
     */
    public loadScene(sceneName: string, preload: boolean = false): void {
        const scene = cc.director.getScene();
        if (!(scene && scene.isValid))
            return;

        if (scene) {
            if (scene.name == sceneName)
                return;

            this._preSceneName = scene.name;
        }

        if (preload)
            cc.director.preloadScene(sceneName); // 后台静默加载，真正切换还是要用loadScene
        else
            cc.director.loadScene(sceneName, () => {
                this._curSceneName = sceneName;
                // to do 场景加载后的回调，进一步进行初始化或数据传递操作
            });
    }

    // 加载上一个场景
    public loadPreviousScene(): void {
        if (this._preSceneName)
            this.loadScene(this._preSceneName);
    }

    // 获取当前场景名
    public get CurrentSceneName(): string {
        return this._curSceneName;
    }
}