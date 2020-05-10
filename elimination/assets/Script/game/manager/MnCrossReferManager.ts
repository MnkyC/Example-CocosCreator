/**
 * 脚本相互引用管理，避免循环引用和大量import
 * 在每个脚本的onLoad中将this传入
 * 使用时将该管理类和对应的脚本放统一目录方便管理，管理类的名称可根据对应脚本的作用修改
 */

// import A from "./A";
// import B from "./B";
// import C from "./C";

// export default class MnCrossReferManager {
//     public static aInstance: A = null;
//     public static bInstance: B = null;
//     public static cInstance: C = null;
// }

// // 对应的A,B,C类
// import MnCrossReferManager from "./MnCrossReferManager";

// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class A extends cc.Component {

//     onLoad() {
//         MnCrossReferManager.aInstance = this;
//     }

//     start() {
//         // 可以直接使用MnCrossReferManager.bInstance访问B类
//     }

// }



