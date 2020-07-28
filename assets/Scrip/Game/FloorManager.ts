import UIBase from "../UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FloorManager extends UIBase {

    @property([cc.Prefab])
    floorPref: cc.Prefab[] = [];

    floorPool: cc.NodePool = null;
    floorX: number = 0;

    onLoad() {
        this.floorPool = new cc.NodePool();
        for (let i = 0; i < 10; i++) {
            if (i) {
                let floor = cc.instantiate(this.floorPref[1]);
                floor.parent = this.node;
                floor.x = this.floorX;
                this.floorX += floor.width - 1;
            } else {
                let floor = cc.instantiate(this.floorPref[0]);
                floor.parent = this.node;
                floor.x = this.floorX;
                this.floorX += floor.width - 1;
            }
        }
    }

    start() {

    }

    onDisable() {
        this.floorPool.clear();
    }
}
