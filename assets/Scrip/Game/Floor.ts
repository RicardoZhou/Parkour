import UIBase from "../UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Floor extends UIBase {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    start() {

    }

    // update (dt) {}
}
