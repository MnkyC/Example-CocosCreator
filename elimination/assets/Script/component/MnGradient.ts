// 图片渐变

const { ccclass, property } = cc._decorator;

@ccclass
export default class MnGradient extends cc.Component {

    @property({
        type: [cc.Sprite]
    })
    imgs: cc.Sprite[] = [];

    private _gradient_value: number = null;

    onLoad() {
    }

    start() {
        this._gradient_value = 0;
    }

    update(dt) {
        if (this._gradient_value >= 1) {
            return;
        }

        this.imgs.forEach(img => {
            let material = img.getMaterial(0);
            if (material) {
                this._gradient_value += 0.02;
                material.setProperty('gradient_value', this._gradient_value);
            }
        })
    }
}
