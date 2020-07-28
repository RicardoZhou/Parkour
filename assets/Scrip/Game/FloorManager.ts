import UIBase from "../UIBase";
import { SpeedDef } from "../Define/GameDef";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FloorManager extends UIBase {

    @property([cc.Prefab])
    floorPref: cc.Prefab[] = [];

    floorPool: cc.NodePool = null;
    floorMap: cc.Node[] = [];
    floorX: number = 0;

    onLoad() {
        this.floorPool = new cc.NodePool();
        for (let i = 0; i < 10; i++) {
            let floor: cc.Node = null;
            if (i)
                floor = cc.instantiate(this.floorPref[1]);
            else
                floor = cc.instantiate(this.floorPref[0]);
            floor.parent = this.node;
            floor.x = this.floorX;
            this.floorX += floor.width - 1;
            this.floorMap.push(floor);
        }
    }

    start() {

    }

    update(dt: number) {
        this.floorMap.forEach((floor, index) => {
            floor.x -= dt * SpeedDef.FLOOR_SPEED;
        });
        for (let i = this.floorMap.length; i >= 0; i--) {
            if (this.floorMap[i].x + this.floorMap[i].width < 0) {
                let node = this.floorMap.splice(i, 1);
                this.floorPool.put(node[0]);
            }
        }
    }

    onDisable() {
        this.floorPool.clear();
    }
}
